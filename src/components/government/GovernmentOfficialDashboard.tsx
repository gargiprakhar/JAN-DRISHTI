import React, { useState } from 'react';
import { 
  Landmark, 
  MapPin, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Search, 
  Filter, 
  BarChart3, 
  Layers, 
  Eye, 
  ExternalLink,
  ShieldCheck,
  Building2,
  TrendingUp,
  Download
} from 'lucide-react';
import { ProblemReport, UserProfile } from '../../types';
import { JHARKHAND_DISTRICTS } from '../../data/mockData';

interface GovernmentOfficialDashboardProps {
  currentUser: UserProfile | null;
  problems: ProblemReport[];
  onVerifyProblem: (problemId: string, status: 'verified' | 'rejected', notes?: string) => void;
  onOpenAIPipeline: (problem: ProblemReport) => void;
}

export const GovernmentOfficialDashboard: React.FC<GovernmentOfficialDashboardProps> = ({
  currentUser,
  problems,
  onVerifyProblem,
  onOpenAIPipeline
}) => {
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'verification' | 'heatmap' | 'impact'>('verification');
  const [searchQuery, setSearchQuery] = useState('');

  // District problem counts for heat map
  const districtCounts = JHARKHAND_DISTRICTS.reduce((acc, d) => {
    acc[d] = problems.filter(p => p.location.district === d).length;
    return acc;
  }, {} as Record<string, number>);

  const pendingVerificationList = problems.filter(p => p.verificationStatus === 'pending');
  const verifiedList = problems.filter(p => p.verificationStatus === 'verified');

  const filteredProblems = problems.filter((p) => {
    if (selectedDistrict !== 'All' && p.location.district !== selectedDistrict) return false;
    if (searchQuery.trim() && !p.title.toLowerCase().includes(searchQuery.toLowerCase()) && !p.structuredDescription.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6 text-[#14261C]">
      {/* Top Banner */}
      <div className="bg-[#1B4332] text-white p-6 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Landmark className="w-4 h-4 text-[#C08A2E]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C08A2E]">
              State Administrative Directorate (शासकीय सत्यापन एवं निगरानी)
            </span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-white">
            Government Nodal Verification & Jharkhand GIS Heat Map
          </h2>
          <p className="text-xs text-[#A9C2B5] mt-1 max-w-2xl">
            Validate grassroots complaints from 24 districts, inspect spatial clusters on the PostGIS heat map, and authorize state-supported pilot interventions.
          </p>
        </div>

        {/* Navigation Switcher */}
        <div className="flex bg-[#0F291E] p-1 rounded-xl border border-[#2D6A4F] self-start md:self-auto text-xs">
          <button
            onClick={() => setActiveTab('verification')}
            className={`px-3.5 py-1.5 rounded-lg transition cursor-pointer ${
              activeTab === 'verification' ? 'bg-[#C08A2E] text-[#0F291E] font-bold shadow-xs' : 'text-[#A9C2B5] hover:text-white'
            }`}
          >
            Verification Queue ({pendingVerificationList.length})
          </button>
          <button
            onClick={() => setActiveTab('heatmap')}
            className={`px-3.5 py-1.5 rounded-lg transition cursor-pointer ${
              activeTab === 'heatmap' ? 'bg-[#C08A2E] text-[#0F291E] font-bold shadow-xs' : 'text-[#A9C2B5] hover:text-white'
            }`}
          >
            GIS Heat Map
          </button>
          <button
            onClick={() => setActiveTab('impact')}
            className={`px-3.5 py-1.5 rounded-lg transition cursor-pointer ${
              activeTab === 'impact' ? 'bg-[#C08A2E] text-[#0F291E] font-bold shadow-xs' : 'text-[#A9C2B5] hover:text-white'
            }`}
          >
            Impact Metrics
          </button>
        </div>
      </div>

      {/* VERIFICATION QUEUE TAB */}
      {activeTab === 'verification' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#1B4332]">
                Citizen Grievance Verification Queue
              </h3>
              <p className="text-xs text-gray-600">
                Grievances verified by block nodal officers are immediately routed to university research departments.
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-amber-100 text-amber-900 rounded-lg">
              {pendingVerificationList.length} Awaiting Nodal Sign-Off
            </span>
          </div>

          <div className="space-y-4">
            {pendingVerificationList.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-2xl border border-[#D6E3DC] p-5 shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold bg-[#1B4332] text-white px-2.5 py-0.5 rounded">
                      {p.trackingCode}
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#C08A2E]/20 text-[#8E6116]">
                      {p.domain}
                    </span>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-red-100 text-red-700">
                      {p.urgency} Urgency
                    </span>
                  </div>

                  <span className="text-xs text-gray-500">
                    Reported on: {new Date(p.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div>
                  <h4 className="font-serif font-bold text-base text-[#14261C]">{p.title}</h4>
                  <p className="text-xs text-gray-700 mt-1 leading-relaxed">{p.structuredDescription}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-[#F5F8F6] rounded-xl border border-[#E1ECE5] text-xs">
                  <div>
                    <span className="text-gray-500">Geospatial Coordinates:</span>
                    <p className="font-mono text-[11px] font-semibold text-gray-800">
                      {p.location.latitude.toFixed(4)}°N, {p.location.longitude.toFixed(4)}°E
                    </p>
                    <p className="text-[10px] text-gray-500">{p.location.district} • {p.location.block}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Face Privacy Shield:</span>
                    <p className="font-semibold text-emerald-700 flex items-center gap-1 mt-0.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Faces Redacted (DPDP Compliant)</span>
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">AI Feasibility Score:</span>
                    <p className="font-bold text-[#1B4332] mt-0.5">
                      {p.aiMetadata.feasibilityScores.overallScore} / 10 Composite
                    </p>
                  </div>
                </div>

                {/* Evidence Thumbnail if available */}
                {p.media && p.media.length > 0 && (
                  <div className="flex items-center gap-3">
                    <img
                      src={p.media[0].url}
                      alt="Evidence"
                      className="w-24 h-16 object-cover rounded-lg border border-gray-300"
                    />
                    <div className="text-[11px] text-gray-600">
                      <p className="font-medium">Geotagged Photographic Proof</p>
                      <p className="text-gray-500">Client-side face blur confirmed before ingestion.</p>
                    </div>
                  </div>
                )}

                <div className="pt-2 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
                  <button
                    onClick={() => onOpenAIPipeline(p)}
                    className="text-xs text-[#2D6A4F] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Inspect 7-Phase AI Pipeline Analysis</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onVerifyProblem(p.id, 'rejected', 'Does not meet civic jurisdiction criteria')}
                      className="px-3.5 py-1.5 border border-red-200 text-red-700 hover:bg-red-50 text-xs font-medium rounded-xl transition flex items-center gap-1 cursor-pointer"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Reject Invalid</span>
                    </button>
                    <button
                      onClick={() => onVerifyProblem(p.id, 'verified', 'Ground reality confirmed by block development officer')}
                      className="px-4 py-1.5 bg-[#1B4332] hover:bg-[#143427] text-white text-xs font-semibold rounded-xl transition flex items-center gap-1 cursor-pointer shadow-xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C08A2E]" />
                      <span>Approve & Forward to Universities</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {pendingVerificationList.length === 0 && (
              <div className="p-12 text-center bg-white rounded-2xl border border-[#D6E3DC] text-gray-500 text-xs space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <p className="font-bold text-sm text-gray-800">All Grievances Up-to-Date</p>
                <p>No complaints currently pending nodal verification in this district queue.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* JHARKHAND GIS HEATMAP TAB */}
      {activeTab === 'heatmap' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#1B4332] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C08A2E]" />
                <span>Jharkhand 24-District GIS Problem Density Heat Map</span>
              </h3>
              <p className="text-xs text-gray-600">
                PostGIS spatial clustering reveals acute regional distress patterns to guide targeted university CSR interventions.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-500">Density:</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-[#E9F3ED] border" /> Low</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-[#C08A2E]/40" /> Med</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-[#1B4332]" /> High</span>
            </div>
          </div>

          {/* Interactive District Matrix Heat Map */}
          <div className="bg-white rounded-2xl border border-[#D6E3DC] p-6 shadow-xs space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {JHARKHAND_DISTRICTS.map((d) => {
                const count = districtCounts[d] || 0;
                const isSelected = selectedDistrict === d;

                let bgClass = 'bg-[#F5F8F6] text-gray-700 border-gray-200';
                if (count > 2) bgClass = 'bg-[#1B4332] text-white border-[#1B4332] shadow-sm';
                else if (count > 0) bgClass = 'bg-[#C08A2E]/20 text-[#8E6116] border-[#C08A2E]/40';

                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setSelectedDistrict(selectedDistrict === d ? 'All' : d)}
                    className={`p-3 rounded-xl border text-left transition cursor-pointer relative overflow-hidden ${bgClass} ${
                      isSelected ? 'ring-2 ring-[#C08A2E] ring-offset-2' : ''
                    }`}
                  >
                    <p className="text-xs font-bold leading-tight line-clamp-1">{d}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[10px] opacity-80">Grievances</span>
                      <span className="text-xs font-black">{count}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {selectedDistrict !== 'All' && (
              <div className="p-3 bg-[#E9F3ED] rounded-xl border border-[#C6DDD1] flex items-center justify-between text-xs">
                <span>Filtering by district: <strong>{selectedDistrict}</strong></span>
                <button
                  onClick={() => setSelectedDistrict('All')}
                  className="text-xs text-[#1B4332] font-semibold underline cursor-pointer"
                >
                  Clear Filter (Show All 24 Districts)
                </button>
              </div>
            )}

            {/* Filtered District Spatial List */}
            <div className="space-y-3 pt-2">
              <h4 className="font-serif text-sm font-bold text-[#14261C]">
                Spatial Coordinates in {selectedDistrict === 'All' ? 'All Districts' : selectedDistrict}
              </h4>

              <div className="divide-y divide-gray-100 max-h-72 overflow-y-auto">
                {filteredProblems.map((p) => (
                  <div key={p.id} className="py-2.5 flex items-center justify-between text-xs">
                    <div className="space-y-0.5">
                      <span className="font-semibold text-gray-800">{p.title}</span>
                      <p className="text-[11px] text-gray-500">
                        {p.location.district} ({p.location.block}) • PostGIS: {p.location.postgisGeom}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 text-[10px] font-mono">
                        {p.trackingCode}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] capitalize font-medium">
                        {p.stage.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STATEWIDE IMPACT METRICS TAB */}
      {activeTab === 'impact' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#1B4332]">
                Statewide Societal Impact & Resolution Telemetry
              </h3>
              <p className="text-xs text-gray-600">
                Aggregated progress across all 9 stages under Department of Higher Education & Department of Drinking Water.
              </p>
            </div>
            <button
              onClick={() => alert('Exporting Official Government Telemetry Summary (PDF/CSV)...')}
              className="px-3.5 py-1.5 bg-[#1B4332] text-white text-xs font-medium rounded-xl hover:bg-[#143427] flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Cabinet Briefing</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-[#14261C]">
            <div className="bg-white p-5 rounded-2xl border border-[#D6E3DC] shadow-xs">
              <span className="text-xs text-gray-500 font-medium">Total Registered</span>
              <p className="font-serif text-2xl font-bold text-[#1B4332] mt-1">{problems.length}</p>
              <p className="text-[11px] text-[#2D6A4F] mt-1">100% PostGIS geotagged</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#D6E3DC] shadow-xs">
              <span className="text-xs text-gray-500 font-medium">Government Verified</span>
              <p className="font-serif text-2xl font-bold text-[#1B4332] mt-1">{verifiedList.length}</p>
              <p className="text-[11px] text-[#2D6A4F] mt-1">Validated by Block Nodal Teams</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#D6E3DC] shadow-xs">
              <span className="text-xs text-gray-500 font-medium">Under University R&D</span>
              <p className="font-serif text-2xl font-bold text-[#C08A2E] mt-1">
                {problems.filter(p => p.assignedTeam).length}
              </p>
              <p className="text-[11px] text-[#8E6116] mt-1">Interdisciplinary consortium</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#D6E3DC] shadow-xs">
              <span className="text-xs text-gray-500 font-medium">Active Field Pilots</span>
              <p className="font-serif text-2xl font-bold text-[#1B4332] mt-1">
                {problems.filter(p => p.stage === 'pilot' || p.stage === 'impact_measurement').length}
              </p>
              <p className="text-[11px] text-[#2D6A4F] mt-1">Beneficiaries reached</p>
            </div>
          </div>

          {/* Domain Breakdown */}
          <div className="bg-white rounded-2xl border border-[#D6E3DC] p-6 shadow-xs space-y-4">
            <h4 className="font-serif text-sm font-bold text-[#14261C]">
              Distribution by Societal Priority Domain
            </h4>
            <div className="space-y-2.5 text-xs">
              {[
                { domain: 'Water & Sanitation', pct: 38, count: 18 },
                { domain: 'Rural Roads & Infrastructure', pct: 24, count: 11 },
                { domain: 'Mining Environment & Soil', pct: 16, count: 8 },
                { domain: 'Agro-processing & Forestry', pct: 12, count: 6 },
                { domain: 'Clean Energy & Tribal Grids', pct: 10, count: 5 },
              ].map((item) => (
                <div key={item.domain} className="space-y-1">
                  <div className="flex justify-between text-gray-700">
                    <span>{item.domain}</span>
                    <span className="font-semibold">{item.count} grievances ({item.pct}%)</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#1B4332] h-full rounded-full" style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
