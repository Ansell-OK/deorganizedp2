import React from 'react';

const sponsors = [
  'CoinBase', 'Binance', 'Ledger', 'Chainlink', 'Uniswap', 'Solana'
];

export const Sponsors: React.FC = () => {
  return (
    <div className="py-10 border-y border-borderSubtle bg-surface relative overflow-hidden">
      <div className="container mx-auto px-6">
        <p className="text-center text-inkLight/60 text-sm font-bold uppercase tracking-widest mb-8">Backed by Industry Leaders</p>
        <div className="flex flex-wrap justify-center gap-12 md:gap-24 items-center opacity-60 hover:opacity-100 transition-all duration-500">
           {/* Placeholder for SVG Logos - Using text for simulation */}
           {sponsors.map((sponsor) => (
             <span key={sponsor} className="text-xl md:text-2xl font-bold text-inkLight hover:text-ink font-sans tracking-tighter transition-colors">
                {sponsor.toUpperCase()}
             </span>
           ))}
        </div>
      </div>
    </div>
  );
};