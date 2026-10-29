import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Sparkles,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  FileText
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { SectionEditBadge } from './cms/SectionEditBadge';

export const Hero: React.FC = () => {
  const { openForWork, openContactWithService, studioProfile, heroConfig, cvConfig, setIsCvModalOpen, t, language } = usePortfolio();


  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const slides = heroConfig.images && heroConfig.images.length > 0
    ? heroConfig.images
    : [
        {
          id: 'default-hero',
          url: '/src/assets/images/hero_asian_designer_portrait_1793247007871.jpg',
          title: 'Design Director',
          caption: 'Brand Architect & Graphic Designer',
          order: 1
        }
      ];

  const totalSlides = slides.length;

  // Autoplay timer
  useEffect(() => {
    if (!heroConfig.autoplay || isPaused || totalSlides <= 1) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const durationMs = (heroConfig.slideDuration || 4.5) * 1000;
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, durationMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [heroConfig.autoplay, heroConfig.slideDuration, isPaused, totalSlides]);

  const scrollToWork = () => {
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  // Animation variants based on chosen animationStyle
  const getAnimationVariants = () => {
    const speed = heroConfig.transitionSpeed || 0.8;
    switch (heroConfig.animationStyle) {
      case 'slide-left':
        return {
          initial: { opacity: 0, x: 80 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: -80 },
          transition: { duration: speed, ease: 'easeOut' as const }
        };
      case 'slide-right':
        return {
          initial: { opacity: 0, x: -80 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: 80 },
          transition: { duration: speed, ease: 'easeOut' as const }
        };
      case 'zoom-in':
        return {
          initial: { opacity: 0, scale: 0.88 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 1.1 },
          transition: { duration: speed, ease: 'easeOut' as const }
        };
      case 'ken-burns':
        return {
          initial: { opacity: 0, scale: 1 },
          animate: { opacity: 1, scale: 1.15 },
          exit: { opacity: 0, scale: 1.2 },
          transition: { duration: (heroConfig.slideDuration || 5) * 1.1, ease: 'linear' as const }
        };
      case 'fade':
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: { duration: speed, ease: 'easeInOut' as const }
        };
    }
  };

  // Aspect ratio classes
  const getAspectClass = () => {
    switch (heroConfig.aspectRatio) {
      case '1:1':
        return 'aspect-square';
      case '16:9':
        return 'aspect-video';
      case 'asymmetric':
        return 'aspect-[4/5] rounded-[48px] rounded-tr-[12px]';
      case '4:5':
      default:
        return 'aspect-[4/5] rounded-3xl';
    }
  };

  // Image object fit
  const getObjectFitClass = () => {
    switch (heroConfig.displayStyle) {
      case 'contain':
        return 'object-contain';
      case 'fill':
        return 'object-fill';
      case 'cover':
      default:
        return 'object-cover';
    }
  };

  // Image position
  const getObjectPositionClass = () => {
    switch (heroConfig.imagePosition) {
      case 'top':
        return 'object-top';
      case 'bottom':
        return 'object-bottom';
      case 'center':
      default:
        return 'object-center';
    }
  };

  const currentSlide = slides[currentIndex] || slides[0];

  // Headline resolution
  const headlinePrefix = language === 'km' && studioProfile.headlinePrefix === 'Design That'
    ? t('hero_headline_prefix')
    : studioProfile.headlinePrefix;

  const headlineHighlight = language === 'km' && studioProfile.headlineHighlight === 'Builds Brands.'
    ? t('hero_headline_highlight')
    : studioProfile.headlineHighlight;

  const subtitleText = language === 'km' && studioProfile.subtitle.includes('ambitious brands')
    ? t('hero_subtitle')
    : studioProfile.subtitle;

  return (
    <section id="hero" className="relative pt-8 pb-16 sm:pt-14 sm:pb-24 overflow-hidden">
      {/* Quick Edit Badge for Section */}
      <SectionEditBadge sectionKey="hero" sectionTitle="Hero Slideshow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & CTAs with Staggered Entrance */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.12,
                  delayChildren: 0.1
                }
              }
            }}
            className="lg:col-span-7 flex flex-col items-start space-y-6 sm:space-y-8"
          >
            {/* Availability Badge */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } }
              }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-zinc-200/90 shadow-xs"
            >
              <span 
                className="w-2 h-2 rounded-full animate-pulse" 
                style={{ backgroundColor: 'var(--theme-primary, #EA580C)' }} 
              />
              <span 
                className="text-xs font-semibold tracking-wide uppercase"
                style={{ color: 'var(--theme-primary, #EA580C)' }}
              >
                {t('hero_available')}
              </span>
              <ArrowUpRight className="w-3.5 h-3.5" style={{ color: 'var(--theme-primary, #EA580C)' }} />
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              variants={{
                hidden: { opacity: 0, y: 28 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' as const } }
              }}
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-zinc-950 tracking-tight leading-[1.08] text-balance"
            >
              {headlinePrefix} <br />
              <span className="text-zinc-950 inline-block">
                <span style={{ color: 'var(--theme-primary, #EA580C)' }}>{headlineHighlight}</span>
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } }
              }}
              className="text-lg sm:text-xl text-zinc-600 max-w-xl font-normal leading-relaxed"
            >
              {subtitleText}
            </motion.p>

            {/* CTAs and Experience Badge */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } }
              }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <button
                onClick={scrollToWork}
                className="inline-flex items-center gap-2.5 text-white px-7 py-3.5 rounded-full text-base font-semibold shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0"
                style={{ backgroundColor: 'var(--theme-primary, #EA580C)' }}
              >
                <span>{t('hero_explore')}</span>
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </div>
              </button>

              <button
                onClick={() => openContactWithService()}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-zinc-300 hover:border-zinc-400 bg-white/80 hover:bg-zinc-50 text-zinc-800 text-base font-semibold transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>{t('hero_lets_talk')}</span>
                <ArrowRight className="w-4 h-4 text-zinc-500" />
              </button>

              {cvConfig.showDownloadInHero && (
                <button
                  onClick={() => setIsCvModalOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-zinc-300 hover:border-zinc-400 bg-white hover:bg-zinc-50 text-zinc-800 text-base font-semibold transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-2xs"
                  title="View & Download CV (PDF)"
                >
                  <FileText className="w-4 h-4" style={{ color: 'var(--theme-primary, #EA580C)' }} />
                  <span>{language === 'km' ? cvConfig.downloadButtonLabelKm : cvConfig.downloadButtonLabel}</span>
                </button>
              )}


              <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-zinc-100/80 border border-zinc-200 text-zinc-800">
                <div 
                  className="w-7 h-7 rounded-xl flex items-center justify-center bg-white shadow-2xs"
                  style={{ color: 'var(--theme-primary, #EA580C)' }}
                >
                  <Award className="w-4 h-4" />
                </div>
                <div className="text-xs leading-tight">
                  <span className="font-bold text-zinc-900 block text-sm">{studioProfile.metricYears}</span>
                  <span className="text-zinc-500 font-medium">{t('metrics_years')}</span>
                </div>
              </div>
            </motion.div>

            {/* Quick Skills highlights */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } }
              }}
              className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-zinc-500 font-medium border-t border-zinc-200/60 w-full"
            >
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" style={{ color: 'var(--theme-primary, #EA580C)' }} /> {t('hero_brand_identities')}
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" style={{ color: 'var(--theme-primary, #EA580C)' }} /> {t('hero_luxury_packaging')}
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" style={{ color: 'var(--theme-primary, #EA580C)' }} /> {t('hero_editorial')}
              </span>
            </motion.div>
          </motion.div>

          {/* Right Column: Full-Body Professional Designer Portrait */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: 'easeOut' as const }}
            className="lg:col-span-5 relative flex flex-col justify-end items-center min-h-[480px] sm:min-h-[560px] lg:min-h-[620px]"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Ambient Background Radial Halo */}
            <div 
              className="absolute w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] rounded-full opacity-35 blur-3xl pointer-events-none top-4 sm:top-10"
              style={{ 
                background: 'radial-gradient(circle, var(--theme-primary, #0891B2) 0%, rgba(34, 211, 238, 0.3) 45%, transparent 75%)'
              }}
            />

            {/* Subtle Decorative Ring */}
            <div 
              className="absolute w-[290px] h-[290px] sm:w-[370px] sm:h-[370px] rounded-full border border-dashed opacity-25 pointer-events-none top-8 sm:top-14"
              style={{ borderColor: 'var(--theme-primary, #0891B2)' }}
            />

            {/* Main Portrait Display Container */}
            <div className="relative z-10 w-full max-w-[460px] flex flex-col items-center justify-end">
              <AnimatePresence mode="wait">
                {currentSlide && (
                  <motion.div
                    key={currentSlide.id}
                    {...getAnimationVariants()}
                    className="relative w-full flex items-end justify-center overflow-visible"
                  >
                    {/* Realistic Full-Body Studio Portrait */}
                    <img
                      src={currentSlide.url}
                      alt={currentSlide.title || 'Studio Designer'}
                      referrerPolicy="no-referrer"
                      className="w-auto h-auto max-h-[500px] sm:max-h-[580px] lg:max-h-[620px] object-contain object-bottom drop-shadow-[0_15px_30px_rgba(0,0,0,0.1)] select-none"
                      style={{
                        mixBlendMode: 'multiply'
                      }}
                    />

                    {/* Smooth Bottom Gradient Fade into background */}
                    <div className="absolute inset-x-0 bottom-0 h-28 sm:h-36 bg-gradient-to-t from-[#FBFBFA] via-[#FBFBFA]/80 to-transparent pointer-events-none z-10" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Manual Navigation Arrows (available if slideshow has multiple slides) */}
              {heroConfig.showControls && totalSlides > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-zinc-800 flex items-center justify-center backdrop-blur-md transition-all z-30 shadow-md border border-zinc-200/80 hover:scale-105 active:scale-95"
                    style={{ borderColor: 'var(--theme-border, #A5F3FC)' }}
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-5 h-5 text-zinc-700" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-zinc-800 flex items-center justify-center backdrop-blur-md transition-all z-30 shadow-md border border-zinc-200/80 hover:scale-105 active:scale-95"
                    style={{ borderColor: 'var(--theme-border, #A5F3FC)' }}
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-5 h-5 text-zinc-700" />
                  </button>
                </>
              )}

              {/* Slide Indicators Dots */}
              {heroConfig.showIndicators && totalSlides > 1 && (
                <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-30 bg-white/90 px-3.5 py-1.5 rounded-full backdrop-blur-md border border-zinc-200/80 shadow-xs">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-1.5 rounded-full transition-all ${
                        currentIndex === idx ? 'w-5' : 'w-1.5 bg-zinc-300 hover:bg-zinc-400'
                      }`}
                      style={{
                        backgroundColor: currentIndex === idx ? 'var(--theme-primary, #0891B2)' : undefined
                      }}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              )}

              {/* Floating Mini Accolade Card: Design Excellence (overlapping lower-left) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute bottom-6 left-0 sm:-left-4 z-20 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-zinc-200/80 flex items-center gap-3"
              >
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm"
                  style={{ backgroundColor: 'var(--theme-primary, #0891B2)' }}
                >
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-900 leading-snug">Design Excellence</p>
                  <p className="text-[11px] text-zinc-500 font-medium">Selected Brand Works</p>
                </div>
              </motion.div>

              {/* Floating 5.0 Client Rating Badge (near top-right) */}
              <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute top-4 right-1 sm:right-0 z-20 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg border border-zinc-200/80 flex items-center gap-2 text-xs font-semibold text-zinc-800"
              >
                <span style={{ color: 'var(--theme-primary, #0891B2)' }} className="text-sm">★</span>
                <span>5.0 Client Rating</span>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
