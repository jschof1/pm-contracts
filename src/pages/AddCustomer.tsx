import Layout from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { siteSettings } from "@/data/siteSettings";

const AddCustomer = () => {
  return (
    <Layout hideFooter>
      <Helmet>
        <title>Customer Portal | PM Roofers</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <iframe
        src="https://api.leadconnectorhq.com/widget/form/zRRwRnT3wU57RTnOjnFj"
        width="100%"
        style={{ border: 0, display: "block", height: "calc(100vh - 4rem)" }}
        title="Add Customer Form"
      />
    </Layout>
  );
};

export default AddCustomer;
