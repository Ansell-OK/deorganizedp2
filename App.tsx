
import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Sponsors } from './components/Sponsors';
import { UpcomingShows } from './components/UpcomingShows';
import { UpcomingEvents } from './components/UpcomingEvents';
import { CreatorBanner } from './components/CreatorBanner';
import { CreatorSpotlight } from './components/CreatorSpotlight';
import { EarnPointsBanner } from './components/EarnPointsBanner';
import { NewsGrid } from './components/NewsGrid';
import { Footer } from './components/Footer';
import { ShowsDiscovery } from './components/ShowsDiscovery';
import { EventsDiscovery } from './components/EventsDiscovery';
import { CreatorsDiscovery } from './components/CreatorsDiscovery';
import { Newsroom } from './components/Newsroom';
import { CreatorDashboard } from './components/CreatorDashboard';
import { UserDashboard } from './components/UserDashboard';
import { NewsDetail } from './components/NewsDetail';
import { ShowDetail } from './components/ShowDetail';
import { EventDetail } from './components/EventDetail';
import { CreatorDetail } from './components/CreatorDetail';

type PageView = 'home' | 'shows' | 'events' | 'creators' | 'news' | 'dashboard' | 'user-profile' | 'news-detail' | 'show-detail' | 'event-detail' | 'creator-detail';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<PageView>('home');
  const [selectedId, setSelectedId] = useState<string | number | null>(null);

  // Enhanced navigation handler
  const handleNavigate = (page: string, id?: string | number) => {
    setCurrentView(page as PageView);
    if (id) setSelectedId(id);
    window.scrollTo(0, 0);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'user-profile':
        return <UserDashboard />;
      case 'dashboard':
        return <CreatorDashboard />;
        
      // Discovery Pages
      case 'shows':
        return <ShowsDiscovery onNavigate={handleNavigate} />;
      case 'events':
        return <EventsDiscovery onNavigate={handleNavigate} />;
      case 'creators':
        return <CreatorsDiscovery onNavigate={handleNavigate} />;
      case 'news':
        return <Newsroom onNavigate={handleNavigate} />;
        
      // Detail Pages
      case 'news-detail':
        return <NewsDetail onNavigate={handleNavigate} />;
      case 'show-detail':
        return <ShowDetail onNavigate={handleNavigate} />;
      case 'event-detail':
        return <EventDetail onNavigate={handleNavigate} />;
      case 'creator-detail':
        return <CreatorDetail onNavigate={handleNavigate} />;
        
      case 'home':
      default:
        return (
          <>
            <Hero />
            <Sponsors />
            
            {/* Editorial & Shows Section */}
            <section className="py-20 relative z-10">
              <UpcomingShows onNavigate={handleNavigate} />
            </section>

            {/* Community & Ecosystem */}
            <section className="py-12 space-y-24 container mx-auto px-6 max-w-[1280px]">
              <CreatorBanner />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                 <UpcomingEvents onNavigate={handleNavigate} />
                 <CreatorSpotlight onNavigate={handleNavigate} />
              </div>
              <EarnPointsBanner />
            </section>

            {/* Latest News */}
            <section className="py-20 bg-surface border-t border-borderSubtle">
              <NewsGrid onNavigate={handleNavigate} />
            </section>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-canvas font-sans selection:bg-gold/20 selection:text-ink overflow-x-hidden text-ink">
      <Navbar onNavigate={handleNavigate} currentPage={currentView} />
      <main>
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
