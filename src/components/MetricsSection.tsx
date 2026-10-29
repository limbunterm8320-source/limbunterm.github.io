import React from 'react';
import { motion } from 'motion/react';
import { Smile, ThumbsUp, Star, Globe, FileText, Download } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { SectionEditBadge } from './cms/SectionEditBadge';
import { staggerContainer, fadeInUp, fadeInScale } from '../utils/animations';


export const MetricsSection: React.FC = () => {
  const { studioProfile, cvConfig, setIsCvModalOpen, language, t } = usePortfolio();


  const metrics = [
    {
      value: studioProfile.metricYears,
      label: t('metrics_years'),
      icon: Smile,
      desc: t('metrics_years_desc')
    },
    {
      value: studioProfile.metricProjects,
      label: t('metrics_projects'),
      icon: ThumbsUp,
      desc: t('metrics_projects_desc')
    },
    {
      value: studioProfile.metricClients,
      label: t('metrics_clients'),
      icon: Star,
      desc: t('metrics_clients_desc')
    },
    {
      value: studioProfile.metricCountries,
      label: t('metrics_countries'),
      icon: Globe,
      desc: t('metrics_countries_desc')
    }
  ];

  return (
    <section id="about" className="py-10 sm:py-14 relative overflow-hidden">
      <SectionEditBadge sectionKey="content" sectionTitle="About & Milestones" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Warm Soft Container from Figma Design */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl p-6 sm:p-10 shadow-xs border transition-colors"
          style={{
            backgroundColor: 'var(--theme-light, #FFF7ED)',
            borderColor: 'var(--theme-border, #FED7AA)'
          }}
        >
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-zinc-200/60"
          >
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className={`flex flex-col items-center text-center p-3 ${index > 0 ? 'pt-6 sm:pt-3' : ''}`}
                >
                  {/* Delicate Icon matching Figma */}
                  <div 
                    className="w-11 h-11 rounded-2xl bg-white shadow-2xs flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110"
                    style={{ color: 'var(--theme-primary, #EA580C)' }}
                  >
                    <Icon className="w-5 h-5 stroke-[1.75]" />
                  </div>

                  {/* Value */}
                  <span className="text-3xl sm:text-4xl font-extrabold text-zinc-950 font-mono tracking-tight">
                    {metric.value}
                  </span>

                  {/* Label */}
                  <span className="text-sm font-semibold text-zinc-800 mt-1">
                    {metric.label}
                  </span>

                  {/* Sub-label */}
                  <span className="text-xs text-zinc-500 mt-0.5">
                    {metric.desc}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Official CV Credentials Banner */}
          {cvConfig.showDownloadInAbout && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="mt-8 pt-6 border-t border-zinc-200/60 flex flex-wrap items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-2xl bg-white shadow-2xs flex items-center justify-center shrink-0"
                  style={{ color: 'var(--theme-primary, #EA580C)' }}
                >
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-950">
                    {cvConfig.fileName || 'Official Designer CV'}
                  </h4>
                  <p className="text-xs text-zinc-500">
                    {cvConfig.designerTitle} · Royal Academy of Fine Arts · First-Class Honours
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsCvModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-xs font-bold shadow-xs hover:shadow transition-all hover:-translate-y-0.5 active:translate-y-0"
                style={{ backgroundColor: 'var(--theme-primary, #EA580C)' }}
              >
                <Download className="w-3.5 h-3.5" />
                <span>{language === 'km' ? cvConfig.downloadButtonLabelKm : cvConfig.downloadButtonLabel}</span>
              </button>
            </motion.div>
          )}
        </motion.div>


      </div>
    </section>
  );
};
