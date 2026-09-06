import React, { useState, useRef } from 'react';
import { useCourse } from '../context/CourseContext';
import { Course, CourseCategory, CategoryConfig, ClassPortalInfo, NavItemConfig } from '../types';
import { 
  X, 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  Video, 
  MessageCircle, 
  Code, 
  Download, 
  Upload, 
  RefreshCw, 
  Sparkles, 
  Clock, 
  Check, 
  HelpCircle, 
  BookOpen, 
  Search,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Flame,
  Radio,
  Lock,
  Unlock,
  Key,
  Image as ImageIcon,
  Eye,
  EyeOff,
  Copy,
  FolderOpen,
  Layers,
  ArrowUp,
  ArrowDown,
  Tag,
  Share2,
  Globe,
  SlidersHorizontal,
  ChevronRight,
  GraduationCap,
  Layout,
  Sliders,
  ShieldCheck,
  Compass,
  Navigation,
  RotateCcw,
  Link as LinkIcon,
  Cloud,
  Database
} from 'lucide-react';
import { formatBDT, isOfferActive, isCourseExpired, getCurrentPrice, formatWhatsAppUrl } from '../utils/courseUtils';
import { BrandLogo } from './BrandLogo';

const PRESET_COURSE_THUMBNAILS = [
  {
    name: 'স্পোকেন ইংলিশ (মুনজেরিন শহীদ)',
    url: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&auto=format&fit=crop&q=80',
    category: 'ভাষা শিক্ষা'
  },
  {
    name: 'আইইএলটিএস লাইভ (IELTS Masterclass)',
    url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
    category: 'ভাষা শিক্ষা'
  },
  {
    name: 'এইচএসসি ক্র্যাশ কোর্স (HSC Crash Course)',
    url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80',
    category: 'একাডেমিক'
  },
  {
    name: 'মেডিকেল ও ভার্সিটি এডমিশন',
    url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
    category: 'এডমিশন'
  },
  {
    name: 'ওয়েব ডেভেলপমেন্ট ও প্রোগ্রামিং',
    url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80',
    category: 'স্কিল'
  },
  {
    name: 'গ্রাফিক্স ডিজাইন ও ফ্রিল্যান্সিং',
    url: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format&fit=crop&q=80',
    category: 'স্কিল'
  },
  {
    name: 'বিসিএস ও সরকারি চাকরি প্রস্তুতি',
    url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800&auto=format&fit=crop&q=80',
    category: 'চাকরি'
  },
  {
    name: 'কিডস স্পোকেন ও কার্টুন লার্নিং',
    url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=80',
    category: 'কিডস'
  }
];

const compressAndReadImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const maxDim = 800;
        if (width > height && width > maxDim) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else if (height > maxDim) {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.82);
          resolve(dataUrl);
        } else {
          resolve(event.target?.result as string);
        }
      };
      img.onerror = () => reject(new Error('ইমেজ লোড হতে সমস্যা হয়েছে'));
      img.src = event.target?.result as string;
    };
    reader.onerror = () => reject(new Error('ফাইল পড়তে সমস্যা হয়েছে'));
    reader.readAsDataURL(file);
  });
};

export const AdminManagerModal: React.FC = () => {
  const { 
    courses, 
    addCourse, 
    updateCourse, 
    deleteCourse, 
    categories,
    activeCategories,
    addCategory,
    updateCategory,
    deleteCategory,
    reorderCategory,
    toggleCategoryEnabled,
    resetCategories,
    classes,
    updateClassPortal,
    customPages,
    siteSettings, 
    updateSiteSettings, 
    toggleMeetLive, 
    resetToDefaultData, 
    adminModalOpen, 
    setAdminModalOpen,
    isAdminAuthenticated,
    setIsAdminAuthenticated,
    updateAdminPassword,
    checkAdminPassword,
    openCoursePage,
    navItems,
    addNavItem,
    updateNavItem,
    deleteNavItem,
    reorderNavItem,
    resetNavItems,
    cloudSyncStatus,
    lastSyncedAt,
    syncAllToCloud,
    fetchFromCloud
  } = useCourse();

  // Authentication State
  const [inputPassword, setInputPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [showChangePasswordSection, setShowChangePasswordSection] = useState(false);

  // Tabs & Navigation State
  const [activeTab, setActiveTab] = useState<'courses' | 'categories' | 'classes' | 'sitesettings' | 'navigation' | 'seo' | 'shortcodes' | 'images' | 'meet' | 'whatsapp' | 'cloudsync' | 'backup' | 'guide'>('courses');
  const [searchFilter, setSearchFilter] = useState('');
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [jsonInput, setJsonInput] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [galleryUploadedUrl, setGalleryUploadedUrl] = useState('');
  const [galleryFileName, setGalleryFileName] = useState('');

  // Navigation Items Management State
  const [newNavLabel, setNewNavLabel] = useState('');
  const [newNavType, setNewNavType] = useState<'view' | 'dropdown' | 'link' | 'category'>('view');
  const [newNavTarget, setNewNavTarget] = useState('home');
  const [newNavIcon, setNewNavIcon] = useState('🔗');
  const [newNavBadge, setNewNavBadge] = useState('');
  const [newNavIsExternal, setNewNavIsExternal] = useState(false);
  const [editingNavId, setEditingNavId] = useState<string | null>(null);
  const [editingNavLabel, setEditingNavLabel] = useState('');
  const [editingNavTarget, setEditingNavTarget] = useState('');
  const [editingNavIcon, setEditingNavIcon] = useState('');
  const [editingNavBadge, setEditingNavBadge] = useState('');

  // Category Management State
  const [newCatLabel, setNewCatLabel] = useState('');
  const [newCatIcon, setNewCatIcon] = useState('🎓');
  const [newCatId, setNewCatId] = useState('');
  const [editingCatId, setEditingCatId] = useState<string | null>(null);
  const [editingCatLabel, setEditingCatLabel] = useState('');
  const [editingCatIcon, setEditingCatIcon] = useState('');

  // Class Portal State
  const [editingClass, setEditingClass] = useState<ClassPortalInfo | null>(null);
  const [newSubjectInput, setNewSubjectInput] = useState('');

  // Shortcode Builder State
  const [selectedShortcodeCourseId, setSelectedShortcodeCourseId] = useState<string>(courses[0]?.id || 'course-spoken-english');
  const [embedFormat, setEmbedFormat] = useState<'shortcode' | 'html' | 'iframe'>('shortcode');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);
  const logoFileInputRef = useRef<HTMLInputElement>(null);
  const seoOgFileInputRef = useRef<HTMLInputElement>(null);

  if (!adminModalOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleVerifyPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const entered = inputPassword.trim();
    if (!entered) return;
    const isValid = await checkAdminPassword(entered);
    if (isValid) {
      setIsAdminAuthenticated(true);
      setAuthError('');
      setInputPassword('');
      showToast('🔓 অ্যাডমিন প্যানেলে স্বাগতম!');
    } else {
      setAuthError('❌ ভুল পাসওয়ার্ড! অনুগ্রহ করে সঠিক অ্যাডমিন পাসওয়ার্ড দিন।');
    }
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPasswordInput.trim().length < 4) {
      alert('পাসওয়ার্ড কমপক্ষে ৪ অক্ষরের হতে হবে।');
      return;
    }
    updateAdminPassword(newPasswordInput.trim());
    showToast('🔑 অ্যাডমিন পাসওয়ার্ড সফলভাবে পরিবর্তন ও হ্যাশ সংরক্ষিত হয়েছে!');
    setNewPasswordInput('');
    setShowChangePasswordSection(false);
  };

  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      showToast('⏳ ছবি প্রসেসিং ও অপটিমাইজ করা হচ্ছে...');
      const dataUrl = await compressAndReadImage(file);
      if (editingCourse) {
        setEditingCourse({ ...editingCourse, thumbnail: dataUrl });
      }
      showToast('✅ ছবি সফলভাবে লোড হয়েছে!');
    } catch (err) {
      alert('ছবি আপলোড করতে সমস্যা হয়েছে। অন্য ছবি চেষ্টা করুন।');
    }
  };

  const handleGalleryImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      showToast('⏳ ছবি প্রসেসিং ও কনভার্ট করা হচ্ছে...');
      const dataUrl = await compressAndReadImage(file);
      setGalleryUploadedUrl(dataUrl);
      setGalleryFileName(file.name);
      showToast('✅ ইমেজ ডাটা তৈরি হয়েছে! এটি কপি করে যেকোনো কোর্সে বসাতে পারেন।');
    } catch {
      alert('ছবি আপলোড করতে সমস্যা হয়েছে।');
    }
  };

  const handleLogoFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      showToast('⏳ লোগো প্রসেসিং করা হচ্ছে...');
      const dataUrl = await compressAndReadImage(file);
      updateSiteSettings({
        logoType: 'custom_image',
        customLogoUrl: dataUrl
      });
      showToast('✅ কাস্টম লোগো সফলভাবে সেট হয়েছে!');
    } catch {
      alert('লোগো ফাইল পড়তে সমস্যা হয়েছে।');
    }
  };

  const handleOgImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      showToast('⏳ সোশ্যাল ব্যানার ইমেজ প্রসেস করা হচ্ছে...');
      const dataUrl = await compressAndReadImage(file);
      updateSiteSettings({
        seoOgImage: dataUrl
      });
      showToast('✅ সোশ্যাল প্রিভিউ ইমেজ সফলভাবে সেট হয়েছে!');
    } catch {
      alert('ইমেজ ফাইল পড়তে সমস্যা হয়েছে।');
    }
  };

  const handleAddNavItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNavLabel.trim()) return;
    addNavItem({
      label: newNavLabel.trim(),
      type: newNavType,
      target: newNavTarget.trim(),
      icon: newNavIcon.trim() || '🔗',
      badgeText: newNavBadge.trim() || undefined,
      isExternal: newNavIsExternal,
      enabled: true
    });
    showToast(`✅ "${newNavLabel}" নেভিগেশন মেনুতে যুক্ত হয়েছে!`);
    setNewNavLabel('');
    setNewNavIcon('🔗');
    setNewNavBadge('');
    setNewNavIsExternal(false);
  };

  const handleSaveEditNavItem = (id: string) => {
    if (!editingNavLabel.trim()) return;
    updateNavItem(id, {
      label: editingNavLabel.trim(),
      target: editingNavTarget.trim(),
      icon: editingNavIcon.trim() || '🔗',
      badgeText: editingNavBadge.trim() || undefined
    });
    setEditingNavId(null);
    showToast('✅ নেভিগেশন আইটেম আপডেট হয়েছে!');
  };

  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCourse) return;

    if (isCreatingNew) {
      addCourse(editingCourse);
      showToast('✅ নতুন কোর্স সফলভাবে সেন্ট্রাল ডেটাবেজে যুক্ত হয়েছে!');
    } else {
      updateCourse(editingCourse);
      showToast('✅ কোর্সের তথ্য আপডেট হয়েছে এবং সব পেজে স্বয়ংক্রিয়ভাবে পরিবর্তন হয়েছে!');
    }

    setEditingCourse(null);
    setIsCreatingNew(false);
  };

  const handleStartCreate = () => {
    const newTemplate: Course = {
      id: `course-${Date.now()}`,
      slug: `new-course-${Date.now()}`,
      title: 'নতুন ১০ মিনিট স্কুল কোর্স',
      subtitle: 'কোর্সের সংক্ষিপ্ত বর্ণনা এখানে লিখুন',
      category: (categories[1]?.id as CourseCategory) || 'skill',
      categoryName: categories[1]?.label || 'স্কিল ও ফ্রিল্যান্সিং',
      instructor: 'আয়মান সাদিক / মুনজেরিন শহীদ',
      instructorTitle: '১০ মিনিট স্কুল ইন্সট্রাক্টর',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
      regularPrice: 2000,
      offerPrice: 1200,
      offerExpiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      courseExpiryDate: null,
      isLifetime: true,
      affiliateUrl: 'https://10minuteschool.com/?aff=10mscourse',
      couponCode: 'PROMO10',
      features: ['ভিডিও লেকচার', 'লেকচার নোটস ও শিট', 'সার্টিফিকেট'],
      rating: 4.9,
      reviewCount: 1200,
      enrolledCount: 1500,
      featured: true,
      tags: ['10 minute school', 'new course', 'discount'],
      shortDescription: '১০ মিনিট স্কুলের স্পেশাল প্রমোশনাল কোর্স।',
      fullDescription: 'এই কোর্সের মাধ্যমে আপনি ঘরে বসেই দক্ষতা অর্জন করতে পারবেন। ১০ মিনিট স্কুলের অভিজ্ঞ মেন্টরদের প্রত্যক্ষ দিকনির্দেশনা ও স্পেশাল ডিসকাউন্ট উপভোগ করুন।',
      syllabus: [
        { moduleTitle: 'অধ্যায় ১: প্রাথমিক ধারণা ও শুরু', lessonsCount: 6, topics: ['ভূমিকা', 'প্রস্তুতি'] },
        { moduleTitle: 'অধ্যায় ২: মূল প্র্যাকটিক্যাল লেসন', lessonsCount: 8, topics: ['প্র্যাকটিস', 'সলিউশন'] }
      ],
      faqs: [
        { question: 'কোর্সটি কেনার পর কীভাবে শুরু করব?', answer: 'এনরোল করার সাথে সাথে আপনার ১০ মিনিট স্কুল একাউন্টে কোর্সটি আনলক হয়ে যাবে।' }
      ]
    };
    setEditingCourse(newTemplate);
    setIsCreatingNew(true);
  };

  // Category Add Handler
  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatLabel.trim()) return;
    const generatedId = newCatId.trim() || newCatLabel.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || `cat-${Date.now()}`;
    
    addCategory({
      id: generatedId,
      label: newCatLabel.trim(),
      icon: newCatIcon.trim() || '📁'
    });
    
    showToast(`✅ "${newCatLabel}" ক্যাটাগরি যুক্ত হয়েছে!`);
    setNewCatLabel('');
    setNewCatIcon('🎓');
    setNewCatId('');
  };

  const handleSaveEditCategory = (id: string) => {
    if (!editingCatLabel.trim()) return;
    updateCategory(id, {
      label: editingCatLabel.trim(),
      icon: editingCatIcon.trim() || '📁'
    });
    setEditingCatId(null);
    showToast('✅ ক্যাটাগরি আপডেট হয়েছে!');
  };

  // Export and Import JSON
  const handleExportJSON = () => {
    const backupData = {
      exportDate: new Date().toISOString(),
      siteSettings,
      categories,
      courses
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `10min_courses_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('💾 সমস্ত কোর্সের ব্যাকআপ ফাইল ডাউনলোড সম্পন্ন হয়েছে!');
  };

  // Generate complete TypeScript code for src/data/initialData.ts
  const generateInitialDataTsCode = () => {
    return `import { Course, SiteSettings, CategoryConfig, ClassPortalInfo, CustomPage } from '../types';

export const INITIAL_CATEGORIES: CategoryConfig[] = ${JSON.stringify(categories, null, 2)};

export const INITIAL_CLASSES: ClassPortalInfo[] = ${JSON.stringify(classes || [], null, 2)};

export const INITIAL_CUSTOM_PAGES: CustomPage[] = ${JSON.stringify(customPages || [], null, 2)};

export const INITIAL_SITE_SETTINGS: SiteSettings = ${JSON.stringify(siteSettings, null, 2)};

export const INITIAL_COURSES: Course[] = ${JSON.stringify(courses, null, 2)};
`;
  };

  const handleDownloadInitialDataTs = () => {
    const code = generateInitialDataTsCode();
    const dataStr = "data:text/plain;charset=utf-8," + encodeURIComponent(code);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "initialData.ts");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('🚀 initialData.ts ডাউনলোড হয়েছে! এটি আপনার গিটহাবের src/data/ ফাইলে রিপ্লেস করুন।');
  };

  const handleCopyInitialDataTs = async () => {
    const code = generateInitialDataTsCode();
    try {
      await navigator.clipboard.writeText(code);
      showToast('📋 initialData.ts কোড সফলভাবে কপি হয়েছে! গিটহাবে পেস্ট করুন।');
    } catch {
      showToast('কপি ব্যর্থ হয়েছে। অনুগ্রহ করে ডাউনলোড বাটন ব্যবহার করুন।');
    }
  };

  const handleImportJSON = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      if (Array.isArray(parsed)) {
        parsed.forEach(c => {
          if (c.id && c.title) {
            updateCourse(c);
          }
        });
        showToast('✅ JSON ফাইল থেকে কোর্স ডেটা সফলভাবে রিস্টোর হয়েছে!');
        setJsonInput('');
      } else if (parsed && parsed.courses && Array.isArray(parsed.courses)) {
        parsed.courses.forEach((c: Course) => {
          if (c.id && c.title) updateCourse(c);
        });
        if (parsed.siteSettings) updateSiteSettings(parsed.siteSettings);
        showToast('✅ পূর্ণাঙ্গ ব্যাকআপ ডেটা সফলভাবে রিস্টোর হয়েছে!');
        setJsonInput('');
      } else {
        alert('ত্রুটি: JSON ডেটা একটি কোর্স অ্যারে (Array) বা ব্যাকআপ ফাইল হতে হবে।');
      }
    } catch {
      alert('ত্রুটি: সঠিক JSON ফরম্যাট প্রদান করুন।');
    }
  };

  // Filtered Courses for Admin
  const adminFilteredCourses = courses.filter(c => 
    c.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
    c.instructor.toLowerCase().includes(searchFilter.toLowerCase()) ||
    c.categoryName.toLowerCase().includes(searchFilter.toLowerCase()) ||
    c.id.toLowerCase().includes(searchFilter.toLowerCase())
  );

  // Selected Course for Shortcode Preview
  const selectedShortcodeCourse = courses.find(c => c.id === selectedShortcodeCourseId) || courses[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/80 backdrop-blur-xs overflow-y-auto animate-in fade-in">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden relative my-6 max-h-[92vh] flex flex-col">
        
        {/* Top Header */}
        <div className="bg-slate-900 text-white p-4 sm:px-6 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#D62B3B] flex items-center justify-center text-white font-black text-sm shadow-md">
              10M
            </div>
            <div>
              <h2 className="font-bold text-base sm:text-lg flex items-center gap-2">
                <span>সেন্ট্রাল কন্ট্রোল প্যানেল (Admin Hub)</span>
                {isAdminAuthenticated ? (
                  <span className="text-[11px] bg-emerald-500/20 text-emerald-300 font-mono px-2 py-0.5 rounded-md border border-emerald-500/30 flex items-center gap-1">
                    <Unlock className="w-3 h-3 text-emerald-400" />
                    <span>লগইন সক্রিয়</span>
                  </span>
                ) : (
                  <span className="text-[11px] bg-rose-600/30 text-rose-300 font-mono px-2 py-0.5 rounded-md border border-rose-500/30 flex items-center gap-1">
                    <Lock className="w-3 h-3 text-rose-400" />
                    <span>সুরক্ষিত</span>
                  </span>
                )}
              </h2>
              <p className="text-xs text-slate-400">কোর্স, ক্যাটাগরি ক্রম, দাম, শর্টকোড, গুগল মিট ও হোয়াটসঅ্যাপ নিয়ন্ত্রণ করুন</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminAuthenticated && (
              <>
                <button
                  type="button"
                  onClick={async () => {
                    setActiveTab('cloudsync');
                    showToast('⏳ ক্লাউড ডাটাবেজে সেভ হচ্ছে...');
                    const success = await syncAllToCloud();
                    if (success) {
                      showToast('☁️ Firebase Firestore ক্লাউডে সব ডেটা সফলভাবে সেভ হয়েছে!');
                    } else {
                      showToast('⚠️ ক্লাউড সিঙ্ক ব্যর্থ হয়েছে। ইন্টারনেট সংযোগ চেক করুন।');
                    }
                  }}
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95 border ${
                    cloudSyncStatus === 'synced'
                      ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50 hover:bg-emerald-900/90'
                      : cloudSyncStatus === 'syncing'
                      ? 'bg-amber-950/80 text-amber-300 border-amber-500/50 animate-pulse'
                      : 'bg-rose-950/80 text-rose-300 border-rose-500/50 hover:bg-rose-900'
                  }`}
                  title="রিয়েলটাইম ক্লাউড সিঙ্ক (Firebase Firestore)"
                >
                  <Cloud className="w-3.5 h-3.5 text-emerald-400" />
                  <span className={`w-2 h-2 rounded-full ${
                    cloudSyncStatus === 'synced' ? 'bg-emerald-400' : cloudSyncStatus === 'syncing' ? 'bg-amber-400 animate-ping' : 'bg-rose-400'
                  }`} />
                  <span>
                    {cloudSyncStatus === 'synced' ? 'ক্লাউড সিঙ্ক' : cloudSyncStatus === 'syncing' ? 'সিঙ্ক হচ্ছে...' : 'পুনরায় সিঙ্ক'}
                  </span>
                </button>

                <button
                  onClick={() => setIsAdminAuthenticated(false)}
                  className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-xl transition flex items-center gap-1 cursor-pointer"
                  title="প্যানেল লক করুন"
                >
                  <Lock className="w-3.5 h-3.5 text-rose-400" />
                  <span className="hidden sm:inline">লক করুন</span>
                </button>
              </>
            )}
            <button
              onClick={() => setAdminModalOpen(false)}
              className="text-slate-400 hover:text-white p-1.5 rounded-full hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toast Alert */}
        {toastMessage && (
          <div className="bg-emerald-600 text-white text-xs font-bold py-2 px-4 text-center animate-in fade-in flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* IF NOT AUTHENTICATED: SHOW STRONG PASSWORD LOGIN SCREEN */}
        {!isAdminAuthenticated ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center flex-1 max-w-md mx-auto text-center space-y-6">
            <div className="w-16 h-16 rounded-3xl bg-red-50 text-[#D62B3B] flex items-center justify-center shadow-inner text-2xl">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-xl font-black text-slate-900">অ্যাডমিন সিকিউরিটি ও পাসওয়ার্ড ভেরিফিকেশন</h3>
              <p className="text-xs sm:text-sm text-slate-500">
                অননুমোদিত প্রবেশ রোধে গোপন অ্যাডমিন পাসওয়ার্ড প্রদান করুন।
              </p>
            </div>

            <form onSubmit={handleVerifyPassword} className="w-full space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={inputPassword}
                  onChange={(e) => {
                    setInputPassword(e.target.value);
                    setAuthError('');
                  }}
                  placeholder="অ্যাডমিন পাসওয়ার্ড লিখুন"
                  className="w-full p-3.5 pl-4 pr-12 text-sm bg-slate-50 border border-slate-300 rounded-2xl text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#D62B3B] focus:bg-white text-center font-mono tracking-wider shadow-inner"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {authError && (
                <div className="p-3 bg-red-50 text-[#D62B3B] text-xs font-semibold rounded-xl border border-red-100 flex items-center justify-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#D62B3B] hover:bg-[#bd2332] text-white font-bold py-3.5 px-4 rounded-2xl shadow-lg transition active:scale-98 cursor-pointer flex items-center justify-center gap-2 text-sm"
              >
                <Unlock className="w-4 h-4" />
                <span>প্যানেলে প্রবেশ করুন</span>
              </button>
            </form>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-left text-[11px] text-slate-500 space-y-1 w-full">
              <div className="font-bold text-slate-700 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>নিরাপত্তা প্রটোকল সক্রিয়:</span>
              </div>
              <p className="text-[11px] text-slate-600">
                এডমিন প্যানেলটি SHA-256 ক্রিপ্টোগ্রাফিক হ্যাশিং দ্বারা সুরক্ষিত। যেকোনো অননুমোদিত প্রবেশ সম্পূর্ণ নিষিদ্ধ।
              </p>
            </div>
          </div>
        ) : (
          /* AUTHENTICATED: MAIN ADMIN DASHBOARD */
          <>
            {/* Nav Tabs */}
            <div className="flex items-center gap-1 bg-slate-100 p-2 px-4 border-b border-slate-200 overflow-x-auto text-xs font-medium scrollbar-none">
              
              <button
                onClick={() => setActiveTab('courses')}
                className={`py-2.5 px-3.5 rounded-xl transition whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'courses' ? 'bg-[#EA1D2C] text-white font-bold shadow-xs' : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>কোর্সসমূহ ({courses.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('cloudsync')}
                className={`py-2.5 px-3.5 rounded-xl transition whitespace-nowrap flex items-center gap-1.5 cursor-pointer font-bold border ${
                  activeTab === 'cloudsync' 
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md' 
                    : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                }`}
              >
                <Cloud className="w-4 h-4 text-emerald-500" />
                <span>ক্লাউড সিঙ্ক (Firebase)</span>
                <span className={`w-2 h-2 rounded-full ${
                  cloudSyncStatus === 'synced' ? 'bg-emerald-400' : 'bg-amber-400 animate-ping'
                }`} />
              </button>

              <button
                onClick={() => setActiveTab('classes')}
                className={`py-2.5 px-3.5 rounded-xl transition whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'classes' ? 'bg-[#EA1D2C] text-white font-bold shadow-xs' : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>ক্লাস ও ব্যাচ পোর্টাল ({classes.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('categories')}
                className={`py-2.5 px-3.5 rounded-xl transition whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'categories' ? 'bg-[#EA1D2C] text-white font-bold shadow-xs' : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>ক্যাটাগরি ও ফিল্টার ({categories.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('navigation')}
                className={`py-2.5 px-3.5 rounded-xl transition whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'navigation' ? 'bg-[#EA1D2C] text-white font-bold shadow-xs' : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Navigation className="w-4 h-4" />
                <span>ন্যাভিগেশন মেনু ({navItems?.length || 0})</span>
              </button>

              <button
                onClick={() => setActiveTab('sitesettings')}
                className={`py-2.5 px-3.5 rounded-xl transition whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'sitesettings' ? 'bg-[#EA1D2C] text-white font-bold shadow-xs' : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Sliders className="w-4 h-4" />
                <span>ওয়েবসাইট ও ব্র্যান্ড সেটিংস</span>
              </button>

              <button
                onClick={() => setActiveTab('seo')}
                className={`py-2.5 px-3.5 rounded-xl transition whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'seo' ? 'bg-[#EA1D2C] text-white font-bold shadow-xs' : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Globe className="w-4 h-4" />
                <span>SEO ও মেটাডাটা</span>
              </button>

              <button
                onClick={() => setActiveTab('shortcodes')}
                className={`py-2.5 px-3.5 rounded-xl transition whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'shortcodes' ? 'bg-[#EA1D2C] text-white font-bold shadow-xs' : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Code className="w-4 h-4" />
                <span>শর্টকোড ও এম্বেড বিল্ডার</span>
              </button>

              <button
                onClick={() => setActiveTab('images')}
                className={`py-2.5 px-3.5 rounded-xl transition whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'images' ? 'bg-[#EA1D2C] text-white font-bold shadow-xs' : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>ছবি ও ব্যানার গ্যালারি</span>
              </button>

              <button
                onClick={() => setActiveTab('meet')}
                className={`py-2.5 px-3.5 rounded-xl transition whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'meet' ? 'bg-[#EA1D2C] text-white font-bold shadow-xs' : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Video className="w-4 h-4" />
                <span>গুগল মিট লাইভ</span>
                {siteSettings.isMeetLive && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('whatsapp')}
                className={`py-2.5 px-3.5 rounded-xl transition whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'whatsapp' ? 'bg-[#EA1D2C] text-white font-bold shadow-xs' : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                <span>হোয়াটসঅ্যাপ কনফিগ</span>
              </button>

              <button
                onClick={() => setActiveTab('backup')}
                className={`py-2.5 px-3.5 rounded-xl transition whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'backup' ? 'bg-[#EA1D2C] text-white font-bold shadow-xs' : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Download className="w-4 h-4" />
                <span>পাসওয়ার্ড ও ব্যাকআপ</span>
              </button>

              <button
                onClick={() => setActiveTab('guide')}
                className={`py-2.5 px-3.5 rounded-xl transition whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'guide' ? 'bg-[#EA1D2C] text-white font-bold shadow-xs' : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                <HelpCircle className="w-4 h-4" />
                <span>সহজ গাইডলাইন</span>
              </button>
            </div>

            {/* Permanent Cloud Sync Status & Quick Action Bar */}
            <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 text-white px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs border-b border-emerald-500/30">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center shrink-0">
                  <Cloud className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-emerald-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>Firebase ক্লাউড ডাটাবেজ সচল</span>
                    <span className="text-slate-400 font-normal hidden md:inline">
                      ({courses.length} কোর্স • {classes.length} ক্লাস • {categories.length} ক্যাটাগরি)
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-300">
                    {lastSyncedAt ? `সর্বশেষ ক্লাউড আপডেট: ${lastSyncedAt.toLocaleTimeString('bn-BD')}` : 'রিয়েলটাইম স্বয়ংক্রিয় ক্লাউড সিঙ্ক সক্রিয়'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={async () => {
                    showToast('⏳ ক্লাউডে সম্পূর্ণ ডেটা সেভ হচ্ছে...');
                    const ok = await syncAllToCloud();
                    if (ok) {
                      showToast('✅ Firebase ক্লাউডে সবকিছু সফলভাবে সংরক্ষিত হয়েছে!');
                    } else {
                      showToast('⚠️ ক্লাউড সিঙ্ক ব্যর্থ হয়েছে।');
                    }
                  }}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer shadow-xs active:scale-95"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>এখনই ক্লাউডে সেভ করুন</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('cloudsync')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'cloudsync'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'bg-white/10 hover:bg-white/20 text-emerald-200 border border-emerald-500/30'
                  }`}
                >
                  <Cloud className="w-3.5 h-3.5" />
                  <span>ক্লাউড সিঙ্ক ড্যাশবোর্ড</span>
                </button>
              </div>
            </div>

            {/* Tab Body */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
              
              {/* TAB: CLOUD SYNC & FIREBASE DASHBOARD */}
              {activeTab === 'cloudsync' && (
                <div className="space-y-6">
                  {/* Hero Status Card */}
                  <div className="p-6 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl shadow-xl border border-emerald-500/40 relative overflow-hidden">
                    <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                          <span>Google Firebase Firestore ক্লাউড ডেটাবেজ সচল</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
                          <Cloud className="w-7 h-7 text-emerald-400" />
                          <span>রিয়েলটাইম সেন্ট্রাল ক্লাউড সিঙ্ক কন্ট্রোল</span>
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                          আপনার ওয়েবসাইটের কেন্দ্রীয় ডেটাবেজটি এখন ক্লাউডে সংযুক্ত। আপনি যেকোনো ডিভাইস থেকে কোর্স, দাম, গুগল মিট লিংক বা ফোন নম্বর পরিবর্তন করলেই তা স্বয়ংক্রিয়ভাবে ক্লাউডে সংরক্ষিত হবে।
                        </p>
                      </div>

                      {/* Status Indicator */}
                      <div className="p-4 bg-white/5 backdrop-blur-xs rounded-2xl border border-white/10 text-center sm:text-right shrink-0 space-y-1">
                        <span className="text-[11px] text-slate-400 block">বর্তমান ক্লাউড অবস্থা:</span>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-bold text-xs">
                          <span className={`w-2.5 h-2.5 rounded-full ${
                            cloudSyncStatus === 'synced' ? 'bg-emerald-400' : cloudSyncStatus === 'syncing' ? 'bg-amber-400 animate-spin' : 'bg-rose-400'
                          }`} />
                          <span>{cloudSyncStatus === 'synced' ? 'অনলাইন ও সিঙ্কড' : cloudSyncStatus === 'syncing' ? 'সিঙ্ক হচ্ছে...' : 'অফলাইন'}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 block pt-1">
                          সর্বশেষ আপডেট: {lastSyncedAt ? lastSyncedAt.toLocaleTimeString('bn-BD') : 'সদ্য লোড হয়েছে'}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-white/10 mt-6">
                      <button
                        type="button"
                        onClick={async () => {
                          showToast('⏳ ক্লাউড ডেটাবেজে সম্পূর্ণ ডেটা সেভ হচ্ছে...');
                          const success = await syncAllToCloud();
                          if (success) {
                            showToast('☁️ Firebase ক্লাউডে সব কোর্স ও সেটিংস সফলভাবে সংরক্ষিত হয়েছে!');
                          } else {
                            showToast('⚠️ ক্লাউড সিঙ্ক ব্যর্থ হয়েছে। ইন্টারনেট সংযোগ পরীক্ষা করুন।');
                          }
                        }}
                        className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 font-black rounded-2xl text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer shadow-lg active:scale-95"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>সরাসরি ক্লাউডে সেভ করুন (Save to Cloud Now)</span>
                      </button>

                      <button
                        type="button"
                        onClick={async () => {
                          showToast('⏳ ক্লাউড থেকে সর্বশেষ ডেটা আনা হচ্ছে...');
                          const success = await fetchFromCloud();
                          if (success) {
                            showToast('✅ ক্লাউড থেকে সর্বশেষ ডেটা সফলভাবে রিলোড হয়েছে!');
                          } else {
                            showToast('⚠️ ক্লাউড থেকে ডেটা লোড ব্যর্থ হয়েছে।');
                          }
                        }}
                        className="px-5 py-3 bg-white/10 hover:bg-white/20 active:bg-white/30 border border-white/20 text-white font-bold rounded-2xl text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer active:scale-95"
                      >
                        <RefreshCw className="w-4 h-4" />
                        <span>ক্লাউড থেকে ফ্রেশ ডেটা আনুন (Reload from Cloud)</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleDownloadInitialDataTs}
                        className="px-5 py-3 bg-indigo-600/80 hover:bg-indigo-600 active:bg-indigo-700 text-white font-bold rounded-2xl text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer border border-indigo-400/40 active:scale-95"
                      >
                        <Download className="w-4 h-4" />
                        <span>initialData.ts ডাউনলোড করুন (GitHub ব্যাকআপ)</span>
                      </button>
                    </div>
                  </div>

                  {/* Summary Metric Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1">
                      <span className="text-xs text-slate-500 font-bold block">মোট কোর্স</span>
                      <p className="text-2xl font-black text-slate-900">{courses.length} টি</p>
                      <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> ক্লাউডে সক্রিয়
                      </span>
                    </div>

                    <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1">
                      <span className="text-xs text-slate-500 font-bold block">কোর্স ক্যাটাগরি</span>
                      <p className="text-2xl font-black text-slate-900">{categories.length} টি</p>
                      <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> ফিল্টার সিঙ্কড
                      </span>
                    </div>

                    <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1">
                      <span className="text-xs text-slate-500 font-bold block">ক্লাস ও ব্যাচ পোর্টাল</span>
                      <p className="text-2xl font-black text-slate-900">{classes.length} টি</p>
                      <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> ক্লাস ৬-এইচএসসি
                      </span>
                    </div>

                    <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1">
                      <span className="text-xs text-slate-500 font-bold block">গুগল মিট স্ট্যাটাস</span>
                      <p className="text-lg font-black text-slate-900 truncate">
                        {siteSettings.isMeetLive ? '🟢 লাইভ চালু' : '⚪ বন্ধ'}
                      </p>
                      <span className="text-[11px] text-slate-500 truncate block">
                        হোস্ট: {siteSettings.meetHostName}
                      </span>
                    </div>
                  </div>

                  {/* Crucial Instructions for GitHub Pages */}
                  <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300/80 rounded-3xl space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-sm">
                        ⚠️
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-base font-black text-amber-950">
                          গুরুত্বপূর্ণ তথ্য: গিটহাবে (GitHub Pages) কেন আগে পরিবর্তন দেখা যায়নি?
                        </h4>
                        <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
                          আপনি যখন আগে আপনার গিটহাবে সাইটটি আপলোড করেছিলেন, তখন সেই পুরনো কোডে <strong>Firebase ক্লাউড ডাটাবেজের সংযোগ ছিল না</strong>। ফলে আপনার ব্রাউজারে এডিট করলেও অন্য কোনো ভিজিটর ঢুকলে পুরোনো ফাইলই দেখতে পেত।
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
                      <div className="p-4 bg-white rounded-2xl border border-amber-200 space-y-2">
                        <p className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs">১</span>
                          <span>পদ্ধতি ১: সবচেয়ে সহজ ও দ্রুততম উপায়</span>
                        </p>
                        <p className="text-slate-600 leading-relaxed">
                          ১. নিচের <strong>"initialData.ts কোড কপি করুন"</strong> বাটনে চাপুন।<br />
                          ২. আপনার গিটহাব রিপোজিটরিতে ঢুকে <code className="bg-slate-100 px-1.5 py-0.5 rounded text-emerald-700 font-mono font-bold">src/data/initialData.ts</code> ফাইলটি এডিট করে পেস্ট করে দিন এবং Commit করুন।<br />
                          ৩. ব্যস! ১ মিনিটের মধ্যে গিটহাবের সব ভিজিটরের জন্য আপনার এডিট করা সব কোর্স স্থায়ী হয়ে যাবে।
                        </p>
                        <div className="pt-2 flex gap-2">
                          <button
                            type="button"
                            onClick={handleCopyInitialDataTs}
                            className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                          >
                            <Copy className="w-3.5 h-3.5" />
                            <span>কোড কপি করুন</span>
                          </button>
                          <button
                            type="button"
                            onClick={handleDownloadInitialDataTs}
                            className="px-3 py-2 bg-slate-800 hover:bg-black text-white font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer active:scale-95"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>ফাইল ডাউনলোড</span>
                          </button>
                        </div>
                      </div>

                      <div className="p-4 bg-white rounded-2xl border border-amber-200 space-y-2">
                        <p className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs">২</span>
                          <span>পদ্ধতি ২: স্থায়ী সেন্ট্রাল ক্লাউড ইন্টিগ্রেশন</span>
                        </p>
                        <p className="text-slate-600 leading-relaxed">
                          আমরা এই প্রজেক্টের ফাইলে Firebase ক্লাউড কনফিগারেশন লিখে দিয়েছি। আপনি এই সম্পূর্ণ নতুন কোডটি আপনার গিটহাবে আপডেট (Push/Upload) করে দিলে, এর পর থেকে আপনি যে কোনো ফোন/ব্রাউজার থেকে অ্যাডমিন প্যানেলে এডিট করলেই স্বয়ংক্রিয়ভাবে গিটহাবের সাইটেও পরিবর্তন চলে আসবে—আর কখনো কোনো ফাইল আপলোড করতে হবে না!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 1: COURSES MANAGEMENT */}
              {activeTab === 'courses' && (
                <div>
                  {editingCourse ? (
                    /* Course Edit/Create Form */
                    <form onSubmit={handleSaveCourse} className="space-y-4 bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-200">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                        <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                          <Edit3 className="w-4 h-4 text-[#D62B3B]" />
                          <span>{isCreatingNew ? 'নতুন কোর্স যুক্ত করুন' : `কোর্স এডিট করুন: ${editingCourse.title}`}</span>
                        </h3>
                        <button
                          type="button"
                          onClick={() => setEditingCourse(null)}
                          className="text-xs bg-slate-200 hover:bg-slate-300 px-3 py-1.5 rounded-lg text-slate-700 cursor-pointer"
                        >
                          বাতিল
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">কোর্সের নাম (Title)</label>
                          <input
                            type="text"
                            required
                            value={editingCourse.title}
                            onChange={(e) => setEditingCourse({ ...editingCourse, title: e.target.value })}
                            className="w-full text-xs sm:text-sm p-2.5 bg-white border border-slate-300 rounded-xl"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">শিক্ষক / ইন্সট্রাক্টর (Instructor)</label>
                          <input
                            type="text"
                            required
                            value={editingCourse.instructor}
                            onChange={(e) => setEditingCourse({ ...editingCourse, instructor: e.target.value })}
                            className="w-full text-xs sm:text-sm p-2.5 bg-white border border-slate-300 rounded-xl"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">ক্যাটাগরি (Category)</label>
                          <select
                            value={editingCourse.category}
                            onChange={(e) => {
                              const found = categories.find(c => c.id === e.target.value);
                              setEditingCourse({ 
                                ...editingCourse, 
                                category: e.target.value as CourseCategory,
                                categoryName: found?.label || 'অন্যান্য'
                              });
                            }}
                            className="w-full text-xs sm:text-sm p-2.5 bg-white border border-slate-300 rounded-xl"
                          >
                            {categories.filter(c => c.id !== 'all').map(cat => (
                              <option key={cat.id} value={cat.id}>
                                {cat.icon} {cat.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">রেগুলার মূল্য (Regular Price - ৳)</label>
                          <input
                            type="number"
                            required
                            value={editingCourse.regularPrice}
                            onChange={(e) => setEditingCourse({ ...editingCourse, regularPrice: Number(e.target.value) })}
                            className="w-full text-xs sm:text-sm p-2.5 bg-white border border-slate-300 rounded-xl"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">অফার মূল্য (Discount Price - ৳)</label>
                          <input
                            type="number"
                            value={editingCourse.offerPrice || ''}
                            onChange={(e) => setEditingCourse({ ...editingCourse, offerPrice: e.target.value ? Number(e.target.value) : null })}
                            className="w-full text-xs sm:text-sm p-2.5 bg-white border border-slate-300 rounded-xl"
                            placeholder="ছাড় না থাকলে ফাঁকা রাখুন"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">অফার শেষ হওয়ার তারিখ ও সময় (Countdown Date)</label>
                          <input
                            type="datetime-local"
                            value={editingCourse.offerExpiryDate ? editingCourse.offerExpiryDate.slice(0, 16) : ''}
                            onChange={(e) => setEditingCourse({ ...editingCourse, offerExpiryDate: e.target.value ? new Date(e.target.value).toISOString() : null })}
                            className="w-full text-xs sm:text-sm p-2.5 bg-white border border-slate-300 rounded-xl"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold text-slate-700 mb-1">অ্যাফিলিয়েট লিংক (10MS Affiliate Buy URL)</label>
                          <input
                            type="url"
                            required
                            value={editingCourse.affiliateUrl}
                            onChange={(e) => setEditingCourse({ ...editingCourse, affiliateUrl: e.target.value })}
                            className="w-full text-xs sm:text-sm p-2.5 bg-white border border-slate-300 rounded-xl font-mono text-blue-700"
                            placeholder="https://10minuteschool.com/product/xyz?aff=..."
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">প্রোমোকোড / কুপন কোড (Coupon)</label>
                          <input
                            type="text"
                            value={editingCourse.couponCode || ''}
                            onChange={(e) => setEditingCourse({ ...editingCourse, couponCode: e.target.value })}
                            className="w-full text-xs sm:text-sm p-2.5 bg-white border border-slate-300 rounded-xl font-mono uppercase"
                            placeholder="যেমন: PROMO10"
                          />
                        </div>

                        {/* Image Uploader & Preview */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">কোর্স ব্যানার / ছবি (Thumbnail)</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={editingCourse.thumbnail}
                              onChange={(e) => setEditingCourse({ ...editingCourse, thumbnail: e.target.value })}
                              className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-xl"
                              placeholder="ছবির সরাসরি লিংক (URL)"
                            />
                            
                            <input
                              type="file"
                              ref={fileInputRef}
                              accept="image/*"
                              className="hidden"
                              onChange={handleImageFileUpload}
                            />
                            
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="whitespace-nowrap bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-3 py-2.5 rounded-xl transition flex items-center gap-1 cursor-pointer shrink-0"
                            >
                              <Upload className="w-3.5 h-3.5" />
                              <span>আপলোড</span>
                            </button>
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold text-slate-700 mb-1">কোর্সের পূর্ণাঙ্গ বিবরণ (Description)</label>
                          <textarea
                            rows={3}
                            value={editingCourse.fullDescription || ''}
                            onChange={(e) => setEditingCourse({ ...editingCourse, fullDescription: e.target.value })}
                            className="w-full text-xs sm:text-sm p-2.5 bg-white border border-slate-300 rounded-xl"
                            placeholder="কোর্সের বিস্তারিত তথ্য এখানে লিখুন..."
                          />
                        </div>

                        {/* Additional Specifications & Stats */}
                        <div className="sm:col-span-2 bg-white p-4 rounded-xl border border-slate-200 space-y-3">
                          <h4 className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-[#D62B3B]" />
                            <span>কোর্স স্পেসিফিকেশন ও স্ট্যাটস (Specifications & Settings)</span>
                          </h4>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            <div>
                              <label className="block text-[11px] font-bold text-slate-600 mb-1">ব্যাজ (Badge)</label>
                              <input
                                type="text"
                                value={editingCourse.badge || ''}
                                onChange={(e) => setEditingCourse({ ...editingCourse, badge: e.target.value })}
                                className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg"
                                placeholder="যেমন: বেস্টসেলার / হট ডিল"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-slate-600 mb-1">মোট ভিডিও সংখ্যা</label>
                              <input
                                type="number"
                                value={editingCourse.totalVideos || ''}
                                onChange={(e) => setEditingCourse({ ...editingCourse, totalVideos: Number(e.target.value) || 0 })}
                                className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg"
                                placeholder="যেমন: ৮৩"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-slate-600 mb-1">রেটিং (Rating 1-5)</label>
                              <input
                                type="number"
                                step="0.1"
                                min="1"
                                max="5"
                                value={editingCourse.rating || 4.9}
                                onChange={(e) => setEditingCourse({ ...editingCourse, rating: Number(e.target.value) })}
                                className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-slate-600 mb-1">এনরোল্ড শিক্ষার্থী</label>
                              <input
                                type="number"
                                value={editingCourse.enrolledCount || 25000}
                                onChange={(e) => setEditingCourse({ ...editingCourse, enrolledCount: Number(e.target.value) })}
                                className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg"
                              />
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-slate-100 text-xs">
                            <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                              <input
                                type="checkbox"
                                checked={editingCourse.isLifetime ?? true}
                                onChange={(e) => setEditingCourse({ ...editingCourse, isLifetime: e.target.checked })}
                                className="rounded text-[#D62B3B] focus:ring-[#D62B3B] w-4 h-4"
                              />
                              <span>আজীবন অ্যাক্সেস (Lifetime Access)</span>
                            </label>

                            <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                              <input
                                type="checkbox"
                                checked={editingCourse.featured ?? false}
                                onChange={(e) => setEditingCourse({ ...editingCourse, featured: e.target.checked })}
                                className="rounded text-[#D62B3B] focus:ring-[#D62B3B] w-4 h-4"
                              />
                              <span>হোমপেজে সেরা তালিকায় প্রদর্শন (Featured / Best Seller)</span>
                            </label>
                          </div>
                        </div>

                        {/* Key Features (What You'll Get) Editor */}
                        <div className="sm:col-span-2 bg-white p-4 rounded-xl border border-slate-200 space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              <span>কোর্সের মূল সুবিধাসমূহ (What You'll Get - Features)</span>
                            </h4>
                            <button
                              type="button"
                              onClick={() => {
                                const curr = editingCourse.features || [];
                                setEditingCourse({
                                  ...editingCourse,
                                  features: [...curr, 'নতুন সুবিধা বা লেকচার ম্যাটেরিয়াল']
                                });
                              }}
                              className="text-xs bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold px-2.5 py-1 rounded-lg transition cursor-pointer flex items-center gap-1"
                            >
                              <Plus className="w-3 h-3" />
                              <span>নতুন পয়েন্ট যোগ করুন</span>
                            </button>
                          </div>

                          <div className="space-y-2">
                            {(editingCourse.features || []).map((feat, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <span className="text-[11px] font-bold text-slate-400 w-4">{idx + 1}.</span>
                                <input
                                  type="text"
                                  value={feat}
                                  onChange={(e) => {
                                    const updated = [...(editingCourse.features || [])];
                                    updated[idx] = e.target.value;
                                    setEditingCourse({ ...editingCourse, features: updated });
                                  }}
                                  className="flex-1 text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white"
                                  placeholder="যেমন: ৮৩টি সহজ ও আকর্ষণীয় ভিডিও লেকচার"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updated = (editingCourse.features || []).filter((_, i) => i !== idx);
                                    setEditingCourse({ ...editingCourse, features: updated });
                                  }}
                                  className="text-slate-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition cursor-pointer"
                                  title="মুছে ফেলুন"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Syllabus & Modules Editor */}
                        <div className="sm:col-span-2 bg-white p-4 rounded-xl border border-slate-200 space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                              <span>কোর্স সিলেবাস ও মডিউল তালিকা (Syllabus & Modules)</span>
                            </h4>
                            <button
                              type="button"
                              onClick={() => {
                                const curr = editingCourse.syllabus || [];
                                setEditingCourse({
                                  ...editingCourse,
                                  syllabus: [
                                    ...curr,
                                    {
                                      moduleTitle: `মডিউল ${curr.length + 1}: নতুন অধ্যায় শিরোনাম`,
                                      lessonsCount: 6,
                                      topics: ['টপিক ১', 'টপিক ২', 'প্র্যাকটিস টেস্ট']
                                    }
                                  ]
                                });
                              }}
                              className="text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold px-2.5 py-1 rounded-lg transition cursor-pointer flex items-center gap-1"
                            >
                              <Plus className="w-3 h-3" />
                              <span>নতুন মডিউল যোগ করুন</span>
                            </button>
                          </div>

                          <div className="space-y-3">
                            {(editingCourse.syllabus || []).map((mod, mIdx) => (
                              <div key={mIdx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                                <div className="flex items-center justify-between gap-2">
                                  <div className="flex-1">
                                    <label className="block text-[10px] font-bold text-slate-500 mb-0.5">মডিউল শিরোনাম</label>
                                    <input
                                      type="text"
                                      value={mod.moduleTitle}
                                      onChange={(e) => {
                                        const updated = [...(editingCourse.syllabus || [])];
                                        updated[mIdx] = { ...updated[mIdx], moduleTitle: e.target.value };
                                        setEditingCourse({ ...editingCourse, syllabus: updated });
                                      }}
                                      className="w-full text-xs p-1.5 bg-white border border-slate-200 rounded-lg font-bold"
                                    />
                                  </div>
                                  <div className="w-24">
                                    <label className="block text-[10px] font-bold text-slate-500 mb-0.5">লেসন সংখ্যা</label>
                                    <input
                                      type="number"
                                      value={mod.lessonsCount}
                                      onChange={(e) => {
                                        const updated = [...(editingCourse.syllabus || [])];
                                        updated[mIdx] = { ...updated[mIdx], lessonsCount: Number(e.target.value) };
                                        setEditingCourse({ ...editingCourse, syllabus: updated });
                                      }}
                                      className="w-full text-xs p-1.5 bg-white border border-slate-200 rounded-lg"
                                    />
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const updated = (editingCourse.syllabus || []).filter((_, i) => i !== mIdx);
                                      setEditingCourse({ ...editingCourse, syllabus: updated });
                                    }}
                                    className="text-slate-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition cursor-pointer self-end mb-0.5"
                                    title="মডিউল মুছুন"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>

                                <div>
                                  <label className="block text-[10px] font-bold text-slate-500 mb-0.5">টপিকসমূহ (কমা দিয়ে লিখুন)</label>
                                  <input
                                    type="text"
                                    value={(mod.topics || []).join(', ')}
                                    onChange={(e) => {
                                      const updated = [...(editingCourse.syllabus || [])];
                                      updated[mIdx] = {
                                        ...updated[mIdx],
                                        topics: e.target.value.split(',').map(t => t.trim()).filter(Boolean)
                                      };
                                      setEditingCourse({ ...editingCourse, syllabus: updated });
                                    }}
                                    className="w-full text-xs p-1.5 bg-white border border-slate-200 rounded-lg"
                                    placeholder="ভূমিকা, প্র্যাকটিস, লেকচার শিট"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* FAQs Editor */}
                        <div className="sm:col-span-2 bg-white p-4 rounded-xl border border-slate-200 space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                              <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
                              <span>কোর্স সম্পর্কিত সাধারণ প্রশ্নোত্তর (FAQs)</span>
                            </h4>
                            <button
                              type="button"
                              onClick={() => {
                                const curr = editingCourse.faqs || [];
                                setEditingCourse({
                                  ...editingCourse,
                                  faqs: [
                                    ...curr,
                                    {
                                      question: 'কোর্সটি কেনার পর কীভাবে ক্লাস করব?',
                                      answer: 'পেমেন্ট সম্পন্ন করার সাথে সাথে ১০ মিনিট স্কুল অ্যাপ বা ওয়েবসাইটে আপনার অ্যাকাউন্টে ভিডিও লেকচারগুলো আনলক হয়ে যাবে।'
                                    }
                                  ]
                                });
                              }}
                              className="text-xs bg-amber-50 text-amber-800 hover:bg-amber-100 font-bold px-2.5 py-1 rounded-lg transition cursor-pointer flex items-center gap-1"
                            >
                              <Plus className="w-3 h-3" />
                              <span>নতুন FAQ যোগ করুন</span>
                            </button>
                          </div>

                          <div className="space-y-3">
                            {(editingCourse.faqs || []).map((faq, fIdx) => (
                              <div key={fIdx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                                <div className="flex items-center justify-between gap-2">
                                  <input
                                    type="text"
                                    value={faq.question}
                                    onChange={(e) => {
                                      const updated = [...(editingCourse.faqs || [])];
                                      updated[fIdx] = { ...updated[fIdx], question: e.target.value };
                                      setEditingCourse({ ...editingCourse, faqs: updated });
                                    }}
                                    className="w-full text-xs p-1.5 bg-white border border-slate-200 rounded-lg font-bold"
                                    placeholder="প্রশ্ন লিখুন..."
                                  />
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const updated = (editingCourse.faqs || []).filter((_, i) => i !== fIdx);
                                      setEditingCourse({ ...editingCourse, faqs: updated });
                                    }}
                                    className="text-slate-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition cursor-pointer shrink-0"
                                    title="FAQ মুছুন"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                                <textarea
                                  rows={2}
                                  value={faq.answer}
                                  onChange={(e) => {
                                    const updated = [...(editingCourse.faqs || [])];
                                    updated[fIdx] = { ...updated[fIdx], answer: e.target.value };
                                    setEditingCourse({ ...editingCourse, faqs: updated });
                                  }}
                                  className="w-full text-xs p-1.5 bg-white border border-slate-200 rounded-lg"
                                  placeholder="উত্তর লিখুন..."
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                        <button
                          type="button"
                          onClick={() => setEditingCourse(null)}
                          className="text-xs bg-slate-200 hover:bg-slate-300 px-4 py-2.5 rounded-xl text-slate-700 cursor-pointer font-bold"
                        >
                          বাতিল
                        </button>
                        <button
                          type="submit"
                          className="bg-[#D62B3B] hover:bg-[#bd2332] text-white text-xs sm:text-sm font-bold py-2.5 px-6 rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer"
                        >
                          <Save className="w-4 h-4" />
                          <span>সংরক্ষণ করুন (Save Course)</span>
                        </button>
                      </div>
                    </form>
                  ) : (
                    /* Course List View */
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                        <div className="relative flex-1">
                          <input
                            type="text"
                            value={searchFilter}
                            onChange={(e) => setSearchFilter(e.target.value)}
                            placeholder="কোর্স বা শিক্ষকের নাম সার্চ করুন..."
                            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl"
                          />
                          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                        </div>

                        <button
                          onClick={handleStartCreate}
                          className="bg-[#D62B3B] hover:bg-[#bd2332] text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                        >
                          <Plus className="w-4 h-4" />
                          <span>নতুন কোর্স যুক্ত করুন</span>
                        </button>
                      </div>

                      {/* Course Cards Table/Grid */}
                      <div className="grid grid-cols-1 divide-y divide-slate-100 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
                        {adminFilteredCourses.map((course) => {
                          const currentPrice = getCurrentPrice(course);
                          const isDiscounted = isOfferActive(course);

                          return (
                            <div key={course.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/80 transition">
                              <div className="flex items-center gap-3 min-w-0">
                                <img
                                  src={course.thumbnail}
                                  alt={course.title}
                                  className="w-14 h-10 object-cover rounded-lg bg-slate-100 shrink-0 border border-slate-200"
                                />
                                <div className="min-w-0">
                                  <div className="flex items-center gap-2">
                                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 truncate">{course.title}</h4>
                                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full shrink-0">
                                      {course.categoryName}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                                    <span>{course.instructor}</span>
                                    <span>•</span>
                                    <span className="font-bold text-[#D62B3B]">{formatBDT(currentPrice)}</span>
                                    {isDiscounted && (
                                      <span className="line-through text-slate-400 text-[10px]">
                                        {formatBDT(course.regularPrice)}
                                      </span>
                                    )}
                                    {course.couponCode && (
                                      <span className="bg-amber-100 text-amber-800 text-[10px] px-1.5 py-0.2 rounded font-mono font-bold">
                                        {course.couponCode}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* Action Buttons */}
                              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                                <button
                                  onClick={() => openCoursePage(course)}
                                  className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition cursor-pointer"
                                  title="ভিউ পেজ দেখুন"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </button>

                                <button
                                  onClick={() => {
                                    setSelectedShortcodeCourseId(course.id);
                                    setActiveTab('shortcodes');
                                  }}
                                  className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition cursor-pointer"
                                  title="শর্টকোড তৈরি করুন"
                                >
                                  <Code className="w-4 h-4" />
                                </button>

                                <button
                                  onClick={() => setEditingCourse(course)}
                                  className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition cursor-pointer"
                                  title="এডিট করুন"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>

                                <button
                                  onClick={() => {
                                    if (confirm(`আপনি কি "${course.title}" কোর্সটি ডিলিট করতে চান?`)) {
                                      deleteCourse(course.id);
                                      showToast('কোর্সটি ডিলিট করা হয়েছে');
                                    }
                                  }}
                                  className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                                  title="ডিলিট করুন"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB: CLASS PORTALS & BATCHES */}
              {activeTab === 'classes' && (
                <div className="space-y-6">
                  
                  <div className="bg-gradient-to-r from-red-50 to-amber-50 p-4 rounded-2xl border border-red-100 flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-[#EA1D2C]" />
                        <span>ক্লাস ও ব্যাচ ভিত্তিক পেজ ব্যবস্থাপনা (Class Portals)</span>
                      </h4>
                      <p className="text-xs text-slate-600 mt-1">
                        ষষ্ঠ থেকে এইচএসসি ও এডমিশন পর্যন্ত প্রতিটি ক্লাসের নাম, বিষয়সমূহ (Subjects), বর্ণনা ও ট্যাগ এডিট করুন।
                      </p>
                    </div>
                  </div>

                  {/* Editing a specific class */}
                  {editingClass ? (
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                        <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                          <Edit3 className="w-4 h-4 text-[#EA1D2C]" />
                          <span>{editingClass.title} এডিট করুন</span>
                        </h4>
                        <button
                          onClick={() => setEditingClass(null)}
                          className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">ক্লাসের পুরো নাম (Title)</label>
                          <input
                            type="text"
                            value={editingClass.title}
                            onChange={(e) => setEditingClass({ ...editingClass, title: e.target.value })}
                            className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">সংক্ষিপ্ত নাম (মেন্যু ও বাটনের জন্য)</label>
                          <input
                            type="text"
                            value={editingClass.shortTitle}
                            onChange={(e) => setEditingClass({ ...editingClass, shortTitle: e.target.value })}
                            className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">ব্যাজ টেক্সট (Badge)</label>
                          <input
                            type="text"
                            value={editingClass.gradeBadge}
                            onChange={(e) => setEditingClass({ ...editingClass, gradeBadge: e.target.value })}
                            className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">ইমোজি আইকন</label>
                          <input
                            type="text"
                            value={editingClass.icon}
                            onChange={(e) => setEditingClass({ ...editingClass, icon: e.target.value })}
                            className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl text-center text-lg"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block font-bold text-slate-700 mb-1">ট্যাগলাইন (Hero Tagline)</label>
                          <input
                            type="text"
                            value={editingClass.tagline}
                            onChange={(e) => setEditingClass({ ...editingClass, tagline: e.target.value })}
                            className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block font-bold text-slate-700 mb-1">বিস্তারিত বর্ণনা</label>
                          <textarea
                            rows={2}
                            value={editingClass.description}
                            onChange={(e) => setEditingClass({ ...editingClass, description: e.target.value })}
                            className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl"
                          />
                        </div>

                        {/* Subjects Management */}
                        <div className="sm:col-span-2 space-y-2">
                          <label className="block font-bold text-slate-700">অন্তর্ভুক্ত বিষয়সমূহ (Subjects):</label>
                          
                          <div className="flex flex-wrap gap-2 items-center">
                            {editingClass.subjects.map((sub, sIdx) => (
                              <span
                                key={sIdx}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-50 text-[#EA1D2C] border border-red-200 rounded-lg text-xs font-bold"
                              >
                                <span>{sub}</span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updatedSubs = editingClass.subjects.filter((_, i) => i !== sIdx);
                                    setEditingClass({ ...editingClass, subjects: updatedSubs });
                                  }}
                                  className="text-red-400 hover:text-red-700 cursor-pointer"
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center gap-2 pt-2">
                            <input
                              type="text"
                              value={newSubjectInput}
                              onChange={(e) => setNewSubjectInput(e.target.value)}
                              placeholder="নতুন বিষয় লিখুন (যেমন: হিসাববিজ্ঞান / আইসিটি)"
                              className="flex-1 p-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                if (newSubjectInput.trim()) {
                                  setEditingClass({
                                    ...editingClass,
                                    subjects: [...editingClass.subjects, newSubjectInput.trim()]
                                  });
                                  setNewSubjectInput('');
                                }
                              }}
                              className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold cursor-pointer"
                            >
                              যোগ করুন
                            </button>
                          </div>
                        </div>

                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingClass(null)}
                          className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl"
                        >
                          বাতিল
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            updateClassPortal(editingClass);
                            setEditingClass(null);
                            showToast(`✅ "${editingClass.title}" এর তথ্য সেভ হয়েছে!`);
                          }}
                          className="px-5 py-2 bg-[#EA1D2C] text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>সেভ করুন</span>
                        </button>
                      </div>
                    </div>
                  ) : null}

                  {/* List of Classes */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {classes.map((cls) => (
                      <div
                        key={cls.id}
                        className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-2xl">{cls.icon}</span>
                              <div>
                                <h5 className="font-bold text-sm text-slate-900">{cls.title}</h5>
                                <span className="text-[10px] bg-red-50 text-[#EA1D2C] font-bold px-2 py-0.5 rounded-full">
                                  {cls.gradeBadge}
                                </span>
                              </div>
                            </div>
                          </div>

                          <p className="text-xs text-slate-500 line-clamp-2">{cls.tagline}</p>

                          <div className="flex flex-wrap gap-1 pt-1">
                            {cls.subjects.map((sub, i) => (
                              <span key={i} className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
                                {sub}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-[10px] font-mono text-slate-400">ID: {cls.id}</span>
                          <button
                            onClick={() => setEditingClass(cls)}
                            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg transition flex items-center gap-1 cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>এডিট করুন</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              )}

              {/* TAB 2: CATEGORY & FILTER REORDERING / CRUD */}
              {activeTab === 'categories' && (
                <div className="space-y-6">
                  
                  {/* Category Reorder Guidelines */}
                  <div className="bg-gradient-to-r from-red-50 to-amber-50 p-4 rounded-2xl border border-red-100 flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                        <SlidersHorizontal className="w-4 h-4 text-[#D62B3B]" />
                        <span>হোমপেজ ও ফিল্টার ক্রম নিয়ন্ত্রণ (Dynamic Category Customizer)</span>
                      </h4>
                      <p className="text-xs text-slate-600 mt-1">
                        নিচের তালিকা থেকে যেকোনো ক্যাটাগরি উপরে বা নিচে (⬆️/⬇️) সরিয়ে সাজাতে পারেন। আপনি ইচ্ছা করলে নতুন ক্যাটাগরি যোগ করতে পারবেন, এডিট করতে পারবেন অথবা বাদও দিতে পারবেন।
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        if (confirm('আপনি কি ক্যাটাগরি তালিকা ডিফল্ট অবস্থায় ফিরিয়ে নিতে চান?')) {
                          resetCategories();
                          showToast('✅ ক্যাটাগরি ডিফল্ট ক্রমানুসারে রিসেট করা হয়েছে');
                        }
                      }}
                      className="text-[11px] text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-1.5 rounded-xl font-bold transition shrink-0 cursor-pointer shadow-2xs"
                    >
                      ডিফল্ট রিসেট
                    </button>
                  </div>

                  {/* Add New Category Form */}
                  <form onSubmit={handleAddCategory} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                    <h5 className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                      <Plus className="w-4 h-4 text-[#D62B3B]" />
                      <span>নতুন ক্যাটাগরি যোগ করুন:</span>
                    </h5>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">ইমোজি আইকন</label>
                        <input
                          type="text"
                          value={newCatIcon}
                          onChange={(e) => setNewCatIcon(e.target.value)}
                          className="w-full text-center text-base p-2 bg-white border border-slate-300 rounded-xl"
                          placeholder="🗣️"
                        />
                      </div>

                      <div className="sm:col-span-6">
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">ক্যাটাগরির নাম (বাংলা)</label>
                        <input
                          type="text"
                          required
                          value={newCatLabel}
                          onChange={(e) => setNewCatLabel(e.target.value)}
                          className="w-full text-xs sm:text-sm p-2 bg-white border border-slate-300 rounded-xl"
                          placeholder="যেমন: পাইথন প্রোগ্রামিং / IELTS"
                        />
                      </div>

                      <div className="sm:col-span-4 flex items-end">
                        <button
                          type="submit"
                          className="w-full bg-[#D62B3B] hover:bg-[#bd2332] text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                          <span>ক্যাটাগরি যুক্ত করুন</span>
                        </button>
                      </div>
                    </div>
                  </form>

                  {/* Current Ordered Category List */}
                  <div className="space-y-2">
                    <h5 className="font-bold text-xs text-slate-700 flex items-center justify-between">
                      <span>বর্তমানে সক্রিয় ক্যাটাগরি ক্রম (হোমপেজে যেভাবে দেখাবে):</span>
                      <span className="text-[11px] text-slate-400">মোট: {categories.length} টি</span>
                    </h5>

                    <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 overflow-hidden shadow-2xs">
                      {categories.map((cat, idx) => {
                        const isFirst = idx === 0;
                        const isLast = idx === categories.length - 1;
                        const isAll = cat.id === 'all';
                        const isEditing = editingCatId === cat.id;

                        return (
                          <div 
                            key={cat.id} 
                            className={`p-3.5 flex items-center justify-between gap-3 transition ${
                              cat.enabled === false ? 'bg-slate-50 opacity-60' : 'hover:bg-slate-50/80'
                            }`}
                          >
                            {/* Category Info or Inline Edit */}
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <span className="w-6 text-center font-mono font-bold text-xs text-slate-400">
                                #{idx + 1}
                              </span>

                              {isEditing ? (
                                <div className="flex items-center gap-2 flex-1 max-w-md">
                                  <input
                                    type="text"
                                    value={editingCatIcon}
                                    onChange={(e) => setEditingCatIcon(e.target.value)}
                                    className="w-10 text-center p-1.5 text-sm bg-white border border-slate-300 rounded-lg"
                                  />
                                  <input
                                    type="text"
                                    value={editingCatLabel}
                                    onChange={(e) => setEditingCatLabel(e.target.value)}
                                    className="flex-1 p-1.5 text-xs bg-white border border-slate-300 rounded-lg"
                                  />
                                  <button
                                    onClick={() => handleSaveEditCategory(cat.id)}
                                    className="p-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
                                  >
                                    <Check className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => setEditingCatId(null)}
                                    className="p-1.5 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              ) : (
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <span className="text-lg">{cat.icon}</span>
                                  <div>
                                    <h6 className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                                      {cat.label}
                                    </h6>
                                    <span className="text-[10px] text-slate-400 font-mono">ID: {cat.id}</span>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Reorder and Action Buttons */}
                            <div className="flex items-center gap-1.5 shrink-0">
                              {/* Move Up */}
                              <button
                                onClick={() => {
                                  reorderCategory(cat.id, 'up');
                                  showToast('ক্যাটাগরি উপরে নেওয়া হয়েছে ⬆️');
                                }}
                                disabled={isFirst}
                                className="p-1.5 text-slate-500 hover:text-slate-900 disabled:opacity-20 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                                title="উপরে আনুন"
                              >
                                <ArrowUp className="w-4 h-4" />
                              </button>

                              {/* Move Down */}
                              <button
                                onClick={() => {
                                  reorderCategory(cat.id, 'down');
                                  showToast('ক্যাটাগরি নিচে নেওয়া হয়েছে ⬇️');
                                }}
                                disabled={isLast}
                                className="p-1.5 text-slate-500 hover:text-slate-900 disabled:opacity-20 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                                title="নিচে নিন"
                              >
                                <ArrowDown className="w-4 h-4" />
                              </button>

                              {/* Edit Button */}
                              {!isEditing && (
                                <button
                                  onClick={() => {
                                    setEditingCatId(cat.id);
                                    setEditingCatLabel(cat.label);
                                    setEditingCatIcon(cat.icon);
                                  }}
                                  className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition cursor-pointer"
                                  title="এডিট করুন"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>
                              )}

                              {/* Delete Button (Allowed for custom or non-'all') */}
                              {!isAll && (
                                <button
                                  onClick={() => {
                                    if (confirm(`আপনি কি "${cat.label}" ক্যাটাগরি বাদ দিতে চান?`)) {
                                      deleteCategory(cat.id);
                                      showToast('ক্যাটাগরি মুছে ফেলা হয়েছে');
                                    }
                                  }}
                                  className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                                  title="বাদ দিন / ডিলিট"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              )}

              {/* TAB: DYNAMIC NAVIGATION BUILDER */}
              {activeTab === 'navigation' && (
                <div className="space-y-6">
                  {/* Explanatory Banner */}
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <h4 className="font-bold text-sm text-blue-900 flex items-center gap-2">
                        <Navigation className="w-4 h-4 text-blue-600" />
                        <span>ডায়নামিক হেডার নেভিগেশন মেনু কন্ট্রোলার</span>
                      </h4>
                      <p className="text-xs text-blue-700 leading-relaxed">
                        ওয়েবসাইটের মূল নেভিগেশন বার পুরোপুরি আপনার নিয়ন্ত্রণে। যেকোনো আইটেম ড্রপডাউন, পেজ ভিউ, কোর্স ক্যাটাগরি অথবা এক্সটার্নাল লিংকে যুক্ত করতে পারেন। আইটেমের ক্রম উপরে-নিচে পরিবর্তন এবং অন/অফ করতে পারেন।
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm('আপনি কি নেভিগেশন মেনু পূর্বনির্ধারিত ডিফল্ট অবস্থায় রিসেট করতে চান?')) {
                          resetNavItems();
                          showToast('🔄 নেভিগেশন মেনু ডিফল্ট অবস্থায় রিসেট করা হয়েছে!');
                        }
                      }}
                      className="shrink-0 bg-white hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold py-2 px-3 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>ডিফল্ট রিসেট</span>
                    </button>
                  </div>

                  {/* Add New Nav Item Form */}
                  <form onSubmit={handleAddNavItem} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                    <h5 className="font-bold text-xs text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-1.5">
                      <Plus className="w-4 h-4 text-emerald-600" />
                      <span>নতুন নেভিগেশন মেনু আইটেম যুক্ত করুন</span>
                    </h5>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">মেনু লেবেল (নাম) *</label>
                        <input
                          type="text"
                          required
                          value={newNavLabel}
                          onChange={(e) => setNewNavLabel(e.target.value)}
                          placeholder="যেমন: এইচএসসি ক্র্যাশ কোর্স"
                          className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">আইকন / ইমোজি</label>
                        <input
                          type="text"
                          value={newNavIcon}
                          onChange={(e) => setNewNavIcon(e.target.value)}
                          placeholder="🎓 বা ⚡ বা 📚"
                          className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">মেনু টাইপ (Action Type)</label>
                        <select
                          value={newNavType}
                          onChange={(e) => setNewNavType(e.target.value as any)}
                          className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold"
                        >
                          <option value="dropdown">🔽 ড্রপডাউন মেনু (ক্লাস ৬-১২ পোর্টাল)</option>
                          <option value="view">📄 পেজ ভিউ (কোর্স/ব্লগ/রিভিউ/এফএকিউ)</option>
                          <option value="category">🏷️ ক্যাটাগরি ফিল্টার (HSC/Admission/Skill)</option>
                          <option value="link">🔗 বাহ্যিক লিংক বা URL</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">টার্গেট ভিউ / লিংক / ক্যাটাগরি</label>
                        {newNavType === 'dropdown' ? (
                          <input
                            type="text"
                            disabled
                            value="classes-dropdown"
                            className="w-full p-2.5 bg-slate-100 border border-slate-200 text-slate-500 rounded-xl font-mono text-[11px]"
                          />
                        ) : newNavType === 'view' ? (
                          <select
                            value={newNavTarget}
                            onChange={(e) => setNewNavTarget(e.target.value)}
                            className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold"
                          >
                            <option value="home">হোমপেজ (Home)</option>
                            <option value="courses">সকল কোর্স ক্যাটালগ</option>
                            <option value="blogs">ব্লগ ও গাইড</option>
                            <option value="reviews">শিক্ষার্থীদের রিভিউ</option>
                            <option value="faq">সাধারণ জিজ্ঞাসা (FAQ)</option>
                          </select>
                        ) : newNavType === 'category' ? (
                          <select
                            value={newNavTarget}
                            onChange={(e) => setNewNavTarget(e.target.value)}
                            className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold"
                          >
                            <option value="all">সব কোর্স (All)</option>
                            <option value="hsc">এইচএসসি (HSC)</option>
                            <option value="admission">এডমিশন (Admission)</option>
                            <option value="skill">স্কিল ও ফ্রিল্যান্সিং</option>
                            <option value="language">ভাষা শিক্ষা</option>
                            <option value="class-9-10">ক্লাস ৯-১০ (SSC)</option>
                            <option value="class-6-8">ক্লাস ৬-৮</option>
                            <option value="islamic">ইসলামিক স্টাডিজ</option>
                          </select>
                        ) : (
                          <input
                            type="text"
                            value={newNavTarget}
                            onChange={(e) => setNewNavTarget(e.target.value)}
                            placeholder="https://example.com বা #section"
                            className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono"
                          />
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">ব্যাজ টেক্সট (ঐচ্ছিক)</label>
                        <input
                          type="text"
                          value={newNavBadge}
                          onChange={(e) => setNewNavBadge(e.target.value)}
                          placeholder="যেমন: অফার বা নতুন বা HOT"
                          className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                        />
                      </div>

                      {newNavType === 'link' && (
                        <div className="flex items-center gap-2 pt-6">
                          <input
                            type="checkbox"
                            id="newNavIsExternal"
                            checked={newNavIsExternal}
                            onChange={(e) => setNewNavIsExternal(e.target.checked)}
                            className="w-4 h-4 rounded text-blue-600"
                          />
                          <label htmlFor="newNavIsExternal" className="font-bold text-slate-700 cursor-pointer">
                            নতুন ট্যাবে খুলবে (New Tab)
                          </label>
                        </div>
                      )}

                      <div className="flex items-end sm:col-start-3 justify-end">
                        <button
                          type="submit"
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <Plus className="w-4 h-4" />
                          <span>মেনুতে যুক্ত করুন</span>
                        </button>
                      </div>
                    </div>
                  </form>

                  {/* Current Nav Items List */}
                  <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
                    <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                      <h5 className="font-bold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                        <Compass className="w-4 h-4 text-slate-600" />
                        <span>বর্তমান নেভিগেশন আইটেমসমূহ ({navItems.length} টি)</span>
                      </h5>
                      <span className="text-[11px] text-slate-500">হেডারে বাম থেকে ডানে যেভাবে প্রদর্শিত হবে</span>
                    </div>

                    <div className="divide-y divide-slate-100">
                      {navItems.map((item, index) => {
                        const isEditing = editingNavId === item.id;
                        return (
                          <div key={item.id} className="p-3.5 sm:p-4 hover:bg-slate-50 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            {isEditing ? (
                              <div className="flex-1 grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
                                <input
                                  type="text"
                                  value={editingNavLabel}
                                  onChange={(e) => setEditingNavLabel(e.target.value)}
                                  placeholder="লেবেল"
                                  className="p-2 bg-white border border-blue-400 rounded-lg font-bold"
                                />
                                <input
                                  type="text"
                                  value={editingNavIcon}
                                  onChange={(e) => setEditingNavIcon(e.target.value)}
                                  placeholder="আইকন"
                                  className="p-2 bg-white border border-slate-300 rounded-lg"
                                />
                                <input
                                  type="text"
                                  value={editingNavTarget}
                                  onChange={(e) => setEditingNavTarget(e.target.value)}
                                  placeholder="টার্গেট ভিউ বা লিংক"
                                  className="p-2 bg-white border border-slate-300 rounded-lg font-mono text-[11px]"
                                />
                                <input
                                  type="text"
                                  value={editingNavBadge}
                                  onChange={(e) => setEditingNavBadge(e.target.value)}
                                  placeholder="ব্যাজ"
                                  className="p-2 bg-white border border-slate-300 rounded-lg"
                                />
                              </div>
                            ) : (
                              <div className="flex items-center gap-3">
                                <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 text-xs font-bold flex items-center justify-center shrink-0">
                                  {index + 1}
                                </span>
                                <span className="text-base shrink-0">{item.icon || '🔗'}</span>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="font-bold text-slate-900 text-xs sm:text-sm">{item.label}</span>
                                    {item.badgeText && (
                                      <span className="bg-[#D62B3B] text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full">
                                        {item.badgeText}
                                      </span>
                                    )}
                                    {!item.enabled && (
                                      <span className="bg-slate-200 text-slate-600 text-[9px] font-bold px-1.5 py-0.2 rounded-full">
                                        লুকানো (Hidden)
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                                    <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700 font-mono">
                                      {item.type}
                                    </span>
                                    <span>→</span>
                                    <span className="font-mono text-slate-600 truncate max-w-xs">
                                      {item.target}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )}

                            <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto">
                              {isEditing ? (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => handleSaveEditNavItem(item.id)}
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-1.5 px-3 rounded-lg flex items-center gap-1 cursor-pointer"
                                  >
                                    <Save className="w-3.5 h-3.5" />
                                    <span>সংরক্ষণ</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setEditingNavId(null)}
                                    className="bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold py-1.5 px-2.5 rounded-lg cursor-pointer"
                                  >
                                    বাতিল
                                  </button>
                                </>
                              ) : (
                                <>
                                  {/* Toggle visibility */}
                                  <button
                                    type="button"
                                    onClick={() => updateNavItem(item.id, { enabled: !item.enabled })}
                                    title={item.enabled ? 'হাইড করুন' : 'দৃশ্যমান করুন'}
                                    className={`p-1.5 rounded-lg border text-xs font-bold cursor-pointer transition ${
                                      item.enabled 
                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' 
                                        : 'bg-slate-100 text-slate-500 border-slate-300 hover:bg-slate-200'
                                    }`}
                                  >
                                    {item.enabled ? 'দৃশ্যমান' : 'হাইড'}
                                  </button>

                                  {/* Reorder Up */}
                                  <button
                                    type="button"
                                    disabled={index === 0}
                                    onClick={() => reorderNavItem(item.id, 'up')}
                                    title="উপরে নিন"
                                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                                  >
                                    ▲
                                  </button>

                                  {/* Reorder Down */}
                                  <button
                                    type="button"
                                    disabled={index === navItems.length - 1}
                                    onClick={() => reorderNavItem(item.id, 'down')}
                                    title="নিচে নিন"
                                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                                  >
                                    ▼
                                  </button>

                                  {/* Edit */}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setEditingNavId(item.id);
                                      setEditingNavLabel(item.label);
                                      setEditingNavTarget(item.target);
                                      setEditingNavIcon(item.icon || '🔗');
                                      setEditingNavBadge(item.badgeText || '');
                                    }}
                                    title="সম্পাদনা"
                                    className="p-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 cursor-pointer"
                                  >
                                    <Edit3 className="w-3.5 h-3.5" />
                                  </button>

                                  {/* Delete */}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (confirm(`আপনি কি নিশ্চিত "${item.label}" নেভিগেশন মেনু আইটেমটি ডিলিট করতে চান?`)) {
                                        deleteNavItem(item.id);
                                        showToast('🗑️ নেভিগেশন আইটেম মুছে ফেলা হয়েছে!');
                                      }
                                    }}
                                    title="ডিলিট"
                                    className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 cursor-pointer"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: SITE SETTINGS & BRANDING */}
              {activeTab === 'sitesettings' && (
                <div className="space-y-6">
                  
                  <div className="bg-gradient-to-r from-red-50 to-slate-50 p-4 rounded-2xl border border-red-100">
                    <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-[#EA1D2C]" />
                      <span>ওয়েবসাইটের লোগো, শিরোনাম ও সকল টেক্সট কাস্টমাইজার</span>
                    </h4>
                    <p className="text-xs text-slate-600 mt-1">
                      উপরের বামের লোগো থেকে শুরু করে হেডলাইন, ব্যানার নোটিশ ও ফুটার তথ্য নিজের ইচ্ছামতো পরিবর্তন করুন। যেকোনো পরিবর্তন সাথে সাথে কার্যকর হবে।
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Header & Logo Customization */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                        <h5 className="font-bold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                          <span>🏷️ হেডার ব্র্যান্ড লোগো স্টুডিও</span>
                        </h5>
                        <span className="text-[10px] text-slate-400 font-bold">লাইভ প্রিভিউ</span>
                      </div>

                      {/* Live Brand Logo Preview Box */}
                      <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">লোগো লাইভ প্রিভিউ</span>
                          <div className="p-2 bg-white rounded-xl border border-slate-200 shadow-2xs inline-block">
                            <BrandLogo size="md" />
                          </div>
                        </div>
                        <div className="text-right sm:text-left text-xs text-slate-500">
                          <p className="font-semibold text-slate-700">হেডারে প্রদর্শিত রূপ</p>
                          <p className="text-[11px]">লোগো পরিবর্তন করলে সাইটের সর্বত্র আপডেট হবে।</p>
                        </div>
                      </div>

                      {/* Logo Type Selector */}
                      <div className="space-y-1.5">
                        <label className="block font-bold text-slate-700 text-xs">লোগো মোড নির্বাচন করুন:</label>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <button
                            type="button"
                            onClick={() => updateSiteSettings({ logoType: 'text_badge' })}
                            className={`p-2.5 rounded-xl font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                              siteSettings.logoType !== 'custom_image'
                                ? 'bg-red-50 text-[#EA1D2C] border-2 border-[#EA1D2C]'
                                : 'bg-slate-50 text-slate-700 border border-slate-200'
                            }`}
                          >
                            <span>🎨 ১০ মিনিট স্কুল ভেক্টর</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => updateSiteSettings({ logoType: 'custom_image' })}
                            className={`p-2.5 rounded-xl font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                              siteSettings.logoType === 'custom_image'
                                ? 'bg-red-50 text-[#EA1D2C] border-2 border-[#EA1D2C]'
                                : 'bg-slate-50 text-slate-700 border border-slate-200'
                            }`}
                          >
                            <span>🖼️ কাস্টম ইমেজ লোগো</span>
                          </button>
                        </div>
                      </div>

                      {/* If Custom Image Logo */}
                      {siteSettings.logoType === 'custom_image' ? (
                        <div className="p-3 bg-red-50/50 rounded-xl border border-red-100 space-y-3 text-xs">
                          <div>
                            <label className="block font-bold text-slate-700 mb-1">কাস্টম লোগো ছবি আপলোড করুন</label>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={siteSettings.customLogoUrl || ''}
                                onChange={(e) => updateSiteSettings({ customLogoUrl: e.target.value })}
                                placeholder="https://... ইমেজ লিংক অথবা ফাইল দিন"
                                className="flex-1 p-2 bg-white border border-slate-300 rounded-xl text-xs"
                              />
                              <button
                                type="button"
                                onClick={() => logoFileInputRef.current?.click()}
                                className="bg-[#EA1D2C] hover:bg-[#bd2332] text-white font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1 cursor-pointer shrink-0"
                              >
                                <Upload className="w-3.5 h-3.5" />
                                <span>আপলোড</span>
                              </button>
                              <input
                                type="file"
                                ref={logoFileInputRef}
                                onChange={handleLogoFileUpload}
                                accept="image/*"
                                className="hidden"
                              />
                            </div>
                            <p className="text-[10px] text-slate-500 mt-1">স্বচ্ছ PNG বা SVG লোগো ছবি সবচেয়ে ভালো দেখায়।</p>
                          </div>
                        </div>
                      ) : (
                        /* If Vector 10MS Logo */
                        <div className="grid grid-cols-2 gap-2.5 text-xs">
                          <div>
                            <label className="block font-bold text-slate-700 mb-1">ব্যাজ নাম্বার</label>
                            <input
                              type="text"
                              value={siteSettings.logoBadgeNumber || '10'}
                              onChange={(e) => updateSiteSettings({ logoBadgeNumber: e.target.value })}
                              className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl font-black text-center text-red-600"
                            />
                          </div>

                          <div>
                            <label className="block font-bold text-slate-700 mb-1">লোগো ১ম লাইন</label>
                            <input
                              type="text"
                              value={siteSettings.logoMainText || 'MINUTE'}
                              onChange={(e) => updateSiteSettings({ logoMainText: e.target.value })}
                              className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl font-bold"
                            />
                          </div>

                          <div>
                            <label className="block font-bold text-slate-700 mb-1">লোগো ২য় লাইন</label>
                            <input
                              type="text"
                              value={siteSettings.logoSubText || 'SCHOOL'}
                              onChange={(e) => updateSiteSettings({ logoSubText: e.target.value })}
                              className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl font-bold"
                            />
                          </div>

                          <div>
                            <label className="block font-bold text-slate-700 mb-1">সাব-ডোমেন / স্লোগান</label>
                            <input
                              type="text"
                              value={siteSettings.logoBottomText || '10mscourse.shop'}
                              onChange={(e) => updateSiteSettings({ logoBottomText: e.target.value })}
                              className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl font-mono text-[11px]"
                            />
                          </div>
                        </div>
                      )}

                      {/* Header Notice Banner */}
                      <div className="pt-2 border-t border-slate-100 space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <label className="font-bold text-slate-700">টপ নোটিশ বার টেক্সট</label>
                          <button
                            type="button"
                            onClick={() => updateSiteSettings({ isHeaderNoticeActive: !siteSettings.isHeaderNoticeActive })}
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold cursor-pointer ${
                              siteSettings.isHeaderNoticeActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                            }`}
                          >
                            {siteSettings.isHeaderNoticeActive ? 'সক্রিয় (Active)' : 'বন্ধ (Hidden)'}
                          </button>
                        </div>
                        <input
                          type="text"
                          value={siteSettings.headerNotice}
                          onChange={(e) => updateSiteSettings({ headerNotice: e.target.value })}
                          className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl"
                        />
                      </div>
                    </div>

                    {/* Countdown Banner Customization Settings */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                        <h5 className="font-bold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                          <span>⏱️ ডিসকাউন্ট অফার কাউন্টডাউন টাইমার</span>
                        </h5>
                        <button
                          type="button"
                          onClick={() => updateSiteSettings({ showCountdownBanner: !siteSettings.showCountdownBanner })}
                          className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition ${
                            siteSettings.showCountdownBanner !== false
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {siteSettings.showCountdownBanner !== false ? '✅ টাইমার চালু (ON)' : '❌ টাইমার বন্ধ (OFF)'}
                        </button>
                      </div>

                      {siteSettings.showCountdownBanner !== false && (
                        <div className="space-y-3 text-xs pt-1">
                          <div>
                            <label className="block font-bold text-slate-700 mb-1">কাউন্টডাউন অফার টেক্সট</label>
                            <input
                              type="text"
                              value={siteSettings.countdownBannerText || ''}
                              onChange={(e) => updateSiteSettings({ countdownBannerText: e.target.value })}
                              placeholder="যেমন: এইচএসসি ও এডমিশন স্পেশাল অফার চলছে! আর্লি বার্ড স্পেশাল ছাড়ে ভর্তি হতে আর বাকি:"
                              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                            />
                          </div>

                          <div>
                            <label className="block font-bold text-slate-700 mb-1">সাবটেক্সট (ঐচ্ছিক)</label>
                            <input
                              type="text"
                              value={siteSettings.countdownBannerSubtext || ''}
                              onChange={(e) => updateSiteSettings({ countdownBannerSubtext: e.target.value })}
                              placeholder="যেমন: সীমিত আসন সংখ্যা • স্পেশাল গিফট ও ডিসকাউন্ট ভাউচার সুবিধা"
                              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block font-bold text-slate-700 mb-1">কাউন্টডাউন থিম ও কালার</label>
                              <select
                                value={siteSettings.countdownThemeColor || 'crimson'}
                                onChange={(e) => updateSiteSettings({ countdownThemeColor: e.target.value as any })}
                                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium"
                              >
                                <option value="crimson">🔴 ক্রিমসন রেড</option>
                                <option value="emerald">🟢 এমারেল্ড গ্রিন (ডিসকাউন্ট ফ্রেশ)</option>
                                <option value="indigo">🟣 রয়্যাল ইন্ডিগো / ভায়োলেট</option>
                                <option value="amber">🟠 গোল্ডেন অ্যাম্বার / অরেঞ্জ</option>
                                <option value="dark">⬛ ডার্ক প্রিমিয়াম এলিট</option>
                              </select>
                            </div>

                            <div>
                              <label className="block font-bold text-slate-700 mb-1">অফার শেষ হওয়ার তারিখ (ISO বা নির্দিষ্ট তারিখ)</label>
                              <input
                                type="text"
                                value={siteSettings.countdownTargetDate || ''}
                                onChange={(e) => updateSiteSettings({ countdownTargetDate: e.target.value })}
                                placeholder="2026-09-30T23:59:59"
                                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Hero Section Customization */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                      <h5 className="font-bold text-xs text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-1.5">
                        <span>✨ হোমপেজ হিরো সেকশন</span>
                      </h5>

                      <div className="space-y-2.5 text-xs">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">হিরো ব্যাজ টেক্সট</label>
                          <input
                            type="text"
                            value={siteSettings.heroBadgeText}
                            onChange={(e) => updateSiteSettings({ heroBadgeText: e.target.value })}
                            className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">প্রধান হেডলাইন (Hero Title)</label>
                          <input
                            type="text"
                            value={siteSettings.heroTitle}
                            onChange={(e) => updateSiteSettings({ heroTitle: e.target.value })}
                            className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl font-bold"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">সাব-হেডলাইন (Hero Subtitle)</label>
                          <textarea
                            rows={2}
                            value={siteSettings.heroSubtitle}
                            onChange={(e) => updateSiteSettings({ heroSubtitle: e.target.value })}
                            className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">মূল অ্যাকশন বাটন টেক্সট</label>
                          <input
                            type="text"
                            value={siteSettings.heroButtonText}
                            onChange={(e) => updateSiteSettings({ heroButtonText: e.target.value })}
                            className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl font-bold"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Section Titles */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                      <h5 className="font-bold text-xs text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-1.5">
                        <span>📚 সেকশন টাইটেল ও সাবটাইটেল</span>
                      </h5>

                      <div className="space-y-2.5 text-xs">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">জনপ্রিয় কোর্স সেকশন টাইটেল</label>
                          <input
                            type="text"
                            value={siteSettings.bestSellingTitle}
                            onChange={(e) => updateSiteSettings({ bestSellingTitle: e.target.value })}
                            className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl font-bold"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">কোর্স ক্যাটালগ টাইটেল</label>
                          <input
                            type="text"
                            value={siteSettings.catalogTitle}
                            onChange={(e) => updateSiteSettings({ catalogTitle: e.target.value })}
                            className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl font-bold"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">ক্যাটালগ সাবটাইটেল</label>
                          <input
                            type="text"
                            value={siteSettings.catalogSubtitle}
                            onChange={(e) => updateSiteSettings({ catalogSubtitle: e.target.value })}
                            className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Footer and Contacts */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                      <h5 className="font-bold text-xs text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-1.5">
                        <span>📞 যোগাযোগ ও ফুটার তথ্য</span>
                      </h5>

                      <div className="space-y-2.5 text-xs">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">হেল্পলাইন ফোন</label>
                          <input
                            type="text"
                            value={siteSettings.contactPhone}
                            onChange={(e) => updateSiteSettings({ contactPhone: e.target.value })}
                            className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl font-mono"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">সাপোর্ট ইমেইল</label>
                          <input
                            type="email"
                            value={siteSettings.contactEmail}
                            onChange={(e) => updateSiteSettings({ contactEmail: e.target.value })}
                            className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl font-mono"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">ফুটার ডেসক্রিপশন</label>
                          <textarea
                            rows={2}
                            value={siteSettings.footerAboutText}
                            onChange={(e) => updateSiteSettings({ footerAboutText: e.target.value })}
                            className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">কপিরাইট লাইন</label>
                          <input
                            type="text"
                            value={siteSettings.footerCopyrightText}
                            onChange={(e) => updateSiteSettings({ footerCopyrightText: e.target.value })}
                            className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* TAB: SEO & METADATA SUITE */}
              {activeTab === 'seo' && (
                <div className="space-y-6">
                  {/* Explanatory Banner */}
                  <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100">
                    <h4 className="font-bold text-sm text-emerald-900 flex items-center gap-2">
                      <Search className="w-4 h-4 text-emerald-600" />
                      <span>সার্চ ইঞ্জিন অপটিমাইজেশন (SEO) ও মেটাডাটা কন্ট্রোলার</span>
                    </h4>
                    <p className="text-xs text-emerald-700 mt-1">
                      গুগল সার্চ ও সোশ্যাল মিডিয়া (Facebook, WhatsApp, Twitter/X) প্রিভিউ সম্পূর্ণরূপে নিয়ন্ত্রণ করুন। এখানে যা লিখবেন তা ব্রাউজারের &lt;head&gt; ও OpenGraph ট্যাগে সাথে সাথে লাইভ যুক্ত হয়ে যাবে।
                    </p>
                  </div>

                  {/* Google Search Live SERP Card Preview */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                      <span>🌐 গুগল সার্চ ফলাফল লাইভ প্রিভিউ (Google SERP Snippet)</span>
                    </div>
                    <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl space-y-1 font-sans">
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <span className="w-4 h-4 rounded-full bg-red-600 text-white text-[9px] font-bold flex items-center justify-center">১০</span>
                        <span className="text-slate-800 font-medium">10mscourse.shop</span>
                        <span className="text-slate-400">› {siteSettings.seoCanonicalUrl || 'home'}</span>
                      </div>
                      <h4 className="text-base sm:text-lg font-medium text-[#1a0dab] hover:underline cursor-pointer leading-snug line-clamp-1">
                        {siteSettings.seoMetaTitle || '১০ মিনিট স্কুল কোর্স ডিসকাউন্ট | 10 Minute School Verified Offer & Promo Code'}
                      </h4>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {siteSettings.seoMetaDescription || '১০ মিনিট স্কুলের সকল একাডেমিক, এইচএসসি ক্র্যাশ কোর্স, এডমিশন ও স্কিল কোর্সের ভেরিফায়েড ডিসকাউন্ট প্রোমোকোড। সর্বোচ্চ ছাড়ে ভর্তি হোন এখনই।'}
                      </p>
                    </div>
                  </div>

                  {/* SEO Form Inputs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Basic Meta Tags */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                      <h5 className="font-bold text-xs text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-1.5">
                        <span>🏷️ মেটা টাইটেল ও বর্ণনা</span>
                      </h5>

                      <div className="space-y-3 text-xs">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">ওয়েবসাইটের এসইও টাইটেল (&lt;title&gt;)</label>
                          <input
                            type="text"
                            value={siteSettings.seoMetaTitle || ''}
                            onChange={(e) => updateSiteSettings({ seoMetaTitle: e.target.value })}
                            placeholder="১০ মিনিট স্কুল কোর্স ডিসকাউন্ট | 10 Minute School Verified Offer"
                            className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold"
                          />
                          <p className="text-[10px] text-slate-400 mt-1">প্রস্তাবিত দৈর্ঘ্য: ৫০-৬০ ক্যারেক্টার</p>
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">মেটা ডেসক্রিপশন (&lt;meta description&gt;)</label>
                          <textarea
                            rows={3}
                            value={siteSettings.seoMetaDescription || ''}
                            onChange={(e) => updateSiteSettings({ seoMetaDescription: e.target.value })}
                            placeholder="১০ মিনিট স্কুলের সকল একাডেমিক, এইচএসসি ক্র্যাশ কোর্স, এডমিশন ও স্কিল কোর্সের ভেরিফায়েড ডিসকাউন্ট প্রোমোকোড।"
                            className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl leading-relaxed"
                          />
                          <p className="text-[10px] text-slate-400 mt-1">প্রস্তাবিত দৈর্ঘ্য: ১২০-১৬০ ক্যারেক্টার</p>
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">সার্চ কি-ওয়ার্ডস (কমা দিয়ে আলাদা করুন)</label>
                          <input
                            type="text"
                            value={siteSettings.seoMetaKeywords || ''}
                            onChange={(e) => updateSiteSettings({ seoMetaKeywords: e.target.value })}
                            placeholder="10 minute school, 10ms course, hsc 26 crash course, discount, promo code"
                            className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Open Graph & Social Sharing */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                      <h5 className="font-bold text-xs text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-1.5">
                        <span>📱 সোশ্যাল মিডিয়া ও ওপেন গ্রাফ (OG)</span>
                      </h5>

                      <div className="space-y-3 text-xs">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">ক্যানোনিকাল URL (Canonical URL)</label>
                          <input
                            type="text"
                            value={siteSettings.seoCanonicalUrl || ''}
                            onChange={(e) => updateSiteSettings({ seoCanonicalUrl: e.target.value })}
                            placeholder="https://10mscourse.shop"
                            className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-[11px]"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">গুগল সার্চ কনসোল ভেরিফিকেশন কোড</label>
                          <input
                            type="text"
                            value={siteSettings.seoGoogleSiteVerification || ''}
                            onChange={(e) => updateSiteSettings({ seoGoogleSiteVerification: e.target.value })}
                            placeholder="google-site-verification=xyz123..."
                            className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-[11px]"
                          />
                          <p className="text-[10px] text-slate-400 mt-1">গুগল সার্চ কনসোলে সাইট ভেরিফাই করার মেটা কোড</p>
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">সোশ্যাল শেয়ার ইমেজ (Open Graph Image)</label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={siteSettings.seoOgImage || ''}
                              onChange={(e) => updateSiteSettings({ seoOgImage: e.target.value })}
                              placeholder="https://images.unsplash.com/... বা আপলোড করুন"
                              className="flex-1 p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-[11px]"
                            />
                            <button
                              type="button"
                              onClick={() => seoOgFileInputRef.current?.click()}
                              className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1 cursor-pointer shrink-0"
                            >
                              <Upload className="w-3.5 h-3.5" />
                              <span>আপলোড</span>
                            </button>
                            <input
                              type="file"
                              ref={seoOgFileInputRef}
                              onChange={handleOgImageFileUpload}
                              accept="image/*"
                              className="hidden"
                            />
                          </div>
                        </div>

                        {siteSettings.seoOgImage && (
                          <div className="pt-2">
                            <span className="block text-[10px] text-slate-500 mb-1 font-bold">সোশ্যাল শেয়ার ইমেজ প্রিভিউ:</span>
                            <div className="aspect-video w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-100 relative">
                              <img
                                src={siteSettings.seoOgImage}
                                alt="SEO Preview"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: SHORTCODES & EMBED BUILDER */}
              {activeTab === 'shortcodes' && (
                <div className="space-y-6">
                  
                  {/* Explanatory Banner */}
                  <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 space-y-1">
                    <h4 className="font-bold text-sm text-indigo-900 flex items-center gap-2">
                      <Code className="w-4 h-4 text-indigo-600" />
                      <span>শর্টকোড ও এম্বেড দিয়ে অন্য যেকোনো পেজে কোর্স বসানোর সহজ নিয়ম:</span>
                    </h4>
                    <p className="text-xs text-indigo-700 leading-relaxed">
                      ওয়ার্ডপ্রেস (WordPress), ব্লগারে (Blogger), বা যেকোনো ওয়েবসাইটে একটি সিঙ্গেল কোর্স কার্ড বা পুরো ক্যাটাগরি গ্রিড এম্বেড করতে নিচের কোডটি কপি করে পেস্ট করুন।
                    </p>
                  </div>

                  {/* Course Picker for Shortcode */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">কোর্স নির্বাচন করুন:</label>
                        <select
                          value={selectedShortcodeCourseId}
                          onChange={(e) => setSelectedShortcodeCourseId(e.target.value)}
                          className="w-full text-xs sm:text-sm p-2.5 bg-white border border-slate-300 rounded-xl font-bold"
                        >
                          {courses.map(c => (
                            <option key={c.id} value={c.id}>
                              {c.title} ({c.instructor})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">এম্বেড ফরম্যাট:</label>
                        <div className="grid grid-cols-3 gap-2">
                          <button
                            type="button"
                            onClick={() => setEmbedFormat('shortcode')}
                            className={`py-2 px-3 rounded-xl text-xs font-bold transition cursor-pointer text-center ${
                              embedFormat === 'shortcode' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-white text-slate-700 border border-slate-200'
                            }`}
                          >
                            WordPress Shortcode
                          </button>
                          <button
                            type="button"
                            onClick={() => setEmbedFormat('html')}
                            className={`py-2 px-3 rounded-xl text-xs font-bold transition cursor-pointer text-center ${
                              embedFormat === 'html' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-white text-slate-700 border border-slate-200'
                            }`}
                          >
                            HTML কার্ড কোড
                          </button>
                          <button
                            type="button"
                            onClick={() => setEmbedFormat('iframe')}
                            className={`py-2 px-3 rounded-xl text-xs font-bold transition cursor-pointer text-center ${
                              embedFormat === 'iframe' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-white text-slate-700 border border-slate-200'
                            }`}
                          >
                            আইফ্রেম (Iframe)
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Generated Code Output Box */}
                    {selectedShortcodeCourse && (
                      <div className="space-y-3 pt-2 border-t border-slate-200">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-700">জেনারেট করা কোড (১-ক্লিকে কপি করুন):</span>
                          <button
                            onClick={() => {
                              let textToCopy = '';
                              if (embedFormat === 'shortcode') {
                                textToCopy = `[course_card id="${selectedShortcodeCourse.slug || selectedShortcodeCourse.id}"]`;
                              } else if (embedFormat === 'iframe') {
                                textToCopy = `<iframe src="${window.location.origin}/#course-${selectedShortcodeCourse.slug || selectedShortcodeCourse.id}" width="100%" height="520" frameborder="0" style="border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.05);" allowfullscreen></iframe>`;
                              } else {
                                textToCopy = `<!-- 10MinCourse Affiliate Card -->
<div style="max-width: 380px; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; font-family: sans-serif; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
  <img src="${selectedShortcodeCourse.thumbnail}" style="width: 100%; aspect-ratio: 16/9; object-fit: cover;" alt="${selectedShortcodeCourse.title}"/>
  <div style="padding: 16px;">
    <span style="font-size: 11px; font-weight: bold; color: #D62B3B; text-transform: uppercase;">${selectedShortcodeCourse.categoryName}</span>
    <h3 style="font-size: 16px; font-weight: bold; margin: 4px 0 8px 0; color: #0f172a;">${selectedShortcodeCourse.title}</h3>
    <p style="font-size: 12px; color: #64748b; margin: 0 0 12px 0;">ইন্সট্রাক্টর: ${selectedShortcodeCourse.instructor}</p>
    <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #f1f5f9; padding-top: 12px;">
      <span style="font-size: 18px; font-weight: bold; color: #D62B3B;">${formatBDT(getCurrentPrice(selectedShortcodeCourse))}</span>
      <a href="${selectedShortcodeCourse.affiliateUrl}" target="_blank" style="background: #D62B3B; color: #ffffff; padding: 8px 16px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 13px;">কোর্সটি কিনুন</a>
    </div>
  </div>
</div>`;
                              }
                              navigator.clipboard.writeText(textToCopy);
                              showToast('📋 কোড সফলভাবে ক্লিপবোর্ডে কপি হয়েছে!');
                            }}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-1.5 px-3 rounded-lg transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
                          >
                            <Copy className="w-3.5 h-3.5" />
                            <span>কোড কপি করুন</span>
                          </button>
                        </div>

                        <div className="p-3 bg-slate-900 text-emerald-400 font-mono text-xs rounded-xl overflow-x-auto">
                          <code>
                            {embedFormat === 'shortcode' && `[course_card id="${selectedShortcodeCourse.slug || selectedShortcodeCourse.id}"]`}
                            {embedFormat === 'iframe' && `<iframe src="${window.location.origin}/#course-${selectedShortcodeCourse.slug || selectedShortcodeCourse.id}" width="100%" height="520" frameborder="0" style="border-radius: 16px;" allowfullscreen></iframe>`}
                            {embedFormat === 'html' && `<div style="max-width: 380px; border: 1px solid #e2e8f0; border-radius: 16px; ...">...</div>`}
                          </code>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Live Visual Preview of the Selected Embed */}
                  {selectedShortcodeCourse && (
                    <div className="space-y-3">
                      <h5 className="font-bold text-xs text-slate-700 flex items-center gap-1.5">
                        <Eye className="w-4 h-4 text-emerald-600" />
                        <span>লাইভ প্রিভিউ (অন্য পেজে কার্ডটি দেখতে যেমন হবে):</span>
                      </h5>

                      <div className="p-6 bg-slate-100/70 rounded-2xl border border-slate-200 flex items-center justify-center">
                        <div className="bg-white max-w-sm w-full rounded-2xl border border-slate-200 overflow-hidden shadow-md">
                          <img 
                            src={selectedShortcodeCourse.thumbnail} 
                            alt={selectedShortcodeCourse.title} 
                            className="w-full aspect-video object-cover"
                          />
                          <div className="p-4 space-y-2">
                            <span className="text-[10px] bg-red-50 text-[#D62B3B] font-bold px-2 py-0.5 rounded-full">
                              {selectedShortcodeCourse.categoryName}
                            </span>
                            <h4 className="font-bold text-sm text-slate-900">{selectedShortcodeCourse.title}</h4>
                            <p className="text-xs text-slate-500">শিক্ষক: {selectedShortcodeCourse.instructor}</p>
                            
                            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                              <span className="font-black text-sm text-[#D62B3B]">
                                {formatBDT(getCurrentPrice(selectedShortcodeCourse))}
                              </span>
                              <a
                                href={selectedShortcodeCourse.affiliateUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-[#D62B3B] hover:bg-[#bd2332] text-white text-xs font-bold py-1.5 px-3 rounded-lg shadow-xs"
                              >
                                কোর্সটি কিনুন
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step-by-Step Instructions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600">
                    <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-1.5">
                      <h6 className="font-bold text-slate-900">🔹 ওয়ার্ডপ্রেস সাইটে বসানোর নিয়ম:</h6>
                      <p>১. ওয়ার্ডপ্রেস পোস্ট বা পেজ এডিটরে যান।</p>
                      <p>২. একটি "Shortcode" বা "Custom HTML" ব্লক নিন।</p>
                      <p>৩. উপরের কপি করা শর্টকোডটি পেস্ট করে সেভ করুন।</p>
                    </div>

                    <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-1.5">
                      <h6 className="font-bold text-slate-900">🔹 ব্লগারে বা কাস্টম এইচটিএমএল সাইটে:</h6>
                      <p>১. ব্লগে "HTML View" বা কাস্টম উইজেট ওপেন করুন।</p>
                      <p>২. উপরে থাকা <strong>"HTML কার্ড কোড"</strong> বা <strong>"আইফ্রেম"</strong> অপশন সিলেক্ট করে কপি করুন।</p>
                      <p>৩. আপনার পেজে পেস্ট করলেই সুন্দর কার্ড প্রদর্শিত হবে।</p>
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 4: IMAGE UPLOAD & GALLERY */}
              {activeTab === 'images' && (
                <div className="space-y-6">
                  
                  {/* Upload Custom Image with Canvas Optimization */}
                  <div className="p-5 bg-purple-50/60 rounded-2xl border border-purple-100 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-purple-950 flex items-center gap-2">
                          <ImageIcon className="w-4 h-4 text-purple-600" />
                          <span>আপনার ডিভাইস থেকে সরাসরি ছবি আপলোড করুন</span>
                        </h4>
                        <p className="text-xs text-purple-800">ছবি স্বয়ংক্রিয়ভাবে দ্রুত লোডিংয়ের জন্য অপটিমাইজ হবে</p>
                      </div>

                      <input
                        type="file"
                        ref={galleryFileInputRef}
                        accept="image/*"
                        className="hidden"
                        onChange={handleGalleryImageUpload}
                      />

                      <button
                        onClick={() => galleryFileInputRef.current?.click()}
                        className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold py-2 px-4 rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>ছবি সিলেক্ট করুন</span>
                      </button>
                    </div>

                    {galleryUploadedUrl && (
                      <div className="mt-3 p-3 bg-white rounded-xl border border-purple-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <img src={galleryUploadedUrl} alt="Preview" className="w-16 h-12 object-cover rounded-lg" />
                          <div>
                            <span className="text-xs font-bold text-slate-800">{galleryFileName || 'আপলোড করা ইমেজ'}</span>
                            <p className="text-[11px] text-emerald-600 font-semibold">রেডি! নিচে থেকে লিংক কপি করে যেকোনো কোর্সে বসাতে পারেন।</p>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(galleryUploadedUrl);
                            showToast('📋 ছবির ডাটা লিংক কপি হয়েছে!');
                          }}
                          className="bg-slate-900 hover:bg-black text-white text-xs font-bold py-1.5 px-3 rounded-lg transition flex items-center gap-1 cursor-pointer shrink-0"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>ছবির লিংক কপি করুন</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Ready-made Official Banner Presets */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        <span>১০ মিনিট স্কুল অফিশিয়াল ব্যানার গ্যালারি (রেডিমেড কালেকশন)</span>
                      </h4>
                      <span className="text-xs text-slate-500">১-ক্লিকে লিঙ্ক কপি করুন</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {PRESET_COURSE_THUMBNAILS.map((preset, idx) => (
                        <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition group">
                          <div className="relative aspect-video bg-slate-100">
                            <img src={preset.url} alt={preset.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                            <span className="absolute top-2 left-2 bg-slate-900/80 text-white text-[10px] px-2 py-0.5 rounded-md">
                              {preset.category}
                            </span>
                          </div>
                          <div className="p-3 space-y-2">
                            <h5 className="font-bold text-xs text-slate-900 line-clamp-1">{preset.name}</h5>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(preset.url);
                                showToast(`📋 "${preset.name}" এর লিংক কপি হয়েছে!`);
                              }}
                              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold py-1.5 px-2 rounded-lg transition flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <Copy className="w-3 h-3 text-slate-500" />
                              <span>লিংক কপি করুন</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 5: GOOGLE MEET LIVE SWITCH */}
              {activeTab === 'meet' && (
                <div className="space-y-4 max-w-2xl bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div>
                      <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                        <Radio className="w-5 h-5 text-rose-600 animate-pulse" />
                        <span>গুগল মিট লাইভ সুইচ ও কনফিগারেশন</span>
                      </h3>
                      <p className="text-xs text-slate-500">অন করলে হোমপেজ ও ব্যানারে লাল লাইভ ব্যাজ ও সরাসরি জয়েন বাটন দেখাবে</p>
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => {
                        toggleMeetLive();
                        showToast(!siteSettings.isMeetLive ? '🔴 গুগল মিট লাইভ চালু করা হয়েছে!' : '⚪ গুগল মিট লাইভ বন্ধ করা হয়েছে');
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition shadow-xs flex items-center gap-2 cursor-pointer active:scale-95 ${
                        siteSettings.isMeetLive ? 'bg-rose-600 text-white hover:bg-rose-700' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                      }`}
                    >
                      <Radio className="w-4 h-4" />
                      <span>{siteSettings.isMeetLive ? '🔴 লাইভ সক্রিয় আছে (অন)' : '⚪ অফ করা আছে'}</span>
                    </button>
                  </div>

                  <div className="space-y-4 pt-1 text-xs">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">গুগল মিট মিটিং লিংক (Google Meet URL)</label>
                      <div className="flex gap-2">
                        <input
                          type="url"
                          value={siteSettings.googleMeetLink || siteSettings.googleMeetUrl || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateSiteSettings({ googleMeetLink: val, googleMeetUrl: val });
                          }}
                          className="flex-1 text-xs sm:text-sm p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono focus:bg-white focus:border-rose-500 transition"
                          placeholder="https://meet.google.com/abc-defg-hij"
                        />
                        {(siteSettings.googleMeetLink || siteSettings.googleMeetUrl) && (
                          <a
                            href={siteSettings.googleMeetLink || siteSettings.googleMeetUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl font-bold flex items-center gap-1 shrink-0 cursor-pointer"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>টেস্ট করুন</span>
                          </a>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">আপনার গুগল মিট লিংকটি পেস্ট করুন (যেমন: https://meet.google.com/abc-defg-hij)</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">লাইভ সেশনের বিষয় / ব্যানার মেসেজ</label>
                        <input
                          type="text"
                          value={siteSettings.meetTopic || siteSettings.meetBannerText || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateSiteSettings({ meetTopic: val, meetBannerText: val });
                          }}
                          className="w-full text-xs sm:text-sm p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-rose-500 transition"
                          placeholder="এইচএসসি ও এডমিশন লাইভ ক্যারিয়ার ও ডিসকাউন্ট গাইডলাইন"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">হোস্ট / মেন্টরের নাম</label>
                        <input
                          type="text"
                          value={siteSettings.meetHostName || ''}
                          onChange={(e) => updateSiteSettings({ meetHostName: e.target.value })}
                          className="w-full text-xs sm:text-sm p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-rose-500 transition"
                          placeholder="১০ মিনিট স্কুল সিনিয়র মেন্টর টিম"
                        />
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> সেটিংস স্বয়ংক্রিয়ভাবে সংরক্ষিত হচ্ছে
                      </span>
                      <button
                        type="button"
                        onClick={async () => {
                          showToast('⏳ গুগল মিট সেটিংস ক্লাউডে সেভ হচ্ছে...');
                          const success = await syncAllToCloud({ siteSettings });
                          if (success) {
                            showToast('✅ গুগল মিট লিংক ও সেটিংস ক্লাউডে সফলভাবে সেভ হয়েছে!');
                          } else {
                            showToast('⚠️ ক্লাউড সিঙ্ক সম্পন্ন হতে পারেনি, লোকালি সংরক্ষিত হয়েছে।');
                          }
                        }}
                        className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer active:scale-95"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>আপডেট ও সংরক্ষণ করুন</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 6: WHATSAPP CONFIG */}
              {activeTab === 'whatsapp' && (
                <div className="space-y-5 max-w-2xl bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
                  <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                        <MessageCircle className="w-5 h-5 text-emerald-600" />
                        <span>হোয়াটসঅ্যাপ উইজেট ও হেল্পলাইন সেটিংস</span>
                      </h3>
                      <p className="text-xs text-slate-500">মোবাইল নম্বর কিংবা ইউজারনেম (wa.me/@username) দিয়ে সংযোগ করুন</p>
                    </div>
                  </div>

                  <div className="space-y-4 text-xs">
                    {/* Auto Popup Control */}
                    <div className="p-4 bg-emerald-50/70 border border-emerald-100 rounded-xl space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-slate-900">অটোমেটিক হোয়াটসঅ্যাপ পপআপ (Auto Popup)</h4>
                          <p className="text-slate-600">ওয়েবসাইটে ঢোকার কয়েক সেকেন্ড পর অটোমেটিক চ্যাট বক্স পপআপ হবে</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => updateSiteSettings({ autoOpenWhatsApp: !siteSettings.autoOpenWhatsApp })}
                          className={`px-3 py-1 rounded-full text-xs font-bold transition cursor-pointer ${
                            siteSettings.autoOpenWhatsApp ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {siteSettings.autoOpenWhatsApp ? 'সক্রিয় (ON)' : 'বন্ধ (OFF)'}
                        </button>
                      </div>

                      {siteSettings.autoOpenWhatsApp && (
                        <div className="pt-2 border-t border-emerald-200/60 flex items-center justify-between">
                          <label className="font-bold text-slate-700">কত সেকেন্ড পর পপআপ উঠবে:</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              min={1}
                              max={60}
                              value={siteSettings.autoOpenWhatsAppDelay || 3}
                              onChange={(e) => updateSiteSettings({ autoOpenWhatsAppDelay: Number(e.target.value) || 3 })}
                              className="w-16 p-1.5 bg-white border border-slate-300 rounded-lg text-center font-bold font-mono"
                            />
                            <span className="font-bold text-slate-600">সেকেন্ড</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="sm:col-span-2">
                        <label className="block font-bold text-slate-700 mb-1">
                          হোয়াটসঅ্যাপ নম্বর অথবা ইউজারনেম (Phone or Username)
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={siteSettings.whatsappNumber}
                            onChange={(e) => updateSiteSettings({ whatsappNumber: e.target.value })}
                            className="flex-1 p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono focus:bg-white focus:border-emerald-500 transition"
                            placeholder="যেমন: @md.me বা wa.me/@md.me বা 88017XXXXXXXX"
                          />
                          <a
                            href={formatWhatsAppUrl(siteSettings.whatsappNumber, 'টেস্ট মেসেজ: আসসালামু আলাইকুম!')}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl font-bold flex items-center gap-1 shrink-0 cursor-pointer"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>লিংক টেস্ট</span>
                          </a>
                        </div>
                        <div className="mt-1.5 p-2 bg-slate-100/80 rounded-lg text-[11px] text-slate-600 space-y-1">
                          <p>
                            💡 <strong>ইউজারনেম সাপোর্ট:</strong> আপনি চাইলে সরাসরি মোবাইল নম্বর (যেমন: <code>8801712345678</code>) অথবা হোয়াটসঅ্যাপ ইউজারনেম (যেমন: <code>@md.me</code> বা <code>wa.me/@md.me</code>) দিতে পারবেন।
                          </p>
                          <p className="text-emerald-700 font-mono text-[10px] break-all">
                            🔗 তৈরি হওয়া লিংক: {formatWhatsAppUrl(siteSettings.whatsappNumber)}
                          </p>
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">প্রদর্শনযোগ্য নম্বর / ইউজারনেম (Display Text)</label>
                        <input
                          type="text"
                          value={siteSettings.whatsappDisplayNumber || siteSettings.whatsappNumber}
                          onChange={(e) => updateSiteSettings({ whatsappDisplayNumber: e.target.value })}
                          className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono focus:bg-white focus:border-emerald-500 transition"
                          placeholder="+880 1700-000000 বা @md.me"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">কাউন্সিলর / অ্যাডভাইজর নাম</label>
                        <input
                          type="text"
                          value={siteSettings.whatsappAdvisorName || '১০ মিনিট কোর্স হেল্পডেস্ক'}
                          onChange={(e) => updateSiteSettings({ whatsappAdvisorName: e.target.value })}
                          className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold focus:bg-white focus:border-emerald-500 transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">ডিফল্ট ওয়েলকাম মেসেজ</label>
                      <textarea
                        rows={3}
                        value={siteSettings.whatsappWelcomeMessage}
                        onChange={(e) => updateSiteSettings({ whatsappWelcomeMessage: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-emerald-500 transition"
                      />
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> সেটিংস স্বয়ংক্রিয়ভাবে সংরক্ষিত হচ্ছে
                      </span>
                      <button
                        type="button"
                        onClick={async () => {
                          showToast('⏳ হোয়াটসঅ্যাপ সেটিংস ক্লাউডে সেভ হচ্ছে...');
                          const success = await syncAllToCloud({ siteSettings });
                          if (success) {
                            showToast('✅ হোয়াটসঅ্যাপ সেটিংস ক্লাউডে সফলভাবে সেভ হয়েছে!');
                          } else {
                            showToast('⚠️ ক্লাউড সিঙ্ক সম্পন্ন হতে পারেনি, লোকালি সংরক্ষিত হয়েছে।');
                          }
                        }}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer active:scale-95"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>আপডেট ও সংরক্ষণ করুন</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 7: BACKUP & SECURITY SETTINGS */}
              {activeTab === 'backup' && (
                <div className="space-y-6">
                  
                  {/* Security Password Change Card */}
                  <div className="p-5 bg-amber-50/50 rounded-2xl border border-amber-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Key className="w-5 h-5 text-amber-600" />
                        <div>
                          <h4 className="font-bold text-sm text-slate-900">অ্যাডমিন পাসওয়ার্ড পরিবর্তন করুন (Change Password)</h4>
                          <p className="text-xs text-slate-500">অননুমোদিত কেউ যেন প্যানেলে ঢুকতে না পারে তার জন্য শক্তিশালী পাসওয়ার্ড দিন</p>
                        </div>
                      </div>

                      <button
                        onClick={() => setShowChangePasswordSection(!showChangePasswordSection)}
                        className="text-xs bg-amber-600 hover:bg-amber-700 text-white font-bold px-3 py-1.5 rounded-xl transition cursor-pointer"
                      >
                        {showChangePasswordSection ? 'বন্ধ করুন' : 'পাসওয়ার্ড পরিবর্তন'}
                      </button>
                    </div>

                    {showChangePasswordSection && (
                      <form onSubmit={handleChangePassword} className="pt-3 border-t border-amber-200/60 flex items-center gap-2 max-w-md">
                        <input
                          type="text"
                          required
                          value={newPasswordInput}
                          onChange={(e) => setNewPasswordInput(e.target.value)}
                          placeholder="নতুন শক্তিশালী পাসওয়ার্ড লিখুন"
                          className="flex-1 p-2 text-xs bg-white border border-amber-300 rounded-xl font-mono"
                        />
                        <button
                          type="submit"
                          className="bg-slate-900 hover:bg-black text-white text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer shrink-0"
                        >
                          সেভ পাসওয়ার্ড
                        </button>
                      </form>
                    )}
                  </div>

                  {/* Secret Admin URL Documentation */}
                  <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-2 text-xs">
                    <h5 className="font-bold text-amber-400 flex items-center gap-1.5">
                      <Lock className="w-4 h-4" />
                      <span>গোপন অ্যাডমিন প্রবেশের উপায় (Secret Access Link):</span>
                    </h5>
                    <p className="text-slate-300">
                      সাধারণ দর্শনার্থীদের থেকে অ্যাডমিন লিংক সম্পূর্ণ লুকানো আছে। আপনি নিজে ঢুকতে নিচের যেকোনা পদ্ধতি ব্যবহার করতে পারেন:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-slate-400 font-mono text-[11px]">
                      <li>URL এর শেষে <span className="text-white">#admin-portal</span> অথবা <span className="text-white">?admin=portal</span> লিখে এন্টার দিন।</li>
                      <li>কীবোর্ড শর্টকাট: <span className="text-amber-300">Ctrl + Shift + A</span> (ম্যাক ইউজারদের জন্য Cmd + Shift + A)।</li>
                      <li>ফুটারের কপিরাইট লেখার ডানপাশে থাকা ডট (•) চিহ্নে ক্লিক করুন।</li>
                    </ul>
                  </div>

                  {/* Realtime Firebase Cloud Database Card */}
                  <div className="p-5 sm:p-6 bg-linear-to-br from-emerald-950 via-slate-900 to-teal-950 text-white rounded-2xl shadow-lg border border-emerald-500/40 space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold border border-emerald-500/30">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                          <span>ফ্রি ক্লাউড ডাটাবেজ (Firebase Firestore) সক্রিয়</span>
                        </div>
                        <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                          <span>রিয়েলটাইম সেন্ট্রাল ক্লাউড ডাটাবেজ সিঙ্ক</span>
                        </h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          আপনার ওয়েবসাইটে এখন <strong>Google Firebase Firestore</strong> ক্লাউড ডাটাবেজ যুক্ত করা হয়েছে। আপনি অ্যাডমিন প্যানেল থেকে যেকোনো কোর্স যোগ/এডিট, গুগল মিট লিংক, বা হোয়াটসঅ্যাপ নাম্বার পরিবর্তন করলে তা সাথে সাথে ক্লাউডে সেভ হয় এবং গিটহাবে ভিজিট করা সব ব্যবহারকারীর ডিভাইসে রিয়েল-টাইমে আপডেট হয়ে যায়!
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="p-3 bg-white/5 border border-white/10 rounded-xl space-y-1">
                        <span className="text-slate-400 text-[11px]">ডাটাবেজ স্ট্যাটাস:</span>
                        <div className="flex items-center gap-2 font-bold">
                          <span className={`w-2.5 h-2.5 rounded-full ${
                            cloudSyncStatus === 'synced' ? 'bg-emerald-400' : cloudSyncStatus === 'syncing' ? 'bg-amber-400 animate-spin' : 'bg-rose-400'
                          }`} />
                          <span className={cloudSyncStatus === 'synced' ? 'text-emerald-300' : cloudSyncStatus === 'syncing' ? 'text-amber-300' : 'text-rose-300'}>
                            {cloudSyncStatus === 'synced' ? 'অনলাইন ও সংযুক্ত (Synced)' : cloudSyncStatus === 'syncing' ? 'সিঙ্ক হচ্ছে...' : 'অফলাইন'}
                          </span>
                        </div>
                      </div>

                      <div className="p-3 bg-white/5 border border-white/10 rounded-xl space-y-1">
                        <span className="text-slate-400 text-[11px]">সর্বশেষ ক্লাউড আপডেট:</span>
                        <div className="font-bold text-slate-200">
                          {lastSyncedAt ? lastSyncedAt.toLocaleTimeString('bn-BD') : 'সদ্য লোড হয়েছে'}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={async () => {
                          showToast('⏳ ক্লাউডে সেভ হচ্ছে...');
                          const success = await syncAllToCloud();
                          if (success) {
                            showToast('☁️ ক্লাউড ডাটাবেজে সমস্ত ডেটা রিয়েলটাইমে সেভ হয়েছে!');
                          } else {
                            showToast('⚠️ সিঙ্ক ব্যর্থ হয়েছে। ইন্টারনেট সংযোগ চেক করুন।');
                          }
                        }}
                        className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 font-black rounded-xl text-xs flex items-center gap-2 transition cursor-pointer shadow-sm active:scale-95"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>এখনই ক্লাউডে সেভ করুন (Save to Cloud Now)</span>
                      </button>
                    </div>
                  </div>

                  {/* GitHub Permanent Sync Card */}
                  <div className="p-5 sm:p-6 bg-linear-to-br from-indigo-900 to-slate-900 text-white rounded-2xl shadow-md border border-indigo-700/50 space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[11px] font-bold">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>গিটহাব পার্মানেন্ট সিঙ্ক গাইড (GitHub Permanent Update)</span>
                        </div>
                        <h4 className="text-base font-bold text-white">
                          গিটহাবে হোস্ট করার পর অন্য ভিজিটরদের জন্য পরিবর্তন স্থায়ী করার উপায়
                        </h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          গিটহাব পেজেস একটি স্ট্যাটিক ফাইল হোস্টিং। ব্রাউজারের অ্যাডমিন প্যানেলে করা কোনো পরিবর্তন আপনার ব্রাউজারের <code className="bg-black/40 px-1 py-0.5 rounded text-amber-300 font-mono">localStorage</code>-এ থাকে, তাই অন্য কোনো ভিজিটর আপনার সাইটে ঢুকলে সে মূল গিটহাবের ফাইলের ডেটা দেখে।
                        </p>
                      </div>
                    </div>

                    <div className="p-3.5 bg-black/40 rounded-xl border border-white/10 text-xs space-y-2">
                      <p className="font-bold text-amber-300">📌 কীভাবে ১ মিনিটে গিটহাবে স্থায়ী করবেন?</p>
                      <ol className="list-decimal pl-5 space-y-1.5 text-slate-300 text-[11px]">
                        <li>
                          নিচের <strong>"initialData.ts ডাউনলোড করুন"</strong> বাটনে ক্লিক করে ফাইলটি নামিয়ে নিন (অথবা কোড কপি করুন)।
                        </li>
                        <li>
                          আপনার গিটহাব রিপোজিটরিতে ঢুকে <code className="text-emerald-300 font-mono">src/data/initialData.ts</code> ফাইলটিতে ক্লিক করে এডিট (পেন্সিল আইকন) চাপুন এবং নতুন কোড পেস্ট করে <strong>"Commit changes"</strong> করুন।
                        </li>
                        <li>
                          ব্যস! ১-২ মিনিটের মধ্যে সাইট বিল্ড হয়ে আপনার নতুন কোর্স, গুগল মিট ও সেটিংস সারা বিশ্বের সব ভিজিটরের জন্য স্থায়ী হয়ে যাবে!
                        </li>
                      </ol>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={handleDownloadInitialDataTs}
                        className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black rounded-xl text-xs flex items-center gap-2 transition cursor-pointer shadow-xs active:scale-95"
                      >
                        <Download className="w-4 h-4" />
                        <span>initialData.ts ফাইল ডাউনলোড করুন</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleCopyInitialDataTs}
                        className="px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-xl text-xs flex items-center gap-2 transition cursor-pointer active:scale-95"
                      >
                        <Copy className="w-4 h-4" />
                        <span>সম্পূর্ণ কোড কপি করুন</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Export Card */}
                    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                      <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                        <Download className="w-4 h-4 text-[#D62B3B]" />
                        <span>সব কোর্সের ডেটা ব্যাকআপ নিন</span>
                      </h4>
                      <p className="text-xs text-slate-600">
                        আপনার সমস্ত ১১০+ কোর্স, ক্যাটাগরি এবং সেটিংস একটি JSON ফাইল হিসেবে কম্পিউটারে ডাউনলোড করে রাখুন।
                      </p>
                      <button
                        onClick={handleExportJSON}
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2.5 px-3 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>JSON ব্যাকআপ ডাউনলোড</span>
                      </button>
                    </div>

                    {/* Reset to Default */}
                    <div className="p-5 bg-rose-50/60 rounded-2xl border border-rose-200 space-y-3">
                      <h4 className="font-bold text-sm text-rose-900 flex items-center gap-2">
                        <RefreshCw className="w-4 h-4 text-rose-600" />
                        <span>ডিফল্ট ডেমো ডেটায় রিসেট</span>
                      </h4>
                      <p className="text-xs text-rose-700">
                        সবকিছু আগের মতো ১০ মিনিট স্কুলের ডিফল্ট ডেমো কোর্সে ফিরিয়ে নিতে চান?
                      </p>
                      <button
                        onClick={() => {
                          if (confirm('আপনি কি নিশ্চিত যে সমস্ত ডেটা রিসেট করতে চান?')) {
                            resetToDefaultData();
                            showToast('ডিফল্ট ডেটা রিস্টোর সম্পন্ন হয়েছে');
                          }
                        }}
                        className="w-full bg-[#D62B3B] hover:bg-[#bd2332] text-white text-xs font-bold py-2.5 px-3 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>রিসেট করুন</span>
                      </button>
                    </div>

                  </div>

                  {/* Import JSON */}
                  <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-3">
                    <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                      <Upload className="w-4 h-4 text-blue-600" />
                      <span>JSON ফাইল থেকে কোর্স ডেটা আপলোড / রিস্টোর করুন</span>
                    </h4>
                    <textarea
                      rows={4}
                      value={jsonInput}
                      onChange={(e) => setJsonInput(e.target.value)}
                      placeholder="এখানে আপনার ব্যাকআপ করা JSON ডেটা পেস্ট করুন..."
                      className="w-full p-2.5 text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl"
                    />
                    <button
                      onClick={handleImportJSON}
                      disabled={!jsonInput.trim()}
                      className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold py-2 px-4 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>রিস্টোর / ইমপোর্ট করুন</span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 8: BEGINNER'S GUIDE */}
              {activeTab === 'guide' && (
                <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-6 rounded-2xl border border-slate-200">
                  <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#D62B3B]" />
                    <span>১০মিনিট কোর্স প্ল্যাটফর্ম ব্যবহারের সহজ নির্দেশিকা (নন-কোডারদের জন্য):</span>
                  </h3>

                  <div className="space-y-3 pt-2">
                    <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-1">
                      <h4 className="font-bold text-slate-900">১. ক্যাটাগরি ও ফিল্টার পরিবর্তন ও ক্রম:</h4>
                      <p>
                        "ক্যাটাগরি ও ফিল্টার" ট্যাব থেকে আপনি সহজেই হোমপেজের ক্যাটাগরিগুলোর ক্রম (কোনটা আগে কোনটা পরে) পরিবর্তন করতে পারবেন। ইচ্ছামতো নতুন ক্যাটাগরি যোগ বা অপ্রয়োজনীয় ক্যাটাগরি বাদ দিতে পারবেন।
                      </p>
                    </div>

                    <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-1">
                      <h4 className="font-bold text-slate-900">২. শর্টকোড ও এম্বেড কীভাবে বসাবেন?</h4>
                      <p>
                        "শর্টকোড ও এম্বেড বিল্ডার" ট্যাবে গিয়ে যেকোনো কোর্স সিলেক্ট করে ওয়ার্ডপ্রেস শর্টকোড বা এইচটিএমএল কোড কপি করে আপনার ব্লগ বা ওয়েবসাইটে বসালেই সরাসরি কোর্সটি প্রদর্শিত হবে।
                      </p>
                    </div>

                    <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-1">
                      <h4 className="font-bold text-slate-900">৩. সেন্ট্রাল দাম ও অফার ম্যানেজমেন্ট:</h4>
                      <p>
                        আপনি যখন কোর্সের রেগুলার দাম বা অফার দাম পরিবর্তন করবেন, সাথে সাথে ওয়েবসাইটের হোমপেজ, ক্যাটাগরি পেজ এবং কোর্স ডিটেইলস পেজে নতুন দাম স্বয়ংক্রিয়ভাবে আপডেট হয়ে যাবে।
                      </p>
                    </div>

                    <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-1">
                      <h4 className="font-bold text-slate-900">৪. গুগল মিট লাইভ ও হোয়াটসঅ্যাপ:</h4>
                      <p>
                        মেন্টর লাইভ থাকলে মিট সুইচ অন করুন, শিক্ষার্থী সরাসরি কথা বলতে পারবে। হোয়াটসঅ্যাপ বাটনে ক্লিক করলে শিক্ষার্থী কোন কোর্সে আগ্রহ প্রকাশ করেছে তার বিস্তারিত প্রি-লোডেড মেসেজ সহ চ্যাট ওপেন হবে।
                      </p>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </>
        )}

      </div>
    </div>
  );
};
