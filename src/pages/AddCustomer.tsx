import Layout from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { siteSettings } from "@/data/siteSettings";

const AddCustomer = () => {
  return (
    <Layout>
      <Helmet>
        <title>Customer Portal | PM Roofers</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-2xl mx-auto rounded-lg border border-border bg-card p-8 space-y-6">
          <h1 className="text-2xl font-semibold text-foreground text-center">Add Customer</h1>
          <iframe
            src="https://api.leadconnectorhq.com/widget/form/zRRwRnT3wU57RTnOjnFj"
            width="100%"
            height="600"
            style={{ border: 0 }}
            title="Add Customer Form"
          />
          <p className="text-muted-foreground text-center text-sm">
            For support, use the <a className="text-primary underline" href={`tel:${siteSettings.phoneFormatted}`}>call now link</a> or email{" "}
            <a className="text-primary underline" href={`mailto:${siteSettings.email}`}>{siteSettings.email}</a>.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AddCustomer;
