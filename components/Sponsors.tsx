import React from 'react';

// Import images directly (Vite will handle these)
import bitflowLogo from '../images/sponsors/bitflow.png';
import stackingdaoLogo from '../images/sponsors/stackingdao.png';
import stacksLogo from '../images/sponsors/stacks.png';

const sponsorLogos = [
  { src: bitflowLogo, alt: 'Bitflow' },
  { src: stackingdaoLogo, alt: 'StackingDAO' },
  { src: stacksLogo, alt: 'Stacks' },
];

export const Sponsors: React.FC = () => {
  return (
    <div className="py-10 border-y border-borderSubtle bg-surface relative overflow-hidden">
      <div className="container mx-auto px-6">
        <p className="text-center text-inkLight/60 text-sm font-bold uppercase tracking-widest mb-8">Backed by Industry Leaders</p>
        <div className="flex flex-wrap justify-center gap-12 md:gap-16 items-center">
          {sponsorLogos.map((logo, index) => (
            <div key={index} className="h-36 md:h-48 transition-all duration-300">
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-full w-auto object-contain grayscale hover:grayscale-0 transition-all"
                onError={(e) => {
                  // Fallback to gold placeholder if image fails
                  e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="120" height="40"%3E%3Crect fill="%23D97706" width="120" height="40" rx="4"/%3E%3C/svg%3E';
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};