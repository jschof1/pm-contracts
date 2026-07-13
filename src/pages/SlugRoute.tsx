import { useLocation } from "react-router-dom";

import SlugPage from "@/pages/SlugPage";

/**
 * Remount slug page when the path changes (e.g. /glasgow → /paisley) so React Router
 * and page state stay aligned with the URL. Same Route element would otherwise reuse
 * one SlugPage instance across param-only changes.
 */
const SlugRoute = () => {
  const { pathname } = useLocation();
  return <SlugPage key={pathname} />;
};

export default SlugRoute;
