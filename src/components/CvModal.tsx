import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Download,
  ExternalLink,
  FileText,
  Printer,
  Sparkles,
  CheckCircle2,
  Share2,
  Check
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const CvModal: React.FC = () => {
  const {
    isCvModalOpen,
    setIsCvModalOpen,
    cvConfig,
    siteSettings,
    language,
    t,
    showToast
  } = usePortfolio();

  if (!isCvModalOpen) return null;

  const hasCustomPdf = Boolean(cvConfig.pdfUrl && cvConfig.pdfUrl.startsWith('data:application/pdf'));

  const handleDownload = () => {
    if (cvConfig.pdfUrl) {
      const link = document.createElement('a');
      link.href = cvConfig.pdfUrl;
      link.download = cvConfig.fileName || 'LIM_Bunterm_Graphic_Design_CV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('Downloading CV PDF...', 'info');
    } else {
      // Trigger window print for default resume
      window.print();
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
        {/* Backdrop click */}
        <div className="fixed inset-0" onClick={() => setIsCvModalOpen(false)} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-zinc-200 overflow-hidden"
        >
          {/* Modal Header */}
          <div className="px-6 py-4 border-b border-zinc-200 flex items-center justify-between gap-4 bg-zinc-50/70">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center shadow-xs"
                style={{ 
                  backgroundColor: 'var(--theme-light, #FFF7ED)',
                  color: 'var(--theme-primary, #EA580C)'
                }}
              >
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-zinc-950">
                  {cvConfig.fileName || 'Curriculum Vitae'}
                </h3>
                <p className="text-xs text-zinc-500">
                  {siteSettings.siteName.split('—')[0]?.trim()} · {cvConfig.designerTitle}
                </p>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrint}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-200 bg-white text-xs font-semibold text-zinc-700 hover:bg-zinc-100"
                title="Print CV"
              >
                <Printer className="w-3.5 h-3.5 text-zinc-500" />
                <span>Print</span>
              </button>

              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-white text-xs font-bold shadow-xs hover:shadow transition-all"
                style={{ backgroundColor: 'var(--theme-primary, #EA580C)' }}
              >
                <Download className="w-4 h-4" />
                <span>{language === 'km' ? cvConfig.downloadButtonLabelKm : cvConfig.downloadButtonLabel}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsCvModalOpen(false)}
                className="p-2 rounded-xl text-zinc-400 hover:text-zinc-900 hover:bg-zinc-200 transition-colors ml-1"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#FBFBFA]">
            {hasCustomPdf ? (
              <div className="w-full h-[70vh] rounded-2xl border border-zinc-300 bg-zinc-100 overflow-hidden shadow-inner">
                <iframe
                  src={cvConfig.pdfUrl}
                  title="Official CV PDF"
                  className="w-full h-full border-0"
                />
              </div>
            ) : (
              /* Printable High-Resolution Designer Resume Document */
              <div className="bg-white rounded-2xl border border-zinc-200/90 p-6 sm:p-10 shadow-sm max-w-3xl mx-auto space-y-8">
                {/* Header Lockup */}
                <div className="border-b border-zinc-200 pb-6 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight">
                      {siteSettings.siteName.split('—')[0]?.trim() || 'LIM Bunterm'}
                    </h2>
                    <p 
                      className="text-sm font-bold uppercase tracking-wider mt-1.5"
                      style={{ color: 'var(--theme-primary, #EA580C)' }}
                    >
                      {cvConfig.designerTitle}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-500 mt-2">
                      <span>{siteSettings.contactEmail}</span>
                      <span>·</span>
                      <span>{siteSettings.contactPhone}</span>
                      <span>·</span>
                      <span>{siteSettings.address}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span 
                      className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider font-mono"
                      style={{ 
                        backgroundColor: 'var(--theme-light, #FFF7ED)',
                        color: 'var(--theme-primary, #EA580C)'
                      }}
                    >
                      Official Resume
                    </span>
                  </div>
                </div>

                {/* Profile Summary */}
                <div className="space-y-2">
                  <h3 className="text-xs font-bold text-zinc-950 uppercase tracking-wider">
                    Executive Profile
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
                    {cvConfig.summary}
                  </p>
                </div>

                {/* Core Disciplines & Tools */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-zinc-100">
                  <div className="space-y-2.5">
                    <h3 className="text-xs font-bold text-zinc-950 uppercase tracking-wider">
                      Specializations &amp; Deliverables
                    </h3>
                    <ul className="space-y-1.5 text-xs text-zinc-600">
                      {(cvConfig.keySkills || []).map((skill, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--theme-primary, #EA580C)' }} />
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2.5">
                    <h3 className="text-xs font-bold text-zinc-950 uppercase tracking-wider">
                      Technical &amp; Production Stack
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {(cvConfig.softwareProficiencies || []).map((tool, idx) => (
                        <span 
                          key={idx} 
                          className="px-2.5 py-1 rounded-lg bg-zinc-100 text-zinc-800 text-xs font-medium"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Experience */}
                <div className="space-y-4 pt-2 border-t border-zinc-100">
                  <h3 className="text-xs font-bold text-zinc-950 uppercase tracking-wider">
                    Professional Experience
                  </h3>
                  <div className="space-y-4">
                    {(cvConfig.experiences || []).map((exp) => (
                      <div key={exp.id} className="space-y-1 text-xs">
                        <div className="flex items-center justify-between font-bold text-zinc-900">
                          <span className="text-sm">{exp.role}</span>
                          <span className="text-zinc-500 font-mono text-xs">{exp.period}</span>
                        </div>
                        <p className="text-zinc-700 font-semibold">
                          {exp.company} {exp.location ? `· ${exp.location}` : ''}
                        </p>
                        <p className="text-zinc-600 leading-relaxed pt-0.5">
                          {exp.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div className="space-y-3 pt-2 border-t border-zinc-100">
                  <h3 className="text-xs font-bold text-zinc-950 uppercase tracking-wider">
                    Education &amp; Credentials
                  </h3>
                  {(cvConfig.education || []).map((edu) => (
                    <div key={edu.id} className="text-xs text-zinc-700 space-y-0.5">
                      <div className="flex items-center justify-between font-bold text-zinc-900">
                        <span className="text-sm">{edu.degree}</span>
                        <span className="text-zinc-500 font-mono text-xs">{edu.period}</span>
                      </div>
                      <p className="text-zinc-600 font-medium">{edu.institution}</p>
                      {edu.details && (
                        <p className="text-zinc-500 text-[11px] pt-0.5">{edu.details}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
