import React, { useState } from 'react';
import { 
  X, 
  Cpu, 
  Layers, 
  Tag, 
  Copy, 
  Search, 
  Award, 
  BarChart3, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  ExternalLink,
  Info
} from 'lucide-react';
import { ProblemReport } from '../../types';

interface AIPipelineModalProps {
  isOpen: boolean;
  onClose: () => void;
  sampleProblem?: ProblemReport;
}

export const AIPipelineModal: React.FC<AIPipelineModalProps> = ({
  isOpen,
  onClose,
  sampleProblem
}) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  if (!isOpen) return null;

  // Use provided sample or fallback to a rich default
  const problem = sampleProblem || {
    trackingCode: 'JD-JH-2026-1042',
    title: 'Fluoride & Iron Contamination in Tribal Drinking Borewells',
    rawDescription: 'Hamare gaon Torpa me handpump ka paani laal aur peela nikalta hai. Bachon ke daant aur haddiyan tedhi ho rahi hain. Filters kharab pade hain koi theek nahi karta.',
    structuredDescription: 'High incidence of endemic fluorosis and ferrous sedimentation (>3.2 mg/L) detected in 14 community borewells across Torpa block. Affecting approximately 2,400 tribal residents with progressive dental and skeletal morbidity.',
    domain: 'Water & Sanitation' as const,
    urgency: 'critical' as const,
    location: {
      district: 'Khunti',
      block: 'Torpa',
      latitude: 22.9556,
      longitude: 85.1214,
      postgisGeom: 'SRID=4326;POINT(85.1214 22.9556)',
      address: 'Near Torpa Weekly Haat, Khunti District'
    },
    aiMetadata: {
      classifiedDomain: 'Water & Sanitation' as const,
      domainConfidence: 97.4,
      duplicateCheck: {
        isDuplicate: false,
        similarityScore: 0.18
      },
      existingSolutionCheck: {
        found: true,
        solutionTitle: 'Activated Alumina & Terracotta Composite Filtration (NEERI / CSIR)',
        sourceOrg: 'CSIR National Environmental Engineering Research Institute',
        readinessLevel: 'TRL-6',
        whyAdaptationNeeded: 'Requires localized regeneration medium using native Jharkhand laterite clay for zero-chemical operating costs.'
      },
      feasibilityScores: {
        technical: { score: 9.1, rationale: 'Adsorbent technology is proven; laterite clay activation tested at BIT Mesra Chemical Dept.' },
        financial: { score: 8.5, rationale: 'Low CAPEX estimated at ₹42,000 per community well with CSR subsidy.' },
        infrastructure: { score: 7.8, rationale: 'Requires gravity-feed gravity standpipes without dependent electric grid.' },
        sustainability: { score: 8.9, rationale: 'Zero toxic backwash; spent laterite can be safely stabilized in building bricks.' },
        deployment: { score: 8.4, rationale: 'Panchayat water committees (Jal Sahiya) trained to backwash filters monthly.' },
        scalability: { score: 9.3, rationale: 'Replicable across 410 contaminated habitations in Khunti, Simdega, and Palamu.' },
        overallScore: 8.7,
        assessmentSummary: 'High-impact civic solution with mature technical basis, requiring only regional mineral tailoring and village self-management.'
      },
      matchRecommendation: {
        university: 'Birla Institute of Technology (BIT) Mesra',
        department: 'Department of Chemical Engineering & Environmental Science',
        facultyMentor: 'Prof. (Dr.) Anandita Sen',
        relevanceScore: 94,
        matchingRationale: 'Patented work on porous lateritic ceramic filter candles with high fluoride sorption affinity.',
        potentialIndustryPartners: ['Tata Steel Rural Development Society (TSRDS)', 'Vedanta CSR'],
        suggestedStudentDisciplines: ['Chemical Engineering', 'Material Science', 'Rural Development (XISS)']
      },
      embeddingVectorSnippet: [0.082, -0.412, 0.651, -0.198, 0.334, 0.521, -0.045, 0.771]
    }
  };

  const steps = [
    { id: 1, title: 'Raw Structuring', icon: Layers, desc: 'Normalizes dialect/voice to civic record' },
    { id: 2, title: 'Domain Classifier', icon: Tag, desc: 'Taxonomy tagging with confidence' },
    { id: 3, title: 'Duplicate Embeddings', icon: Copy, desc: 'Vector cosine similarity clustering' },
    { id: 4, title: 'Solution Repository', icon: Search, desc: 'State & national patent checks' },
    { id: 5, title: 'Explainable Match', icon: Award, desc: 'Univ/Student/CSR pairing matrix' },
    { id: 6, title: 'Feasibility Scoring', icon: BarChart3, desc: '6-dimension criteria evaluation' },
    { id: 7, title: 'Face Privacy Safeguard', icon: ShieldCheck, desc: 'Pre-upload biometric blurring' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 sm:p-6 backdrop-blur-xs overflow-y-auto">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-[#D6E3DC] overflow-hidden my-auto">
        {/* Modal Header */}
        <div className="bg-[#1B4332] px-6 py-4 text-[#F5F8F6] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#C08A2E] text-[#0F291E] flex items-center justify-center font-bold">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-white">
                Core AI Processing Pipeline Inspector
              </h3>
              <p className="text-xs text-[#A9C2B5]">
                Independent backend service orchestrating 7 autonomous civic-intelligence phases
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#A9C2B5] hover:text-white rounded-lg hover:bg-[#2D6A4F] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Navigation Pill Strip */}
        <div className="bg-[#F5F8F6] px-6 py-3 border-b border-[#E1ECE5] overflow-x-auto">
          <div className="flex items-center gap-2 min-w-max">
            {steps.map((s) => {
              const Icon = s.icon;
              const isActive = activeStep === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveStep(s.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition cursor-pointer ${
                    isActive
                      ? 'bg-[#1B4332] text-white shadow-sm'
                      : 'bg-white text-[#4A5E52] hover:bg-[#E9F0EC] border border-[#D6E3DC]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#C08A2E]' : 'text-gray-500'}`} />
                  <span>{s.id}. {s.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 text-[#14261C] max-h-[68vh] overflow-y-auto">
          {/* Target Problem Context Card */}
          <div className="mb-6 p-4 rounded-xl bg-[#E9F3ED]/50 border border-[#D6E3DC] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <span className="font-semibold text-[#1B4332]">{problem.trackingCode}</span>: {problem.title}
              <p className="text-[#4A5E52] mt-0.5">District: {problem.location.district} • Block: {problem.location.block}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-[#C08A2E]/15 text-[#8E6116] font-medium text-[11px] border border-[#C08A2E]/30">
                {problem.domain}
              </span>
              <span className="px-2 py-0.5 rounded bg-red-100 text-red-700 font-bold text-[10px] uppercase">
                {problem.urgency}
              </span>
            </div>
          </div>

          {/* Phase 1: Raw Structuring */}
          {activeStep === 1 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold font-serif text-[#1B4332] flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#C08A2E]" />
                  <span>Phase 1: Raw Citizen Intake → Structured Civic Record</span>
                </h4>
                <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-medium">
                  State Completed
                </span>
              </div>
              <p className="text-xs text-[#4A5E52]">
                Parses citizen descriptions (including colloquial Hindi, Santhali transliteration, or raw audio transcriptions), extracts symptoms, geospatial clues, and reformulates into actionable engineering taxonomy.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2">
                    Raw Citizen Ingestion (Voice/Text)
                  </span>
                  <div className="p-3 bg-white rounded-lg border border-gray-200 italic text-xs text-gray-700 leading-relaxed font-mono">
                    "{problem.rawDescription}"
                  </div>
                  <div className="mt-3 text-[11px] text-gray-500">
                    Source: Mobile PWA Audio-to-Text Transcoder
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#E9F3ED] border border-[#C6DDD1]">
                  <span className="text-[11px] font-bold text-[#1B4332] uppercase tracking-wider block mb-2">
                    Clean Normalized Engineering Record
                  </span>
                  <div className="p-3 bg-white rounded-lg border border-[#B7D4C4] text-xs text-[#14261C] leading-relaxed">
                    {problem.structuredDescription}
                  </div>
                  <div className="mt-3 text-[11px] text-[#2D6A4F] flex items-center gap-1 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1B4332]" />
                    <span>Entities Extracted: Chemical Contaminant, Affected Population, Morbidity</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Phase 2: Domain Classifier */}
          {activeStep === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold font-serif text-[#1B4332] flex items-center gap-2">
                  <Tag className="w-4 h-4 text-[#C08A2E]" />
                  <span>Phase 2: Domain Taxonomy Classification</span>
                </h4>
                <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-medium">
                  97.4% Confidence
                </span>
              </div>
              <p className="text-xs text-[#4A5E52]">
                Multilabel classification model tags the grievance against the 7 Jharkhand Societal Priority Domains to facilitate appropriate university department assignment.
              </p>

              <div className="p-4 rounded-xl bg-white border border-[#D6E3DC] shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <span className="text-sm font-semibold text-[#14261C]">Primary Classification:</span>
                  <span className="text-sm font-bold text-[#1B4332] bg-[#E9F3ED] px-3 py-1 rounded-lg border border-[#C6DDD1]">
                    {problem.aiMetadata.classifiedDomain}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-[#4A5E52]">
                    <span>Domain Confidence Score</span>
                    <span className="font-semibold text-[#14261C]">{problem.aiMetadata.domainConfidence}%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-[#1B4332] h-full rounded-full transition-all duration-500" 
                      style={{ width: `${problem.aiMetadata.domainConfidence}%` }} 
                    />
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-[#4A5E52]">
                  <strong>Secondary Mappings:</strong> Public Health (84.2%), Rural Sanitation (76.1%), Tribal Welfare (71.5%).
                </div>
              </div>
            </div>
          )}

          {/* Phase 3: Duplicate Embeddings */}
          {activeStep === 3 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold font-serif text-[#1B4332] flex items-center gap-2">
                  <Copy className="w-4 h-4 text-[#C08A2E]" />
                  <span>Phase 3: Vector Embeddings & Duplicate Search</span>
                </h4>
                <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-medium">
                  HNSW Index Scanned
                </span>
              </div>
              <p className="text-xs text-[#4A5E52]">
                Generates high-dimensional semantic embeddings. Queries the PostgreSQL pgvector/HNSW spatial database with cosine similarity to cluster repeated citizen grievances.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                  <span className="text-[11px] font-bold text-gray-500 uppercase block mb-2">
                    768-Dim Vector Embedding Sample
                  </span>
                  <div className="p-2.5 bg-gray-900 text-emerald-400 font-mono text-[11px] rounded-lg overflow-x-auto">
                    [{problem.aiMetadata.embeddingVectorSnippet.join(', ')}, ...]
                  </div>
                  <p className="text-[11px] text-gray-500 mt-2">
                    Normalized Euclidean L2 norm = 1.000
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#D6E3DC]">
                  <span className="text-[11px] font-bold text-[#1B4332] uppercase block mb-2">
                    Deduplication & Spatial Proximity
                  </span>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cosine Max Similarity:</span>
                      <span className="font-bold text-[#14261C]">{problem.aiMetadata.duplicateCheck.similarityScore}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duplicate Threshold:</span>
                      <span className="font-mono text-gray-500">&gt; 0.820</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">PostGIS Radial Filter:</span>
                      <span className="font-mono text-gray-500">ST_DWithin 2.5km</span>
                    </div>
                    <div className="pt-2 border-t border-gray-100 flex items-center gap-1.5 text-emerald-700 font-medium">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Status: Unique Grievance (Original Record)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Phase 4: Solution Repository */}
          {activeStep === 4 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold font-serif text-[#1B4332] flex items-center gap-2">
                  <Search className="w-4 h-4 text-[#C08A2E]" />
                  <span>Phase 4: Existing Solution & Patent Check</span>
                </h4>
                <span className="text-xs bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-medium">
                  Prior Technology Identified
                </span>
              </div>
              <p className="text-xs text-[#4A5E52]">
                Cross-references national scientific databases (CSIR, ICAR, NEERI, TRIFED) to avoid duplicate research and focus university teams on regional field adaptation.
              </p>

              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">
                      Prior Patented/Published Framework
                    </span>
                    <h5 className="font-bold text-sm text-[#14261C] mt-0.5">
                      {problem.aiMetadata.existingSolutionCheck.solutionTitle}
                    </h5>
                    <p className="text-gray-600 mt-1">
                      Organization: {problem.aiMetadata.existingSolutionCheck.sourceOrg}
                    </p>
                  </div>
                  <span className="px-2.5 py-1 bg-amber-200 text-amber-900 font-bold rounded-md text-[11px] whitespace-nowrap">
                    {problem.aiMetadata.existingSolutionCheck.readinessLevel}
                  </span>
                </div>

                <div className="p-3 bg-white rounded-lg border border-amber-200 text-xs">
                  <strong className="text-[#8E6116]">Adaptation Imperative for Jharkhand:</strong>{' '}
                  <span className="text-gray-700">{problem.aiMetadata.existingSolutionCheck.whyAdaptationNeeded}</span>
                </div>
              </div>
            </div>
          )}

          {/* Phase 5: Explainable Match */}
          {activeStep === 5 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold font-serif text-[#1B4332] flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#C08A2E]" />
                  <span>Phase 5: Explainable Multidisciplinary Matching</span>
                </h4>
                <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-medium">
                  {problem.aiMetadata.matchRecommendation.relevanceScore}% Match Fit
                </span>
              </div>
              <p className="text-xs text-[#4A5E52]">
                Algorithmic matching pairs student disciplines, academic faculty leads, and potential CSR corporate partners based on geographic proximity and past publication keywords.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-4 rounded-xl bg-white border border-[#D6E3DC] shadow-xs">
                  <span className="text-[10px] font-bold text-gray-500 uppercase block mb-1">
                    Matched Academic Institution
                  </span>
                  <p className="font-bold text-[#1B4332] text-sm">
                    {problem.aiMetadata.matchRecommendation.university}
                  </p>
                  <p className="text-gray-600 text-[11px] mt-1">
                    {problem.aiMetadata.matchRecommendation.department}
                  </p>
                  <div className="mt-3 pt-2 border-t border-gray-100 text-[11px] font-medium text-[#2D6A4F]">
                    Lead: {problem.aiMetadata.matchRecommendation.facultyMentor}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#D6E3DC] shadow-xs">
                  <span className="text-[10px] font-bold text-gray-500 uppercase block mb-1">
                    Suggested Student Disciplines
                  </span>
                  <ul className="space-y-1 mt-1 text-gray-700">
                    {problem.aiMetadata.matchRecommendation.suggestedStudentDisciplines.map((d, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-[#C08A2E]" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#D6E3DC] shadow-xs">
                  <span className="text-[10px] font-bold text-gray-500 uppercase block mb-1">
                    Potential CSR Sponsors
                  </span>
                  <ul className="space-y-1 mt-1 text-gray-700">
                    {problem.aiMetadata.matchRecommendation.potentialIndustryPartners.map((p, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1B4332]" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-3 bg-[#E9F3ED] rounded-xl border border-[#C6DDD1] text-xs text-[#14261C]">
                <strong>AI Match Rationale:</strong> {problem.aiMetadata.matchRecommendation.matchingRationale}
              </div>
            </div>
          )}

          {/* Phase 6: Feasibility Scoring */}
          {activeStep === 6 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold font-serif text-[#1B4332] flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-[#C08A2E]" />
                  <span>Phase 6: Six-Dimension Feasibility Assessment</span>
                </h4>
                <span className="text-xs bg-[#1B4332] text-white px-2.5 py-0.5 rounded-full font-bold">
                  Composite: {problem.aiMetadata.feasibilityScores.overallScore} / 10
                </span>
              </div>
              <p className="text-xs text-[#4A5E52]">
                Evaluates every proposal against 6 rigorous civil and operational dimensions with human-readable rationales.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                {Object.entries(problem.aiMetadata.feasibilityScores)
                  .filter(([key]) => ['technical', 'financial', 'infrastructure', 'sustainability', 'deployment', 'scalability'].includes(key))
                  .map(([dimension, val]: [string, any]) => (
                    <div key={dimension} className="p-3.5 rounded-xl bg-white border border-[#D6E3DC] shadow-xs">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="font-bold text-[#14261C] capitalize">{dimension} Feasibility</span>
                        <span className="font-bold text-sm text-[#1B4332] bg-[#E9F3ED] px-2 py-0.5 rounded">
                          {val.score} / 10
                        </span>
                      </div>
                      <p className="text-[11px] text-[#4A5E52] leading-relaxed">
                        {val.rationale}
                      </p>
                    </div>
                  ))}
              </div>

              <div className="p-3 bg-[#FDF8EE] rounded-xl border border-[#C08A2E]/30 text-xs text-[#8E6116]">
                <strong>Assessment Summary:</strong> {problem.aiMetadata.feasibilityScores.assessmentSummary}
              </div>
            </div>
          )}

          {/* Phase 7: Face Privacy Safeguard */}
          {activeStep === 7 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold font-serif text-[#1B4332] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C08A2E]" />
                  <span>Phase 7: End-to-End Face Detection & Privacy Shield</span>
                </h4>
                <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-medium">
                  DPDP Act Compliant
                </span>
              </div>
              <p className="text-xs text-[#4A5E52]">
                All civic photographic evidence is analyzed client-side or during edge ingress. Any identifiable face is automatically blurred or masked to protect citizen informants and vulnerable tribal villagers.
              </p>

              <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 text-xs">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="relative w-48 h-36 rounded-xl overflow-hidden shadow-md bg-gray-900 border border-gray-300 flex-shrink-0">
                    <img 
                      src="https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=600&q=80" 
                      alt="Sample with Face Blur" 
                      className="w-full h-full object-cover"
                    />
                    {/* Simulated Blur Overlay */}
                    <div className="absolute top-4 left-10 w-16 h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/40 shadow-inner flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5 text-emerald-400 opacity-80" />
                    </div>
                    <div className="absolute bottom-1 left-1 right-1 bg-black/70 text-white text-[9px] px-2 py-0.5 rounded text-center">
                      Face Redacted • Blur Mask Active
                    </div>
                  </div>

                  <div className="space-y-2 text-xs text-gray-700">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span className="font-semibold">Automated Face Boundary Detection</span>
                    </div>
                    <p className="text-[11px] text-gray-600">
                      Calculates Haar-cascade & neural facial keypoints before persisting photos into public database storage.
                    </p>
                    <div className="flex items-center gap-2 text-emerald-700 font-medium pt-2">
                      <span>✓ Privacy Confidence: 99.8%</span>
                      <span>•</span>
                      <span>Zero Raw Facial Data Retained</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="bg-[#F5F8F6] px-6 py-3 border-t border-[#E1ECE5] flex items-center justify-between">
          <button
            onClick={() => setActiveStep(prev => Math.max(1, prev - 1))}
            disabled={activeStep === 1}
            className="px-3.5 py-1.5 text-xs font-medium rounded-lg text-gray-600 hover:bg-gray-200 disabled:opacity-40 transition cursor-pointer"
          >
            Previous Phase
          </button>
          <span className="text-xs text-gray-500">
            Phase {activeStep} of 7
          </span>
          <button
            onClick={() => setActiveStep(prev => Math.min(7, prev + 1))}
            disabled={activeStep === 7}
            className="px-3.5 py-1.5 text-xs font-medium rounded-lg bg-[#1B4332] text-white hover:bg-[#143427] disabled:opacity-40 transition flex items-center gap-1 cursor-pointer"
          >
            <span>Next Phase</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
