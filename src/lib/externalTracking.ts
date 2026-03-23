type ExternalTrackingEvent = {
  type: "external_script_page_view";
  timestamp: number;
  title: string;
  url: string;
  path: string;
  referrer: string;
  userAgent: string;
};

type ExternalTrackingTracker = {
  sendEvent: (event: ExternalTrackingEvent) => Promise<unknown> | unknown;
};

type TrackingGlobals = {
  tracker?: ExternalTrackingTracker;
};

type TrackingWindow = {
  location: {
    href: string;
    pathname: string;
  };
  _lcTracking?: TrackingGlobals;
};

type TrackingDocument = {
  title: string;
  referrer: string;
};

type TrackingNavigator = {
  userAgent: string;
};

type TrackExternalPageViewOptions = {
  now?: () => number;
  windowObject?: TrackingWindow;
  documentObject?: TrackingDocument;
  navigatorObject?: TrackingNavigator;
};

export const trackExternalPageView = async ({
  now = () => Date.now(),
  windowObject = window,
  documentObject = document,
  navigatorObject = navigator,
}: TrackExternalPageViewOptions = {}): Promise<boolean> => {
  const tracker = windowObject._lcTracking?.tracker;

  if (!tracker?.sendEvent) {
    return false;
  }

  await tracker.sendEvent({
    type: "external_script_page_view",
    timestamp: now(),
    title: documentObject.title,
    url: windowObject.location.href,
    path: windowObject.location.pathname,
    referrer: documentObject.referrer,
    userAgent: navigatorObject.userAgent,
  });

  return true;
};
