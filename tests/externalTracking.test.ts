import test from "node:test";
import assert from "node:assert/strict";

import { trackExternalPageView } from "../src/lib/externalTracking.ts";

test("tracks a SPA page view through the exposed LC tracker", async () => {
  const events: unknown[] = [];

  const tracked = await trackExternalPageView({
    now: () => 0,
    windowObject: {
      location: {
        href: "https://pmroofers.com/contact?source=test",
        pathname: "/contact",
      },
      _lcTracking: {
        tracker: {
          sendEvent: async (event: unknown) => {
            events.push(event);
          },
        },
      },
    },
    documentObject: {
      title: "Contact PM Roofers",
      referrer: "https://google.com/",
    },
    navigatorObject: {
      userAgent: "test-agent",
    },
  });

  assert.equal(tracked, true);
  assert.equal(events.length, 1);
  assert.deepEqual(events[0], {
    type: "external_script_page_view",
    timestamp: 0,
    title: "Contact PM Roofers",
    url: "https://pmroofers.com/contact?source=test",
    path: "/contact",
    referrer: "https://google.com/",
    userAgent: "test-agent",
  });
});

test("returns false when the LC tracker is unavailable", async () => {
  const tracked = await trackExternalPageView({
    now: () => 0,
    windowObject: {
      location: {
        href: "https://pmroofers.com/contact",
        pathname: "/contact",
      },
    },
    documentObject: {
      title: "Contact PM Roofers",
      referrer: "",
    },
    navigatorObject: {
      userAgent: "test-agent",
    },
  });

  assert.equal(tracked, false);
});
