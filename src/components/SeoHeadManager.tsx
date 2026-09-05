import React, { useEffect } from 'react';
import { useCourse } from '../context/CourseContext';

export const SeoHeadManager: React.FC = () => {
  const { siteSettings, activeView, activeCourseForDetail } = useCourse();

  useEffect(() => {
    if (!siteSettings) return;

    // Dynamic Title based on view & settings
    let title = siteSettings.metaTitle || siteSettings.siteName || '10MsCourse - ১০ মিনিট স্কুল কোর্স ও ডিসকাউন্ট';
    let description = siteSettings.metaDescription || siteSettings.siteTagline || '';
    let image = siteSettings.ogImageUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80';

    if (activeView === 'course-detail' && activeCourseForDetail) {
      title = `${activeCourseForDetail.title} - প্রোমোকোড ও সেরা ছাড় | ${siteSettings.siteName || '10MsCourse'}`;
      description = activeCourseForDetail.shortDescription || activeCourseForDetail.subtitle || description;
      image = activeCourseForDetail.thumbnail || image;
    } else if (activeView === 'blogs') {
      title = `ব্লগ ও স্পেশাল গাইডলাইন | ${siteSettings.siteName || '10MsCourse'}`;
    } else if (activeView === 'reviews') {
      title = `শিক্ষার্থী রিভিউ ও অভিজ্ঞতা | ${siteSettings.siteName || '10MsCourse'}`;
    } else if (activeView === 'class-hub') {
      title = `অনলাইন ক্লাস ও একাডেমিক ব্যাচ | ${siteSettings.siteName || '10MsCourse'}`;
    }

    // Set document title
    document.title = title;

    // Helper to set or create meta tags
    const setMetaTag = (selector: string, attrName: 'name' | 'property', attrValue: string, content: string) => {
      let element = document.querySelector(selector) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Standard Meta Tags
    setMetaTag('meta[name="description"]', 'name', 'description', description);
    setMetaTag('meta[name="title"]', 'name', 'title', title);
    if (siteSettings.metaKeywords) {
      setMetaTag('meta[name="keywords"]', 'name', 'keywords', siteSettings.metaKeywords);
    }
    if (siteSettings.metaAuthor) {
      setMetaTag('meta[name="author"]', 'name', 'author', siteSettings.metaAuthor);
    }

    // Canonical link
    if (siteSettings.canonicalUrl) {
      let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', siteSettings.canonicalUrl);
    }

    // Favicon link
    if (siteSettings.faviconUrl) {
      let favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement | null;
      if (!favicon) {
        favicon = document.createElement('link');
        favicon.setAttribute('rel', 'icon');
        document.head.appendChild(favicon);
      }
      favicon.setAttribute('href', siteSettings.faviconUrl);
    }

    // OpenGraph Tags
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', siteSettings.ogTitle || title);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', siteSettings.ogDescription || description);
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', image);
    setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', siteSettings.siteName || '10MsCourse');
    if (siteSettings.canonicalUrl) {
      setMetaTag('meta[property="og:url"]', 'property', 'og:url', siteSettings.canonicalUrl);
    }

    // Twitter Tags
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', siteSettings.twitterTitle || title);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', siteSettings.twitterDescription || description);
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', siteSettings.twitterImage || image);

    // Schema.org JSON-LD Structured Data
    let schemaScript = document.getElementById('dynamic-jsonld-schema') as HTMLScriptElement | null;
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = 'dynamic-jsonld-schema';
      schemaScript.type = 'application/ld+json';
      document.head.appendChild(schemaScript);
    }

    const schemaData = {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "name": siteSettings.siteName || "10MsCourse",
      "url": siteSettings.canonicalUrl || "https://10mscourse.shop",
      "logo": siteSettings.customLogoUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&auto=format&fit=crop&q=80",
      "description": siteSettings.metaDescription || siteSettings.siteTagline || "১০ মিনিট স্কুলের সকল সেরা কোর্স, স্পেশাল ডিসকাউন্ট কুপন ও ভর্তি গাইডলাইন হাব।",
      "sameAs": [
        siteSettings.facebookPageUrl || "https://facebook.com",
        siteSettings.youtubeUrl || "https://youtube.com",
        "https://10minuteschool.com"
      ]
    };
    schemaScript.textContent = JSON.stringify(schemaData);

  }, [siteSettings, activeView, activeCourseForDetail]);

  return null;
};
