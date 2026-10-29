import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileText,
  Upload,
  Download,
  Trash2,
  ExternalLink,
  Eye,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  RefreshCw,
  Sliders,
  Plus,
  Briefcase,
  GraduationCap,
  Sparkles,
  Layers,
  Check
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const CvResumeManager: React.FC = () => {
  const {
    cvConfig,
    updateCvConfig,
    uploadCvPdf,
    deleteCvPdf,
    showToast,
    siteSettings,
    setIsCvModalOpen
  } = usePortfolio();

  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<'upload' | 'toggles' | 'content'>('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Experience modal/add state
  const [newSkill, setNewSkill] = useState('');
  const [newSoftware, setNewSoftware] = useState('');

  // Format bytes into readable string
  const formatFileSize = (bytes: number): string => {
    if (!bytes || bytes === 0) return '0 KB';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    await processPdfUpload(files[0]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const processPdfUpload = async (file: File) => {
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      showToast('Please select a valid PDF document (.pdf)', 'error');
      return;
    }

    try {
      setIsUploading(true);
      await uploadCvPdf(file);
    } catch (err: any) {
      console.error('PDF upload error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      await processPdfUpload(files[0]);
    }
  };

  const handleDownload = () => {
    if (cvConfig.pdfUrl) {
      const link = document.createElement('a');
      link.href = cvConfig.pdfUrl;
      link.download = cvConfig.fileName || 'Designer_CV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('Download started', 'info');
    } else {
      // Trigger modal or printable CV
      setIsCvModalOpen(true);
    }
  };

  const handleAddSkill = () => {
    if (!newSkill.trim()) return;
    const skills = [...(cvConfig.keySkills || []), newSkill.trim()];
    updateCvConfig({ keySkills: skills });
    setNewSkill('');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const skills = (cvConfig.keySkills || []).filter((s) => s !== skillToRemove);
    updateCvConfig({ keySkills: skills });
  };

  const handleAddSoftware = () => {
    if (!newSoftware.trim()) return;
    const software = [...(cvConfig.softwareProficiencies || []), newSoftware.trim()];
    updateCvConfig({ softwareProficiencies: software });
    setNewSoftware('');
  };

  const handleRemoveSoftware = (softToRemove: string) => {
    const software = (cvConfig.softwareProficiencies || []).filter((s) => s !== softToRemove);
    updateCvConfig({ softwareProficiencies: software });
  };

  const hasCustomPdf = Boolean(cvConfig.pdfUrl && cvConfig.pdfUrl.startsWith('data:application/pdf'));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-zinc-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <span 
            className="text-xs font-bold uppercase tracking-wider block"
            style={{ color: 'var(--theme-primary, #EA580C)' }}
          >
            Curriculum Vitae &amp; Credentials
          </span>
          <h2 className="text-2xl font-extrabold text-zinc-950">CV &amp; Resume Management</h2>
          <p className="text-sm text-zinc-500 mt-0.5">
            Upload your official CV PDF document, customize download buttons, and configure public portfolio visibility.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1.5 bg-zinc-100 rounded-2xl">
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'upload'
                ? 'bg-white text-zinc-950 shadow-xs'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            PDF File &amp; Preview
          </button>
          <button
            onClick={() => setActiveTab('toggles')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'toggles'
                ? 'bg-white text-zinc-950 shadow-xs'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            Website Placement
          </button>
          <button
            onClick={() => setActiveTab('content')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'content'
                ? 'bg-white text-zinc-950 shadow-xs'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            Resume Details
          </button>
        </div>
      </div>

      {/* Tab 1: PDF Upload & Live Preview */}
      {activeTab === 'upload' && (
        <div className="space-y-6">
          
          {/* Main Upload Zone */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/80 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-zinc-950 flex items-center gap-2">
                <FileText className="w-5 h-5" style={{ color: 'var(--theme-primary, #EA580C)' }} />
                <span>Upload Official CV (PDF)</span>
              </h3>
              <span className="text-xs text-zinc-400 font-mono">Max 25MB · PDF format</span>
            </div>

            {/* Drag & Drop Area */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all cursor-pointer ${
                isDragging
                  ? 'border-(--theme-primary,#EA580C) bg-orange-50/50 scale-[1.01]'
                  : 'border-zinc-300 hover:border-zinc-400 bg-zinc-50/60 hover:bg-zinc-50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />

              <div className="max-w-md mx-auto space-y-3">
                <div 
                  className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center shadow-xs transition-transform group-hover:scale-105"
                  style={{ 
                    backgroundColor: 'var(--theme-light, #FFF7ED)',
                    color: 'var(--theme-primary, #EA580C)'
                  }}
                >
                  <Upload className="w-8 h-8" />
                </div>
                
                <div>
                  <h4 className="text-base font-bold text-zinc-900">
                    {isDragging ? 'Drop your PDF file here' : 'Click to select or drag and drop your CV PDF'}
                  </h4>
                  <p className="text-xs text-zinc-500 mt-1">
                    Supports Adobe Acrobat PDF files up to 25MB. Clients can download or view it instantly.
                  </p>
                </div>

                <div className="pt-2">
                  <span 
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white shadow-xs"
                    style={{ backgroundColor: 'var(--theme-primary, #EA580C)' }}
                  >
                    {isUploading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Uploading &amp; Encoding PDF...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        <span>Select PDF Document</span>
                      </>
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Current Active File Info Card */}
            <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center shadow-2xs"
                  style={{ 
                    backgroundColor: 'var(--theme-light, #FFF7ED)',
                    color: 'var(--theme-primary, #EA580C)'
                  }}
                >
                  <FileCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-zinc-900">{cvConfig.fileName}</h4>
                    {hasCustomPdf ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        Custom PDF Active
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-zinc-200 text-zinc-700">
                        Default CV
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-500 mt-0.5 font-mono">
                    {formatFileSize(cvConfig.fileSize)} · Uploaded: {cvConfig.uploadDate || '2026-10-28'} · Status: Ready
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => setIsCvModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-zinc-300 text-xs font-bold text-zinc-800 hover:bg-zinc-100 shadow-2xs"
                >
                  <Eye className="w-3.5 h-3.5 text-zinc-600" />
                  <span>Interactive Preview</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownload}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-white text-xs font-bold shadow-xs"
                  style={{ backgroundColor: 'var(--theme-primary, #EA580C)' }}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download File</span>
                </button>

                {hasCustomPdf && (
                  <button
                    type="button"
                    onClick={deleteCvPdf}
                    className="p-2 rounded-xl border border-zinc-200 text-rose-600 hover:bg-rose-50 hover:border-rose-200"
                    title="Remove custom PDF and revert to default"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Embedded PDF Viewer Box */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-zinc-950 flex items-center gap-2">
                <Eye className="w-5 h-5 text-zinc-700" />
                <span>Embedded Document Preview</span>
              </h3>
              {hasCustomPdf && (
                <a
                  href={cvConfig.pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold flex items-center gap-1 hover:underline"
                  style={{ color: 'var(--theme-primary, #EA580C)' }}
                >
                  <span>Open Fullscreen in New Tab</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            {hasCustomPdf ? (
              <div className="rounded-2xl border border-zinc-200 overflow-hidden bg-zinc-100 h-[640px] shadow-inner relative">
                <iframe
                  src={cvConfig.pdfUrl}
                  title="CV Document Preview"
                  className="w-full h-full border-0"
                />
              </div>
            ) : (
              /* Designer Resume Card Preview when no custom PDF file has been uploaded yet */
              <div className="rounded-3xl border border-zinc-200 p-8 sm:p-12 bg-white shadow-xs space-y-8 max-w-3xl mx-auto">
                <div className="border-b border-zinc-200 pb-6 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-3xl font-extrabold text-zinc-950 tracking-tight">
                      {siteSettings.siteName.split('—')[0]?.trim() || 'LIM Bunterm'}
                    </h3>
                    <p 
                      className="text-sm font-bold uppercase tracking-wider mt-1"
                      style={{ color: 'var(--theme-primary, #EA580C)' }}
                    >
                      {cvConfig.designerTitle}
                    </p>
                    <p className="text-xs text-zinc-500 mt-1">
                      {siteSettings.contactEmail} · {siteSettings.contactPhone} · {siteSettings.address}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 font-bold font-mono">
                      Curriculum Vitae
                    </span>
                  </div>
                </div>

                {/* Professional Summary */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
                    Professional Summary
                  </h4>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    {cvConfig.summary}
                  </p>
                </div>

                {/* Core Skills & Tools */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
                      Core Disciplines
                    </h4>
                    <ul className="space-y-1.5 text-xs text-zinc-600">
                      {(cvConfig.keySkills || []).map((skill, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-(--theme-primary,#EA580C)" />
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
                      Software Proficiencies
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {(cvConfig.softwareProficiencies || []).map((tool, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-lg bg-zinc-100 text-zinc-800 text-xs font-medium">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Work Experience */}
                <div className="space-y-4 pt-2">
                  <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
                    Selected Experience
                  </h4>
                  <div className="space-y-3">
                    {(cvConfig.experiences || []).map((exp) => (
                      <div key={exp.id} className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-100 space-y-1 text-xs">
                        <div className="flex items-center justify-between font-bold text-zinc-900">
                          <span>{exp.role}</span>
                          <span className="text-zinc-500 font-mono text-[11px]">{exp.period}</span>
                        </div>
                        <span className="text-zinc-600 font-medium block">{exp.company} {exp.location ? `· ${exp.location}` : ''}</span>
                        <p className="text-zinc-500 text-[11px] pt-1">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
                    Education &amp; Qualifications
                  </h4>
                  {(cvConfig.education || []).map((edu) => (
                    <div key={edu.id} className="text-xs text-zinc-700">
                      <strong className="text-zinc-900 block">{edu.degree}</strong>
                      <span className="text-zinc-500">{edu.institution} ({edu.period})</span>
                      {edu.details && <p className="text-[11px] text-zinc-400 mt-0.5">{edu.details}</p>}
                    </div>
                  ))}
                </div>

                {/* Upload Callout */}
                <div className="p-4 rounded-2xl bg-orange-50/70 border border-orange-200 text-center space-y-2">
                  <p className="text-xs text-zinc-800 font-medium">
                    Have your own tailored PDF resume ready? Click upload above to replace this default view with your custom branded PDF!
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>
      )}

      {/* Tab 2: Public Website Placement & Visibility Toggles */}
      {activeTab === 'toggles' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/80 shadow-xs space-y-6">
          <h3 className="text-base font-bold text-zinc-950 flex items-center gap-2">
            <Sliders className="w-5 h-5" style={{ color: 'var(--theme-primary, #EA580C)' }} />
            <span>Public Portfolio Placement Controls</span>
          </h3>

          <p className="text-xs text-zinc-500">
            Choose exactly where visitors can access and download your CV PDF across the live portfolio website.
          </p>

          <div className="space-y-4">
            {/* Toggle 1: Header Navigation */}
            <div className="p-4 rounded-2xl border border-zinc-200 bg-zinc-50/50 flex items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-zinc-900">Show in Top Navigation Header</h4>
                <p className="text-xs text-zinc-500">Adds a quick CV download action next to the language switcher in the navbar.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={cvConfig.showDownloadInNav}
                  onChange={(e) => updateCvConfig({ showDownloadInNav: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-(--theme-primary,#EA580C)" />
              </label>
            </div>

            {/* Toggle 2: Hero Section */}
            <div className="p-4 rounded-2xl border border-zinc-200 bg-zinc-50/50 flex items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-zinc-900">Show in Hero Section</h4>
                <p className="text-xs text-zinc-500">Displays a &quot;Download CV&quot; button alongside &quot;Explore Works&quot; and &quot;Let&apos;s Talk&quot; on the hero fold.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={cvConfig.showDownloadInHero}
                  onChange={(e) => updateCvConfig({ showDownloadInHero: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-(--theme-primary,#EA580C)" />
              </label>
            </div>

            {/* Toggle 3: About & Milestones */}
            <div className="p-4 rounded-2xl border border-zinc-200 bg-zinc-50/50 flex items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-zinc-900">Show in About &amp; Milestones Section</h4>
                <p className="text-xs text-zinc-500">Provides a dedicated CV credential badge card below the studio stats milestones.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={cvConfig.showDownloadInAbout}
                  onChange={(e) => updateCvConfig({ showDownloadInAbout: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-(--theme-primary,#EA580C)" />
              </label>
            </div>

            {/* Toggle 4: Footer */}
            <div className="p-4 rounded-2xl border border-zinc-200 bg-zinc-50/50 flex items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-zinc-900">Show in Footer Quick Links</h4>
                <p className="text-xs text-zinc-500">Adds an official PDF download link to the footer navigation columns.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={cvConfig.showDownloadInFooter}
                  onChange={(e) => updateCvConfig({ showDownloadInFooter: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-(--theme-primary,#EA580C)" />
              </label>
            </div>
          </div>

          {/* Button Label Customization */}
          <div className="pt-4 border-t border-zinc-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                Button Label (English)
              </label>
              <input
                type="text"
                value={cvConfig.downloadButtonLabel || 'Download CV'}
                onChange={(e) => updateCvConfig({ downloadButtonLabel: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 text-xs font-bold outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                Button Label (Khmer - ភាសាខ្មែរ)
              </label>
              <input
                type="text"
                value={cvConfig.downloadButtonLabelKm || 'ទាញយកប្រវត្តិរូប (CV)'}
                onChange={(e) => updateCvConfig({ downloadButtonLabelKm: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 text-xs font-bold outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Resume Metadata & Content */}
      {activeTab === 'content' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/80 shadow-xs space-y-6">
          <h3 className="text-base font-bold text-zinc-950 flex items-center gap-2">
            <Sparkles className="w-5 h-5" style={{ color: 'var(--theme-primary, #EA580C)' }} />
            <span>Resume Content &amp; Discipline Credentials</span>
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                Professional Designer Title
              </label>
              <input
                type="text"
                value={cvConfig.designerTitle}
                onChange={(e) => updateCvConfig({ designerTitle: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-sm font-bold outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                Executive Profile Summary
              </label>
              <textarea
                rows={3}
                value={cvConfig.summary}
                onChange={(e) => updateCvConfig({ summary: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 text-xs leading-relaxed outline-none"
              />
            </div>

            {/* Core Skills Tags */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                Core Design Disciplines
              </label>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {(cvConfig.keySkills || []).map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-zinc-100 text-zinc-800 text-xs font-medium"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-zinc-400 hover:text-rose-600"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 max-w-sm">
                <input
                  type="text"
                  placeholder="e.g. Luxury Packaging"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                  className="w-full px-3 py-1.5 rounded-xl border border-zinc-200 text-xs outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="px-3 py-1.5 rounded-xl bg-zinc-900 text-white text-xs font-bold"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Software Tools Tags */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                Software &amp; Production Tools
              </label>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {(cvConfig.softwareProficiencies || []).map((tool, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-orange-50 text-(--theme-primary,#EA580C) text-xs font-semibold"
                  >
                    <span>{tool}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSoftware(tool)}
                      className="text-orange-400 hover:text-rose-600"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 max-w-sm">
                <input
                  type="text"
                  placeholder="e.g. Adobe InDesign"
                  value={newSoftware}
                  onChange={(e) => setNewSoftware(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSoftware())}
                  className="w-full px-3 py-1.5 rounded-xl border border-zinc-200 text-xs outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddSoftware}
                  className="px-3 py-1.5 rounded-xl bg-zinc-900 text-white text-xs font-bold"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
