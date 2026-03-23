import { useEffect } from "react";
import { useRef } from "react";
import { useLocation } from "react-router-dom";
import { trackExternalPageView } from "@/lib/externalTracking";

const ScrollToTop = () => {
  const { pathname, search, hash } = useLocation();
  const hasMounted = useRef(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    // The vendor script only tracks the first load, so SPA route changes need a manual page-view event.
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    void trackExternalPageView();
  }, [pathname, search, hash]);

  return null;
};

export default ScrollToTop;
