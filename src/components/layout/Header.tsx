import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteSettings } from "@/data/siteSettings";
import { siteContent } from "@/data/content";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { headerLogo } from "@/data/images";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const content = siteContent.layout.header;
  const services = content.servicesMenu;
  const areas = content.areasMenu;
  const mainLinks = content.mainLinks;

  const servicesLabel = content.servicesLabel || "Services";
  const areasLabel = content.areasLabel || "Areas";
  const viewAllServices = content.viewAllServices || "View All Services";
  const viewAllServicesDesc = content.viewAllServicesDesc || "Explore our full range of roofing and exterior property services";
  const viewAllAreas = content.viewAllAreas || "View All Areas";
  const aboutLabel = content.aboutLabel || "About";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-card/50 backdrop-blur-md shadow-line border-b-4 border-accent py-2"
          : "bg-card border-b-2 border-border py-3",
      )}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between relative">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 z-10">
            <img
              src={headerLogo}
              alt={siteContent.brand.businessName}
              className="h-12 md:h-14 w-auto"
              loading="eager"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-1">
            <NavigationMenu>
              <NavigationMenuList>
                {mainLinks.map((link, index) => (
                  <div key={link.href} className="flex items-center">
                    {/* Insert Services and Areas after the first link (About) */}
                    {index === 1 && (
                      <>
                        <NavigationMenuItem>
                          <NavigationMenuTrigger className="text-sm font-bold bg-transparent text-foreground hover:text-accent-text-on-light">
                            {servicesLabel}
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <ul className="grid w-[500px] gap-2 p-4 md:grid-cols-2 border-2 border-border bg-popover">
                              <li className="col-span-2 border-b border-border pb-2 mb-2">
                                <NavigationMenuLink asChild>
                                  <Link
                                    to="/services"
                                    className="block select-none space-y-1 p-3 leading-none no-underline outline-none transition-all hover:bg-accent/10 border-l-4 border-l-accent"
                                  >
                                    <div className="text-sm font-bold leading-none text-accent-text-on-light">{viewAllServices}</div>
                                    <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                                      {viewAllServicesDesc}
                                    </p>
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                              {services.map((service) => (
                                <li key={service.href}>
                                  <NavigationMenuLink asChild>
                                    <Link
                                      to={service.href}
                                      className="block select-none space-y-1 p-3 leading-none no-underline outline-none transition-all hover:bg-accent/10 border-l-4 border-l-transparent hover:border-l-accent"
                                    >
                                      <div className="text-sm font-bold leading-none text-popover-foreground">{service.title}</div>
                                      <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                                        {service.description}
                                      </p>
                                    </Link>
                                  </NavigationMenuLink>
                                </li>
                              ))}
                            </ul>
                          </NavigationMenuContent>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                          <NavigationMenuTrigger className="text-sm font-bold bg-transparent text-foreground hover:text-accent-text-on-light">
                            {areasLabel}
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <ul className="grid w-[300px] gap-2 p-4 border-2 border-border bg-popover">
                              {areas.map((area) => (
                                <li key={area.href}>
                                  <NavigationMenuLink asChild>
                                    <Link
                                      to={area.href}
                                      className={cn(
                                        "block select-none p-2 text-sm font-semibold leading-none no-underline outline-none transition-all hover:bg-accent/10 hover:text-accent-text-on-light border-l-4 border-l-transparent hover:border-l-accent-text-on-light text-popover-foreground",
                                        area.title === viewAllAreas &&
                                          "font-bold text-accent-text-on-light border-t-2 border-border pt-3 mt-2",
                                      )}
                                    >
                                      {area.title}
                                    </Link>
                                  </NavigationMenuLink>
                                </li>
                              ))}
                            </ul>
                          </NavigationMenuContent>
                        </NavigationMenuItem>
                      </>
                    )}

                    <NavigationMenuItem>
                      <Link
                        to={link.href}
                        className={cn(
                          "px-4 py-2 text-sm font-bold transition-colors relative",
                          location.pathname === link.href
                            ? "text-accent-text-on-light"
                            : "text-foreground hover:text-accent-text-on-light",
                        )}
                      >
                        {link.title}
                        {location.pathname === link.href && (
                          <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-accent-text-on-light" />
                        )}
                      </Link>
                    </NavigationMenuItem>
                  </div>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Desktop CTA & Mobile Controls */}
          <div className="flex items-center gap-4 z-10">
            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center">
              <Button asChild variant="accent" size="lg">
                <a href={`tel:${siteSettings.phoneFormatted}`}>
                  <Phone className="h-4 w-4 mr-2" />
                  {siteContent.cta.callUsNow}
                </a>
              </Button>
            </div>

            {/* Mobile Controls */}
            <div className="flex lg:hidden items-center gap-3">
              <Button asChild variant="accent" size="sm">
                <a href={`tel:${siteSettings.phoneFormatted}`}>
                  <Phone className="h-4 w-4 mr-2" />
                  {siteContent.cta.callNow}
                </a>
              </Button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-foreground hover:text-accent-text-on-light transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t-2 border-border animate-fade-in">
            <nav className="flex flex-col gap-1 pt-4">
              {[
                { title: aboutLabel, href: "/about" }, 
                { title: servicesLabel, href: "/services" }, 
                { title: areasLabel, href: "/areas" }, 
                ...mainLinks.filter(l => l.href !== "/about")
              ].map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="px-4 py-3 text-sm font-bold transition-all border-l-4 border-l-transparent hover:border-l-accent hover:bg-accent/5 text-foreground"
                >
                  {link.title}
                </Link>
              ))}

              <div className="px-4 pt-4">
                <Button asChild variant="accent" className="w-full">
                  <Link to="/contact">{siteContent.cta.freeQuote}</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
