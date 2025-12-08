
import React, { useState } from 'react';
import { 
  User, Settings, DollarSign, TrendingUp, Calendar as CalendarIcon, 
  Plus, Users, Bell, Check, X, Clock, Video, 
  BarChart3, ArrowUpRight, MoreHorizontal, ChevronDown, Repeat,
  Heart, MessageSquare, Trophy, ChevronLeft, ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

export const CreatorDashboard: React.FC = () => {
  const [calendarView, setCalendarView] = useState<'month' | 'week'>('month');

  // Mock Calendar Data
  const days = Array.from({ length: 30 }, (_, i) => i + 1); // 30 days for Nov
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const scheduledShows = [
    { id: 1, day: 21, title: "Weekly Market Wrap-up", time: "5:00 PM", status: "Ready", color: "green" },
    { id: 2, day: 22, title: "Interview with Vitalik", time: "2:00 PM", status: "Scheduled", color: "blue" },
    { id: 3, day: 24, title: "Layer 2 Analysis", time: "10:00 AM", status: "Scheduled", color: "blue" },
    { id: 4, day: 28, title: "DeFi Deep Dive", time: "4:00 PM", status: "Draft", color: "gray" },
  ];

  const getShowForDay = (day: number) => scheduledShows.find(s => s.day === day);

  return (
    <div className="min-h-screen pt-24 pb-20 container max-w-[1024px] mx-auto px-6 space-y-8">
      
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold text-ink mb-2">Creator Studio</h1>
          <p className="text-inkLight font-medium">Manage your content, earnings, and community.</p>
        </div>
        <button className="hidden md:flex items-center gap-2 text-sm font-bold text-ink hover:text-gold transition-colors">
          <Settings className="w-4 h-4" /> Settings
        </button>
      </div>

      {/* 1. Profile Overview Card */}
      <section className="bg-white border border-borderSubtle rounded-3xl p-6 md:p-8 shadow-soft relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
          <div className="relative">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-surface shadow-md overflow-hidden">
              <img src="https://picsum.photos/300/300?random=88" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-1 right-1 bg-gold text-white p-1.5 rounded-full border-2 border-white shadow-sm">
              <Check className="w-4 h-4" />
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-ink flex items-center justify-center md:justify-start gap-2 mb-1">
              Sarah Blake <span className="bg-gold/10 text-gold text-xs px-2 py-0.5 rounded-full border border-gold/20 uppercase tracking-wider">Verified</span>
            </h2>
            <p className="text-inkLight font-medium mb-6">@sarah_defi • DeFi Educator & Analyst</p>
            
            <div className="grid grid-cols-3 gap-4 md:gap-12 border-t border-borderSubtle pt-6">
              <div>
                <div className="text-2xl font-bold text-ink">85.4k</div>
                <div className="text-xs text-inkLight font-bold uppercase tracking-wide">Followers</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-ink">1.2M</div>
                <div className="text-xs text-inkLight font-bold uppercase tracking-wide">Total Views</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-ink">4.8/5</div>
                <div className="text-xs text-inkLight font-bold uppercase tracking-wide">Rating</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 min-w-[160px]">
             <button className="bg-ink text-white font-bold py-2.5 rounded-xl hover:bg-gold transition-colors shadow-sm">
                Edit Profile
             </button>
             <button className="bg-white border border-borderSubtle text-ink font-bold py-2.5 rounded-xl hover:bg-surface transition-colors">
                View Channel
             </button>
          </div>
        </div>
        
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      </section>

      {/* 2. Earnings Summary */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Earnings Card */}
        <div className="md:col-span-2 bg-ink text-white rounded-3xl p-8 relative overflow-hidden shadow-soft flex flex-col justify-between min-h-[240px]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold rounded-full opacity-10 blur-[60px]" />
          
          <div className="relative z-10 flex justify-between items-start">
            <div>
              <p className="text-white/60 font-medium mb-1 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-gold" /> Total Earnings (This Month)
              </p>
              <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
                $12,450<span className="text-white/40">.00</span>
              </h3>
              <div className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full text-sm font-medium text-green-300">
                <TrendingUp className="w-3 h-3" /> +18.4% vs last month
              </div>
            </div>
            <button className="bg-gold text-white p-3 rounded-full hover:bg-white hover:text-ink transition-colors shadow-lg">
               <ArrowUpRight className="w-6 h-6" />
            </button>
          </div>

          <div className="relative z-10 grid grid-cols-4 gap-4 items-end h-24 mt-8">
            {[40, 65, 45, 80, 55, 90, 70, 100].map((h, i) => (
              <div key={i} className="w-full bg-white/10 rounded-t-lg relative group">
                <div 
                  className="absolute bottom-0 w-full bg-gold rounded-t-lg transition-all duration-500"
                  style={{ height: `${h}%` }}
                />
                <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-ink text-xs font-bold px-2 py-1 rounded shadow-sm transition-opacity">
                   ${h * 10}0
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action / Breakdown */}
        <div className="bg-white border border-borderSubtle rounded-3xl p-6 shadow-soft flex flex-col justify-center gap-4">
           <h3 className="font-bold text-ink text-lg">Revenue Sources</h3>
           <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                 <span className="text-inkLight font-medium flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gold" /> Subscriptions
                 </span>
                 <span className="font-bold text-ink">$8,200</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                 <span className="text-inkLight font-medium flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-ink" /> Tips
                 </span>
                 <span className="font-bold text-ink">$3,150</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                 <span className="text-inkLight font-medium flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gray-300" /> Sponsors
                 </span>
                 <span className="font-bold text-ink">$1,100</span>
              </div>
           </div>
           <button className="mt-2 w-full border border-borderSubtle rounded-xl py-3 text-sm font-bold text-ink hover:bg-surface transition-colors">
              View Analytics
           </button>
        </div>
      </section>

      {/* 3. Show Scheduler */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Create Show Form */}
        <div className="bg-white border border-borderSubtle rounded-3xl p-6 shadow-soft h-fit">
           <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-gold/10 rounded-lg text-gold">
                 <CalendarIcon className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-ink">Schedule Show</h3>
           </div>
           
           <form className="space-y-4">
              <div>
                 <label className="block text-xs font-bold text-inkLight uppercase tracking-wide mb-2">Show Title</label>
                 <input type="text" placeholder="e.g. DeFi Deep Dive" className="w-full bg-surface border border-borderSubtle rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-gold transition-colors" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-xs font-bold text-inkLight uppercase tracking-wide mb-2">Date</label>
                    <input type="date" className="w-full bg-surface border border-borderSubtle rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-gold transition-colors" />
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-inkLight uppercase tracking-wide mb-2">Time (EST)</label>
                    <input type="time" className="w-full bg-surface border border-borderSubtle rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-gold transition-colors" />
                 </div>
              </div>

              {/* Recurrence Dropdown */}
              <div>
                 <label className="block text-xs font-bold text-inkLight uppercase tracking-wide mb-2 flex items-center gap-1">
                    <Repeat className="w-3 h-3" /> Recurrence
                 </label>
                 <div className="relative">
                    <select className="w-full appearance-none bg-surface border border-borderSubtle rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-gold transition-colors text-ink cursor-pointer">
                        <option value="none">None (One-time)</option>
                        <option value="weekly">Weekly</option>
                        <option value="biweekly">Bi-Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="custom">Custom...</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-inkLight pointer-events-none" />
                 </div>
              </div>

              <div>
                 <label className="block text-xs font-bold text-inkLight uppercase tracking-wide mb-2">Guest Email (Optional)</label>
                 <div className="flex gap-2">
                    <input type="email" placeholder="guest@example.com" className="w-full bg-surface border border-borderSubtle rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-gold transition-colors" />
                    <button type="button" className="bg-surface border border-borderSubtle rounded-xl px-3 hover:bg-gold hover:text-white hover:border-gold transition-colors">
                       <Plus className="w-5 h-5" />
                    </button>
                 </div>
              </div>

              <button className="w-full bg-gold-gradient text-white font-bold py-3.5 rounded-xl shadow-lg shadow-gold/20 hover:shadow-gold/40 hover:-translate-y-0.5 transition-all mt-2">
                 Schedule Event
              </button>
           </form>
        </div>

        {/* Calendar / Upcoming List - UPDATED */}
        <div className="lg:col-span-2 bg-white border border-borderSubtle rounded-3xl p-6 shadow-soft flex flex-col min-h-[500px]">
           <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <div className="flex items-center gap-4">
                 <h3 className="text-xl font-bold text-ink">Content Calendar</h3>
                 <div className="flex items-center gap-2 bg-surface border border-borderSubtle rounded-lg p-1">
                    <button 
                      onClick={() => setCalendarView('month')}
                      className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${calendarView === 'month' ? 'bg-white text-ink shadow-sm' : 'text-inkLight hover:text-ink'}`}
                    >
                      Month
                    </button>
                    <button 
                      onClick={() => setCalendarView('week')}
                      className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${calendarView === 'week' ? 'bg-white text-ink shadow-sm' : 'text-inkLight hover:text-ink'}`}
                    >
                      Week
                    </button>
                 </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm font-bold text-ink">
                 <button className="p-1 hover:bg-surface rounded-full"><ChevronLeft className="w-4 h-4" /></button>
                 <span>November 2024</span>
                 <button className="p-1 hover:bg-surface rounded-full"><ChevronRight className="w-4 h-4" /></button>
              </div>
           </div>
           
           {calendarView === 'month' ? (
             <div className="flex-1">
                <div className="grid grid-cols-7 mb-2">
                   {weekDays.map(d => (
                      <div key={d} className="text-center text-xs font-bold text-inkLight uppercase tracking-wider py-2">
                         {d}
                      </div>
                   ))}
                </div>
                <div className="grid grid-cols-7 grid-rows-5 gap-2 h-full min-h-[300px]">
                   {/* Empty slots for start of month (assuming Nov starts on Fri for display purposes) */}
                   {Array.from({length: 5}).map((_, i) => <div key={`empty-${i}`} className="bg-transparent hidden md:block" />)}
                   
                   {days.map((day) => {
                      const show = getShowForDay(day);
                      return (
                        <div key={day} className="relative bg-surface border border-borderSubtle rounded-xl p-2 min-h-[60px] md:min-h-[80px] hover:border-gold/30 transition-colors group">
                           <span className={`text-xs font-bold ${show ? 'text-ink' : 'text-inkLight/50'}`}>{day}</span>
                           {show && (
                              <div className={`mt-1 p-1.5 rounded-lg text-[10px] font-bold border truncate cursor-pointer shadow-sm
                                ${show.status === 'Ready' ? 'bg-green-50 text-green-700 border-green-200' : 
                                  show.status === 'Draft' ? 'bg-gray-100 text-gray-600 border-gray-200' : 
                                  'bg-blue-50 text-blue-600 border-blue-200'}`}
                              >
                                 <div className="truncate hidden md:block">{show.time}</div>
                                 <div className="truncate">{show.title}</div>
                              </div>
                           )}
                        </div>
                      );
                   })}
                </div>
             </div>
           ) : (
             <div className="flex-1 space-y-3">
                {/* Week View List */}
                {scheduledShows.map((show) => (
                   <div key={show.id} className="flex items-center gap-4 p-4 border border-borderSubtle rounded-xl bg-surface/30 hover:bg-white hover:shadow-sm transition-all">
                      <div className="flex flex-col items-center justify-center w-14 h-14 bg-white border border-borderSubtle rounded-xl shadow-sm">
                         <span className="text-xs font-bold text-inkLight uppercase">Nov</span>
                         <span className="text-lg font-bold text-ink">{show.day}</span>
                      </div>
                      <div className="flex-1">
                         <div className="flex justify-between items-start">
                            <h4 className="font-bold text-ink">{show.title}</h4>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border
                                ${show.status === 'Ready' ? 'bg-green-50 text-green-700 border-green-200' : 
                                  show.status === 'Draft' ? 'bg-gray-100 text-gray-600 border-gray-200' : 
                                  'bg-blue-50 text-blue-600 border-blue-200'}`}
                            >
                               {show.status}
                            </span>
                         </div>
                         <div className="flex items-center gap-4 mt-1 text-xs text-inkLight font-medium">
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {show.time}</span>
                            <span className="flex items-center gap-1"><Video className="w-3 h-3" /> Live Stream</span>
                         </div>
                      </div>
                   </div>
                ))}
                <button className="w-full py-3 border border-dashed border-borderSubtle rounded-xl text-inkLight text-sm font-bold hover:text-gold hover:border-gold transition-colors flex items-center justify-center gap-2">
                   <Plus className="w-4 h-4" /> Add Event to Week
                </button>
             </div>
           )}
        </div>
      </section>

      {/* 4. Guest Requests & Notifications */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
         {/* Guest Requests */}
         <div className="bg-white border border-borderSubtle rounded-3xl p-6 shadow-soft h-full">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                 <Users className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-ink">Guest Requests</h3>
              <span className="bg-gold text-white text-xs font-bold px-2 py-0.5 rounded-full ml-auto">3 New</span>
           </div>

           <div className="space-y-4">
              {[
                 { name: "Alex Hormozi", topic: "Content Strategy", avatar: "https://picsum.photos/100/100?random=5" },
                 { name: "Cathie Wood", topic: "ETF Approvals", avatar: "https://picsum.photos/100/100?random=6" }
              ].map((req, i) => (
                 <div key={i} className="flex items-center gap-4 p-4 border border-borderSubtle rounded-2xl bg-surface/50">
                    <img src={req.avatar} alt={req.name} className="w-10 h-10 rounded-full" />
                    <div className="flex-1">
                       <h4 className="text-sm font-bold text-ink">{req.name}</h4>
                       <p className="text-xs text-inkLight">Wants to discuss: <span className="font-medium">{req.topic}</span></p>
                    </div>
                    <div className="flex gap-2">
                       <button className="w-8 h-8 rounded-full bg-white border border-borderSubtle flex items-center justify-center text-red-500 hover:bg-red-50 hover:border-red-200 transition-colors">
                          <X className="w-4 h-4" />
                       </button>
                       <button className="w-8 h-8 rounded-full bg-ink text-white flex items-center justify-center hover:bg-green-500 transition-colors shadow-sm">
                          <Check className="w-4 h-4" />
                       </button>
                    </div>
                 </div>
              ))}
           </div>
         </div>

         {/* Notifications Feed */}
         <div className="bg-white border border-borderSubtle rounded-3xl p-6 shadow-soft h-full flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                 <Bell className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-ink">Notifications</h3>
              <button className="ml-auto text-xs font-bold text-inkLight hover:text-ink">Mark all read</button>
           </div>

           <div className="space-y-4 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
              {[
                 { type: 'milestone', title: "New Milestone", msg: "You hit 85k subscribers!", time: "2h ago", icon: Trophy, color: "text-yellow-600 bg-yellow-50" },
                 { type: 'like', title: "New Likes", msg: "Your video 'DeFi 101' received 500+ likes", time: "3h ago", icon: Heart, color: "text-red-500 bg-red-50" },
                 { type: 'comment', title: "New Comment", msg: "Vitalik_fan commented: 'Great analysis!'", time: "4h ago", icon: MessageSquare, color: "text-blue-500 bg-blue-50" },
                 { type: 'reminder', title: "Show Reminder", msg: "'Weekly Market Wrap-up' starts in 3h", time: "5h ago", icon: Clock, color: "text-purple-500 bg-purple-50" },
                 { type: 'system', title: "System", msg: "Payout processed: $4,200", time: "1d ago", icon: DollarSign, color: "text-green-600 bg-green-50" },
              ].map((notif, i) => (
                 <div key={i} className="flex gap-4 p-3 rounded-2xl hover:bg-surface transition-colors cursor-pointer group">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-white shadow-sm ${notif.color}`}>
                       <notif.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                       <div className="flex justify-between items-start w-full">
                          <h4 className="text-sm font-bold text-ink group-hover:text-gold transition-colors">{notif.title}</h4>
                          <span className="text-[10px] text-inkLight font-semibold whitespace-nowrap">{notif.time}</span>
                       </div>
                       <p className="text-xs text-inkLight mt-0.5 leading-relaxed">{notif.msg}</p>
                    </div>
                 </div>
              ))}
           </div>
         </div>
      </section>

    </div>
  );
};
