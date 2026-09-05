import React, { createContext, useContext, useState, useEffect } from 'react';
import { Course, CourseCategory, SiteSettings, BlogPost, Review, CategoryConfig, ClassPortalInfo, CustomPage, NavItemConfig } from '../types';
import { INITIAL_COURSES, INITIAL_SITE_SETTINGS, INITIAL_BLOG_POSTS, INITIAL_REVIEWS, INITIAL_CATEGORIES, INITIAL_CLASSES, INITIAL_CUSTOM_PAGES } from '../data/initialData';
import { DEFAULT_ADMIN_HASH, verifyAdminPassword, sha256 } from '../utils/securityUtils';

interface CourseContextType {
  courses: Course[];
  activeCourses: Course[]; // Filtered out expired courses unless in admin mode
  siteSettings: SiteSettings;
  categories: CategoryConfig[];
  activeCategories: CategoryConfig[];
  classes: ClassPortalInfo[];
  selectedClass: string | null;
  setSelectedClass: (classId: string | null) => void;
  updateClassPortal: (cls: ClassPortalInfo) => void;
  
  // Custom Pages State & Actions
  customPages: CustomPage[];
  activeCustomPage: CustomPage | null;
  setActiveCustomPage: (page: CustomPage | null) => void;
  addCustomPage: (page: CustomPage) => void;
  updateCustomPage: (page: CustomPage) => void;
  deleteCustomPage: (id: string) => void;
  openCustomPage: (pageOrId: CustomPage | string) => void;

  blogPosts: BlogPost[];
  blogs: BlogPost[];
  reviews: Review[];
  selectedCategory: CourseCategory;
  setSelectedCategory: (cat: CourseCategory) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  targetAudienceModalOpen: boolean;
  setTargetAudienceModalOpen: (open: boolean) => void;
  activeCourseForDetail: Course | null;
  setActiveCourseForDetail: (course: Course | null) => void;
  activeBlogForDetail: BlogPost | null;
  setActiveBlogForDetail: (blog: BlogPost | null) => void;
  adminModalOpen: boolean;
  setAdminModalOpen: (open: boolean) => void;
  isWhatsAppOpen: boolean;
  setIsWhatsAppOpen: (open: boolean) => void;
  isAssistantOpen: boolean;
  setIsAssistantOpen: (open: boolean) => void;
  whatsAppPreloadMsg: string;
  activeView: 'home' | 'courses' | 'blogs' | 'reviews' | 'faq' | 'admin-guide' | 'course-detail' | 'class-hub' | 'custom-page';
  setActiveView: (view: 'home' | 'courses' | 'blogs' | 'reviews' | 'faq' | 'admin-guide' | 'course-detail' | 'class-hub' | 'custom-page') => void;
  isAdminAuthenticated: boolean;
  setIsAdminAuthenticated: (auth: boolean) => void;
  updateAdminPassword: (password: string) => Promise<void>;
  checkAdminPassword: (entered: string) => Promise<boolean>;
  logoutAdmin: () => void;
  openCoursePage: (course: Course) => void;
  closeCoursePage: () => void;
  openClassPortal: (classId: string) => void;

  // Header Navigation Menu Management
  navItems: NavItemConfig[];
  addNavItem: (item: Omit<NavItemConfig, 'id' | 'order'> & { id?: string }) => void;
  updateNavItem: (id: string, updates: Partial<NavItemConfig>) => void;
  deleteNavItem: (id: string) => void;
  reorderNavItem: (id: string, direction: 'up' | 'down') => void;
  resetNavItems: () => void;
  
  // Category Actions
  addCategory: (category: Partial<CategoryConfig> & { label: string }) => void;
  updateCategory: (idOrConfig: string | CategoryConfig, updates?: Partial<CategoryConfig>) => void;
  deleteCategory: (id: string) => void;
  reorderCategory: (id: string, direction: 'up' | 'down') => void;
  toggleCategoryEnabled: (id: string) => void;
  resetCategories: () => void;

  // Actions
  openWhatsAppWithCourse: (course?: Course, customMsg?: string) => void;
  updateCourse: (course: Course) => void;
  addCourse: (course: Course) => void;
  deleteCourse: (id: string) => void;
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;
  toggleMeetLive: () => void;
  resetToDefaultData: () => void;
  getCourseById: (id: string) => Course | undefined;
  getCoursesByCategory: (category: CourseCategory) => Course[];
  getCoursesByTag: (tag: string) => Course[];
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

const COURSES_STORAGE_KEY = '10mincourse_courses_v2';
const CATEGORIES_STORAGE_KEY = '10mincourse_categories_v2';
const CLASSES_STORAGE_KEY = '10mincourse_classes_v2';
const CUSTOM_PAGES_STORAGE_KEY = '10mincourse_custom_pages_v2';
const SETTINGS_STORAGE_KEY = '10mincourse_settings_v2';
const ADMIN_HASH_STORAGE_KEY = '10mincourse_admin_hash_v3';

export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load courses from localStorage or default
  const [courses, setCourses] = useState<Course[]>(() => {
    try {
      const saved = localStorage.getItem(COURSES_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load courses from storage', e);
    }
    return INITIAL_COURSES;
  });

  // Load custom pages from localStorage or default
  const [customPages, setCustomPages] = useState<CustomPage[]>(() => {
    try {
      const saved = localStorage.getItem(CUSTOM_PAGES_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load custom pages from storage', e);
    }
    return INITIAL_CUSTOM_PAGES;
  });

  const [activeCustomPage, setActiveCustomPage] = useState<CustomPage | null>(null);

  // Load categories from localStorage or default
  const [categories, setCategories] = useState<CategoryConfig[]>(() => {
    try {
      const saved = localStorage.getItem(CATEGORIES_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load categories from storage', e);
    }
    return INITIAL_CATEGORIES;
  });

  // Load classes from localStorage or default
  const [classes, setClasses] = useState<ClassPortalInfo[]>(() => {
    try {
      const saved = localStorage.getItem(CLASSES_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load classes from storage', e);
    }
    return INITIAL_CLASSES;
  });

  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  // Load site settings from localStorage or default
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Auto-migrate old default domain name if untouched
        if (parsed.siteName === '10MinCourse.com') {
          parsed.siteName = INITIAL_SITE_SETTINGS.siteName;
        }
        if (parsed.logoBottomText === '10MinCourse.com') {
          parsed.logoBottomText = INITIAL_SITE_SETTINGS.logoBottomText;
        }
        if (parsed.logoTextPrefix === '10Min') {
          parsed.logoTextPrefix = INITIAL_SITE_SETTINGS.logoTextPrefix;
        }
        if (parsed.logoTextSuffix === 'Course.com') {
          parsed.logoTextSuffix = INITIAL_SITE_SETTINGS.logoTextSuffix;
        }
        if (parsed.logoBadgeSub === 'MIN') {
          parsed.logoBadgeSub = INITIAL_SITE_SETTINGS.logoBadgeSub;
        }
        if (parsed.contactEmail === 'support@10mincourse.com') {
          parsed.contactEmail = INITIAL_SITE_SETTINGS.contactEmail;
        }
        if (parsed.whyTitle === 'কেন 10MinCourse এর মাধ্যমে কোর্স কিনবেন?') {
          parsed.whyTitle = INITIAL_SITE_SETTINGS.whyTitle;
        }
        if (parsed.footerCopyrightText && parsed.footerCopyrightText.includes('10MinCourse.com')) {
          parsed.footerCopyrightText = INITIAL_SITE_SETTINGS.footerCopyrightText;
        }
        return { ...INITIAL_SITE_SETTINGS, ...parsed };
      }
    } catch (e) {
      console.error('Failed to load settings from storage', e);
    }
    return INITIAL_SITE_SETTINGS;
  });

  // Strong Cryptographic Admin Password Protection (SHA-256)
  // The plaintext password is NEVER stored in GitHub repository or source code!
  const [adminPasswordHash, setAdminPasswordHashState] = useState<string>(() => {
    try {
      return localStorage.getItem(ADMIN_HASH_STORAGE_KEY) || DEFAULT_ADMIN_HASH;
    } catch {
      return DEFAULT_ADMIN_HASH;
    }
  });
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const updateAdminPassword = async (newPass: string) => {
    const trimmed = newPass.trim();
    if (!trimmed) return;
    const newHash = await sha256(trimmed);
    setAdminPasswordHashState(newHash);
    try {
      localStorage.setItem(ADMIN_HASH_STORAGE_KEY, newHash);
    } catch (e) {
      console.error(e);
    }
  };

  const checkAdminPassword = async (entered: string): Promise<boolean> => {
    return await verifyAdminPassword(entered, adminPasswordHash);
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    setAdminModalOpen(false);
  };

  const [blogPosts] = useState<BlogPost[]>(INITIAL_BLOG_POSTS);
  const [reviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [selectedCategory, setSelectedCategory] = useState<CourseCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [targetAudienceModalOpen, setTargetAudienceModalOpen] = useState(false);

  const [activeCourseForDetail, setActiveCourseForDetail] = useState<Course | null>(null);
  const [activeBlogForDetail, setActiveBlogForDetail] = useState<BlogPost | null>(null);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [whatsAppPreloadMsg, setWhatsAppPreloadMsg] = useState('');
  const [activeView, setActiveView] = useState<'home' | 'courses' | 'blogs' | 'reviews' | 'faq' | 'admin-guide' | 'course-detail' | 'class-hub'>('home');

  // Sorted and active categories for front-end rendering
  const activeCategories = categories
    .filter(c => c.enabled)
    .sort((a, b) => a.order - b.order);

  // Category Manipulation functions
  const addCategory = (category: Partial<CategoryConfig> & { label: string }) => {
    setCategories(prev => {
      const maxOrder = Math.max(...prev.map(c => c.order), 0);
      const generatedId = category.id || category.label.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || `cat-${Date.now()}`;
      const newCat: CategoryConfig = {
        id: generatedId,
        label: category.label.trim(),
        icon: category.icon?.trim() || '📁',
        order: maxOrder + 1,
        enabled: category.enabled !== false
      };
      const updated = [...prev, newCat];
      try {
        localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const updateCategory = (idOrConfig: string | CategoryConfig, updates?: Partial<CategoryConfig>) => {
    setCategories(prev => {
      let updated: CategoryConfig[];
      if (typeof idOrConfig === 'string') {
        const targetId = idOrConfig;
        updated = prev.map(c => c.id === targetId ? { ...c, ...(updates || {}) } : c);
      } else {
        const fullConfig = idOrConfig;
        updated = prev.map(c => c.id === fullConfig.id ? { ...c, ...fullConfig } : c);
      }
      try {
        localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const deleteCategory = (id: string) => {
    if (id === 'all') return; // Cannot delete "all"
    setCategories(prev => {
      const updated = prev.filter(c => c.id !== id);
      try {
        localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
    if (selectedCategory === id) {
      setSelectedCategory('all');
    }
  };

  const reorderCategory = (id: string, direction: 'up' | 'down') => {
    setCategories(prev => {
      const sorted = [...prev].sort((a, b) => a.order - b.order);
      const index = sorted.findIndex(c => c.id === id);
      if (index === -1) return prev;

      if (direction === 'up' && index > 0) {
        const temp = sorted[index].order;
        sorted[index].order = sorted[index - 1].order;
        sorted[index - 1].order = temp;
      } else if (direction === 'down' && index < sorted.length - 1) {
        const temp = sorted[index].order;
        sorted[index].order = sorted[index + 1].order;
        sorted[index + 1].order = temp;
      }

      const updated = [...sorted];
      try {
        localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const toggleCategoryEnabled = (id: string) => {
    if (id === 'all') return;
    setCategories(prev => {
      const updated = prev.map(c => c.id === id ? { ...c, enabled: !c.enabled } : c);
      try {
        localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const resetCategories = () => {
    setCategories(INITIAL_CATEGORIES);
    try {
      localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(INITIAL_CATEGORIES));
    } catch (e) {
      console.error(e);
    }
  };

  // Class Portal Action
  const updateClassPortal = (updatedCls: ClassPortalInfo) => {
    setClasses(prev => {
      const updated = prev.map(c => c.id === updatedCls.id ? updatedCls : c);
      try {
        localStorage.setItem(CLASSES_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const openClassPortal = (classId: string) => {
    setSelectedClass(classId);
    setActiveView('class-hub');
    window.location.hash = `class-${classId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openCoursePage = (course: Course) => {
    setActiveCourseForDetail(course);
    setActiveView('course-detail');
    window.location.hash = `course-${course.slug || course.id}`;
  };

  const closeCoursePage = () => {
    setActiveCourseForDetail(null);
    setActiveView('home');
    if (window.location.hash.startsWith('#course-') || window.location.hash.startsWith('#class-')) {
      window.location.hash = '';
    }
  };

  // Custom Pages Actions
  const addCustomPage = (page: CustomPage) => {
    setCustomPages(prev => {
      const updated = [page, ...prev];
      try {
        localStorage.setItem(CUSTOM_PAGES_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const updateCustomPage = (page: CustomPage) => {
    setCustomPages(prev => {
      const updated = prev.map(p => p.id === page.id ? page : p);
      try {
        localStorage.setItem(CUSTOM_PAGES_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
    if (activeCustomPage?.id === page.id) {
      setActiveCustomPage(page);
    }
  };

  const deleteCustomPage = (id: string) => {
    setCustomPages(prev => {
      const updated = prev.filter(p => p.id !== id);
      try {
        localStorage.setItem(CUSTOM_PAGES_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
    if (activeCustomPage?.id === id) {
      setActiveCustomPage(null);
      setActiveView('home');
    }
  };

  const openCustomPage = (pageOrId: CustomPage | string) => {
    const page = typeof pageOrId === 'string' 
      ? customPages.find(p => p.id === pageOrId || p.slug === pageOrId) 
      : pageOrId;
    if (page) {
      setActiveCustomPage(page);
      setActiveView('custom-page');
      window.location.hash = `page-${page.slug || page.id}`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Save courses on change
  useEffect(() => {
    try {
      localStorage.setItem(COURSES_STORAGE_KEY, JSON.stringify(courses));
    } catch (e) {
      console.error('Failed to save courses', e);
    }
  }, [courses]);

  // Save custom pages on change
  useEffect(() => {
    try {
      localStorage.setItem(CUSTOM_PAGES_STORAGE_KEY, JSON.stringify(customPages));
    } catch (e) {
      console.error('Failed to save custom pages', e);
    }
  }, [customPages]);

  // Save settings on change
  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(siteSettings));
    } catch (e) {
      console.error('Failed to save settings', e);
    }
  }, [siteSettings]);

  // Handle URL hash routing & secret admin parameters
  useEffect(() => {
    const handleHashAndParams = () => {
      const hash = window.location.hash.replace('#', '');
      const urlParams = new URLSearchParams(window.location.search);
      
      // Secret URL query or hash for admin
      if (
        hash === 'admin' || 
        hash === 'admin-portal' || 
        hash === 'secret-admin' || 
        urlParams.get('admin') === 'portal' ||
        urlParams.get('portal') === 'admin'
      ) {
        setAdminModalOpen(true);
      }

      if (!hash) {
        if (activeView === 'course-detail') {
          setActiveCourseForDetail(null);
          setActiveView('home');
        }
        return;
      }

      if (hash.startsWith('course-')) {
        const slugOrId = hash.replace('course-', '');
        const found = courses.find(c => c.id === slugOrId || c.slug === slugOrId);
        if (found) {
          setActiveCourseForDetail(found);
          setActiveView('course-detail');
          setTargetAudienceModalOpen(false);
        }
      } else if (hash.startsWith('class-')) {
        const clsId = hash.replace('class-', '');
        const foundClass = classes.find(c => c.id === clsId || c.id === `class-${clsId}`);
        if (foundClass) {
          setSelectedClass(foundClass.id);
          setActiveView('class-hub');
          setTargetAudienceModalOpen(false);
        }
      } else if (hash.startsWith('blog-')) {
        const slugOrId = hash.replace('blog-', '');
        const found = blogPosts.find(b => b.id === slugOrId || b.slug === slugOrId);
        if (found) {
          setActiveBlogForDetail(found);
          setActiveView('blogs');
          setTargetAudienceModalOpen(false);
        }
      }
    };

    handleHashAndParams();
    window.addEventListener('hashchange', handleHashAndParams);
    return () => window.removeEventListener('hashchange', handleHashAndParams);
  }, [courses, blogPosts, classes]);

  // Secret keyboard shortcut: Ctrl+Shift+A or Cmd+Shift+A opens Admin
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setAdminModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter courses by expiration
  const activeCourses = courses.filter(course => {
    if (course.isLifetime) return true;
    if (!course.courseExpiryDate) return true;
    return new Date(course.courseExpiryDate).getTime() > Date.now();
  });

  const openWhatsAppWithCourse = (course?: Course, customMsg?: string) => {
    if (course) {
      const msg = customMsg || `আসসালামু আলাইকুম! আমি "${course.title}" কোর্সটি সম্পর্কে জানতে ও ডিসকাউন্টে কিনতে চাই।`;
      setWhatsAppPreloadMsg(msg);
    } else if (customMsg) {
      setWhatsAppPreloadMsg(customMsg);
    } else {
      setWhatsAppPreloadMsg(siteSettings.whatsappWelcomeMessage);
    }
    setIsWhatsAppOpen(true);
  };

  const updateCourse = (updated: Course) => {
    setCourses(prev => prev.map(c => c.id === updated.id ? updated : c));
    if (activeCourseForDetail?.id === updated.id) {
      setActiveCourseForDetail(updated);
    }
  };

  const addCourse = (newCourse: Course) => {
    setCourses(prev => [newCourse, ...prev]);
  };

  const deleteCourse = (id: string) => {
    setCourses(prev => prev.filter(c => c.id !== id));
    if (activeCourseForDetail?.id === id) {
      setActiveCourseForDetail(null);
    }
  };

  const updateSiteSettings = (settings: Partial<SiteSettings>) => {
    setSiteSettings(prev => ({ ...prev, ...settings }));
  };

  const toggleMeetLive = () => {
    setSiteSettings(prev => ({ ...prev, isMeetLive: !prev.isMeetLive }));
  };

  const resetToDefaultData = () => {
    setCourses(INITIAL_COURSES);
    setCategories(INITIAL_CATEGORIES);
    setClasses(INITIAL_CLASSES);
    setCustomPages(INITIAL_CUSTOM_PAGES);
    setSiteSettings(INITIAL_SITE_SETTINGS);
    try {
      localStorage.setItem(COURSES_STORAGE_KEY, JSON.stringify(INITIAL_COURSES));
      localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(INITIAL_CATEGORIES));
      localStorage.setItem(CLASSES_STORAGE_KEY, JSON.stringify(INITIAL_CLASSES));
      localStorage.setItem(CUSTOM_PAGES_STORAGE_KEY, JSON.stringify(INITIAL_CUSTOM_PAGES));
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(INITIAL_SITE_SETTINGS));
    } catch (e) {
      console.error(e);
    }
  };

  const getCourseById = (id: string) => courses.find(c => c.id === id || c.slug === id);

  const getCoursesByCategory = (category: CourseCategory) => {
    if (category === 'all') return activeCourses;
    return activeCourses.filter(c => c.category === category);
  };

  const getCoursesByTag = (tag: string) => {
    const q = tag.toLowerCase();
    return activeCourses.filter(c => 
      c.tags.some(t => t.toLowerCase().includes(q)) || 
      c.category.toLowerCase().includes(q) ||
      c.title.toLowerCase().includes(q)
    );
  };

  // NavItems Helpers
  const navItems: NavItemConfig[] = siteSettings.navItems || INITIAL_SITE_SETTINGS.navItems || [];

  const addNavItem = (item: Omit<NavItemConfig, 'id' | 'order'> & { id?: string }) => {
    const current = siteSettings.navItems || INITIAL_SITE_SETTINGS.navItems || [];
    const maxOrder = current.reduce((max, n) => Math.max(max, n.order || 0), 0);
    const newNav: NavItemConfig = {
      id: item.id || `nav-${Date.now()}`,
      label: item.label.trim(),
      type: item.type,
      target: item.target,
      icon: item.icon || '🔗',
      enabled: item.enabled !== false,
      order: maxOrder + 1,
      isExternal: item.isExternal,
      badgeText: item.badgeText,
      dropdownType: item.dropdownType
    };
    const updated = [...current, newNav];
    updateSiteSettings({ navItems: updated });
  };

  const updateNavItem = (id: string, updates: Partial<NavItemConfig>) => {
    const current = siteSettings.navItems || INITIAL_SITE_SETTINGS.navItems || [];
    const updated = current.map(n => n.id === id ? { ...n, ...updates } : n);
    updateSiteSettings({ navItems: updated });
  };

  const deleteNavItem = (id: string) => {
    const current = siteSettings.navItems || INITIAL_SITE_SETTINGS.navItems || [];
    const updated = current.filter(n => n.id !== id);
    updateSiteSettings({ navItems: updated });
  };

  const reorderNavItem = (id: string, direction: 'up' | 'down') => {
    const current = [...(siteSettings.navItems || INITIAL_SITE_SETTINGS.navItems || [])].sort((a, b) => a.order - b.order);
    const index = current.findIndex(n => n.id === id);
    if (index === -1) return;
    if (direction === 'up' && index > 0) {
      const prevOrder = current[index - 1].order;
      current[index - 1].order = current[index].order;
      current[index].order = prevOrder;
    } else if (direction === 'down' && index < current.length - 1) {
      const nextOrder = current[index + 1].order;
      current[index + 1].order = current[index].order;
      current[index].order = nextOrder;
    }
    updateSiteSettings({ navItems: current });
  };

  const resetNavItems = () => {
    updateSiteSettings({ navItems: INITIAL_SITE_SETTINGS.navItems });
  };

  return (
    <CourseContext.Provider
      value={{
        courses,
        activeCourses,
        siteSettings,
        categories,
        activeCategories,
        classes,
        selectedClass,
        setSelectedClass,
        updateClassPortal,
        customPages,
        activeCustomPage,
        setActiveCustomPage,
        addCustomPage,
        updateCustomPage,
        deleteCustomPage,
        openCustomPage,
        blogPosts,
        blogs: blogPosts,
        reviews,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        targetAudienceModalOpen,
        setTargetAudienceModalOpen,
        activeCourseForDetail,
        setActiveCourseForDetail,
        activeBlogForDetail,
        setActiveBlogForDetail,
        adminModalOpen,
        setAdminModalOpen,
        isWhatsAppOpen,
        setIsWhatsAppOpen,
        isAssistantOpen,
        setIsAssistantOpen,
        whatsAppPreloadMsg,
        activeView,
        setActiveView,
        isAdminAuthenticated,
        setIsAdminAuthenticated,
        updateAdminPassword,
        checkAdminPassword,
        logoutAdmin,
        openCoursePage,
        closeCoursePage,
        openClassPortal,
        navItems,
        addNavItem,
        updateNavItem,
        deleteNavItem,
        reorderNavItem,
        resetNavItems,
        addCategory,
        updateCategory,
        deleteCategory,
        reorderCategory,
        toggleCategoryEnabled,
        resetCategories,
        openWhatsAppWithCourse,
        updateCourse,
        addCourse,
        deleteCourse,
        updateSiteSettings,
        toggleMeetLive,
        resetToDefaultData,
        getCourseById,
        getCoursesByCategory,
        getCoursesByTag
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourse must be used within a CourseProvider');
  }
  return context;
};


