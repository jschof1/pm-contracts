import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import SEOHead from '@/components/SEOHead';
import JsonLd from '@/components/JsonLd';
import { getProjectData, projects } from '@/data/projects';
import { siteSettings } from '@/data/siteSettings';
import { 
  CheckCircle, ArrowLeft, MapPin, Calendar, Shield, 
  ArrowRight, Quote, Star, Clock, Home, Award, Sparkles, Phone
} from 'lucide-react';
import QuoteWizard from '@/components/QuoteWizard';
import { GoogleReviewBadge, CertificationLogos } from '@/components/shared/TrustBadgeBar';

// Animated Counter Component
interface CounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
}

const Counter = ({ value, suffix = '', prefix = '' }: CounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 2000 });
  const displayValue = useTransform(springValue, (v) => `${prefix}${Math.round(v).toLocaleString()}${suffix}`);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  return <motion.span ref={ref}>{displayValue}</motion.span>;
};

const ProjectPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectData(slug || '');

  if (!project) {
    return <Navigate to="/404" replace />;
  }

  const relatedProjects = projects
    .filter(p => p.slug !== project.slug)
    .slice(0, 2);

  return (
    <Layout>
      <SEOHead 
        title={`${project.title} | ${project.location} | PM Roofers`}
        description={project.description}
        canonicalPath={`/projects/${project.slug}`}
      />
      <JsonLd
        type="Article"
        data={{
          title: `${project.title} | ${project.location}`,
          description: project.description,
          slug: `/projects/${project.slug}`,
          image: project.image,
        }}
      />
      <JsonLd
        type="BreadcrumbList"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Projects', path: '/#projects' },
          { name: project.title, path: `/projects/${project.slug}` },
        ]}
      />
      
      {/* Hero Section */}
      <section className="section-padding bg-primary relative overflow-hidden">
        {/* Background grid */}
        <div className="grid-overlay-accent absolute inset-0 opacity-20" />
        
        {/* Accent lines */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-accent" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link 
                to="/#projects" 
                className="inline-flex items-center gap-2 text-accent hover:text-accent/80 mb-8 text-sm font-bold uppercase tracking-widest transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Projects
              </Link>
              
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <GoogleReviewBadge />
                <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-lg border-l-4 border-accent px-4 py-2">
                  <Shield className="w-4 h-4 text-accent" />
                  <span className="text-xs font-bold text-primary-foreground uppercase tracking-wider">Fully Insured & Guaranteed</span>
                </div>
              </div>
              
              <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
                {project.title.split(' ').map((word, i, arr) => (
                  i === arr.length - 1 ? <span key={i} className="text-accent">{word}</span> : word + ' '
                ))}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-primary-foreground/80 mb-10">
                <span className="flex items-center gap-2 bg-primary-foreground/5 px-4 py-2 border border-primary-foreground/10">
                  <MapPin className="w-5 h-5 text-accent" /> {project.location}
                </span>
                <span className="flex items-center gap-2 bg-primary-foreground/5 px-4 py-2 border border-primary-foreground/10">
                  <Calendar className="w-5 h-5 text-accent" /> {project.style}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#quote-section"
                  className="inline-flex items-center justify-center px-10 py-5 bg-accent text-accent-foreground font-bold rounded-lg hover:bg-accent/90 transition-all shadow-sharp hover:shadow-sharp-lg text-lg group"
                >
                  Start Your Project <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href={`tel:${siteSettings.phoneFormatted}`}
                  className="inline-flex items-center justify-center px-10 py-5 border-2 border-primary-foreground text-primary-foreground font-bold rounded-lg hover:bg-primary-foreground hover:text-primary transition-all text-lg"
                >
                  <Phone className="w-5 h-5 mr-3" />
                  Call Now
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="absolute -top-4 -right-4 w-full h-full border-4 border-accent/30 z-0" />
              <div className="bg-muted rounded-lg h-[500px] overflow-hidden relative z-10 shadow-sharp-lg border-2 border-primary-foreground/10">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                  width={640}
                  height={500}
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                  <div className="bg-card/90 backdrop-blur-sm p-4 shadow-sharp border-l-4 border-accent">
                    <p className="text-primary font-bold text-sm uppercase tracking-wider">Project Showcase</p>
                    <p className="text-muted-foreground text-xs">Verified Case Study</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Counter Bar */}
      <section className="py-12 bg-secondary relative overflow-hidden border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Home, value: 30, suffix: '+', label: 'Years Experience' },
              { icon: Star, value: 5, label: 'Google Rating', isDecimal: true, suffix: '/5' },
              { icon: Clock, value: 24, suffix: 'hr', label: 'Response Time' },
              { icon: Award, value: 100, suffix: '%', label: 'Customer Focus' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-accent group-hover:scale-110 transition-transform" />
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                  {stat.isDecimal ? (
                    <span>{stat.value}{stat.suffix || ''}</span>
                  ) : (
                    <Counter value={stat.value} suffix={stat.suffix} />
                  )}
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="section-padding bg-card overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-16">
            
            {/* Left Column: Details & Content */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <motion.span 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="label-solid text-xs md:text-sm font-bold tracking-wider uppercase mb-2 md:mb-6 px-3 py-1.5 inline-block"
                >
                  Project Overview
                </motion.span>
                
                <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mt-2 md:mt-6 mb-8 leading-tight">
                  Roofing Results Delivered in <span className="text-accent">{project.location}</span>
                </h2>
                
                <p className="text-base md:text-xl text-muted-foreground mb-12 leading-relaxed border-l-4 border-accent pl-6 italic">
                  {project.description}
                </p>
                <div className="space-y-5 mb-12 text-muted-foreground leading-relaxed">
                  <p>
                    This {project.style.toLowerCase()} project in {project.location} reflects the kind of roofing work
                    PM Roofers is regularly asked to carry out across Glasgow and the surrounding areas. Customers
                    usually come to us when the issue has moved beyond a minor maintenance job and they need clear
                    advice on the right next step, realistic timescales, and workmanship that protects the property for
                    the long term.
                  </p>
                  <p>
                    On jobs like this, we focus on making the scope clear from the outset, keeping communication direct,
                    and tying every repair or replacement decision back to the condition of the roof rather than pushing
                    unnecessary work. If you are dealing with something similar, you can move straight to our
                    <a href="/get-quote" className="ml-1 font-semibold text-accent-text-on-light hover:underline">quote form</a>
                    or review the wider
                    <a href="/services" className="ml-1 font-semibold text-accent-text-on-light hover:underline">roofing services</a>
                    we provide.
                  </p>
                </div>
                
                {/* Before/After Comparison */}
                {project.beforeImage && project.afterImage && (
                  <div className="mb-20">
                    <div className="flex items-center gap-3 mb-8">
                      <Sparkles className="w-6 h-6 text-accent" />
                      <h3 className="font-display text-2xl font-bold text-primary">The Transformation</h3>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="group relative">
                        <div className="relative aspect-[4/3] overflow-hidden shadow-sharp border-2 border-border group-hover:border-primary transition-colors">
                          <img
                            src={project.beforeImage}
                            alt="Before"
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                            width={640}
                            height={480}
                            loading="lazy"
                          />
                          <div className="absolute top-0 left-0 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 uppercase tracking-tighter shadow-sharp">Before</div>
                        </div>
                      </div>
                      <div className="group relative">
                        <div className="relative aspect-[4/3] overflow-hidden shadow-sharp border-2 border-accent group-hover:border-primary transition-colors">
                          <img
                            src={project.afterImage}
                            alt="After"
                            className="w-full h-full object-cover"
                            width={640}
                            height={480}
                            loading="lazy"
                          />
                          <div className="absolute top-0 left-0 bg-accent text-accent-foreground text-[10px] font-bold px-3 py-1 uppercase tracking-tighter shadow-sharp">After</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-8">
                  <CheckCircle className="w-6 h-6 text-accent" />
                  <h3 className="font-display text-2xl font-bold text-primary">Key Features & Solutions</h3>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-6 mb-20">
                  {project.features.map((feature, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-center gap-4 p-6 bg-secondary border-t-4 border-accent shadow-sharp hover:shadow-sharp-lg transition-all group"
                    >
                      <div className="w-10 h-10 bg-card flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                        <CheckCircle className="w-5 h-5 text-accent group-hover:text-primary-foreground" />
                      </div>
                      <span className="font-bold text-primary">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Testimonial Section */}
                {project.testimonial && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative p-12 bg-primary text-primary-foreground overflow-hidden shadow-sharp-lg"
                  >
                    <div className="grid-overlay-accent absolute inset-0 opacity-10" />
                    <Quote className="absolute top-6 right-8 w-24 h-24 text-primary-foreground/5" />
                    <div className="relative z-10">
                      <div className="flex gap-1 mb-8">
                        {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-accent text-accent" />)}
                      </div>
                      <p className="text-2xl md:text-3xl font-display font-bold mb-10 italic leading-relaxed">
                        "{project.testimonial.text}"
                      </p>
                      <div className="flex items-center gap-5">
                        <div className="surface-icon-accent w-14 h-14 font-display text-xl font-bold">
                          {project.testimonial.author[0]}
                        </div>
                        <div>
                          <p className="font-bold text-xl">{project.testimonial.author}</p>
                          <p className="text-accent text-xs font-bold uppercase tracking-widest">Verified Client • {project.location}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>

            {/* Right Column: Sticky Form & Sidebar */}
            <div className="lg:col-span-5">
              <aside id="quote-section" className="sticky top-24">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-card p-8 md:p-10 border-2 border-border shadow-sharp-lg relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-2 bg-accent" />
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-accent/10 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-accent" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-primary">Get a Similar Result</h3>
                  </div>
                  <p className="text-muted-foreground mb-8 text-sm">
                    Complete our quick form to receive a free, no-obligation quote for your roofing or exterior project.
                  </p>
                  
                  <QuoteWizard compact />
                  
                  <div className="mt-10 pt-8 border-t border-border">
                    <p className="text-[10px] text-muted-foreground text-center mb-6 uppercase tracking-[0.2em] font-bold">Accredited & Certified</p>
                    <CertificationLogos />
                  </div>
                </motion.div>

                {/* Quick Contact Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="mt-8 bg-primary p-10 text-primary-foreground shadow-sharp-lg group overflow-hidden relative"
                >
                  <div className="grid-overlay-accent absolute inset-0 opacity-10" />
                  <div className="relative z-10">
                    <h4 className="font-display text-2xl font-bold mb-4">Need immediate help?</h4>
                    <p className="text-primary-foreground/70 mb-8 text-sm leading-relaxed">
                      Speak to PM Roofers about the right roofing or exterior service for your property and get clear advice on the next step.
                    </p>
                    <a 
                      href={`tel:${siteSettings.phoneFormatted}`}
                      className="inline-flex items-center justify-center w-full py-5 bg-accent text-accent-foreground font-bold hover:bg-card hover:text-primary transition-all gap-3 shadow-sharp text-lg"
                    >
                      <Phone className="w-5 h-5" />
                      Call Now
                    </a>
                  </div>
                </motion.div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects Section */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4">More Recent Work</h2>
              <p className="text-muted-foreground max-w-xl">
                Explore other recent PM Roofers projects from across the Glasgow service area.
              </p>
            </div>
            <Link to="/" className="inline-flex items-center gap-2 text-primary font-bold hover:text-accent transition-colors group">
              View All Projects <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {relatedProjects.map((rp, index) => (
              <motion.div
                key={rp.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <Link to={`/projects/${rp.slug}`} className="block">
                  <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-6">
                    <img 
                      src={rp.image} 
                      alt={rp.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-primary group-hover:text-accent transition-colors mb-2">{rp.title}</h3>
                  <p className="text-muted-foreground flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> {rp.location} • {rp.style}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProjectPage;
