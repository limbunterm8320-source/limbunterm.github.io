import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { SectionEditBadge } from './cms/SectionEditBadge';
import { staggerContainer, fadeInUp, fadeInScale } from '../utils/animations';

export const CtaBanner: React.FC = () => {
  const { openContactWithService, t } = usePortfolio();

  return (
    <section id="cta" className="py-12 sm:py-16 relative overflow-hidden">
      <SectionEditBadge sectionKey="content" sectionTitle="Call to Action" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Vibrant Dynamic Theme Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="text-white rounded-[32px] p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-8"
          style={{
            background: 'linear-gradient(135deg, var(--theme-primary, #EA580C) 0%, var(--theme-accent, #FB923C) 100%)',
            boxShadow: '0 25px 50px -12px var(--theme-shadow, rgba(234, 88, 12, 0.28))'
          }}
        >
          {/* Background subtle graphical circle rings */}
          <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full border border-white/20 pointer-events-none" />
          <div className="absolute -left-16 -bottom-16 w-80 h-80 rounded-full border border-white/10 pointer-events-none" />

          {/* Left Content */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="relative z-10 max-w-2xl space-y-3"
          >
            <motion.span variants={fadeInUp} className="text-xs font-extrabold uppercase tracking-widest text-white/90 block">
              {t('cta_badge')}
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {t('cta_title_1')}<br />
              <span className="underline decoration-white/40">{t('cta_title_2')}</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-white/90 text-sm sm:text-base font-normal max-w-lg pt-1">
              {t('cta_desc')}
            </motion.p>
          </motion.div>

          {/* Right Action Button & Response Indicator */}
          <motion.div 
            variants={fadeInScale}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="relative z-10 flex flex-col sm:items-start lg:items-end gap-3 shrink-0"
          >
            <button
              onClick={() => openContactWithService()}
              className="inline-flex items-center justify-center gap-3 bg-[#18181B] hover:bg-black text-white px-7 py-4 rounded-full text-sm sm:text-base font-bold shadow-xl transition-all hover:scale-103 active:scale-98"
            >
              <span>{t('cta_btn')}</span>
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                <ArrowUpRight className="w-3.5 h-3.5 text-white" />
              </div>
            </button>

            <div className="flex items-center gap-2 text-xs text-white/90 font-medium px-2">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>{t('cta_reply')}</span>
            </div>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
};
