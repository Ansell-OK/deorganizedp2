
import React, { useState } from 'react';
import { Clock, Tag, TrendingUp, ChevronRight, Share2, Bookmark, Search, User } from 'lucide-react';
import { motion } from 'framer-motion';

interface NewsroomProps {
  onNavigate?: (page: string, id?: string | number) => void;
}

const categories = ["All", "Markets", "Policy", "Technology", "Culture", "Mining", "Opinion"];

const featuredArticle = {
  id: 1,
  title: "The Great Decoupling: How Bitcoin is Breaking Away from Traditional Equities",
  excerpt: "As the S&P 500 faces headwinds, crypto assets are showing surprising resilience. We analyze the on-chain data suggesting a new paradigm.",
  author: "Elena R.",
  time: "2 hours ago",
  category: "Markets",
  image: "https://picsum.photos/1200/800?random=101",
  readTime: "8 min read"
};

const subFeatured = [
  {
    id: 2,
    title: "Validator Economics 2.0: EIP-4844 Explained",
    category: "Technology",
    time: "4 hours ago",
    image: "https://picsum.photos/600/400?random=102"
  },
  {
    id: 3,
    title: "SEC vs DeFi: The Battle for the Future of Finance",
    category: "Policy",
    time: "6 hours ago",
    image: "https://picsum.photos/600/400?random=103"
  }
];

const latestNews = [
  {
    id: 4,
    title: "Solana Mobile announces Saga Chapter 2 pre-orders hit 100k",
    excerpt: "The surprising success of the crypto-native phone continues as demand outstrips supply.",
    author: "Tech Desk",
    category: "Technology",
    time: "1 hour ago",
    image: "https://picsum.photos/400/300?random=104"
  },
  {
    id: 5,
    title: "BlackRock CEO Larry Fink: 'Tokenization is the Next Generation for Markets'",
    excerpt: "In a recent interview, the head of the world's largest asset manager doubled down on his crypto thesis.",
    author: "Market Watch",
    category: "Markets",
    time: "3 hours ago",
    image: "https://picsum.photos/400/300?random=105"
  },
  {
    id: 6,
    title: "NFT Royalty Wars: OpenSea vs Blur final showdown",
    excerpt: "How creator royalties are being reshaped by fierce marketplace competition.",
    author: "J. Peg",
    category: "Culture",
    time: "5 hours ago",
    image: "https://picsum.photos/400/300?random=106"
  },
  {
    id: 7,
    title: "New ZK-EVM Rollup launches mainnet alpha",
    excerpt: "Scalability solutions are heating up. Here is what you need to know about the latest contender.",
    author: "Dev Guy",
    category: "Technology",
    time: "8 hours ago",
    image: "https://picsum.photos/400/300?random=107"
  }
];

const trending = [
  { id: 1, title: "Bitcoin Halving Countdown: 30 Days Left" },
  { id: 2, title: "Top 5 Airdrops to Watch in Q4" },
  { id: 3, title: "Coinbase Earnings Beat Expectations" },
  { id: 4, title: "Vitalik's New Roadmap for 2025" },
  { id: 5, title: "Memecoin Mania: Is it Over?" }
];

export const Newsroom: React.FC<NewsroomProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState("All");

  const handleArticleClick = (id: number) => {
    if (onNavigate) onNavigate('news-detail', id);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 container max-w-[1280px] mx-auto px-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-borderSubtle pb-6">
        <div>
          <h1 className="text-5xl md:text-6xl font-bold text-ink mb-4 tracking-tighter">
            The <span className="text-gold">Wire</span>
          </h1>
          <p className="text-xl text-inkLight font-medium max-w-xl">
            Unfiltered intelligence from the crypto frontier. News, analysis, and expert commentary.
          </p>
        </div>
        <div className="mt-6 md:mt-0 w-full md:w-auto">
           <div className="relative">
              <input 
                type="text" 
                placeholder="Search articles..." 
                className="w-full md:w-64 pl-10 pr-4 py-3 bg-surface border border-borderSubtle rounded-full text-sm font-medium focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-inkLight" />
           </div>
        </div>
      </div>

      {/* Featured Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Main Hero Article */}
        <div 
           onClick={() => handleArticleClick(featuredArticle.id)}
           className="lg:col-span-8 group cursor-pointer"
        >
           <div className="relative rounded-3xl overflow-hidden aspect-[16/9] mb-6 border border-borderSubtle shadow-soft">
              <img src={featuredArticle.image} alt={featuredArticle.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-0 left-0 p-8 w-full">
                 <div className="flex items-center gap-3 mb-3">
                    <span className="bg-gold text-white text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider">{featuredArticle.category}</span>
                    <span className="text-white/80 text-xs font-bold flex items-center gap-1">
                       <Clock className="w-3 h-3" /> {featuredArticle.time}
                    </span>
                 </div>
                 <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight group-hover:text-gold transition-colors">
                    {featuredArticle.title}
                 </h2>
                 <p className="text-white/80 line-clamp-2 md:w-3/4 mb-4 font-medium">
                    {featuredArticle.excerpt}
                 </p>
                 <div className="flex items-center gap-2 text-white/90 text-sm font-semibold">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                       <User className="w-3 h-3" />
                    </div>
                    {featuredArticle.author} · {featuredArticle.readTime}
                 </div>
              </div>
           </div>
        </div>

        {/* Sub Featured Side Stack */}
        <div className="lg:col-span-4 flex flex-col gap-8">
           {subFeatured.map((article) => (
              <div 
                 key={article.id} 
                 onClick={() => handleArticleClick(article.id)}
                 className="group cursor-pointer flex-1 flex flex-col"
              >
                 <div className="relative rounded-2xl overflow-hidden aspect-[3/2] mb-4 border border-borderSubtle shadow-sm">
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute top-3 left-3">
                       <span className="bg-white/90 backdrop-blur text-xs font-bold text-ink px-2 py-1 rounded-md shadow-sm border border-borderSubtle">
                          {article.category}
                       </span>
                    </div>
                 </div>
                 <div>
                    <h3 className="text-xl font-bold text-ink mb-2 leading-tight group-hover:text-gold transition-colors">
                       {article.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-inkLight font-semibold">
                       <Clock className="w-3 h-3" /> {article.time}
                    </div>
                 </div>
              </div>
           ))}
        </div>
      </div>

      {/* Sticky Categories */}
      <div className="sticky top-24 z-30 bg-canvas/95 backdrop-blur-sm py-4 mb-12 border-y border-borderSubtle/50">
         <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-8 min-w-max px-2">
               {categories.map((cat) => (
                  <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-sm font-bold uppercase tracking-wider pb-1 transition-all ${
                       activeCategory === cat 
                       ? 'text-gold border-b-2 border-gold' 
                       : 'text-inkLight hover:text-ink border-b-2 border-transparent'
                    }`}
                  >
                     {cat}
                  </button>
               ))}
            </div>
         </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
         
         {/* Vertical Feed */}
         <div className="lg:col-span-8 space-y-12">
            {latestNews.map((news) => (
               <motion.article 
                 key={news.id}
                 onClick={() => handleArticleClick(news.id)}
                 initial={{ opacity: 0, y: 10 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="group flex flex-col md:flex-row gap-6 md:gap-8 border-b border-borderSubtle pb-12 last:border-0 cursor-pointer"
               >
                  <div className="md:w-1/3 aspect-[4/3] rounded-2xl overflow-hidden border border-borderSubtle shadow-sm shrink-0">
                     <img src={news.image} alt={news.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                     <div className="flex items-center gap-3 mb-3">
                        <span className="text-gold text-xs font-bold uppercase tracking-wider">{news.category}</span>
                        <span className="text-inkLight/40 text-xs">•</span>
                        <span className="text-inkLight text-xs font-semibold">{news.time}</span>
                     </div>
                     <h3 className="text-2xl font-bold text-ink mb-3 leading-tight group-hover:text-gold transition-colors cursor-pointer">
                        {news.title}
                     </h3>
                     <p className="text-inkLight font-medium mb-4 leading-relaxed line-clamp-2">
                        {news.excerpt}
                     </p>
                     <div className="flex items-center justify-between mt-auto">
                        <span className="text-xs font-bold text-ink flex items-center gap-1">
                           By {news.author}
                        </span>
                        <div className="flex gap-4">
                           <button className="text-inkLight hover:text-gold transition-colors"><Bookmark className="w-4 h-4" /></button>
                           <button className="text-inkLight hover:text-gold transition-colors"><Share2 className="w-4 h-4" /></button>
                        </div>
                     </div>
                  </div>
               </motion.article>
            ))}

            <div className="text-center pt-8">
               <button className="bg-white border border-borderSubtle text-ink font-bold px-10 py-4 rounded-full hover:bg-gold hover:text-white hover:border-gold transition-all shadow-sm">
                  Load More Articles
               </button>
            </div>
         </div>

         {/* Sidebar */}
         <div className="lg:col-span-4 space-y-12">
            
            {/* Trending Widget */}
            <div className="bg-surface rounded-3xl p-8 border border-borderSubtle">
               <div className="flex items-center gap-2 mb-6">
                  <TrendingUp className="w-5 h-5 text-gold" />
                  <h4 className="text-lg font-bold text-ink">Trending Now</h4>
               </div>
               <div className="space-y-6">
                  {trending.map((item, idx) => (
                     <div key={item.id} className="flex gap-4 group cursor-pointer" onClick={() => handleArticleClick(item.id)}>
                        <span className="text-2xl font-bold text-borderSubtle group-hover:text-gold transition-colors">0{idx + 1}</span>
                        <p className="font-bold text-ink text-sm leading-snug group-hover:text-gold transition-colors">
                           {item.title}
                        </p>
                     </div>
                  ))}
               </div>
            </div>

            {/* Newsletter Widget */}
            <div className="bg-ink text-white rounded-3xl p-8 relative overflow-hidden">
               <div className="absolute -right-10 -top-10 w-40 h-40 bg-gold rounded-full opacity-20 blur-[50px]" />
               <div className="relative z-10">
                  <h4 className="text-2xl font-bold mb-2">The Daily Brief</h4>
                  <p className="text-white/70 text-sm font-medium mb-6">
                     Get the top stories and market insights delivered to your inbox every morning.
                  </p>
                  <input 
                     type="email" 
                     placeholder="Your email address" 
                     className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/40 mb-3 focus:outline-none focus:border-gold"
                  />
                  <button className="w-full bg-gold text-white font-bold py-3 rounded-lg text-sm hover:brightness-110 transition-all">
                     Subscribe Free
                  </button>
               </div>
            </div>

            {/* Tags Cloud */}
            <div>
               <h4 className="text-sm font-bold text-ink mb-4 uppercase tracking-wider">Popular Tags</h4>
               <div className="flex flex-wrap gap-2">
                  {["#Bitcoin", "#Ethereum", "#Regulation", "#NFTs", "#Metaverse", "#DeFi", "#Web3", "#Gaming"].map(tag => (
                     <span key={tag} className="text-xs font-bold text-inkLight bg-surface border border-borderSubtle px-3 py-1.5 rounded-full hover:bg-gold hover:text-white hover:border-gold transition-all cursor-pointer">
                        {tag}
                     </span>
                  ))}
               </div>
            </div>

         </div>
      </div>

    </div>
  );
};
