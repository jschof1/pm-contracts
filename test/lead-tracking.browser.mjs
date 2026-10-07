import puppeteer from 'puppeteer-core';
import assert from 'node:assert/strict';
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4179';
const browser = await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
try {
for (const path of ['/','/get-quote','/special-offer','/discount']) {
 const page = await browser.newPage();
 await page.setViewport({width:1440,height:1000});
 console.log("Testing",path);
 let status = 500, posts = 0;
 await page.setRequestInterception(true);
 page.on('request', r => {
  if(r.method()==='POST' && r.url().includes('/api/form-proxy')) {posts++; return r.respond({status,contentType:'application/json',body:JSON.stringify({success:status===200})});}
  if(new URL(r.url()).origin !== new URL(base).origin) return r.abort();
  return r.continue();
 });
 await page.goto(base+path,{waitUntil:'networkidle0'});
 const count=()=>page.evaluate(()=>window.dataLayer?.filter(x=>x.event==='lead_form_submit').length||0);
 assert.equal(await count(),0);
 assert.equal(await page.evaluate(()=>document.querySelectorAll('script[src^="https://www.googletagmanager.com/gtm.js"]').length),1);
 if(path==='/get-quote') {
  for(const id of ['residential','small','roof-repairs','repair']) {
   await page.waitForSelector('#'+id); await page.click('#'+id);
   await page.evaluate(()=>[...document.querySelectorAll('button')].find(x=>x.textContent.includes('Next'))?.click());
  }
  await page.waitForSelector('input[type="email"]');
 }
 await page.evaluate(()=>{
  const set=(el,v)=>{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(el,v);el.dispatchEvent(new Event('input',{bubbles:true}));};
  const fields=[...document.querySelectorAll('input')];
  for(const el of fields) {if(el.type==='tel')set(el,'07700 900123');else if(el.type==='email')set(el,'tracking-test@example.com');else if(el.type==='text')set(el,'Tracking test');}
 });
 if(path==='/') {await page.evaluate(()=>[...document.querySelectorAll('button[role="combobox"]')].find(x=>x.getBoundingClientRect().width)?.click());await page.waitForSelector('[role="option"]');await page.click('[role="option"]');}
 const submit=async()=> {
  await page.evaluate((wizard)=>{if(wizard){[...document.querySelectorAll('button')].find(x=>x.textContent.includes('Get My Free Quote'))?.click();}else{document.querySelector('form').requestSubmit();}},path==='/get-quote');
  await new Promise(r=>setTimeout(r,400));
 };
 await submit();assert.equal(posts,1,path+' failed request executed');assert.equal(await count(),0,path+' no failure event');
 status=200;await submit();assert.equal(posts,2);assert.equal(await count(),1,path+' success event');
 const event=await page.evaluate(()=>window.dataLayer.find(x=>x.event==='lead_form_submit'));
 assert.equal(event.form_name,'quote_form');assert.equal(event.user_phone,'07700 900123');
 assert.equal(event.user_email,path==='/get-quote'?'tracking-test@example.com':'');
 assert.equal(event.service,path==='/get-quote'?'roof-repairs':path==='/'?'Roof Repairs':'');
 console.log('PASS',path,'failure=0, success=1, exact fields, one GTM loader');
 await page.close();
}
} finally {await browser.close();}
