import React from 'react';
import { CourseProvider, useCourse } from './context/CourseContext';
import { SeoHeadManager } from './components/SeoHeadManager';
import { Navbar } from './components/Navbar';
import { HomeLanding } from './components/HomeLanding';
import { BlogSection } from './components/BlogSection';
import { ReviewSection } from './components/ReviewSection';
import { CourseDetailPage } from './components/CourseDetailPage';
import { ClassHubPage } from './components/ClassHubPage';
import { CustomPageView } from './components/CustomPageView';
import { TargetAudienceModal } from './components/TargetAudienceModal';
import { FakeWhatsAppWidget } from './components/FakeWhatsAppWidget';
import { LiveGoogleMeetWidget } from './components/LiveGoogleMeetWidget';
import { SmartBotWidget } from './components/SmartBotWidget';
import { AdminManagerModal } from './components/AdminManagerModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { ShieldCheck } from 'lucide-react';

const AppContent: React.FC = () => {
  const { 
    activeView, 
    activeCourseForDetail, 
    closeCoursePage,
    activeCustomPage,
    isAdminAuthenticated,
    setAdminModalOpen
  } = useCourse();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-['Hind_Siliguri',sans-serif]">
      {/* Dynamic SEO Meta, Title, and Schema Manager */}
      <SeoHeadManager />

      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Body */}
      <main className="flex-1 pb-24 sm:pb-12">
        {activeView === 'course-detail' && activeCourseForDetail ? (
          <CourseDetailPage
            course={activeCourseForDetail}
            onBack={closeCoursePage}
          />
        ) : activeView === 'custom-page' && activeCustomPage ? (
          <CustomPageView page={activeCustomPage} />
        ) : (
          <>
            {activeView === 'class-hub' && <ClassHubPage />}
            {activeView === 'blogs' && <BlogSection />}
            {activeView === 'reviews' && <ReviewSection />}
            {(activeView === 'home' || activeView === 'courses' || activeView === 'faq' || activeView === 'admin-guide') && (
              <HomeLanding />
            )}
          </>
        )}
      </main>

      {/* Discreet Admin quick toggle button when authenticated */}
      {isAdminAuthenticated && (
        <button
          onClick={() => setAdminModalOpen(true)}
          className="fixed bottom-20 left-4 z-40 bg-slate-900/90 text-amber-400 hover:text-white hover:bg-slate-900 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg border border-slate-700 flex items-center gap-1.5 transition cursor-pointer backdrop-blur-xs"
          title="এডমিন কন্ট্রোল প্যানেল খুলুন"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>এডমিন মোড</span>
        </button>
      )}

      {/* Target Audience Onboarding Modal (0-delay initial prompt) */}
      <TargetAudienceModal />

      {/* Floating Fake WhatsApp Interaction Widget */}
      <FakeWhatsAppWidget />

      {/* Floating Live Google Meet Notification Badge */}
      <LiveGoogleMeetWidget />

      {/* Free Local AI Assistant Course Help Bot */}
      <SmartBotWidget />

      {/* Non-coder Central Management Panel (Admin Hub) */}
      <AdminManagerModal />

      {/* App-like Mobile Bottom Navigation Bar */}
      <MobileBottomNav />
    </div>
  );
};

export default function App() {
  return (
    <CourseProvider>
      <AppContent />
    </CourseProvider>
  );
}
