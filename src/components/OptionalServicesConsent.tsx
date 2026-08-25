import { useEffect, useState } from "react";

const preferenceKey = "pm-roofers-optional-services";

const appendScript = (id: string, source: string, attributes: Record<string, string> = {}) => {
  if (document.getElementById(id)) return;

  const script = document.createElement("script");
  script.id = id;
  script.src = source;
  script.defer = true;
  Object.entries(attributes).forEach(([name, value]) => script.setAttribute(name, value));
  document.body.appendChild(script);
};

const enableOptionalServices = () => {
  appendScript("plausible-analytics", "https://analytics.aspectstudio.net/js/script.js", {
    "data-domain": "pmroofers.com",
  });
  appendScript("leadconnector-tracking", "https://link.msgsndr.com/js/external-tracking.js", {
    "data-tracking-id": "tk_0cebf24ea6064f1ab56277b0b3652fe6",
  });
  appendScript("leadconnector-chat", "https://widgets.leadconnectorhq.com/loader.js", {
    "data-resources-url": "https://widgets.leadconnectorhq.com/chat-widget/loader.js",
    "data-widget-id": "69b268690eb1994f700a5684",
  });
};

const OptionalServicesConsent = () => {
  const [choice, setChoice] = useState<string | null>(null);

  useEffect(() => {
    const savedChoice = window.localStorage.getItem(preferenceKey);
    setChoice(savedChoice);
    if (savedChoice === "accepted") enableOptionalServices();
  }, []);

  const choose = (value: "accepted" | "rejected") => {
    window.localStorage.setItem(preferenceKey, value);
    setChoice(value);
    if (value === "accepted") enableOptionalServices();
  };

  if (choice !== null) return null;

  return (
    <section
      className="fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-2xl rounded-lg border border-border bg-background p-4 shadow-xl md:p-5"
      role="dialog"
      aria-label="Optional services preference"
    >
      <h2 className="font-display text-lg font-bold text-foreground">Optional analytics and chat</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        With your permission, we use Plausible analytics and LeadConnector tracking/chat to understand website use and provide chat. Declining keeps these optional services off.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button type="button" onClick={() => choose("accepted")} className="rounded-md bg-accent px-4 py-2 text-sm font-bold text-accent-foreground">
          Accept optional services
        </button>
        <button type="button" onClick={() => choose("rejected")} className="rounded-md border border-border px-4 py-2 text-sm font-bold text-foreground">
          Keep optional services off
        </button>
      </div>
    </section>
  );
};

export default OptionalServicesConsent;
