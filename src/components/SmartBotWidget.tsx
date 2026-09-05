import React, { useState, useRef, useEffect } from 'react';
import { useCourse } from '../context/CourseContext';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  BookOpen, 
  HelpCircle, 
  ArrowRight,
  MessageCircle,
  Tag
} from 'lucide-react';
import { Course } from '../types';
import { formatBDT, isOfferActive, getCurrentPrice } from '../utils/courseUtils';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  suggestedCourses?: Course[];
  timestamp: string;
}

export const SmartBotWidget: React.FC = () => {
  const { 
    courses, 
    setActiveCourseForDetail, 
    openWhatsAppWithCourse,
    isAssistantOpen,
    setIsAssistantOpen
  } = useCourse();

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'আসসালামু আলাইকুম! আমি ১০মিনিট কোর্স সহকারী। ১০ মিনিট স্কুলের যেকোনো কোর্সের ফি, সিলেবাস বা স্পেশাল ছাড় সম্পর্কে জানতে সাহায্য করতে পারি। আপনি কোন কোর্সটি খুঁজছেন?',
      timestamp: 'এখন'
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAssistantOpen]);

  const quickPrompts = [
    'স্পোকেন ইংলিশের ফি কত?',
    'এইচএসসি কোর্সে কী কী আছে?',
    'ফ্রিল্যান্সিং কোর্স কোনটা ভালো?',
    'কোন কোর্সে এখন বড় ছাড় আছে?'
  ];

  // Smart local intent responder (fast and reliable)
  const processQuery = (query: string) => {
    const q = query.toLowerCase();
    let reply = '';
    let matchedCourses: Course[] = [];

    // Search for matches in titles, tags, descriptions
    matchedCourses = courses.filter(c => 
      c.title.toLowerCase().includes(q) ||
      c.tags.some(t => q.includes(t.toLowerCase())) ||
      c.instructor.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      c.shortDescription.toLowerCase().includes(q)
    );

    if (q.includes('ছাড়') || q.includes('অফার') || q.includes('ডিসকাউন্ট') || q.includes('কুপন')) {
      const discounted = courses.filter(c => isOfferActive(c));
      matchedCourses = discounted.slice(0, 3);
      reply = `বর্তমানে আমাদের বেশ কয়েকটি কোর্সে মেগা ছাড় চলছে! নিচে সেরা ডিসকাউন্টযুক্ত কোর্সগুলো দেওয়া হলো:`;
    } else if (q.includes('স্পোকেন') || q.includes('spoken') || q.includes('english') || q.includes('ইংরেজি') || q.includes('ielts')) {
      matchedCourses = courses.filter(c => c.category === 'language');
      reply = `ভাষা শিক্ষার জন্য ১০ মিনিট স্কুলের মুনজেরিন শহীদ আপুর কোর্সগুলো সবচেয়ে জনপ্রিয়। বিস্তারিত দেখুন:`;
    } else if (q.includes('এইচএসসি') || q.includes('hsc') || q.includes('ssc') || q.includes('ক্লাস') || q.includes('এডমিশন') || q.includes('ভর্তি')) {
      matchedCourses = courses.filter(c => c.category === 'hsc' || c.category === 'admission' || c.category === 'class-9-10');
      reply = `একাডেমিক ও ভর্তি পরীক্ষার জন্য সেরা কিছু কোর্স নিচে তালিকাভুক্ত করা হলো:`;
    } else if (q.includes('ফ্রিল্যান্সিং') || q.includes('ডিজাইন') || q.includes('কোডিং') || q.includes('মার্কেটিং') || q.includes('skill')) {
      matchedCourses = courses.filter(c => c.category === 'skill');
      reply = `ঘরে বসে আয় এবং স্কিল ডেভেলপমেন্টের জন্য জনপ্রিয় কিছু কোর্স:`;
    } else if (matchedCourses.length > 0) {
      reply = `আপনার অনুসন্ধানের সাথে মিল রেখে এই কোর্সগুলো খুঁজে পাওয়া গেছে:`;
    } else {
      matchedCourses = courses.slice(0, 2);
      reply = `আমি আপনার প্রশ্নটি বুঝতে পেরেছি। ১০ মিনিট স্কুলের যেকোনো কোর্সে সর্বোচ্চ ছাড় বা বিস্তারিত তথ্যের জন্য আমাদের কোর্সগুলো দেখতে পারেন অথবা সরাসরি হোয়াটসঅ্যাপে কথা বলতে পারেন।`;
    }

    return { reply, matchedCourses: matchedCourses.slice(0, 2) };
  };

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim(),
      timestamp: 'এখন'
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Simulate natural thinking delay
    setTimeout(() => {
      const { reply, matchedCourses } = processQuery(text);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: reply,
        suggestedCourses: matchedCourses,
        timestamp: 'এখন'
      };
      setMessages(prev => [...prev, botMsg]);
    }, 400);
  };

  return (
    <div className="fixed bottom-[74px] sm:bottom-6 right-3.5 sm:right-6 z-40 flex flex-col items-end pointer-events-auto font-sans">
      
      {/* Bot Chat Window */}
      {isAssistantOpen && (
        <div className="mb-3 w-[92vw] sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[500px] animate-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          {/* Modal Header */}
          <div className="bg-slate-900 text-white p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#EA1D2C] flex items-center justify-center text-white font-bold shadow-xs">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight flex items-center gap-1.5">
                  <span>১০মিনিট কোর্স সহকারী</span>
                </h4>
                <p className="text-[11px] text-slate-300">কোর্স সন্ধান ও তথ্য গাইড</p>
              </div>
            </div>

            <button
              onClick={() => setIsAssistantOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-md cursor-pointer transition"
              title="বন্ধ করুন"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="p-3.5 space-y-3 overflow-y-auto flex-1 bg-slate-50 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-3 rounded-2xl max-w-[88%] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#EA1D2C] text-white rounded-br-xs'
                      : 'bg-white text-slate-800 border border-slate-200 shadow-2xs rounded-bl-xs'
                  }`}
                >
                  <p>{msg.text}</p>
                </div>

                {/* Course Card Preview inside bot */}
                {msg.suggestedCourses && msg.suggestedCourses.length > 0 && (
                  <div className="w-full mt-2 space-y-2">
                    {msg.suggestedCourses.map(course => (
                      <div
                        key={course.id}
                        className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs flex items-center gap-2.5"
                      >
                        <img
                          src={course.thumbnail}
                          alt={course.imageAlt || `${course.title} - ${course.instructor}`}
                          className="w-12 h-12 rounded-lg object-cover shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0">
                          <h5 className="font-bold text-slate-900 truncate">{course.title}</h5>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="font-extrabold text-[#EA1D2C]">
                              {formatBDT(getCurrentPrice(course))}
                            </span>
                            {course.offerPrice && (
                              <span className="text-[10px] text-slate-400 line-through">
                                {formatBDT(course.regularPrice)}
                              </span>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setActiveCourseForDetail(course);
                            setIsAssistantOpen(false);
                          }}
                          className="p-1.5 bg-red-50 text-[#EA1D2C] hover:bg-[#EA1D2C] hover:text-white rounded-lg transition cursor-pointer"
                          title="বিস্তারিত দেখুন"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="p-2 bg-slate-100 border-t border-slate-200 flex gap-1.5 overflow-x-auto text-[11px] no-scrollbar">
            {quickPrompts.map((qp, i) => (
              <button
                key={i}
                onClick={() => handleSend(qp)}
                className="bg-white hover:bg-red-50 text-slate-700 hover:text-[#EA1D2C] px-2.5 py-1 rounded-full border border-slate-200 whitespace-nowrap transition cursor-pointer"
              >
                {qp}
              </button>
            ))}
          </div>

          {/* Input form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-2.5 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="কোর্সের নাম বা প্রশ্ন লিখুন..."
              className="flex-1 text-xs px-3 py-2 bg-slate-100 rounded-full focus:outline-hidden focus:ring-1 focus:ring-[#EA1D2C]"
            />
            <button
              type="submit"
              className="p-2 bg-[#EA1D2C] hover:bg-[#bd1824] text-white rounded-full transition cursor-pointer"
              title="পাঠান"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>
      )}

      {/* Floating Circular Chat Bubble Trigger matching Reference Photo */}
      <button
        onClick={() => setIsAssistantOpen(!isAssistantOpen)}
        className="w-12 h-12 sm:w-13 sm:h-13 bg-[#00A884] hover:bg-[#029575] active:bg-[#017a60] text-white rounded-full shadow-[0_4px_16px_rgba(0,168,132,0.4)] flex items-center justify-center hover:scale-105 transition-all duration-200 active:scale-95 cursor-pointer border border-white/40 touch-manipulation select-none relative"
        title="কোর্স সহকারী ও ইনস্ট্যান্ট চ্যাট"
      >
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.5 21.5l4.632-.821A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm-4 11a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm4 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm4 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
        </svg>
      </button>

    </div>
  );
};
