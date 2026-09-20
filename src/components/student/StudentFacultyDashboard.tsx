import React, { useState } from 'react';
import { 
  GraduationCap, 
  Users, 
  FileText, 
  Upload, 
  Search, 
  Filter, 
  Award, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  Plus, 
  Send, 
  BarChart2, 
  Building2,
  ExternalLink,
  Info,
  ChevronRight
} from 'lucide-react';
import { ProblemReport, ProblemDomain, UserProfile } from '../../types';
import { JHARKHAND_DISTRICTS } from '../../data/mockData';

interface StudentFacultyDashboardProps {
  currentUser: UserProfile | null;
  problems: ProblemReport[];
  onAssignTeam: (problemId: string, team: any, proposal: any) => void;
  onUploadPrototype: (problemId: string, update: any) => void;
  onOpenAIPipeline: (problem: ProblemReport) => void;
}

export const StudentFacultyDashboard: React.FC<StudentFacultyDashboardProps> = ({
  currentUser,
  problems,
  onAssignTeam,
  onUploadPrototype,
  onOpenAIPipeline
}) => {
  const [subView, setSubView] = useState<'student' | 'faculty'>(
    currentUser?.role === 'faculty' ? 'faculty' : 'student'
  );

  // Filters
  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [selectedProblemForTeam, setSelectedProblemForTeam] = useState<ProblemReport | null>(null);
  const [selectedProblemForProto, setSelectedProblemForProto] = useState<ProblemReport | null>(null);

  // Team Formation Form
  const [teamName, setTeamName] = useState('');
  const [leadStudent, setLeadStudent] = useState(currentUser?.name || '');
  const [discipline1, setDiscipline1] = useState('Chemical / Environmental Engineering');
  const [discipline2, setDiscipline2] = useState('Rural Management (XISS)');
  const [discipline3, setDiscipline3] = useState('IoT / Electronics');
  const [proposalAbstract, setProposalAbstract] = useState('');
  const [budgetINR, setBudgetINR] = useState(350000);
  const [timelineMonths, setTimelineMonths] = useState(4);

  // Prototype Form
  const [protoVersion, setProtoVersion] = useState('v1.0 Lab Prototype');
  const [protoMetrics, setProtoMetrics] = useState('');
  const [protoStatus, setProtoStatus] = useState<'lab_bench' | 'field_tested' | 'validated'>('lab_bench');

  const filteredProblems = problems.filter((p) => {
    if (selectedDomain !== 'All' && p.domain !== selectedDomain) return false;
    if (selectedDistrict !== 'All' && p.location.district !== selectedDistrict) return false;
    if (searchQuery.trim() && !p.title.toLowerCase().includes(searchQuery.toLowerCase()) && !p.structuredDescription.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleFormTeamAndProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProblemForTeam) return;

    const team = {
      teamName: teamName || 'Jharkhand Civic Innovators',
      leadStudent: leadStudent || 'Lead Student',
      members: [leadStudent, `Specialist (${discipline1})`, `Policy Analyst (${discipline2})`, `Tech Lead (${discipline3})`],
      institution: currentUser?.institutionOrOrg || 'BIT Mesra / NIT Jamshedpur'
    };

    const proposal = {
      id: `prop-${Date.now()}`,
      title: `Interdisciplinary Solution Proposal: ${selectedProblemForTeam.title}`,
      abstract: proposalAbstract || 'Deploying localized low-cost field architecture with decentralized maintenance.',
      budgetINR: Number(budgetINR),
      timelineMonths: Number(timelineMonths),
      status: 'under_review' as const,
      submittedAt: new Date().toISOString()
    };

    onAssignTeam(selectedProblemForTeam.id, team, proposal);
    setSelectedProblemForTeam(null);
  };

  const handleSavePrototype = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProblemForProto) return;

    const update = {
      version: protoVersion,
      testDate: new Date().toISOString().split('T')[0],
      metrics: protoMetrics || 'Telemetry parameters within target operational thresholds.',
      status: protoStatus
    };

    onUploadPrototype(selectedProblemForProto.id, update);
    setSelectedProblemForProto(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6 text-[#14261C]">
      {/* Header Banner */}
      <div className="bg-[#1B4332] text-white p-6 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <GraduationCap className="w-4 h-4 text-[#C08A2E]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C08A2E]">
              Academic & Research Consortium (विश्वविद्यालय एवं शोध पोर्टल)
            </span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-white">
            {subView === 'student' ? 'Student Innovation & Multidisciplinary Teams' : 'Faculty Mentorship & Knowledge Repository'}
          </h2>
          <p className="text-xs text-[#A9C2B5] mt-1 max-w-2xl">
            Translate academic engineering and social research into field prototypes solving Jharkhand’s acute environmental, water, and infrastructure challenges.
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex bg-[#0F291E] p-1 rounded-xl border border-[#2D6A4F] self-start md:self-auto">
          <button
            onClick={() => setSubView('student')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition cursor-pointer ${
              subView === 'student' ? 'bg-[#C08A2E] text-[#0F291E] font-bold shadow-xs' : 'text-[#A9C2B5] hover:text-white'
            }`}
          >
            Student View
          </button>
          <button
            onClick={() => setSubView('faculty')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition cursor-pointer ${
              subView === 'faculty' ? 'bg-[#C08A2E] text-[#0F291E] font-bold shadow-xs' : 'text-[#A9C2B5] hover:text-white'
            }`}
          >
            Faculty View
          </button>
        </div>
      </div>

      {/* STUDENT PORTAL VIEW */}
      {subView === 'student' && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="bg-white p-4 rounded-xl border border-[#D6E3DC] shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  placeholder="Search challenges..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 rounded-lg border border-gray-300 text-xs w-44 focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
                />
              </div>

              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-gray-300 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
              >
                <option value="All">All Domains</option>
                <option value="Water & Sanitation">Water & Sanitation</option>
                <option value="Rural Roads & Infrastructure">Rural Roads & Infra</option>
                <option value="Mining Environment & Soil">Mining Environment</option>
                <option value="Clean Energy & Tribal Grids">Clean Energy</option>
                <option value="Healthcare & Telemedicine">Healthcare & Telemed</option>
                <option value="Agro-processing & Forestry">Agro-processing</option>
              </select>

              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-gray-300 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
              >
                <option value="All">All Districts</option>
                {JHARKHAND_DISTRICTS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div className="text-[11px] text-gray-500">
              Showing <strong>{filteredProblems.length}</strong> AI-curated societal problem statements
            </div>
          </div>

          {/* Problem Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredProblems.map((problem) => (
              <div
                key={problem.id}
                className="bg-white rounded-2xl border border-[#D6E3DC] p-5 shadow-xs hover:shadow-md transition space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] bg-[#E9F3ED] text-[#1B4332] font-semibold px-2 py-0.5 rounded">
                      {problem.trackingCode}
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#C08A2E]/15 text-[#8E6116] border border-[#C08A2E]/30">
                      {problem.domain}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-base font-bold text-[#14261C]">
                      {problem.title}
                    </h3>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed line-clamp-2">
                      {problem.structuredDescription}
                    </p>
                  </div>

                  {/* AI Feasibility & Matching Snippet */}
                  <div className="p-3 bg-[#F5F8F6] rounded-xl border border-[#E1ECE5] space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-gray-500">AI Feasibility Score:</span>
                      <span className="font-bold text-[#1B4332] bg-white px-2 py-0.5 rounded border border-[#D6E3DC]">
                        {problem.aiMetadata.feasibilityScores.overallScore} / 10
                      </span>
                    </div>

                    <div className="text-[11px] text-gray-700">
                      <strong>Lead Univ Match:</strong> {problem.aiMetadata.matchRecommendation.university} ({problem.aiMetadata.matchRecommendation.relevanceScore}% fit)
                    </div>

                    {problem.aiMetadata.existingSolutionCheck.found && (
                      <div className="text-[10px] text-amber-800 bg-amber-50 p-1.5 rounded border border-amber-200">
                        Prior CSIR/Gov Tech: {problem.aiMetadata.existingSolutionCheck.solutionTitle}
                      </div>
                    )}
                  </div>

                  {/* Existing Team Status if already claimed */}
                  {problem.assignedTeam ? (
                    <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-200 text-xs text-emerald-900">
                      <p className="font-semibold">Claimed by Team: {problem.assignedTeam.teamName}</p>
                      <p className="text-[11px] text-emerald-700">Lead: {problem.assignedTeam.leadStudent} • {problem.assignedTeam.institution}</p>
                    </div>
                  ) : null}
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onOpenAIPipeline(problem)}
                    className="text-xs text-[#2D6A4F] hover:text-[#1B4332] font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <span>Inspect AI Match & Feasibility</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-2">
                    {!problem.assignedTeam ? (
                      <button
                        onClick={() => setSelectedProblemForTeam(problem)}
                        className="px-3.5 py-1.5 bg-[#1B4332] hover:bg-[#143427] text-white font-medium text-xs rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Users className="w-3.5 h-3.5" />
                        <span>Form Team & Propose</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => setSelectedProblemForProto(problem)}
                        className="px-3.5 py-1.5 bg-[#C08A2E] hover:bg-[#A97424] text-[#0F291E] font-bold text-xs rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Prototype</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FACULTY PORTAL VIEW */}
      {subView === 'faculty' && (
        <div className="space-y-6">
          {/* Faculty Profile Card */}
          <div className="bg-white rounded-2xl border border-[#D6E3DC] p-6 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2 md:col-span-2">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#1B4332]" />
                <h3 className="font-serif text-lg font-bold text-[#14261C]">
                  {currentUser?.name || 'Prof. (Dr.) Anandita Sen'}
                </h3>
              </div>
              <p className="text-xs text-gray-600">
                {currentUser?.institutionOrOrg || 'Birla Institute of Technology (BIT) Mesra'} • Department of Chemical Engineering & Environmental Sciences
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {['Fluoride Sorption', 'Lateritic Mineral Filters', 'Tribal Water Quality', 'NABL Lab Director'].map((tag) => (
                  <span key={tag} className="text-[11px] bg-[#E9F3ED] text-[#1B4332] px-2.5 py-0.5 rounded-full font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[#F5F8F6] p-4 rounded-xl border border-[#E1ECE5] space-y-2 text-xs">
              <span className="font-semibold text-gray-700 block">Mentorship Portfolio</span>
              <div className="flex justify-between">
                <span>Active Student Teams:</span>
                <strong className="text-[#1B4332]">4 Teams</strong>
              </div>
              <div className="flex justify-between">
                <span>Proposals Reviewed:</span>
                <strong className="text-[#1B4332]">12 Sanctioned</strong>
              </div>
              <div className="flex justify-between">
                <span>CSR Industry Partners:</span>
                <strong className="text-[#C08A2E]">Tata Steel, JSW</strong>
              </div>
            </div>
          </div>

          {/* Incoming Student Proposals Review Section */}
          <div className="bg-white rounded-2xl border border-[#D6E3DC] p-6 shadow-xs space-y-4">
            <h4 className="font-serif text-base font-bold text-[#1B4332] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#C08A2E]" />
              <span>Student Research Proposals Requiring Faculty Endorsement</span>
            </h4>

            <div className="space-y-3">
              {problems.filter(p => p.proposal).map((p) => (
                <div key={p.id} className="p-4 rounded-xl bg-gray-50 border border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[11px] bg-[#1B4332] text-white px-2 py-0.5 rounded">
                        {p.trackingCode}
                      </span>
                      <span className="font-bold text-gray-800 text-sm">{p.proposal?.title}</span>
                    </div>
                    <p className="text-gray-600 line-clamp-1">{p.proposal?.abstract}</p>
                    <p className="text-[11px] text-gray-500">
                      Team: <strong>{p.assignedTeam?.teamName}</strong> • Budget: ₹{(p.proposal!.budgetINR / 100000).toFixed(1)} Lakhs • Timeline: {p.proposal?.timelineMonths} Months
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-auto">
                    <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-semibold text-[11px]">
                      {p.proposal?.status.replace('_', ' ').toUpperCase()}
                    </span>
                    <button 
                      onClick={() => onOpenAIPipeline(p)}
                      className="px-3 py-1.5 bg-[#1B4332] text-white rounded-lg text-xs hover:bg-[#143427] cursor-pointer"
                    >
                      Audit Feasibility
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Statewide Academic Knowledge Repository */}
          <div className="bg-[#E9F3ED]/40 rounded-2xl border border-[#D6E3DC] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-serif text-base font-bold text-[#1B4332] flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#C08A2E]" />
                  <span>Statewide Academic Knowledge Repository (CSIR, ICAR, NEERI)</span>
                </h4>
                <p className="text-xs text-gray-600 mt-0.5">
                  Consolidated technical patents and lab capabilities across BIT Mesra, IIT ISM Dhanbad, and BAU Ranchi.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-4 bg-white rounded-xl border border-[#D6E3DC]">
                <span className="text-[10px] font-bold text-[#C08A2E] uppercase">BIT Mesra Patent</span>
                <h5 className="font-bold text-[#14261C] mt-1">Lateritic Clay Fluoride Sorption Candle</h5>
                <p className="text-[11px] text-gray-600 mt-1">TRL-7 field ready; zero chemical regenerating wash with 0.1M sodium carbonate.</p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-[#D6E3DC]">
                <span className="text-[10px] font-bold text-[#C08A2E] uppercase">IIT (ISM) CSIR Patent</span>
                <h5 className="font-bold text-[#14261C] mt-1">Acid Mine Drainage Limestone Cascades</h5>
                <p className="text-[11px] text-gray-600 mt-1">TRL-8 field validated in Jharia opencast voids; sulfate reduction &gt; 85%.</p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-[#D6E3DC]">
                <span className="text-[10px] font-bold text-[#C08A2E] uppercase">Birsa Agricultural Univ</span>
                <h5 className="font-bold text-[#14261C] mt-1">Solar PCM Micro-Cold Vault for Mahua/Lac</h5>
                <p className="text-[11px] text-gray-600 mt-1">TRL-8 deployed; extends forest produce shelf-life from 4 days to 45 days.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TEAM FORMATION & PROPOSAL MODAL */}
      {selectedProblemForTeam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#D6E3DC] overflow-hidden my-auto text-[#14261C]">
            <div className="bg-[#1B4332] px-6 py-4 text-white flex items-center justify-between">
              <h3 className="font-serif text-base font-bold">
                Form Multidisciplinary Team & Submit Proposal
              </h3>
              <button onClick={() => setSelectedProblemForTeam(null)} className="text-[#A9C2B5] hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleFormTeamAndProposal} className="p-6 space-y-4 text-xs">
              <div className="p-3 bg-[#F5F8F6] rounded-xl border border-[#E1ECE5]">
                <span className="font-bold text-[#1B4332]">{selectedProblemForTeam.trackingCode}</span>: {selectedProblemForTeam.title}
                <p className="text-gray-500 mt-0.5 text-[11px]">Domain: {selectedProblemForTeam.domain}</p>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Team Name (टीम का नाम):</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. JalShuddhi Innovators / Green Terra Solutions"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-[#1B4332]"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Student Team Lead:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ankit Raj (B.Tech Chemical)"
                  value={leadStudent}
                  onChange={(e) => setLeadStudent(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-[#1B4332]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Discipline 1 (Technical):</label>
                  <input
                    type="text"
                    value={discipline1}
                    onChange={(e) => setDiscipline1(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-[#1B4332]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Discipline 2 (Policy/Mgmt):</label>
                  <input
                    type="text"
                    value={discipline2}
                    onChange={(e) => setDiscipline2(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-[#1B4332]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Proposal Abstract (कार्ययोजना):</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Outline proposed prototype architecture, testing methodology, and village deployment plan..."
                  value={proposalAbstract}
                  onChange={(e) => setProposalAbstract(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-[#1B4332]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Requested Budget (₹ INR):</label>
                  <input
                    type="number"
                    value={budgetINR}
                    onChange={(e) => setBudgetINR(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-[#1B4332]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Timeline (Months):</label>
                  <input
                    type="number"
                    value={timelineMonths}
                    onChange={(e) => setTimelineMonths(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-[#1B4332]"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedProblemForTeam(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1B4332] text-white rounded-lg font-medium hover:bg-[#143427] shadow-xs"
                >
                  Submit Proposal for Faculty Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PROTOTYPE UPLOAD MODAL */}
      {selectedProblemForProto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#D6E3DC] overflow-hidden my-auto text-[#14261C]">
            <div className="bg-[#1B4332] px-6 py-4 text-white flex items-center justify-between">
              <h3 className="font-serif text-base font-bold">
                Upload Prototype & Lab Testing Telemetry
              </h3>
              <button onClick={() => setSelectedProblemForProto(null)} className="text-[#A9C2B5] hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleSavePrototype} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Prototype Version Tag:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. v1.2 Bench Prototype / v2.0 Field Column"
                  value={protoVersion}
                  onChange={(e) => setProtoVersion(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-[#1B4332]"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Testing Validation Status:</label>
                <select
                  value={protoStatus}
                  onChange={(e) => setProtoStatus(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-[#1B4332] bg-white"
                >
                  <option value="lab_bench">Lab Bench Assembly</option>
                  <option value="field_tested">Field Tested in Target Block</option>
                  <option value="validated">Validated by Faculty & Nodal Lab</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Sensor Telemetry & Key Lab Metrics:</label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. Fluoride reduced from 3.4 mg/L to 0.45 mg/L; Continuous gravity flow maintained at 85 L/hr over 14 days..."
                  value={protoMetrics}
                  onChange={(e) => setProtoMetrics(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-[#1B4332]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedProblemForProto(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#C08A2E] text-[#0F291E] font-bold rounded-lg hover:bg-[#A97424] shadow-xs"
                >
                  Save Prototype Telemetry Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
