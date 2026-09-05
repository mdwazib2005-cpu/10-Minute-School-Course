import React, { useState, useEffect } from 'react';
import { useCourse } from '../context/CourseContext';
import { Sparkles, Clock, Flame } from 'lucide-react';

interface CountdownBannerProps {
  customTitle?: string;
  customTargetDate?: string;
}

export const CountdownBanner: React.FC<CountdownBannerProps> = ({
  customTitle,
  customTargetDate
}) => {
  const { siteSettings } = useCourse();

  // If countdown banner is disabled in Admin Panel, do not render
  if (siteSettings.showCountdownBanner === false) {
    return null;
  }

  const title = customTitle || siteSettings.countdownBannerText || 'এইচএসসি ও এডমিশন স্পেশাল অফার চলছে! আর্লি বার্ড স্পেশাল ছাড়ে ভর্তি হতে আর বাকি:';
  const subtitle = siteSettings.countdownBannerSubtext;
  const targetDate = customTargetDate || siteSettings.countdownTargetDate;
  const theme = siteSettings.countdownThemeColor || 'crimson';

  const [timeLeft, setTimeLeft] = useState({
    days: 10,
    hours: 4,
    minutes: 5,
    seconds: 22
  });

  useEffect(() => {
    const calculateTarget = () => {
      if (targetDate) {
        const parsed = new Date(targetDate).getTime();
        if (!isNaN(parsed)) return parsed;
      }
      const stored = localStorage.getItem('site_countdown_target');
      if (stored) {
        const time = parseInt(stored, 10);
        if (time > Date.now()) return time;
      }
      const newTarget = Date.now() + (10 * 24 * 60 * 60 + 4 * 60 * 60 + 5 * 60 + 22) * 1000;
      localStorage.setItem('site_countdown_target', newTarget.toString());
      return newTarget;
    };

    const targetTime = calculateTarget();

    const updateTimer = () => {
      const now = Date.now();
      const difference = Math.max(0, targetTime - now);

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const m = Math.floor((difference / 1000 / 60) % 60);
      const s = Math.floor((difference / 1000) % 60);

      setTimeLeft({
        days: d,
        hours: h,
        minutes: m,
        seconds: s
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const pad = (n: number) => n.toString().padStart(2, '0');

  // Dynamic theme configurations
  const themeStyles = {
    crimson: {
      card: 'bg-gradient-to-r from-red-50 via-rose-50 to-red-50 border-red-200/90 shadow-sm',
      badge: 'bg-[#D62B3B] text-white',
      pill: 'bg-white border-red-200 shadow-2xs',
      number: 'text-[#D62B3B]',
      label: 'text-slate-600',
      accent: 'text-red-700'
    },
    emerald: {
      card: 'bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border-emerald-200/90 shadow-sm',
      badge: 'bg-emerald-600 text-white',
      pill: 'bg-white border-emerald-200 shadow-2xs',
      number: 'text-emerald-700',
      label: 'text-slate-600',
      accent: 'text-emerald-800'
    },
    indigo: {
      card: 'bg-gradient-to-r from-indigo-50 via-violet-50 to-indigo-50 border-indigo-200/90 shadow-sm',
      badge: 'bg-indigo-600 text-white',
      pill: 'bg-white border-indigo-200 shadow-2xs',
      number: 'text-indigo-700',
      label: 'text-slate-600',
      accent: 'text-indigo-800'
    },
    amber: {
      card: 'bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border-amber-200/90 shadow-sm',
      badge: 'bg-amber-600 text-white',
      pill: 'bg-white border-amber-200 shadow-2xs',
      number: 'text-amber-700',
      label: 'text-slate-600',
      accent: 'text-amber-800'
    },
    dark: {
      card: 'bg-slate-900 border-slate-800 text-white shadow-md',
      badge: 'bg-[#D62B3B] text-white',
      pill: 'bg-slate-800 border-slate-700 shadow-inner',
      number: 'text-amber-300',
      label: 'text-slate-300',
      accent: 'text-slate-100'
    }
  };

  const currentTheme = themeStyles[theme] || themeStyles.crimson;

  return (
    <div className={`border rounded-2xl p-3 sm:p-4 text-center max-w-xl mx-auto my-3 select-none transition-all duration-300 ${currentTheme.card}`}>
      
      {/* Top Banner Tag */}
      <div className="flex items-center justify-center gap-1.5 mb-1.5">
        <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${currentTheme.badge}`}>
          <Flame className="w-3 h-3 text-amber-300 animate-pulse" />
          <span>সীমিত সময়ের স্পেশাল অফার</span>
        </span>
      </div>

      <p className={`text-xs sm:text-sm font-bold mb-1 leading-snug ${currentTheme.accent}`}>
        {title}
      </p>

      {subtitle && (
        <p className="text-[11px] text-slate-500 mb-2.5">
          {subtitle}
        </p>
      )}

      {/* Countdown Timer Pills */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-2.5 flex-wrap pt-1">
        
        {/* Days */}
        <div className={`rounded-xl py-1 px-2.5 border flex items-center justify-center gap-1 min-w-[64px] sm:min-w-[70px] ${currentTheme.pill}`}>
          <span className={`font-black text-sm sm:text-base font-sans ${currentTheme.number}`}>
            {pad(timeLeft.days)}
          </span>
          <span className={`text-[11px] font-semibold ${currentTheme.label}`}>
            দিন
          </span>
        </div>

        {/* Hours */}
        <div className={`rounded-xl py-1 px-2.5 border flex items-center justify-center gap-1 min-w-[64px] sm:min-w-[70px] ${currentTheme.pill}`}>
          <span className={`font-black text-sm sm:text-base font-sans ${currentTheme.number}`}>
            {pad(timeLeft.hours)}
          </span>
          <span className={`text-[11px] font-semibold ${currentTheme.label}`}>
            ঘণ্টা
          </span>
        </div>

        {/* Minutes */}
        <div className={`rounded-xl py-1 px-2.5 border flex items-center justify-center gap-1 min-w-[64px] sm:min-w-[70px] ${currentTheme.pill}`}>
          <span className={`font-black text-sm sm:text-base font-sans ${currentTheme.number}`}>
            {pad(timeLeft.minutes)}
          </span>
          <span className={`text-[11px] font-semibold ${currentTheme.label}`}>
            মিনিট
          </span>
        </div>

        {/* Seconds */}
        <div className={`rounded-xl py-1 px-2.5 border flex items-center justify-center gap-1 min-w-[68px] sm:min-w-[74px] ${currentTheme.pill}`}>
          <span className={`font-black text-sm sm:text-base font-sans ${currentTheme.number}`}>
            {pad(timeLeft.seconds)}
          </span>
          <span className={`text-[11px] font-semibold ${currentTheme.label}`}>
            সেকেন্ড
          </span>
        </div>

      </div>
    </div>
  );
};
