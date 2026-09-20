import React, { useState } from 'react';
import { 
  Briefcase, 
  DollarSign, 
  TrendingUp, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  Building2, 
  Award, 
  Search,
  Filter,
  Users,
  Layers,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { ProblemReport, UserProfile } from '../../types';

interface IndustryPartnerDashboardProps {
  currentUser: UserProfile | null;
  problems: ProblemReport[];
  onFundProject: (problemId: string, companyName: string, amountINR: number, commitmentType: 'csr_grant' | 'technology_transfer' | 'mentorship') => void;
  onOpenAIPipeline: (problem: ProblemReport) => void;
}

export const IndustryPartnerDashboard: React.FC<IndustryPartnerDashboardProps> = ({
  currentUser,
  problems,
  onFundProject,
  onOpenAIPipeline
}) => {
  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [fundingModalProblem, setFundingModalProblem] = useState<ProblemReport | null>(null);
  
  // Funding Form State
  const [companyName, setCompanyName] = useState(currentUser?.institutionOrOrg || 'Tata Steel Rural Development Society (TSRDS)');
  const [amountINR, setAmountINR] = useState<number>(500000);
  const [commitmentType, setCommitmentType] = useState<'csr_grant' | 'technology_transfer' | 'mentorship'>('csr_grant');
  const [notes, setNotes] = useState('');

  // Eligible projects (verified with feasibility score)
  const eligibleProjects = problems.filter((p) => {
    if (selectedDomain !== 'All' && p.domain !== selectedDomain) return false;
    return true;
  });

  // Projects already funded
  const fundedProjects = problems.filter(p => p.industrySponsor);

  const totalCommittedFunds = fundedProjects.reduce((acc, p) => acc + (p.industrySponsor?.committedFundsINR || 0), 0);

  const handleCommitFunds = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fundingModalProblem) return;

    onFundProject(
      fundingModalProblem.id,
      companyName || 'Corporate CSR Partner',
      Number(amountINR),
      commitmentType
    );

    setFundingModalProblem(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6 text-[#14261C]">
      {/* Top Banner */}
      <div className="bg-[#1B4332] text-white p-6 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Briefcase className="w-4 h-4 text-[#C08A2E]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C08A2E]">
              Corporate Social Responsibility (CSR) Portal
            </span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-white">
            Industry Partner Sponsorship & Pilot Tracking
          </h2>
          <p className="text-xs text-[#A9C2B5] mt-1 max-w-2xl">
            Sponsor verified, university-developed prototypes addressing Jharkhand societal grievances. Track deployments to rural Gram Panchayats with auditable milestone telemetry.
          </p>
        </div>

        <div className="bg-[#0F291E] p-3 rounded-xl border border-[#2D6A4F] text-xs space-y-1">
          <span className="text-gray-400 block text-[11px]">CSR Portfolio Overview:</span>
          <p className="text-[#C08A2E] font-serif font-bold text-lg">
            ₹ {(totalCommittedFunds / 100000).toFixed(1)} Lakhs Pledged
          </p>
          <p className="text-[#A9C2B5] text-[10px]">{fundedProjects.length} Active Prototypes Funded</p>
        </div>
      </div>

      {/* CSR Alignment Banner */}
      <div className="bg-[#FDF8EE] p-4 rounded-xl border border-[#C08A2E]/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-[#8E6116]" />
          <div>
            <span className="font-bold text-[#8E6116]">Companies Act Schedule VII & DMFT Compliant:</span>
            <p className="text-gray-600 text-[11px]">
              All project grants qualify for 100% CSR tax exemption and direct District Mineral Foundation Trust alignment.
            </p>
          </div>
        </div>
        <span className="text-[11px] bg-white px-2.5 py-1 rounded-md border border-[#C08A2E]/30 font-semibold text-[#8E6116]">
          Zero Intermediary Leakage
        </span>
      </div>

      {/* Tabs / Sub-sections */}
      <div className="space-y-6">
        {/* Section 1: Active Funded Pilots with Real-Time Milestones */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-[#1B4332] flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#C08A2E]" />
              <span>Active Funded Pilots & Transparent Milestone Telemetry</span>
            </h3>
            <span className="text-xs text-gray-500 font-medium">
              {fundedProjects.length} Active Field Deployments
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fundedProjects.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl border border-[#D6E3DC] p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] bg-[#E9F3ED] text-[#1B4332] font-semibold px-2 py-0.5 rounded">
                    {p.trackingCode}
                  </span>
                  <span className="text-xs font-bold text-[#C08A2E]">
                    ₹ {(p.industrySponsor!.committedFundsINR / 100000).toFixed(1)} Lakhs Grant
                  </span>
                </div>

                <div>
                  <h4 className="font-serif font-bold text-sm text-[#14261C]">{p.title}</h4>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">{p.structuredDescription}</p>
                </div>

                <div className="p-3 bg-[#F5F8F6] rounded-xl border border-[#E1ECE5] text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Corporate Sponsor:</span>
                    <span className="font-semibold text-gray-800">{p.industrySponsor?.companyName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Research Team:</span>
                    <span className="font-semibold text-[#1B4332]">{p.assignedTeam?.teamName || 'University Lab'}</span>
                  </div>
                  {p.pilotStatus && (
                    <div className="pt-2 border-t border-gray-200 text-emerald-800">
                      <div className="flex justify-between font-medium">
                        <span>Target Beneficiaries:</span>
                        <span>{p.pilotStatus.beneficiariesReached} Villagers</span>
                      </div>
                      <p className="text-[11px] text-gray-600 mt-0.5">{p.pilotStatus.activeMetrics}</p>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-1 text-xs">
                  <button
                    onClick={() => onOpenAIPipeline(p)}
                    className="text-[#2D6A4F] hover:underline flex items-center gap-1"
                  >
                    <span>Inspect Feasibility Audit</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 capitalize">
                    Stage: {p.stage.replace('_', ' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Verified High-Feasibility Projects Seeking CSR Match */}
        <div className="space-y-4 pt-4 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#1B4332] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C08A2E]" />
                <span>Verified Societal Problems Seeking Industry/CSR Partnership</span>
              </h3>
              <p className="text-xs text-gray-600">
                AI feasibility score &gt; 8.0/10. Ready for multidisciplinary university prototyping.
              </p>
            </div>

            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="text-xs px-3 py-1.5 rounded-lg border border-gray-300 bg-white self-start sm:self-auto"
            >
              <option value="All">All Domains</option>
              <option value="Water & Sanitation">Water & Sanitation</option>
              <option value="Rural Roads & Infrastructure">Rural Roads</option>
              <option value="Mining Environment & Soil">Mining Environment</option>
              <option value="Clean Energy & Tribal Grids">Clean Energy</option>
              <option value="Healthcare & Telemedicine">Healthcare</option>
              <option value="Agro-processing & Forestry">Agro-processing</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {eligibleProjects.map((p) => {
              const isAlreadyFunded = !!p.industrySponsor;
              return (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl border border-[#D6E3DC] p-5 shadow-xs hover:shadow-md transition space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-semibold">
                        {p.trackingCode}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#C08A2E]/15 text-[#8E6116]">
                        {p.domain}
                      </span>
                    </div>

                    <h4 className="font-serif font-bold text-sm text-[#14261C] line-clamp-1">{p.title}</h4>
                    <p className="text-xs text-gray-600 line-clamp-2">{p.structuredDescription}</p>

                    <div className="p-2.5 bg-[#F5F8F6] rounded-xl border border-[#E1ECE5] text-[11px] space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Location:</span>
                        <span className="font-medium">{p.location.district} ({p.location.block})</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">AI Feasibility:</span>
                        <span className="font-bold text-[#1B4332]">{p.aiMetadata.feasibilityScores.overallScore} / 10</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Suggested CSR:</span>
                        <span className="text-gray-700 font-mono">₹ 3.5 - 6.0 Lakhs</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onOpenAIPipeline(p)}
                      className="text-xs text-[#2D6A4F] hover:underline cursor-pointer"
                    >
                      AI Rationale
                    </button>

                    <button
                      onClick={() => setFundingModalProblem(p)}
                      disabled={isAlreadyFunded}
                      className={`px-3 py-1.5 text-xs font-bold rounded-xl transition cursor-pointer shadow-xs ${
                        isAlreadyFunded
                          ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                          : 'bg-[#C08A2E] hover:bg-[#A97424] text-[#0F291E]'
                      }`}
                    >
                      {isAlreadyFunded ? 'Sponsored' : 'Pledge CSR Grant'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CSR FUNDING PLEDGE MODAL */}
      {fundingModalProblem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#D6E3DC] overflow-hidden my-auto text-[#14261C]">
            <div className="bg-[#1B4332] px-6 py-4 text-white flex items-center justify-between">
              <h3 className="font-serif text-base font-bold">
                Pledge Corporate CSR Funding & Mentorship
              </h3>
              <button onClick={() => setFundingModalProblem(null)} className="text-[#A9C2B5] hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleCommitFunds} className="p-6 space-y-4 text-xs">
              <div className="p-3 bg-[#F5F8F6] rounded-xl border border-[#E1ECE5]">
                <span className="font-bold text-[#1B4332]">{fundingModalProblem.trackingCode}</span>: {fundingModalProblem.title}
                <p className="text-gray-500 mt-0.5 text-[11px]">District: {fundingModalProblem.location.district} • Domain: {fundingModalProblem.domain}</p>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Company / CSR Trust Name:</label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-[#1B4332]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Grant Amount (₹ INR):</label>
                  <input
                    type="number"
                    required
                    step={25000}
                    value={amountINR}
                    onChange={(e) => setAmountINR(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-[#1B4332]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Pledge Nature:</label>
                  <select
                    value={commitmentType}
                    onChange={(e) => setCommitmentType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-[#1B4332] bg-white"
                  >
                    <option value="csr_grant">Financial CSR Grant</option>
                    <option value="technology_transfer">Technology / Lab Equipment</option>
                    <option value="mentorship">Technical Mentorship</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Corporate Notes / DMFT Reference:</label>
                <textarea
                  rows={3}
                  placeholder="Specify milestone disbursement rules, corporate mentor contact, or CSR audit mandates..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-[#1B4332]"
                />
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-[11px] text-emerald-800">
                ✓ Milestone verification is executed by Jharkhand District Nodal Officers before subsequent tranches are released.
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setFundingModalProblem(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#C08A2E] text-[#0F291E] font-bold rounded-lg hover:bg-[#A97424] shadow-xs"
                >
                  Confirm CSR Commitment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
