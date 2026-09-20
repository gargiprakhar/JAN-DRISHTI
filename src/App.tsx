import React, { useState } from 'react';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { AIPipelineModal } from './components/common/AIPipelineModal';
import { AuthModal } from './components/auth/AuthModal';
import { LandingPage } from './components/landing/LandingPage';
import { CitizenReportingFlow } from './components/citizen/CitizenReportingFlow';
import { StudentFacultyDashboard } from './components/student/StudentFacultyDashboard';
import { IndustryPartnerDashboard } from './components/industry/IndustryPartnerDashboard';
import { GovernmentOfficialDashboard } from './components/government/GovernmentOfficialDashboard';
import { PlatformAdminDashboard } from './components/admin/PlatformAdminDashboard';
import { MOCK_PROBLEMS, MOCK_USERS_ARRAY } from './data/mockData';
import { ProblemReport, Role, UserProfile } from './types';

export default function App() {
  // Authentication & Role State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(MOCK_USERS_ARRAY[0]); // Default to citizen
  const [activeRole, setActiveRole] = useState<Role>('citizen');
  const [currentView, setCurrentView] = useState<'landing' | 'portal'>('portal');
  
  // Problems database state
  const [problems, setProblems] = useState<ProblemReport[]>(MOCK_PROBLEMS);

  // Modals state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAIPipelineModalOpen, setIsAIPipelineModalOpen] = useState(false);
  const [inspectingProblem, setInspectingProblem] = useState<ProblemReport | undefined>(undefined);
  const [selectedTrackingCode, setSelectedTrackingCode] = useState<string | undefined>(undefined);

  // Mobile constraint toggle:
  // "Mobile version should expose only the citizen reporting flow, not the other three portals."
  const [isMobileOnlyMode, setIsMobileOnlyMode] = useState(false);

  // Authentication Handlers
  const handleAuthenticate = (user: UserProfile) => {
    setCurrentUser(user);
    setActiveRole(user.role);
    setCurrentView('portal');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('landing');
  };

  const handleSelectRoleLogin = (role: Role) => {
    setActiveRole(role);
    // Find matching mock user or open auth
    const matchedUser = MOCK_USERS_ARRAY.find((u: UserProfile) => u.role === role);
    if (matchedUser) {
      setCurrentUser(matchedUser);
      setCurrentView('portal');
    } else {
      setIsAuthModalOpen(true);
    }
  };

  // Tracking query from Landing Page or search
  const handleTrackGrievance = (trackingCode: string) => {
    setSelectedTrackingCode(trackingCode);
    setActiveRole('citizen');
    setCurrentView('portal');
  };

  // Inspect AI Pipeline Modal
  const handleOpenAIPipeline = (problem?: ProblemReport) => {
    setInspectingProblem(problem);
    setIsAIPipelineModalOpen(true);
  };

  // Problem Mutations
  const handleCreateNewReport = (report: ProblemReport) => {
    setProblems(prev => [report, ...prev]);
  };

  const handleAssignTeam = (problemId: string, team: any, proposal: any) => {
    setProblems(prev => prev.map(p => {
      if (p.id === problemId) {
        return {
          ...p,
          stage: 'proposal',
          assignedTeam: team,
          proposal: proposal
        };
      }
      return p;
    }));
  };

  const handleUploadPrototype = (problemId: string, update: any) => {
    setProblems(prev => prev.map(p => {
      if (p.id === problemId) {
        return {
          ...p,
          stage: 'prototype_testing',
          prototypeStatus: update
        };
      }
      return p;
    }));
  };

  const handleFundProject = (
    problemId: string, 
    companyName: string, 
    amountINR: number, 
    commitmentType: 'csr_grant' | 'technology_transfer' | 'mentorship'
  ) => {
    setProblems(prev => prev.map(p => {
      if (p.id === problemId) {
        return {
          ...p,
          stage: 'pilot',
          industrySponsor: {
            companyName,
            committedFundsINR: amountINR,
            commitmentType,
            sanctionDate: new Date().toISOString().split('T')[0]
          },
          pilotStatus: {
            siteName: `${p.location.block} Block Field Implementation`,
            beneficiariesReached: 1200,
            activeMetrics: 'Piloting zero-chemical filtration assembly at 4 village wells.'
          }
        };
      }
      return p;
    }));
  };

  const handleVerifyProblem = (problemId: string, status: 'verified' | 'rejected', notes?: string) => {
    setProblems(prev => prev.map(p => {
      if (p.id === problemId) {
        return {
          ...p,
          verificationStatus: status,
          stage: status === 'verified' ? 'matching' : 'report',
          verificationNotes: notes
        };
      }
      return p;
    }));
  };

  const handleUpdateFeedback = (problemId: string, rating: number, comment: string) => {
    setProblems(prev => prev.map(p => {
      if (p.id === problemId) {
        return {
          ...p,
          stage: 'impact_measurement',
          citizenFeedback: {
            rating,
            comment,
            feedbackDate: new Date().toISOString().split('T')[0],
            resolvedSatisfactorily: rating >= 3
          }
        };
      }
      return p;
    }));
  };

  // Determine what view to show
  // If Mobile Only Mode is active, enforce citizen reporting flow only
  const effectiveRole = isMobileOnlyMode ? 'citizen' : activeRole;

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F8F6] text-[#14261C]">
      {/* Header Navigation */}
      <Header
        currentUser={currentUser}
        activeRole={effectiveRole}
        onSelectRole={(role) => {
          setActiveRole(role);
          setCurrentView('portal');
        }}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        onOpenAIPipeline={() => handleOpenAIPipeline()}
        isMobileOnlyMode={isMobileOnlyMode}
        onToggleMobileMode={() => setIsMobileOnlyMode(!isMobileOnlyMode)}
        onNavigateHome={() => setCurrentView('landing')}
      />

      {/* Main Content Body */}
      <main className="flex-1">
        {/* If Landing view is selected */}
        {currentView === 'landing' ? (
          <LandingPage
            onSelectRoleLogin={handleSelectRoleLogin}
            onTrackGrievance={handleTrackGrievance}
            onOpenAIPipeline={() => handleOpenAIPipeline()}
          />
        ) : (
          /* Role-based Portal View */
          <div>
            {/* View Switcher Banner if inside Portal */}
            <div className="bg-[#E9F3ED] border-b border-[#D6E3DC] px-4 sm:px-6 py-2.5">
              <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-serif font-bold text-[#1B4332]">Portal Active:</span>
                  <span className="bg-[#1B4332] text-white px-2 py-0.5 rounded font-mono uppercase text-[11px]">
                    {effectiveRole}
                  </span>
                  {isMobileOnlyMode && (
                    <span className="text-amber-800 bg-amber-100 px-2 py-0.5 rounded font-semibold text-[10px]">
                      Mobile Citizen-Only Constraint Active
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setCurrentView('landing')}
                    className="text-[#1B4332] hover:underline font-medium cursor-pointer"
                  >
                    View Platform Overview & Stakeholders
                  </button>
                  <span className="text-gray-300">|</span>
                  <button
                    onClick={() => handleOpenAIPipeline()}
                    className="text-[#C08A2E] hover:underline font-bold cursor-pointer"
                  >
                    Core AI Pipeline Specs
                  </button>
                </div>
              </div>
            </div>

            {/* Portal Component Mapping */}
            {effectiveRole === 'citizen' && (
              <CitizenReportingFlow
                currentUser={currentUser}
                problems={problems}
                onSubmitNewReport={handleCreateNewReport}
                onUpdateFeedback={handleUpdateFeedback}
                onOpenAIPipelineForProblem={(p) => handleOpenAIPipeline(p)}
                selectedTrackingCode={selectedTrackingCode}
              />
            )}

            {effectiveRole === 'student' && (
              <StudentFacultyDashboard
                currentUser={currentUser}
                problems={problems}
                onAssignTeam={handleAssignTeam}
                onUploadPrototype={handleUploadPrototype}
                onOpenAIPipeline={(p) => handleOpenAIPipeline(p)}
              />
            )}

            {effectiveRole === 'faculty' && (
              <StudentFacultyDashboard
                currentUser={currentUser}
                problems={problems}
                onAssignTeam={handleAssignTeam}
                onUploadPrototype={handleUploadPrototype}
                onOpenAIPipeline={(p) => handleOpenAIPipeline(p)}
              />
            )}

            {effectiveRole === 'industry' && (
              <IndustryPartnerDashboard
                currentUser={currentUser}
                problems={problems}
                onFundProject={handleFundProject}
                onOpenAIPipeline={(p) => handleOpenAIPipeline(p)}
              />
            )}

            {effectiveRole === 'government' && (
              <GovernmentOfficialDashboard
                currentUser={currentUser}
                problems={problems}
                onVerifyProblem={handleVerifyProblem}
                onOpenAIPipeline={(p) => handleOpenAIPipeline(p)}
              />
            )}

            {effectiveRole === 'admin' && (
              <PlatformAdminDashboard
                currentUser={currentUser}
              />
            )}
          </div>
        )}
      </main>

      {/* Platform Footer */}
      <Footer />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthenticate={handleAuthenticate}
        initialRole={activeRole}
      />

      {/* AI Pipeline Modal */}
      <AIPipelineModal
        isOpen={isAIPipelineModalOpen}
        onClose={() => setIsAIPipelineModalOpen(false)}
        sampleProblem={inspectingProblem}
      />
    </div>
  );
}
