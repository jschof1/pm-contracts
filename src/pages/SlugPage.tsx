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
    return <ServicePage />;
  }

  if (getAreaData(safeSlug)) {
    return <AreaPage />;
  }

  return <NotFound />;
};

export default SlugPage;
