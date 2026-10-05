// Anonymous website actions. A phone click is not a completed call, and an
// accepted form is not proof of delivery to the owner's inbox or a sale.
(() => {
const config = {"domain": "pmroofers.com", "hosts": ["pmroofers.com", "www.pmroofers.com"], "paths": ["/", "/about", "/airdrie", "/alloa", "/alva", "/ardrossan", "/areas", "/ayr", "/bannockburn", "/barrhead", "/bathgate", "/bearsden", "/beith", "/bellshill", "/bishopbriggs", "/blantyre", "/boness", "/bonnyrigg", "/bridge-of-allan", "/bridge-of-weir", "/broxburn", "/carluke", "/chimney-repairs", "/clackmannan", "/clydebank", "/coatbridge", "/contact", "/contact.html", "/croy", "/cumbernauld", "/dalkeith", "/dalry", "/damp-proofing", "/discount", "/discount-form", "/discount.html", "/dry-rot-repair", "/dumbarton", "/dunblane", "/dunfermline", "/east-kilbride", "/edinburgh", "/emergency-roof-repairs", "/fairlie", "/falkirk", "/faq", "/fauldhouse", "/ferniegair", "/free-photo-review", "/free-photo-review-form", "/free-photo-review/thanks", "/get-a-quote", "/get-quote", "/get-quote.html", "/giffnock", "/glasgow", "/gorebridge", "/greenock", "/haddington", "/hamilton", "/inverkip", "/irvine", "/johnstone", "/kilbirnie", "/kilmacolm", "/kilmarnock", "/kilwinning", "/kirkcaldy", "/kirkintilloch", "/lanark", "/largs", "/larkhall", "/leadwork", "/lennoxtown", "/lenzie", "/lesmahagow", "/linlithgow", "/livingston", "/lochwinnoch", "/longniddry", "/menstrie", "/milngavie", "/musselburgh", "/newton-mearns", "/paisley", "/pathhead", "/port-glasgow", "/prestonpans", "/projects/emergency-leak-repair", "/projects/full-roof-replacement", "/projects/leadwork-and-chimney-repair", "/projects/roofline-and-gutter-upgrade", "/queensferry", "/quote", "/renfrew", "/reviews", "/roof-and-wall-coatings", "/roof-repairs", "/roof-replacement", "/rosyth", "/roughcasting", "/rutherglen", "/services", "/shotts", "/skelmorlie", "/skylight-repairs", "/stewarton", "/stirling", "/stonehouse", "/strathaven", "/tranent", "/tullibody", "/uphall", "/upvc-gutters", "/wemyss-bay", "/west-calder", "/west-kilbride", "/whitburn", "/wishaw"], "pageviews": false, "consentKey": null};

if (typeof window !== "undefined" && typeof document !== "undefined" && !window.__uktlWebsiteTracking) {
  window.__uktlWebsiteTracking = true;
  const privatePath = /^\/(?:api|admin|leads|lead-list|add-customer|addcustomer|customer-list|staff|login|dashboard|marketing-form)(?:[/.]|$)/i;
  const allowedHosts = new Set(config.hosts);
  const allowedPaths = new Set(config.paths);
  const campaignKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
  const consent = () => {
    if (!config.consentKey) return true;
    try { return JSON.parse(window.localStorage.getItem(config.consentKey) || "null")?.choice === "accepted"; }
    catch { return false; }
  };
  const safeUrl = () => {
    try {
      const current = new URL(window.location.href);
      if (!allowedHosts.has(current.hostname) || privatePath.test(current.pathname) || !allowedPaths.has(current.pathname.replace(/\/$/, "") || "/")) return null;
      const clean = new URL(current.pathname, "https://" + config.domain);
      for (const key of campaignKeys) {
        const value = current.searchParams.get(key);
        if (value && /^[a-zA-Z0-9_-]{1,100}$/.test(value)) clean.searchParams.set(key, value);
      }
      return clean.href;
    } catch { return null; }
  };
  const send = name => {
    const url = safeUrl();
    if (!url || !consent()) return;
    try {
      // No field values, phone numbers, email addresses, query strings, hashes,
      // referrer paths or visitor identifiers are sent to the analytics server.
      const payload = JSON.stringify({ n: name, d: config.domain, u: url, r: document.referrer ? new URL(document.referrer).origin : null });
      const endpoint = "https://analytics.aspectstudio.net/api/event";
      if (window.navigator.sendBeacon?.(endpoint, new Blob([payload], { type: "text/plain" }))) return;
      window.fetch(endpoint, { method: "POST", body: payload, headers: { "Content-Type": "text/plain" }, credentials: "omit", keepalive: true }).catch(() => {});
    } catch { /* Contacting the business must work even when analytics fails. */ }
  };
  let lastPage = null;
  const pageview = () => {
    if (!config.pageviews || !consent()) return;
    const url = safeUrl();
    if (!url || url === lastPage) return;
    lastPage = url;
    send("pageview");
  };
  document.addEventListener("click", event => {
    const link = event.target instanceof Element ? event.target.closest("a") : null;
    const href = link?.getAttribute("href") || "";
    if (/^tel:/i.test(href)) send("Website Phone Click");
    if (/^mailto:/i.test(href)) send("Website Email Click");
    if (/^https:\/\/(?:wa\.me|api\.whatsapp\.com)\//i.test(href)) send("Website WhatsApp Click");
    // Re-check after the existing consent button saves the visitor's choice.
    queueMicrotask(pageview);
  });
  document.addEventListener("uktl:enquiry-accepted", () => send("Website Enquiry Accepted"));
  document.addEventListener("uktl:email-draft-opened", () => send("Website Email Draft Opened"));
  window.addEventListener("popstate", pageview);
  window.addEventListener("storage", pageview);
  if (config.pageviews) {
    for (const name of ["pushState", "replaceState"]) {
      const original = window.history[name];
      window.history[name] = function (...args) {
        const result = original.apply(this, args);
        queueMicrotask(pageview);
        return result;
      };
    }
    pageview();
  }
}

})();
