import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin, ArrowRight, CreditCard } from 'lucide-react';
import { siteSettings } from '@/data/siteSettings';
import { siteContent } from '@/data/content';
import { paymentLogos, footerLogo } from '@/data/images';

const services = siteContent.layout.footer.servicesLinks;
const areas = siteContent.layout.footer.areasLinks;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground relative z-[9999] border-t-4 border-accent">
      {/* Main Footer */}
      <div className="container-custom py-10 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-4 md:mb-6">
              <img 
                src={footerLogo} 
                alt={siteContent.brand.businessName} 
                className="h-16 md:h-24 w-auto brightness-0 invert"
                loading="lazy"
              />
            </div>
            <p className="text-primary-foreground/80 mb-4 md:mb-6 text-xs md:text-sm leading-relaxed font-medium">
              {siteContent.layout.footer.companyBlurb}
            </p>
            <div className="flex items-center gap-3">
              {siteSettings.facebookUrl && (
                <a href={siteSettings.facebookUrl} target="_blank" rel="noopener noreferrer" className="w-8 h-8 md:w-10 md:h-10 bg-primary-foreground/10 border-2 border-primary-foreground/20 flex items-center justify-center text-primary-foreground/80 hover:bg-accent hover:border-accent hover:text-accent-foreground transition-all">
                  <Facebook className="h-4 w-4 md:h-5 md:h-5" />
                </a>
              )}
              {siteSettings.instagramUrl && (
                <a href={siteSettings.instagramUrl} target="_blank" rel="noopener noreferrer" className="w-8 h-8 md:w-10 md:h-10 bg-primary-foreground/10 border-2 border-primary-foreground/20 flex items-center justify-center text-primary-foreground/80 hover:bg-accent hover:border-accent hover:text-accent-foreground transition-all">
                  <Instagram className="h-4 w-4 md:h-5 md:h-5" />
                </a>
              )}
              {siteSettings.linkedinUrl && (
                <a href={siteSettings.linkedinUrl} target="_blank" rel="noopener noreferrer" className="w-8 h-8 md:w-10 md:h-10 bg-primary-foreground/10 border-2 border-primary-foreground/20 flex items-center justify-center text-primary-foreground/80 hover:bg-accent hover:border-accent hover:text-accent-foreground transition-all">
                  <Linkedin className="h-4 w-4 md:h-5 md:h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-lg md:text-xl font-bold mb-4 md:mb-6 flex items-center gap-2">
              <span className="w-6 md:w-8 h-1 bg-accent"></span>
              {siteContent.layout.footer.servicesLabel}
            </h4>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-x-4 gap-y-2">
              {services.map((service) => (
                <li key={service.href}>
                  <Link
                    to={service.href}
                    className="text-xs md:text-sm text-primary-foreground/80 hover:text-accent transition-colors font-medium flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all hidden md:block" />
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Areas */}
          <div>
            <h4 className="font-display text-lg md:text-xl font-bold mb-4 md:mb-6 flex items-center gap-2">
              <span className="w-6 md:w-8 h-1 bg-accent"></span>
              {siteContent.layout.footer.areasLabel}
            </h4>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-x-4 gap-y-2">
              {areas.map((area) => (
                <li key={area.href}>
                  <Link
                    to={area.href}
                    className="text-xs md:text-sm text-primary-foreground/80 hover:text-accent transition-colors font-medium"
                  >
                    {area.title}
                  </Link>
                </li>
              ))}
            </ul>
            <Link to="/areas" className="inline-flex items-center gap-2 mt-3 md:mt-4 text-xs md:text-sm text-accent font-bold hover:gap-3 transition-all">
              {siteContent.layout.footer.viewAllAreas}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-lg md:text-xl font-bold mb-4 md:mb-6 flex items-center gap-2">
              <span className="w-6 md:w-8 h-1 bg-accent"></span>
              {siteContent.layout.footer.contactLabel}
            </h4>
            <ul className="space-y-3 md:space-y-4">
              <li>
                <a href={`tel:${siteSettings.phoneFormatted}`} className="flex items-start gap-3 text-xs md:text-sm text-primary-foreground/80 hover:text-accent transition-colors font-medium group">
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-accent/20 flex items-center justify-center flex-shrink-0 group-hover:bg-accent transition-all">
                    <Phone className="h-3.5 w-3.5 md:h-4 md:w-4 text-accent group-hover:text-accent-foreground" />
                  </div>
                  <span className="pt-1">{siteSettings.phone}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${siteSettings.email}`} className="flex items-start gap-3 text-xs md:text-sm text-primary-foreground/80 hover:text-accent transition-colors font-medium group">
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-accent/20 flex items-center justify-center flex-shrink-0 group-hover:bg-accent transition-all">
                    <Mail className="h-3.5 w-3.5 md:h-4 md:w-4 text-accent group-hover:text-accent-foreground" />
                  </div>
                  <span className="pt-1 break-all">{siteSettings.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-xs md:text-sm text-primary-foreground/80 font-medium">
                <div className="w-7 h-7 md:w-8 md:h-8 bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-3.5 w-3.5 md:h-4 md:w-4 text-accent" />
                </div>
                <span className="pt-1">{siteSettings.address}</span>
              </li>
              <li className="flex items-start gap-3 text-xs md:text-sm text-primary-foreground/80 font-medium">
                <div className="w-7 h-7 md:w-8 md:h-8 bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-3.5 w-3.5 md:h-4 md:w-4 text-accent" />
                </div>
                <span className="pt-1">{siteContent.layout.footer.workingHours}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="border-t-2 border-primary-foreground/10 py-4 md:py-6 mt-4 md:mt-6">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
            <div className="flex items-center gap-2 text-primary-foreground/60">
              <CreditCard className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-xs md:text-sm font-medium">{siteContent.layout.footer.paymentLabel}</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
              <div className="flex items-center justify-center h-6 md:h-8 bg-primary-foreground/5 rounded-md px-1.5 md:px-2">
                <img src={paymentLogos.visa} alt="Visa" className="h-4 md:h-6 w-auto" loading="lazy" />
              </div>
              <div className="flex items-center justify-center h-6 md:h-8 bg-primary-foreground/5 rounded-md px-1.5 md:px-2">
                <img src={paymentLogos.mastercard} alt="Mastercard" className="h-4 md:h-6 w-auto" loading="lazy" />
              </div>
              <div className="flex items-center justify-center h-6 md:h-8 bg-primary-foreground/5 rounded-md px-1.5 md:px-2">
                <img src={paymentLogos.amex} alt="American Express" className="h-4 md:h-6 w-auto" loading="lazy" />
              </div>
              <div className="flex items-center justify-center h-6 md:h-8 bg-primary-foreground/5 rounded-md px-1.5 md:px-2">
                <img src={paymentLogos.paypal} alt="PayPal" className="h-4 md:h-6 w-auto" loading="lazy" />
              </div>
              <div className="flex items-center justify-center h-6 md:h-8 bg-primary-foreground/5 rounded-md px-1.5 md:px-2">
                <img src={paymentLogos.applePay} alt="Apple Pay" className="h-4 md:h-6 w-auto" loading="lazy" />
              </div>
              <div className="flex items-center justify-center h-6 md:h-8 bg-primary-foreground/5 rounded-md px-1.5 md:px-2">
                <img src={paymentLogos.googlePay} alt="Google Pay" className="h-4 md:h-6 w-auto" loading="lazy" />
              </div>
              <div className="flex items-center justify-center h-6 md:h-8 bg-primary-foreground/5 rounded-md px-1.5 md:px-2">
                <img src={paymentLogos.klarna} alt="Klarna" className="h-6 md:h-8 w-auto" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t-4 border-accent relative z-[9999]">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-primary-foreground/60 font-medium">
              © {currentYear} {siteSettings.businessName}. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-6 gap-y-2 text-sm text-primary-foreground/60 font-medium">
              <Link to="/about" className="hover:text-accent transition-colors">{siteContent.layout.footer.aboutLabel}</Link>
              {siteContent.layout.footer.bottomLinks
                .filter((link) => link.href !== '/about')
                .map((link) => (
                  <Link key={link.href} to={link.href} className="hover:text-accent transition-colors">
                    {link.title}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
