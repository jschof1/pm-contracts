import test from 'node:test';import assert from 'node:assert/strict';
import { interceptPrerenderRequest, assertPreviewCapture } from './prerender-network-policy.mjs';
const mainFrame={};
function request({url='https://outside.invalid/review',navigation=true,frame=mainFrame}={}) {
  const calls=[];return {calls,url:()=>url,isNavigationRequest:()=>navigation,frame:()=>frame,
    continue:()=>calls.push('continue'),abort:()=>calls.push('abort'),respond:r=>calls.push(r)};
}
for(const [name,options,route,expected] of [
  ['local navigation',{url:'http://127.0.0.1:4173/feedback/google'},'/feedback/google','continue'],
  ['local asset',{url:'http://127.0.0.1:4173/assets/app.js',navigation:false},'/feedback/google','continue'],
  ['review redirect',{},'/feedback/google',{status:204}],
  ['unrelated redirect',{},'/contact','abort'],
  ['foreign iframe',{frame:{}},'/feedback/google','abort'],
  ['foreign tracking resource',{navigation:false},'/feedback/google','abort'],
]) test(name,()=>{const r=request(options);interceptPrerenderRequest(r,{baseUrl:'http://127.0.0.1:4173',route,mainFrame});assert.deepEqual(r.calls,[expected]);});
test('capture refuses an external or Chrome error document',()=>{
  const baseUrl='http://127.0.0.1:4173';assert.throws(()=>assertPreviewCapture({baseUrl,pageUrl:'https://outside.invalid',html:'<html/>'}),/left the local/);
  assert.throws(()=>assertPreviewCapture({baseUrl,pageUrl:baseUrl,html:'<body class="neterror"><div id="main-frame-error">ERR_NAME_NOT_RESOLVED</div>'}),/browser network error/);
  assertPreviewCapture({baseUrl,pageUrl:baseUrl+'/feedback/google',html:'<body><h1>Thanks for the 5-star feedback</h1></body>'});
});
