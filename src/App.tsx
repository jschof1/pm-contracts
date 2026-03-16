import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/layout/ScrollToTop";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Services from "./pages/Services";
import Areas from "./pages/Areas";
import Reviews from "./pages/Reviews";
import Feedback from "./pages/Feedback";
import GetQuote from "./pages/GetQuote";
import DiscountForm from "./pages/DiscountForm";
import DiscountPage from "./pages/DiscountPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import ProjectPage from "./pages/projects/ProjectPage";
import SlugPage from "./pages/SlugPage";
import AddCustomer from "./pages/AddCustomer";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/services" element={<Services />} />
          <Route path="/areas" element={<Areas />} />
          <Route path="/projects/:slug" element={<ProjectPage />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/get-quote" element={<GetQuote />} />
          <Route path="/special-offer" element={<DiscountForm />} />
          <Route path="/discount" element={<DiscountPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/add-customer" element={<AddCustomer />} />
          <Route path="/:slug" element={<SlugPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
