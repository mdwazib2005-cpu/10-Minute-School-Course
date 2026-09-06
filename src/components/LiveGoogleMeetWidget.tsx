import React, { useState } from 'react';
import { useCourse } from '../context/CourseContext';
import { Video, Mic, Sparkles, ExternalLink, X, Radio, Users } from 'lucide-react';

export const LiveGoogleMeetWidget: React.FC = () => {
  const { siteSettings, setAdminModalOpen } = useCourse();
  const [minimized, setMinimized] = useState(true);

  // If meet is inactive, hide completely
  if (!siteSettings.isMeetLive) {
    return null;
  }

  if (minimized) {
    return (
      <div className="fixed bottom-24 left-6 z-40">
        <button
          onClick={() => setMinimized(false)}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 px-3 rounded-full shadow-xl animate-bounce"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping"></span>
          <Video className="w-4 h-4" />
          <span>লাইভ মিট চালু আছে</span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-24 left-4 sm:left-6 z-40 max-w-sm w-[92vw] sm:w-auto animate-in slide-in-from-bottom-4 duration-300">
      <div className="bg-slate-900 text-white rounded-2xl p-4 shadow-2xl border-2 border-emerald-500/80 relative overflow-hidden backdrop-blur-md">
        
        {/* Glow accent */}
        <div className="absolute -top-10 -right-10 w-28 h-28 bg-emerald-500/20 rounded-full blur-xl pointer-events-none"></div>

        {/* Top Live Bar */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1">
              <Radio className="w-3.5 h-3.5" />
              <span>মেন্টর লাইভ অন-এয়ার</span>
            </span>
          </div>

          <button
            onClick={() => setMinimized(true)}
            className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800 transition"
            title="মিনিমাইজ করুন"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-1.5 mb-3">
          <h4 className="text-sm font-bold text-white leading-tight">
            {siteSettings.meetTopic || siteSettings.meetBannerText || 'কোর্স সংক্রান্ত ফ্রি লাইভ কাউন্সেলিং'}
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            {siteSettings.meetHostName || '১০ মিনিট স্কুল সিনিয়র মেন্টর'} এখন গুগল মিটে সরাসরি একটিভ আছেন। কোর্স চয়েস বা ডিসকাউন্ট নিয়ে যেকোনো কথা বলতে এখনই জয়েন করুন।
          </p>
        </div>

        {/* Join CTA */}
        <div className="flex items-center gap-2">
          <a
            href={siteSettings.googleMeetLink || siteSettings.googleMeetUrl || 'https://meet.google.com'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-xs font-extrabold py-2.5 px-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2 transition active:scale-98"
          >
            <Video className="w-4 h-4" />
            <span>গুগল মিটে সরাসরি জয়েন করুন</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </div>
  );
};
