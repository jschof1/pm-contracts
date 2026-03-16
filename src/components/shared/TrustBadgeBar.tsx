import { Star, Shield } from 'lucide-react';
import { siteContent } from '@/data/content';

interface TrustBadgeBarProps {
  variant?: 'compact' | 'full';
  showCertifications?: boolean;
  className?: string;
}

const trustSignals = siteContent.home.trustSignals;
const googleBadge = trustSignals.badges.find((badge) => badge.name.toLowerCase() === 'google');

export const GoogleReviewBadge = ({ className = '' }: { className?: string }) => (
  <div className={`inline-flex items-center gap-1.5 md:gap-2 bg-primary backdrop-blur-sm rounded-full px-3 py-1.5 md:px-4 md:py-2 shadow-sharp ${className}`}>
    {googleBadge?.logo && <img src={googleBadge.logo} alt={googleBadge.name} className="w-4 h-4 md:w-5 md:h-5" loading="lazy" />}
    <div className="flex items-center gap-0.5">
      {[...Array(googleBadge?.stars || 5)].map((_, index) => (
        <Star key={index} className="w-2.5 h-2.5 md:w-3 md:h-3 fill-[#facc15] text-[#facc15]" />
      ))}
    </div>
    <span className="text-[10px] md:text-xs font-bold text-primary-foreground">
      {googleBadge ? `${googleBadge.rating}${googleBadge.rating.includes('/') ? '' : '/5'}` : siteContent.home.hero.badgeReviews}
    </span>
  </div>
);

export const FullyInsuredBadge = ({ className = '' }: { className?: string }) => (
  <div className={`inline-flex items-center gap-2 bg-primary backdrop-blur-sm rounded-full px-4 py-2 shadow-sharp ${className}`}>
    <Shield className="w-4 h-4 text-accent" />
    <span className="text-xs font-bold text-primary-foreground">{siteContent.home.hero.badgeInsured}</span>
  </div>
);

export const CertificationLogos = ({ className = '' }: { className?: string }) => (
  <div className={`flex flex-wrap items-center justify-center gap-2 md:gap-6 ${className}`}>
    {trustSignals.certifications.map((certification) => (
      <img
        key={certification.name}
        src={certification.logo}
        alt={certification.name}
        className="h-6 md:h-10 w-auto opacity-80 hover:opacity-100 transition-opacity"
        loading="lazy"
      />
    ))}
  </div>
);

const TrustBadgeBar = ({ variant = 'full', showCertifications = true, className = '' }: TrustBadgeBarProps) => {
  return (
    <div className={`${className}`}>
      <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
        <GoogleReviewBadge />
        <FullyInsuredBadge />
      </div>
      {showCertifications && variant === 'full' && (
        <CertificationLogos className="mt-6" />
      )}
    </div>
  );
};

export default TrustBadgeBar;
