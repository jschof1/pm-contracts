export function interceptPrerenderRequest(request, { baseUrl, route, mainFrame }) {
  const local = new URL(request.url()).origin === new URL(baseUrl).origin;
  if (local) return request.continue();
  if (route === '/feedback/google' && request.isNavigationRequest() && request.frame() === mainFrame) {
    return request.respond({ status: 204 });
  }
  return request.abort();
}

export function assertPreviewCapture({ pageUrl, baseUrl, html }) {
  if (new URL(pageUrl).origin !== new URL(baseUrl).origin) {
    throw new Error('Prerender navigation left the local preview');
  }
  if (/<body\b[^>]*\bclass=["'][^"']*\bneterror\b[^"']*["']/i.test(html)
    && /\bid=["']main-frame-error["']/i.test(html)) {
    throw new Error('Prerender captured a browser network error document');
  }
}
