
import React, { useState } from 'react';
import { Search, Calendar, MapPin, Users, Filter, ArrowUpRight, Ticket } from 'lucide-react';
import { motion } from 'framer-motion';

interface EventsDiscoveryProps {
  onNavigate?: (page: string, id?: string | number) => void;
}

const categories = ["All", "Conferences", "Meetups", "Hackathons", "Parties", "Virtual"];

const events = [
  {
    id: 1,
    title: "Deorganized Global Summit 2024",
    date: { month: "DEC", day: "12" },
    time: "09:00 AM - 06:00 PM",
    location: "Miami Beach Convention Center",
    type: "Conference",
    image: "https://picsum.photos/800/600?random=50",
    attendees: "2.5k+",
    price: "$299",
    featured: true
  },
  {
    id: 2,
    title: "Ethereum Builder's Workshop",
    date: { month: "DEC", day: "15" },
    time: "10:00 AM - 04:00 PM",
    location: "Denver, CO",
    type: "Hackathon",
    image: "https://picsum.photos/800/600?random=51",
    attendees: "150",
    price: "Free",
    featured: false
  },
  {
    id: 3,
    title: "NFT NYC Afterparty",
    date: { month: "JAN", day: "20" },
    time: "08:00 PM - Late",
    location: "Brooklyn, NY",
    type: "Parties",
    image: "https://picsum.photos/800/600?random=52",
    attendees: "500+",
    price: "$50",
    featured: false
  },
  {
    id: 4,
    title: "DeFi Governance Roundtable",
    date: { month: "JAN", day: "25" },
    time: "02:00 PM EST",
    location: "Virtual Event",
    type: "Virtual",
    image: "https://picsum.photos/800/600?random=53",
    attendees: "1.2k",
    price: "Free",
    featured: false
  },
  {
    id: 5,
    title: "Bitcoin Halving Watch Party",
    date: { month: "APR", day: "18" },
    time: "06:00 PM - 10:00 PM",
    location: "Austin, TX",
    type: "Meetups",
    image: "https://picsum.photos/800/600?random=54",
    attendees: "300",
    price: "Free",
    featured: false
  },
  {
    id: 6,
    title: "Web3 Security Audit Masterclass",
    date: { month: "FEB", day: "05" },
    time: "11:00 AM EST",
    location: "Virtual Event",
    type: "Virtual",
    image: "https://picsum.photos/800/600?random=55",
    attendees: "800",
    price: "$99",
    featured: false
  }
];

export const EventsDiscovery: React.FC<EventsDiscoveryProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState("All");

  const handleEventClick = (id: number) => {
    if (onNavigate) onNavigate('event-detail', id);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 container max-w-[1280px] mx-auto px-6">
      
      {/* Featured Event Hero */}
      <section className="mb-20">
        <div 
           onClick={() => handleEventClick(1)}
           className="relative rounded-3xl overflow-hidden bg-white border border-borderSubtle shadow-soft group cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent z-10" />
          <div className="absolute inset-0 z-0">
             <img src="https://picsum.photos/1600/900?grayscale&blur=2" alt="Featured Event" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000" />
          </div>
          
          <div className="relative z-20 grid lg:grid-cols-2 gap-12 p-8 md:p-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-bold uppercase tracking-wider">
                 <Ticket className="w-3 h-3" /> Early Bird Tickets Available
              </div>
              
              <div className="space-y-2">
                <h1 className="text-4xl md:text-6xl font-bold text-ink leading-[1.1]">
                  Deorganized <br/><span className="text-gold">Global Summit</span>
                </h1>
                <p className="text-xl text-inkLight font-medium">Miami • December 12-14, 2024</p>
              </div>
              
              <p className="text-lg text-inkLight font-medium max-w-lg leading-relaxed">
                The largest gathering of crypto natives, creators, and builders. 3 days of alpha, networking, and celebration.
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="bg-gold-gradient text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-gold/20 hover:shadow-gold/40 hover:-translate-y-1 transition-all flex items-center gap-2">
                  Get Tickets
                  <ArrowUpRight className="w-5 h-5" />
                </button>
                <button className="bg-white border border-borderSubtle text-ink font-bold px-6 py-4 rounded-full hover:bg-surface hover:border-gold/30 transition-all shadow-sm">
                  View Agenda
                </button>
              </div>
            </div>

            {/* Event Stats / Visual */}
            <div className="hidden lg:flex flex-col gap-4 items-end">
                <div className="bg-white/50 backdrop-blur-xl border border-white/60 p-6 rounded-2xl shadow-xl max-w-sm w-full">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="flex -space-x-3">
                            {[1,2,3,4].map(i => (
                                <img key={i} src={`https://picsum.photos/50/50?random=${i}`} className="w-10 h-10 rounded-full border-2 border-white" />
                            ))}
                            <div className="w-10 h-10 rounded-full border-2 border-white bg-ink text-white flex items-center justify-center text-xs font-bold">+2k</div>
                        </div>
                        <div className="text-sm">
                            <p className="font-bold text-ink">2,500+ Attendees</p>
                            <p className="text-inkLight text-xs">Registered so far</p>
                        </div>
                    </div>
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gold w-[85%] rounded-full" />
                    </div>
                    <p className="text-right text-xs text-gold font-bold mt-2">85% Sold Out</p>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="mb-10 sticky top-24 z-30 bg-canvas/95 backdrop-blur-sm py-4 -mx-4 px-4 border-b border-borderSubtle/50">
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
           <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-inkLight" />
              <input 
                type="text" 
                placeholder="Search events, cities, or topics..." 
                className="w-full pl-12 pr-4 py-3 bg-surface border border-borderSubtle rounded-full text-sm font-medium focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
              />
           </div>
           
           <div className="w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              <div className="flex gap-2">
                 <button className="p-3 border border-borderSubtle rounded-full hover:bg-surface text-inkLight transition-colors">
                    <Filter className="w-5 h-5" />
                 </button>
                 {categories.map(cat => (
                    <button 
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                        activeCategory === cat 
                        ? 'bg-ink text-white shadow-md' 
                        : 'bg-white border border-borderSubtle text-inkLight hover:text-ink hover:border-gold/50'
                      }`}
                    >
                       {cat}
                    </button>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* Events List */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {events.map((event) => (
            <motion.div 
                key={event.id}
                onClick={() => handleEventClick(event.id)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group bg-white border border-borderSubtle rounded-3xl p-4 hover:shadow-soft hover:border-gold/30 transition-all duration-300 flex flex-col md:flex-row gap-6 items-start cursor-pointer"
            >
                {/* Date Badge & Image */}
                <div className="relative w-full md:w-48 aspect-[4/3] md:aspect-square shrink-0 rounded-2xl overflow-hidden">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute top-2 left-2 bg-white/95 backdrop-blur rounded-xl p-2 text-center min-w-[50px] shadow-sm">
                        <span className="block text-xs font-bold text-inkLight tracking-wider uppercase">{event.date.month}</span>
                        <span className="block text-xl font-bold text-ink">{event.date.day}</span>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 py-2 pr-2 flex flex-col h-full w-full">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold text-gold uppercase tracking-wide">{event.type}</span>
                        <span className="text-sm font-semibold text-ink bg-surface px-2 py-1 rounded-md border border-borderSubtle">{event.price}</span>
                    </div>

                    <h3 className="text-xl font-bold text-ink mb-2 leading-tight group-hover:text-gold transition-colors">{event.title}</h3>
                    
                    <div className="space-y-2 mt-auto">
                        <div className="flex items-center gap-2 text-sm text-inkLight font-medium">
                            <MapPin className="w-4 h-4 text-gold/80" />
                            {event.location}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-inkLight font-medium">
                            <Users className="w-4 h-4 text-gold/80" />
                            {event.attendees} Registered
                        </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-borderSubtle flex gap-3">
                        <button className="flex-1 bg-ink text-white text-sm font-bold py-2 rounded-lg hover:bg-gold transition-colors shadow-sm">
                            RSVP Now
                        </button>
                    </div>
                </div>
            </motion.div>
        ))}
      </section>
    </div>
  );
};
