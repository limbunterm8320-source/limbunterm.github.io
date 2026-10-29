import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, ArrowRight, MessageSquare, Send, Clock } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { SectionEditBadge } from './cms/SectionEditBadge';
import { staggerContainer, fadeInUp, fadeInScale } from '../utils/animations';

export const ContactSection: React.FC = () => {
  const { openContactWithService, siteSettings, t } = usePortfolio();

  return (
    <section id="contact" className="py-14 sm:py-20 border-t border-zinc-200/80 relative overflow-hidden">
      <SectionEditBadge sectionKey="contact" sectionTitle="Contact & Socials" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Contact details & intro */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="lg:col-span-7 space-y-6"
          >
            <motion.span 
              variants={fadeInUp} 
              className="text-xs font-bold uppercase tracking-wider block"
              style={{ color: 'var(--theme-primary, #EA580C)' }}
            >
              {t('contact_badge')}
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-950 tracking-tight">
              {t('contact_title')}
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-zinc-600 text-base leading-relaxed max-w-xl">
              {t('contact_desc')}
            </motion.p>

            <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <a 
                href={`mailto:${siteSettings.contactEmail}`} 
                className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-zinc-200 transition-colors group shadow-xs hover:shadow-sm"
              >
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: 'var(--theme-light, #FFF7ED)',
                    color: 'var(--theme-primary, #EA580C)'
                  }}
                >
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-zinc-400 block font-medium">{t('contact_email_title')}</span>
                  <span 
                    className="text-sm font-bold text-zinc-900 transition-colors truncate block max-w-[200px]"
                  >
                    {siteSettings.contactEmail}
                  </span>
                </div>
              </a>

              <a 
                href={`tel:${siteSettings.contactPhone.replace(/[^0-9+]/g, '')}`} 
                className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-zinc-200 transition-colors group shadow-xs hover:shadow-sm"
              >
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: 'var(--theme-light, #FFF7ED)',
                    color: 'var(--theme-primary, #EA580C)'
                  }}
                >
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-zinc-400 block font-medium">{t('contact_phone_title')}</span>
                  <span 
                    className="text-sm font-bold text-zinc-900 transition-colors truncate block max-w-[200px]"
                  >
                    {siteSettings.contactPhone}
                  </span>
                </div>
              </a>
            </motion.div>

            {/* Telegram and Hours info */}
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4 text-xs text-zinc-600 pt-1">
              {siteSettings.contactTelegram && (
                <span className="flex items-center gap-1.5 font-medium">
                  <Send className="w-3.5 h-3.5" style={{ color: 'var(--theme-primary, #EA580C)' }} />
                  <span>{t('contact_telegram_label')}: <strong>{siteSettings.contactTelegram}</strong></span>
                </span>
              )}
              <span className="flex items-center gap-1.5 font-medium">
                <Clock className="w-3.5 h-3.5" style={{ color: 'var(--theme-primary, #EA580C)' }} />
                <span>{siteSettings.workingHours}</span>
              </span>
            </motion.div>
          </motion.div>

          {/* Right Column: Fast-Track Card */}
          <motion.div 
            variants={fadeInScale}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-5 bg-zinc-900 text-white rounded-3xl p-8 shadow-xl flex flex-col justify-between space-y-6"
          >
            <div>
              <span 
                className="text-xs font-bold uppercase tracking-wider block mb-2"
                style={{ color: 'var(--theme-accent, #FB923C)' }}
              >
                {t('contact_brief_badge')}
              </span>
              <h3 className="text-2xl font-bold text-white mb-3">
                {t('contact_brief_title')}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {t('contact_brief_desc')}
              </p>
            </div>

            <button
              onClick={() => openContactWithService()}
              className="w-full text-white py-4 px-6 rounded-2xl font-bold text-sm tracking-wide shadow-md transition-all flex items-center justify-center gap-2 hover:scale-101 active:scale-98"
              style={{ backgroundColor: 'var(--theme-primary, #EA580C)' }}
            >
              <MessageSquare className="w-4 h-4" />
              <span>{t('contact_open_form')}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
