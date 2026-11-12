import fs from 'node:fs';import path from 'node:path';import http from 'node:http';import assert from 'node:assert/strict';import {createRequire} from 'node:module';
import {interceptPrerenderRequest,assertPreviewCapture} from './prerender-network-policy.mjs';
const [siteRoot,chromeWrapper,outDir]=process.argv.slice(2);if(!siteRoot||!chromeWrapper||!outDir)throw Error('usage: fixture siteRoot offlineChrome outDir');
const require=createRequire(path.join(siteRoot,'package.json'));const puppeteer=require('puppeteer-core');
const dist=path.join(siteRoot,'dist');const shell=fs.readFileSync(path.join(dist,'index.html'));let captured=null;let replay=false;
const counts={localRequests:0,foreignRedirectsStubbed:0,foreignResourcesBlocked:0,localApiRequests:0,nonGetRequests:0};
const mime={'.js':'application/javascript','.css':'text/css','.html':'text/html','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.ico':'image/x-icon','.woff2':'font/woff2'};
const server=http.createServer((req,res)=>{
 if(req.method!=='GET'){counts.nonGetRequests++;res.writeHead(405);res.end();return;}
 const pathname=new URL(req.url,'http://fixture.invalid').pathname;
 if(pathname.startsWith('/api/')){counts.localApiRequests++;res.writeHead(410);res.end();return;}
 if(pathname==='/feedback/google'||pathname==='/'){res.writeHead(200,{'content-type':'text/html'});res.end(replay?captured:shell);return;}
 const file=path.resolve(dist,'.'+pathname);if(!file.startsWith(dist+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404);res.end();return;}
 res.writeHead(200,{'content-type':mime[path.extname(file)]??'application/octet-stream'});res.end(fs.readFileSync(file));
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const baseUrl='http://127.0.0.1:'+server.address().port;let browser;
try{
 browser=await puppeteer.launch({headless:true,executablePath:chromeWrapper,args:['--no-sandbox','--disable-setuid-sandbox','--host-resolver-rules=MAP * ~NOTFOUND , EXCLUDE localhost , EXCLUDE 127.0.0.1 , EXCLUDE [::1]']});
 const phases=[];
 for(const phase of ['application','captured-html-replay']){
  replay=phase!=='application';const before=counts.foreignRedirectsStubbed;const page=await browser.newPage();await page.setRequestInterception(true);
  page.on('request',request=>{
   const foreign=new URL(request.url()).origin!==baseUrl;
   if(!foreign)counts.localRequests++;
   else if(request.isNavigationRequest()&&request.frame()===page.mainFrame())counts.foreignRedirectsStubbed++;
   else counts.foreignResourcesBlocked++;
   return interceptPrerenderRequest(request,{baseUrl,route:'/feedback/google',mainFrame:page.mainFrame()});
  });
  await page.goto(baseUrl+'/feedback/google',{waitUntil:'networkidle0',timeout:30000});
  await page.waitForFunction(()=>document.querySelector('h1')?.textContent==='Thanks for the 5-star feedback',{timeout:10000});
  const html=await page.content();assertPreviewCapture({baseUrl,pageUrl:page.url(),html});assert.equal(new URL(page.url()).pathname,'/feedback/google');
  const meta=await page.evaluate(()=>({canonical:[...document.querySelectorAll('link[rel="canonical"]')].at(-1)?.href,robots:[...document.querySelectorAll('meta[name="robots"]')].map(m=>m.content),profile:[...document.querySelectorAll('a')].filter(a=>a.textContent.includes('View Google Reviews')).map(a=>a.href)}));
  assert.equal(meta.canonical,'https://pmroofers.com/feedback/google/');assert.ok(meta.robots.some(r=>r.includes('noindex')));assert.equal(meta.profile.length,1);assert.ok(/^https:\/\//.test(meta.profile[0]));assert.ok(counts.foreignRedirectsStubbed>before,'actual application must attempt its redirect');
  if(!captured)captured=html;phases.push({phase,localDocumentRetained:true,reviewFallbackPresent:true,canonicalPreserved:true,noindexPreserved:true,profileLinkPresent:true,applicationRedirectIntercepted:true});await page.close();
 }
 assert.equal(counts.nonGetRequests,0);assert.equal(counts.localApiRequests,0);fs.mkdirSync(outDir,{recursive:true});fs.writeFileSync(path.join(outDir,'review-fallback.html'),captured,{mode:0o600});const result={passed:true,phases,counts,outsideNetworkForwarded:0,method:'Actual unmodified application bundle; external top-frame redirect answered locally with204; all other external requests aborted; offline Chrome DNS backstop'};fs.writeFileSync(path.join(outDir,'result.json'),JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result));
}finally{if(browser)await browser.close();await new Promise(resolve=>server.close(resolve));}
