
import React from 'react';
import { MapPin, ArrowUpRight } from 'lucide-react';

interface UpcomingEventsProps {
  onNavigate?: (page: string, id?: string | number) => void;
}

const events = [
  {
    id: 1,
    date: { month: 'NOV', day: '24' },
    title: "Bitcoin Miami Meetup",
    location: "Miami, FL",
    type: "Networking"
  },
  {
    id: 2,
    date: { month: 'DEC', day: '02' },
    title: "Deorganized Creator Summit",
    location: "Virtual",
    type: "Conference"
  },
  {
    id: 3,
    date: { month: 'DEC', day: '15' },
    title: "Web3 Builder Hackathon",
    location: "Austin, TX",
    type: "Hackathon"
  }
];

export const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ onNavigate }) => {
  const handleClick = (id: number) => {
    if (onNavigate) onNavigate('event-detail', id);
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold text-ink mb-6 flex items-center gap-2">
        <span className="w-1.5 h-8 bg-gold rounded-full block"></span>
        Upcoming Events
      </h2>
      
      <div className="flex flex-col gap-4">
        {events.map((event) => (
          <div 
             key={event.id} 
             onClick={() => handleClick(event.id)}
             className="bg-white border border-borderSubtle p-5 rounded-2xl flex items-center gap-6 group hover:border-gold/50 hover:shadow-soft transition-all cursor-pointer"
          >
             <div className="bg-surface rounded-xl p-3 min-w-[70px] text-center border border-borderSubtle group-hover:bg-gold group-hover:text-white group-hover:border-gold transition-colors duration-300">
                <span className="block text-xs font-bold tracking-wider opacity-80">{event.date.month}</span>
                <span className="block text-xl font-bold">{event.date.day}</span>
             </div>
             
             <div className="flex-1">
                <div className="text-xs text-gold mb-1 font-bold">{event.type}</div>
                <h3 className="text-ink font-bold text-lg leading-tight mb-1">{event.title}</h3>
                <div className="flex items-center gap-1 text-inkLight text-sm font-medium">
                   <MapPin className="w-3 h-3" />
                   {event.location}
                </div>
             </div>

             <div className="w-10 h-10 rounded-full border border-borderSubtle bg-surface flex items-center justify-center text-inkLight group-hover:bg-white group-hover:text-gold group-hover:shadow-sm transition-all">
                <ArrowUpRight className="w-5 h-5" />
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};
