import { useParams } from "react-router-dom";

import NotFound from "@/pages/NotFound";
import AreaPage from "@/pages/areas/AreaPage";
import ServicePage from "@/pages/services/ServicePage";
import { getAreaData } from "@/data/areas";
import { getServiceData } from "@/data/services";

const SlugPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const safeSlug = slug ?? "";

  if (getServiceData(safeSlug)) {
    return <ServicePage slugOverride={safeSlug} />;
  }

  if (getAreaData(safeSlug)) {
    return <AreaPage slugOverride={safeSlug} />;
  }

  return <NotFound />;
};

export default SlugPage;
