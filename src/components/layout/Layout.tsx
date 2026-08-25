import { ReactNode } from 'react';
import TopBar from './TopBar';
import Header from './Header';
import Footer from './Footer';
import OptionalServicesConsent from '@/components/OptionalServicesConsent';

interface LayoutProps {
  children: ReactNode;
  hideFooter?: boolean;
}

const Layout = ({ children, hideFooter }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      <main className="flex-1">{children}</main>
      {!hideFooter && <Footer />}
      <OptionalServicesConsent />
    </div>
  );
};

export default Layout;
