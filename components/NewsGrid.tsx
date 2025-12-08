
import React from 'react';
import { Tag } from 'lucide-react';

interface NewsGridProps {
  onNavigate?: (page: string, id?: string | number) => void;
}

const articles = [
  {
    id: 1,
    category: "Market",
    title: "Bitcoin breaks key resistance level as institutional inflows surge",
    excerpt: "The latest ETF data shows a massive uptick in accumulation wallets.",
    author: "Elena R.",
    time: "2h ago",
    image: "https://picsum.photos/400/250?random=20"
  },
  {
    id: 2,
    category: "Technology",
    title: "Zero-Knowledge Rollups: The End of High Gas Fees?",
    excerpt: "New benchmarks suggest ZK-rollups are finally ready for mass adoption.",
    author: "Dev Guy",
    time: "4h ago",
    image: "https://picsum.photos/400/250?random=21"
  },
  {
    id: 3,
    category: "Regulation",
    title: "EU passes comprehensive crypto asset framework",
    excerpt: "What MiCA means for DeFi protocols operating in Europe.",
    author: "Policy Team",
    time: "5h ago",
    image: "https://picsum.photos/400/250?random=22"
  },
  {
    id: 4,
    category: "NFTs",
    title: "Blue chip collections floor prices stabilize after volatile week",
    excerpt: "Market analysis of the top 10 collections by volume.",
    author: "J. Peg",
    time: "8h ago",
    image: "https://picsum.photos/400/250?random=23"
  },
  {
    id: 5,
    category: "Mining",
    title: "Sustainable mining initiatives gain traction in North America",
    excerpt: "How miners are utilizing wasted flare gas to power the network.",
    author: "Green Block",
    time: "12h ago",
    image: "https://picsum.photos/400/250?random=24"
  },
  {
    id: 6,
    category: "Security",
    title: "Bridge exploit patched: 90% of funds recovered",
    excerpt: "Whitehat hackers assist in recovering stolen assets from the Nomad bridge.",
    author: "Securitron",
    time: "1d ago",
    image: "https://picsum.photos/400/250?random=25"
  }
];

export const NewsGrid: React.FC<NewsGridProps> = ({ onNavigate }) => {
  const handleClick = (id: number) => {
    if (onNavigate) onNavigate('news-detail', id);
  };

  return (
    <div className="container max-w-[1280px] mx-auto px-6">
       <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-ink mb-2">Latest Insights</h2>
          <p className="text-inkLight font-medium">Deep dives from our editorial team.</p>
        </div>
        <div className="flex gap-2">
           {['All', 'Market', 'Tech', 'Policy'].map(cat => (
              <button key={cat} className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${cat === 'All' ? 'bg-ink text-white shadow-lg' : 'bg-white border border-borderSubtle text-inkLight hover:text-ink hover:border-gold'}`}>
                 {cat}
              </button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <article 
             key={article.id} 
             onClick={() => handleClick(article.id)}
             className="group cursor-pointer"
          >
             <div className="relative overflow-hidden rounded-2xl aspect-[16/9] mb-4 border border-borderSubtle shadow-sm">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                   <span className="bg-white/90 backdrop-blur text-gold text-xs font-bold px-3 py-1 rounded-full border border-gold/20 shadow-sm">
                      {article.category}
                   </span>
                </div>
             </div>
             
             <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-inkLight font-medium">
                   <span className="text-gold">{article.author}</span>
                   <span>•</span>
                   <span>{article.time}</span>
                </div>
                <h3 className="text-xl font-bold text-ink group-hover:text-gold transition-colors leading-tight">
                   {article.title}
                </h3>
                <p className="text-inkLight text-sm line-clamp-2">
                   {article.excerpt}
                </p>
                <div className="flex items-center gap-2 text-xs font-bold text-ink/60 group-hover:text-ink transition-colors">
                   <Tag className="w-3 h-3" />
                   <span>Read Article</span>
                </div>
             </div>
          </article>
        ))}
      </div>
    </div>
  );
};
