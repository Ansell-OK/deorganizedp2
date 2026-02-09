
import React, { useState, useEffect } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { fetchUpcomingShows, Show } from '../lib/api';

interface UpcomingShowsProps {
  onNavigate?: (page: string, id?: string | number) => void;
}

export const UpcomingShows: React.FC<UpcomingShowsProps> = ({ onNavigate }) => {
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadShows = async () => {
      try {
        const data = await fetchUpcomingShows();
        setShows(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load shows');
      } finally {
        setLoading(false);
      }
    };
    loadShows();
  }, []);

  const handleClick = (slug: string) => {
    if (onNavigate) onNavigate('show-detail', slug);
  };

  const handleViewAll = () => {
    if (onNavigate) onNavigate('shows');
  };

  if (loading) {
    return (
      <div className="container max-w-[1280px] mx-auto px-6 py-12 text-center">
        <p className="text-inkLight">Loading shows...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container max-w-[1280px] mx-auto px-6 py-12 text-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (shows.length === 0) {
    return (
      <div className="container max-w-[1280px] mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-ink mb-2">Upcoming Shows</h2>
            <p className="text-inkLight font-medium">Schedule your viewing for the week.</p>
          </div>
        </div>
        <div className="text-center py-12 bg-surface rounded-3xl border border-borderSubtle">
          <p className="text-inkLight">No upcoming shows scheduled yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-[1280px] mx-auto px-6">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-ink mb-2">Upcoming Shows</h2>
          <p className="text-inkLight font-medium">Schedule your viewing for the week.</p>
        </div>
        <button onClick={handleViewAll} className="hidden md:block text-gold hover:text-gold/80 transition-colors text-sm font-bold">
          View Full Schedule &rarr;
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {shows.map((show) => (
          <div
            key={show.id}
            onClick={() => handleClick(show.slug)}
            className="group relative bg-canvas border border-borderSubtle rounded-3xl overflow-hidden hover:shadow-soft hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          >
            <div className="aspect-video relative overflow-hidden bg-surface">
              <img
                src={show.thumbnail || 'https://picsum.photos/400/300?grayscale'}
                alt={show.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://picsum.photos/400/300?grayscale';
                }}
              />
              <div className="absolute top-4 right-4 bg-canvas/90 backdrop-blur-md px-3 py-1 rounded-full border border-borderSubtle shadow-sm">
                <span className="text-xs font-bold text-gold uppercase">
                  {show.is_recurring ? 'Recurring' : 'Special'}
                </span>
              </div>
            </div>

            <div className="p-5">
              <h3 className="text-lg font-bold text-ink group-hover:text-gold transition-colors mb-2 line-clamp-1">{show.title}</h3>
              <div className="flex items-center gap-4 text-inkLight text-sm font-medium">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{show.schedule_display || 'No schedule set'}</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-borderSubtle flex items-center justify-between">
                <span className="text-sm text-inkLight">
                  Host: <span className="text-ink font-medium">{show.creator?.username || 'Unknown'}</span>
                </span>
                <button className="text-xs bg-surface border border-borderSubtle text-ink hover:bg-gold hover:text-white hover:border-gold px-3 py-1.5 rounded-full transition-colors font-medium">
                  Remind Me
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

