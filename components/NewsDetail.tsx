
import React from 'react';
import { ArrowLeft, Clock, User, Share2, Bookmark, Tag, Twitter, Linkedin, Facebook } from 'lucide-react';

interface NewsDetailProps {
  onNavigate: (page: string, id?: string | number) => void;
}

export const NewsDetail: React.FC<NewsDetailProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-canvas">
      {/* Progress Bar (Mock) */}
      <div className="fixed top-[73px] left-0 w-full h-1 bg-surface z-40">
        <div className="h-full bg-gold w-[35%]" />
      </div>

      <div className="container max-w-[800px] mx-auto px-6">
        <button 
          onClick={() => onNavigate('news')}
          className="group flex items-center gap-2 text-sm font-bold text-inkLight hover:text-gold transition-colors mb-8"
        >
          <div className="p-2 rounded-full border border-borderSubtle group-hover:border-gold transition-colors">
             <ArrowLeft className="w-4 h-4" />
          </div>
          Back to Newsroom
        </button>

        {/* Header */}
        <header className="mb-10 text-center md:text-left">
           <div className="flex flex-wrap items-center gap-3 mb-6 justify-center md:justify-start">
              <span className="bg-gold text-white text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider shadow-sm">
                 Market Analysis
              </span>
              <span className="text-inkLight text-sm font-medium flex items-center gap-1">
                 <Clock className="w-4 h-4" /> 5 min read
              </span>
           </div>

           <h1 className="text-4xl md:text-5xl font-bold text-ink leading-tight mb-8">
              Bitcoin Breaks Key Resistance: Are Institutions Finally All In?
           </h1>

           <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-y border-borderSubtle py-6">
              <div className="flex items-center gap-3">
                 <img src="https://picsum.photos/100/100?random=author" alt="Author" className="w-12 h-12 rounded-full border border-borderSubtle" />
                 <div className="text-left">
                    <p className="text-sm font-bold text-ink">Elena Rodriguez</p>
                    <p className="text-xs text-inkLight">Senior Market Analyst</p>
                 </div>
              </div>
              
              <div className="flex items-center gap-3">
                 <button className="p-2 rounded-full bg-surface hover:bg-white hover:text-gold border border-borderSubtle transition-colors">
                    <Bookmark className="w-5 h-5" />
                 </button>
                 <button className="p-2 rounded-full bg-surface hover:bg-white hover:text-blue-400 border border-borderSubtle transition-colors">
                    <Twitter className="w-5 h-5" />
                 </button>
                 <button className="p-2 rounded-full bg-surface hover:bg-white hover:text-blue-700 border border-borderSubtle transition-colors">
                    <Linkedin className="w-5 h-5" />
                 </button>
                 <button className="p-2 rounded-full bg-surface hover:bg-white hover:text-blue-600 border border-borderSubtle transition-colors">
                    <Facebook className="w-5 h-5" />
                 </button>
              </div>
           </div>
        </header>

        {/* Featured Image */}
        <div className="rounded-3xl overflow-hidden shadow-soft mb-12 aspect-video">
           <img src="https://picsum.photos/1200/800?random=newsdetail" alt="Featured" className="w-full h-full object-cover" />
        </div>

        {/* Content */}
        <article className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-ink prose-p:text-inkLight/90 prose-a:text-gold prose-strong:text-ink">
           <p className="lead text-xl font-medium text-ink mb-8">
              After weeks of consolidation, the crypto market has shown signs of a decisive breakout. On-chain data suggests that this rally is different from the retail-driven surges of 2021.
           </p>

           <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
           </p>

           <h3>The Institutional Shift</h3>
           <p>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.
           </p>
           
           <blockquote className="border-l-4 border-gold pl-6 italic text-ink text-xl my-8 bg-surface p-6 rounded-r-xl">
              "We are seeing unprecedented inflows into spot ETFs, signaling a maturation of the asset class." — <span className="not-italic font-bold block mt-2 text-sm">- Larry Fink, CEO of BlackRock</span>
           </blockquote>

           <h3>Looking Ahead</h3>
           <p>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.
           </p>
        </article>

        {/* Tags */}
        <div className="mt-12 flex flex-wrap gap-2">
           {['Bitcoin', 'ETFs', 'Market Analysis', 'Institutional', 'BlackRock'].map(tag => (
              <span key={tag} className="bg-surface border border-borderSubtle text-inkLight text-sm font-semibold px-4 py-1.5 rounded-full hover:bg-gold hover:text-white hover:border-gold transition-colors cursor-pointer">
                 #{tag}
              </span>
           ))}
        </div>
      </div>
    </div>
  );
};
