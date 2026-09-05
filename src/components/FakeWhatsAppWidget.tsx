import React, { useState, useEffect, useRef } from 'react';
import { useCourse } from '../context/CourseContext';
import { 
  X, 
  Send, 
  CheckCheck,
  Lock,
  Sparkles,
  Plus,
  Smile,
  Phone
} from 'lucide-react';

// Official Real WhatsApp SVG Logo
export const OfficialWhatsAppIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg 
    viewBox="0 0 24 24" 
    width="24" 
    height="24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

export const FakeWhatsAppWidget: React.FC = () => {
  const { 
    siteSettings, 
    isWhatsAppOpen, 
    setIsWhatsAppOpen, 
    whatsAppPreloadMsg 
  } = useCourse();

  const [messageText, setMessageText] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [userInteracted, setUserInteracted] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const autoCloseTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Quick suggestions for fast 1-click interaction
  const quickSuggestions = [
    { label: 'কুপন কোড', msg: 'আসসালামু আলাইকুম! আজকের স্পেশাল ডিসকাউন্ট কুপন কোডটি পেতে চাই।' },
    { label: 'সেরা অফার', msg: '১০ মিনিট স্কুলের চলমান সেরা কোর্স অফারগুলো জানতে চাই।' },
    { label: 'ভর্তি সহায়তা', msg: 'কোর্সে কীভাবে ভর্তি হব বিস্তারিত জানতে চাই।' },
  ];

  // Update time for message timestamp
  useEffect(() => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const strTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
    setCurrentTime(strTime);
  }, [isWhatsAppOpen]);

  // Auto popup on load (opens after 2s, then auto-collapses back to button after 4 seconds)
  useEffect(() => {
    const openTimer = setTimeout(() => {
      setIsWhatsAppOpen(true);

      // Auto close after 4 seconds if user hasn't interacted
      autoCloseTimerRef.current = setTimeout(() => {
        setIsWhatsAppOpen(prev => {
          // Only close if user has not typed anything
          return false;
        });
      }, 4000);

    }, 2000);

    return () => {
      clearTimeout(openTimer);
      if (autoCloseTimerRef.current) clearTimeout(autoCloseTimerRef.current);
    };
  }, [setIsWhatsAppOpen]);

  // Cancel auto-close if user touches/interacts with chat
  const handleUserActivity = () => {
    setUserInteracted(true);
    if (autoCloseTimerRef.current) {
      clearTimeout(autoCloseTimerRef.current);
      autoCloseTimerRef.current = null;
    }
  };

  // Sync preload message if opened with a course context
  useEffect(() => {
    if (whatsAppPreloadMsg) {
      setMessageText(whatsAppPreloadMsg);
      handleUserActivity();
    }
  }, [whatsAppPreloadMsg]);

  // Scroll to bottom of chat when opened
  useEffect(() => {
    if (isWhatsAppOpen) {
      setTimeout(() => {
        chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [isWhatsAppOpen]);

  // Immediately redirect to WhatsApp with the user's message
  const handleSend = (textToSend?: string) => {
    handleUserActivity();
    const cleanNumber = (siteSettings.whatsappNumber || '8801712345678').replace(/[^0-9]/g, '');
    const finalMsg = textToSend || messageText.trim() || siteSettings.whatsappWelcomeMessage || 'আসসালামু আলাইকুম! আমি কোর্স ডিসকাউন্ট ও ভর্তি সম্পর্কে জানতে চাই।';
    const encoded = encodeURIComponent(finalMsg);
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encoded}`;
    
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setIsWhatsAppOpen(false);
  };

  return (
    <div className="fixed bottom-[136px] sm:bottom-[84px] right-3.5 sm:right-6 z-40 flex flex-col items-end pointer-events-auto font-sans">
      
      {/* Real WhatsApp Dark Chat Window (Compact & Small on Mobile) */}
      {isWhatsAppOpen && (
        <div 
          onClick={handleUserActivity}
          onTouchStart={handleUserActivity}
          className="mb-2.5 w-[calc(100vw-1.5rem)] max-w-[310px] sm:max-w-[350px] max-h-[350px] sm:max-h-[460px] bg-[#0b141a] rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-700/80 overflow-hidden flex flex-col animate-in slide-in-from-bottom-3 duration-200"
        >
          
          {/* Top WhatsApp Header (Compact on Mobile) */}
          <div className="bg-[#202c33] text-white px-3 py-2 sm:px-3.5 sm:py-2.5 flex items-center justify-between border-b border-slate-700/50 shrink-0">
            <div className="flex items-center gap-2 min-w-0">
              
              {/* 10 Minute Logo Avatar */}
              <div className="relative shrink-0">
                <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white flex items-center justify-center shadow-xs border border-white/20 select-none">
                  <span className="text-[#EA1D2C] font-black text-xs sm:text-sm italic tracking-tighter font-sans leading-none">
                    10
                  </span>
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#00a884] border border-[#202c33] rounded-full"></span>
              </div>

              {/* Title & Online status */}
              <div className="min-w-0">
                <h4 className="font-bold text-xs sm:text-sm text-white truncate leading-tight font-sans">
                  10 Minute Course
                </h4>
                <div className="flex items-center gap-1 text-[10px] text-[#8696a0] truncate font-sans">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00a884]"></span>
                  <span className="text-[#00a884] font-medium">অনলাইন</span>
                </div>
              </div>

            </div>

            {/* Right Action Icons */}
            <div className="flex items-center gap-0.5 text-[#aebac1]">
              <button 
                type="button"
                onClick={() => handleSend('আমি সরাসরি কথা বলতে আগ্রহী।')}
                className="p-1.5 hover:text-white hover:bg-white/10 rounded-full transition cursor-pointer touch-manipulation"
                title="ভয়েস কল"
              >
                <Phone className="w-3.5 h-3.5" />
              </button>
              <button 
                type="button"
                onClick={() => {
                  handleUserActivity();
                  setIsWhatsAppOpen(false);
                }}
                className="p-1.5 text-[#8696a0] hover:text-white hover:bg-white/10 rounded-full transition cursor-pointer touch-manipulation"
                title="বন্ধ করুন"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* WhatsApp Dark Chat Body (Compact on Mobile) */}
          <div 
            className="flex-1 p-2.5 sm:p-3 space-y-2 overflow-y-auto min-h-[140px] max-h-[220px] sm:max-h-[280px] bg-[#0b141a] touch-auto"
            style={{
              backgroundImage: `radial-gradient(#1f2c34 1.5px, transparent 1.5px)`,
              backgroundSize: '16px 16px'
            }}
          >
            {/* End-to-End Encryption Notice */}
            <div className="bg-[#182229] border border-[#222e35] py-1 px-2 rounded-lg text-center shadow-xs flex items-center justify-center gap-1.5">
              <Lock className="w-2.5 h-2.5 text-[#ffd279] shrink-0" />
              <span className="text-[9px] text-[#ffd279] font-medium">
                এন্ড-টু-এন্ড এনক্রিপ্টেড চ্যাট
              </span>
            </div>

            {/* Inbound Message Bubble */}
            <div className="relative bg-[#202c33] text-white p-2.5 sm:p-3 rounded-2xl rounded-tl-xs shadow-xs text-[11px] sm:text-xs leading-relaxed max-w-[95%] border border-slate-700/40">
              <p className="text-slate-100 font-['Hind_Siliguri',sans-serif]">
                {siteSettings.whatsappWelcomeMessage || 'আসসালামু আলাইকুম! ১০ মিনিট স্কুলের কোন কোর্সে ডিসকাউন্ট কুপন বা অফার কোড প্রয়োজন?'}
              </p>
              
              <div className="text-[9px] text-[#8696a0] text-right mt-1 flex items-center justify-end gap-1 select-none font-sans">
                <span>{currentTime || '10:39 pm'}</span>
                <CheckCheck className="w-3 h-3 text-[#53bdeb]" />
              </div>
            </div>

            {/* Suggested Clickable Prompt Chips */}
            <div className="pt-0.5 space-y-1">
              <div className="text-[9px] text-[#8696a0] flex items-center gap-1 font-medium">
                <Sparkles className="w-2.5 h-2.5 text-[#00a884]" />
                <span>সরাসরি জানতে ক্লিক করুন:</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {quickSuggestions.map((item, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => {
                      setMessageText(item.msg);
                      handleSend(item.msg);
                    }}
                    className="text-[10px] bg-[#1f2c34] hover:bg-[#00a884] text-slate-200 hover:text-white border border-[#2a3942] hover:border-[#00a884] px-2 py-1 rounded-full transition text-left cursor-pointer active:scale-95 shadow-xs font-['Hind_Siliguri',sans-serif] touch-manipulation"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div ref={chatBottomRef} />
          </div>

          {/* Real WhatsApp Web Input Bar */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-1.5 sm:p-2 bg-[#202c33] border-t border-slate-700/60 flex items-center gap-1 shrink-0"
          >
            {/* Plus icon */}
            <button 
              type="button"
              onClick={() => handleSend()}
              className="p-1.5 text-[#8696a0] hover:text-white rounded-full transition shrink-0 touch-manipulation"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>

            {/* Input Box */}
            <div className="flex-1 bg-[#2a3942] rounded-full px-3 py-1.5 border border-transparent focus-within:border-[#00a884]">
              <input
                type="text"
                value={messageText}
                onFocus={handleUserActivity}
                onChange={(e) => {
                  handleUserActivity();
                  setMessageText(e.target.value);
                }}
                placeholder="মেসেজ লিখুন..."
                className="w-full text-xs text-white focus:outline-hidden bg-transparent placeholder:text-[#8696a0] font-['Hind_Siliguri',sans-serif]"
              />
            </div>

            {/* Real WhatsApp Send Button */}
            <button
              type="submit"
              className="w-8 h-8 rounded-full bg-[#00a884] hover:bg-[#029575] text-white flex items-center justify-center shadow-md transition shrink-0 active:scale-95 cursor-pointer touch-manipulation"
              title="হোয়াটসঅ্যাপে পাঠান"
            >
              <Send className="w-3.5 h-3.5 ml-0.5" />
            </button>
          </form>

        </div>
      )}

      {/* Floating Circular WhatsApp Button matching Reference Photo */}
      <button
        id="whatsapp-floating-trigger"
        onClick={() => {
          handleUserActivity();
          setIsWhatsAppOpen(!isWhatsAppOpen);
        }}
        className="w-12 h-12 sm:w-13 sm:h-13 bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1da850] text-white rounded-full shadow-[0_4px_16px_rgba(37,211,102,0.4)] flex items-center justify-center hover:scale-105 transition-all duration-200 active:scale-95 cursor-pointer border border-white/40 touch-manipulation select-none relative"
        title="WhatsApp Support"
      >
        <OfficialWhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
        <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-rose-600 text-white rounded-full text-[8px] font-black flex items-center justify-center border-2 border-white shadow-xs animate-pulse">
          1
        </span>
      </button>

    </div>
  );
};
