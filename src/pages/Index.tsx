import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import JsonLd from "@/components/JsonLd";
import { seoData } from "@/data/seoData";
import UrgencyBanner from "@/components/home/UrgencyBanner";
import HeroSection from "@/components/home/HeroSection";
import TrustSignals from "@/components/home/TrustSignals";
import WhyResinBound from "@/components/home/WhyResinBound";
import ProcessSteps from "@/components/home/ProcessSteps";
import AboutSection from "@/components/home/AboutSection";
import ServicesSection from "@/components/home/ServicesSection";
import BeforeAfterGallery from "@/components/home/BeforeAfterGallery";
import GuaranteeSection from "@/components/home/GuaranteeSection";
import ProjectsSection from "@/components/home/ProjectsSection";
import AreasSection from "@/components/home/AreasSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import ObjectionCrusher from "@/components/home/ObjectionCrusher";
import FAQSection from "@/components/home/FAQSection";
import CTASection from "@/components/home/CTASection";


const Index = () => {
  return (
    <Layout>
      <SEOHead 
        title={seoData.homepage.title}
        description={seoData.homepage.description}
        canonicalPath="/"
      />
      <JsonLd type="LocalBusiness" />
      <JsonLd type="Organization" />
      <JsonLd type="WebSite" />
      <UrgencyBanner />
      <HeroSection />
      <TrustSignals />
      <AboutSection />
      <ServicesSection />
      {/* <WhyResinBound /> */}
      <ProcessSteps />
      {/* <BeforeAfterGallery /> */}
      <GuaranteeSection />
      <ProjectsSection />
      <TestimonialsSection />
      <ObjectionCrusher />
      <AreasSection />
      <FAQSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
