import React from 'react';
import { Twitter, Linkedin, Youtube, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
   return (
      <footer className="bg-canvas border-t border-borderSubtle pt-20 pb-10">
         <div className="container max-w-[1280px] mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

               {/* Brand */}
               <div className="space-y-6">
                  <div className="flex items-center gap-3">
                     <img
                        src="/logo.png"
                        alt="Deorganized Logo"
                        className="h-8 w-auto"
                        onError={(e) => {
                           e.currentTarget.style.display = 'none';
                        }}
                     />
                     <span className="text-xl font-bold text-ink tracking-tight hidden">
                        De<span className="text-gold">organized</span>
                     </span>
                  </div>
                  <p className="text-inkLight text-sm leading-relaxed font-medium">
                     The home for Web3 creator content. Empowering creators to build, share, and monetize their expertise.
                  </p>
                  <div className="flex gap-4">
                     {[Twitter, Linkedin, Youtube].map((Icon, i) => (
                        <a key={i} href="#" className="w-10 h-10 rounded-full bg-surface border border-borderSubtle flex items-center justify-center text-inkLight hover:bg-gold hover:text-white hover:border-gold transition-all shadow-sm">
                           <Icon className="w-5 h-5" />
                        </a>
                     ))}
                  </div>
               </div>

               {/* Links */}
               <div>
                  <h4 className="text-ink font-bold mb-6">Platform</h4>
                  <ul className="space-y-4 text-sm text-inkLight font-medium">
                     {['Shows', 'Creators'].map(item => (
                        <li key={item}><a href="#" className="hover:text-gold transition-colors">{item}</a></li>
                     ))}
                  </ul>
               </div>

               <div>
                  <h4 className="text-ink font-bold mb-6">Resources</h4>
                  <ul className="space-y-4 text-sm text-inkLight font-medium">
                     {['About', 'Privacy Policy', 'Terms of Service'].map(item => (
                        <li key={item}><a href="#" className="hover:text-gold transition-colors">{item}</a></li>
                     ))}
                  </ul>
               </div>
            </div>

            <div className="pt-8 border-t border-borderSubtle flex flex-col md:flex-row justify-between items-center gap-4">
               <p className="text-xs text-inkLight font-medium">© 2024 Deorganized Media Inc. All rights reserved.</p>
               <div className="flex gap-6 text-xs text-inkLight font-medium">
                  <a href="#" className="hover:text-gold">Privacy</a>
                  <a href="#" className="hover:text-gold">Cookies</a>
                  <a href="#" className="hover:text-gold">Terms</a>
               </div>
            </div>
         </div>
      </footer>
   );
};