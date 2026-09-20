import React, { useState } from 'react';
import { 
  Users, 
  GraduationCap, 
  Briefcase, 
  Landmark, 
  ArrowRight, 
  ShieldCheck, 
  MapPin, 
  Cpu, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Database,
  ChevronRight,
  Eye
} from 'lucide-react';
import { Role } from '../../types';

interface LandingPageProps {
  onSelectRoleLogin: (role: Role) => void;
  onTrackGrievance: (trackingCode: string) => void;
  onOpenAIPipeline: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onSelectRoleLogin,
  onTrackGrievance,
  onOpenAIPipeline,
}) => {
  const [trackInput, setTrackInput] = useState('');

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackInput.trim()) {
      onTrackGrievance(trackInput.trim());
    }
  };

  const stakeholderCards = [
    {
      role: 'citizen' as Role,
      title: 'Citizens (नागरिक)',
      hindiTag: 'सशक्त नागरिक',
      icon: Users,
      badgeColor: 'bg-[#C08A2E]/15 text-[#8E6116] border-[#C08A2E]/30',
      description: 'Report acute societal challenges in water, roads, health, or agriculture via voice, text, photo or video. Facial features automatically blurred for informant safety.',
      perks: [
        'Automatic GPS geo-tagging across 24 districts',
        'Built-in biometric face-detection privacy shield',
        'Direct tracking code with resolution feedback'
      ],
      cta: 'Access Citizen Portal'
    },
    {
      role: 'student' as Role,
      title: 'Students & Faculty',
      hindiTag: 'विश्वविद्यालय अनुसंधान',
      icon: GraduationCap,
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      description: 'Solve vetted real-world challenges through multidisciplinary innovation teams (Engineering, Social Science, Management). Receive mentorship and funding.',
      perks: [
        'AI-driven skill & domain matching',
        'Statewide prior patent & solution knowledge base',
        'Lab bench to field pilot funding support'
      ],
      cta: 'Access Academic Portal'
    },
    {
      role: 'industry' as Role,
      title: 'Industry Partners',
      hindiTag: 'कॉर्पोरेट सीएसआर',
      icon: Briefcase,
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      description: 'Fulfill CSR obligations with 100% transparent milestone verification. Sponsor high-feasibility technological prototypes tackling Jharkhand root issues.',
      perks: [
        'Curated 6-dimension feasibility assessments',
        'Transparent pilot milestone telemetry',
        'Auditable District Mineral Foundation alignment'
      ],
      cta: 'Access CSR Portal'
    },
    {
      role: 'government' as Role,
      title: 'Government Officials',
      hindiTag: 'प्रशासनिक सत्यापन',
      icon: Landmark,
      badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
      description: 'Verify field grievances, analyze district problem density on GIS heat maps, and authorize policy adoption from lab-tested pilots.',
      perks: [
        'Interactive PostGIS district heat map',
        'Nodal officer verification queue',
        'Statewide societal impact governance metrics'
      ],
      cta: 'Access Administration Portal'
    },
  ];

  const lifecycleStages = [
    { num: '01', title: 'Report', subtitle: 'Voice / Photo / GPS', desc: 'Citizen logs problem with automated face blur.' },
    { num: '02', title: 'AI Structuring', subtitle: 'Embeddings & Classify', desc: 'Normalized into standard engineering specs.' },
    { num: '03', title: 'Gov Verification', subtitle: 'Nodal Validation', desc: 'Department officer approves ground reality.' },
    { num: '04', title: 'Matching', subtitle: 'Univ & Student Teams', desc: 'Matched to lead faculty and student labs.' },
    { num: '05', title: 'Feasibility', subtitle: '6-Dimension Evaluation', desc: 'Technical, financial, and ecological scores.' },
    { num: '06', title: 'Proposal', subtitle: 'Interdisciplinary Plan', desc: 'Actionable research design and budget.' },
    { num: '07', title: 'Prototype', subtitle: 'Lab Testing & Telemetry', desc: 'Physical or digital prototype validated.' },
    { num: '08', title: 'Pilot Run', subtitle: 'Gram Panchayat Field', desc: 'Live deployment in target village/block.' },
    { num: '09', title: 'Impact & Loop', subtitle: 'Citizen Verification', desc: 'Citizen feedback closes the civic loop.' },
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Banner Section */}
      <section className="relative bg-gradient-to-b from-[#1B4332] via-[#15382A] to-[#0F291E] text-white pt-12 pb-20 px-4 sm:px-6 overflow-hidden">
        {/* Subtle Civic Motif Watermark */}
        <div className="absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 opacity-5 pointer-events-none">
          <img src="/icon.svg" alt="" className="w-[600px] h-[600px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C08A2E]/20 border border-[#C08A2E]/40 text-[#E2A63D] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Statewide Civic-Tech Network • Govt. of Jharkhand</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#F5F8F6] leading-[1.15]">
              Jan Drishti: Connecting Grassroots Challenges to Verified Scientific Solutions
            </h1>

            <p className="text-base sm:text-lg text-[#C5D8CD] leading-relaxed font-normal">
              A trusted civic-technology system for Jharkhand. Citizens report real societal problems; our autonomous AI pipeline structures and matches them to premier state universities, corporate CSR, and government departments for measurable outcomes.
            </p>

            {/* Quick Track Grievance Widget */}
            <div className="pt-2">
              <form onSubmit={handleTrackSubmit} className="max-w-xl bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20 shadow-lg flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-[#A9C2B5] absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    placeholder="Enter Tracking ID (e.g. JD-JH-2026-1042)..."
                    value={trackInput}
                    onChange={(e) => setTrackInput(e.target.value)}
                    className="w-full bg-white/90 text-[#14261C] placeholder-gray-500 text-xs sm:text-sm pl-10 pr-3 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C08A2E]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#C08A2E] hover:bg-[#A97424] text-[#0F291E] font-bold text-xs sm:text-sm rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <span>Track Status</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
              <p className="text-[11px] text-[#A9C2B5] mt-2 flex items-center gap-2">
                <span>Try sample IDs:</span>
                <button 
                  type="button"
                  onClick={() => setTrackInput('JD-JH-2026-1042')}
                  className="underline hover:text-white"
                >
                  JD-JH-2026-1042 (Torpa Water)
                </button>
                <span>•</span>
                <button 
                  type="button"
                  onClick={() => setTrackInput('JD-JH-2026-0789')}
                  className="underline hover:text-white"
                >
                  JD-JH-2026-0789 (Saranda Cold Chain)
                </button>
              </p>
            </div>

            {/* AI Architecture Fast-Callout */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenAIPipeline}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-medium text-white transition cursor-pointer"
              >
                <Cpu className="w-4 h-4 text-[#C08A2E]" />
                <span>Explore 7-Phase Core AI Pipeline</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#A9C2B5]" />
              </button>

              <div className="flex items-center gap-2 text-xs text-[#A9C2B5]">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Biometric Face Blurring Pre-Upload</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live State Impact Metrics Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-10">
        <div className="bg-white rounded-2xl shadow-xl border border-[#D6E3DC] p-6 grid grid-cols-2 lg:grid-cols-4 gap-6 text-[#14261C]">
          <div className="border-r border-gray-100 last:border-0 pr-4">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Districts Monitored</p>
            <p className="font-serif text-3xl font-bold text-[#1B4332] mt-1">24 / 24</p>
            <p className="text-[11px] text-[#2D6A4F] mt-1">PostGIS coordinates active</p>
          </div>
          <div className="border-r border-gray-100 last:border-0 pr-4">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">University Labs Active</p>
            <p className="font-serif text-3xl font-bold text-[#1B4332] mt-1">18 Consortia</p>
            <p className="text-[11px] text-[#2D6A4F] mt-1">BIT, IIT ISM, NIT, BAU</p>
          </div>
          <div className="border-r border-gray-100 last:border-0 pr-4">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">CSR Capital Pledged</p>
            <p className="font-serif text-3xl font-bold text-[#C08A2E] mt-1">₹ 14.8 Cr</p>
            <p className="text-[11px] text-[#8E6116] mt-1">100% transparent tracking</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Verified Beneficiaries</p>
            <p className="font-serif text-3xl font-bold text-[#1B4332] mt-1">68,400+</p>
            <p className="text-[11px] text-[#2D6A4F] mt-1">Field pilot stage reached</p>
          </div>
        </div>
      </section>

      {/* The Four Stakeholder Groups */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C08A2E]">
            Collaborative Civic Ecosystem
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B4332]">
            Empowering Four Dedicated Stakeholder Portals
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Strict login-based permissions ensure genuine representation without unvetted public submissions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stakeholderCards.map((card) => {
            const Icon = card.icon;
            return (
              <div 
                key={card.role}
                className="bg-white rounded-2xl border border-[#D6E3DC] p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#E9F3ED] text-[#1B4332] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${card.badgeColor}`}>
                      {card.hindiTag}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#14261C]">{card.title}</h3>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">{card.description}</p>
                  </div>

                  <ul className="space-y-1.5 pt-2 border-t border-gray-100 text-[11px] text-gray-700">
                    {card.perks.map((p, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#1B4332] flex-shrink-0 mt-0.5" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => onSelectRoleLogin(card.role)}
                  className="w-full py-2.5 px-3 bg-[#1B4332] hover:bg-[#143427] text-white text-xs font-medium rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>{card.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* The 9-Stage Solution Lifecycle */}
      <section className="bg-[#E9F3ED]/60 border-y border-[#D6E3DC] py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C08A2E]">
              Rigorous End-to-End Governance
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B4332]">
              The Nine-Stage Problem-to-Impact Lifecycle
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              Every societal issue is continuously tracked from the initial citizen report through field piloting, with the loop closed by the citizen's own feedback.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {lifecycleStages.map((st) => (
              <div 
                key={st.num}
                className="bg-white p-5 rounded-2xl border border-[#D6E3DC] shadow-xs flex items-start gap-3.5"
              >
                <div className="w-8 h-8 rounded-lg bg-[#1B4332] text-[#C08A2E] flex items-center justify-center font-serif font-bold text-xs flex-shrink-0">
                  {st.num}
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif font-bold text-sm text-[#14261C]">{st.title}</h4>
                  </div>
                  <p className="text-[11px] font-medium text-[#C08A2E]">{st.subtitle}</p>
                  <p className="text-xs text-gray-600 pt-1 leading-relaxed">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy & PostGIS Technology Assurance */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-[#0F291E] rounded-3xl p-8 sm:p-12 text-[#F5F8F6] grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C08A2E]/20 text-[#E2A63D] text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Biometric & Spatial Integrity</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-snug">
              Guaranteed Citizen Privacy with Enterprise PostGIS Geo-Tracking
            </h3>
            <p className="text-xs sm:text-sm text-[#A9C2B5] leading-relaxed">
              Civic reporting should never expose vulnerable villagers or informants. Jan Drishti executes client-side face detection before media upload, automatically bluring all human faces. Simultaneously, PostGIS coordinates map the exact coordinate for rapid block-level response.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs text-[#E9F3ED]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#C08A2E]" />
                <span>Zero facial biometric storage</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#C08A2E]" />
                <span>Sub-meter GPS precision</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#C08A2E]" />
                <span>PWA installable on 2G/4G phones</span>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
            <h4 className="font-serif text-sm font-semibold text-[#C08A2E] uppercase tracking-wider">
              Sample PostGIS Spatial Query
            </h4>
            <pre className="text-[11px] font-mono text-emerald-300 bg-black/40 p-4 rounded-xl overflow-x-auto leading-relaxed border border-white/10">
{`SELECT p.tracking_code, p.title, 
       ST_Distance(p.geom, ST_MakePoint(85.3096, 23.3441)::geography) AS distance_meters
FROM problems_spatial p
WHERE ST_DWithin(p.geom, ST_MakePoint(85.3096, 23.3441)::geography, 15000)
  AND p.domain = 'Water & Sanitation'
ORDER BY distance_meters ASC;`}
            </pre>
            <p className="text-[11px] text-[#A9C2B5]">
              Real-time clustering helps university researchers group geographically adjacent borewells or rural culverts into consolidated block-level intervention proposals.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
