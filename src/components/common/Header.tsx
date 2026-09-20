import React from 'react';
import { 
  ShieldCheck, 
  Smartphone, 
  Monitor, 
  LogOut, 
  Cpu, 
  WifiOff, 
  HelpCircle,
  Menu,
  X,
  Fingerprint
} from 'lucide-react';
import { Role, UserProfile } from '../../types';
import { PWAInstallButton } from '../pwa/PWAInstallButton';
import { useOnlineStatus } from '../../hooks/usePWAInstall';

interface HeaderProps {
  currentUser: UserProfile | null;
  activeRole: Role;
  onSelectRole: (role: Role) => void;
  onOpenAuth: () => void;
  onLogout: () => void;
  onOpenAIPipeline: () => void;
  isMobileOnlyMode: boolean;
  onToggleMobileMode: () => void;
  onNavigateHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  activeRole,
  onSelectRole,
  onOpenAuth,
  onLogout,
  onOpenAIPipeline,
  isMobileOnlyMode,
  onToggleMobileMode,
  onNavigateHome
}) => {
  const isOnline = useOnlineStatus();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const roleLabels: Record<Role, { label: string; badge: string }> = {
    citizen: { label: 'Citizen (नागरिक)', badge: 'bg-[#C08A2E]/20 text-[#8E6116] border-[#C08A2E]/40' },
    student: { label: 'Student (शोधार्थी)', badge: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
    faculty: { label: 'Faculty (प्राध्यापक)', badge: 'bg-teal-100 text-teal-800 border-teal-300' },
    industry: { label: 'Industry Partner (उद्योग CSR)', badge: 'bg-amber-100 text-amber-900 border-amber-300' },
    government: { label: 'Government Official (प्रशासन)', badge: 'bg-blue-100 text-blue-900 border-blue-300' },
    admin: { label: 'Platform Admin (प्रबंधक)', badge: 'bg-purple-100 text-purple-900 border-purple-300' },
  };

  return (
    <header className="sticky top-0 z-40 bg-[#1B4332] text-[#F5F8F6] border-b border-[#2D6A4F] shadow-md">
      {/* Top Civic Notice Bar */}
      <div className="bg-[#0F291E] px-4 py-1 text-[11px] text-[#A9C2B5] flex items-center justify-between border-b border-[#1B4332]">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#C08A2E]" />
          <span>Government of Jharkhand Civic-Tech Network • All citizen records cryptographically signed</span>
        </div>
        <div className="flex items-center gap-4">
          {!isOnline && (
            <span className="flex items-center gap-1 text-amber-400 font-medium">
              <WifiOff className="w-3 h-3" />
              <span>Offline Mode Active</span>
            </span>
          )}
          <button
            onClick={onToggleMobileMode}
            className="flex items-center gap-1.5 text-[#E2A63D] hover:text-[#F5F8F6] transition cursor-pointer"
            title="Toggle between Citizen Mobile Stream and Full Portals"
          >
            {isMobileOnlyMode ? (
              <>
                <Monitor className="w-3 h-3" />
                <span className="hidden sm:inline">Switch to Multi-Role Portals</span>
                <span className="sm:hidden">Portals</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3 h-3" />
                <span className="hidden sm:inline">Citizen Mobile PWA View</span>
                <span className="sm:hidden">Mobile View</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand & Crest */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={onNavigateHome}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C08A2E] to-[#9A6C1E] p-0.5 shadow-sm flex items-center justify-center">
            <div className="w-full h-full bg-[#1B4332] rounded-[10px] flex items-center justify-center text-[#F5F8F6]">
              <img src="/icon.svg" alt="Jan Drishti Logo" className="w-7 h-7" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#F5F8F6]">
                Jan Drishti
              </span>
              <span className="text-xs text-[#C08A2E] font-medium tracking-wide">
                जन दृष्टि
              </span>
            </div>
            <p className="text-[10px] text-[#A9C2B5] tracking-wider uppercase">
              Jharkhand Societal Innovation Nodal Platform
            </p>
          </div>
        </div>

        {/* Desktop Controls */}
        <div className="hidden lg:flex items-center gap-3">
          {/* AI Pipeline Quick Inspector Button */}
          <button
            onClick={onOpenAIPipeline}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#2D6A4F]/60 hover:bg-[#2D6A4F] text-[#E9F3ED] border border-[#3E8262] transition cursor-pointer"
            title="Inspect 7-Stage Core AI Pipeline"
          >
            <Cpu className="w-3.5 h-3.5 text-[#C08A2E]" />
            <span>AI Core Pipeline</span>
          </button>

          {/* PWA Install Button */}
          <PWAInstallButton />

          {/* Role Pill Switcher (if authenticated) */}
          {currentUser ? (
            <div className="flex items-center gap-2 bg-[#0F291E]/80 px-3 py-1.5 rounded-lg border border-[#2D6A4F]">
              <div className="text-right">
                <p className="text-xs font-semibold text-[#F5F8F6]">{currentUser.name}</p>
                <p className="text-[10px] text-[#A9C2B5]">{currentUser.institutionOrOrg || currentUser.district || 'Jharkhand'}</p>
              </div>

              {!isMobileOnlyMode && (
                <select
                  value={activeRole}
                  onChange={(e) => onSelectRole(e.target.value as Role)}
                  className="bg-[#1B4332] text-xs text-[#F5F8F6] rounded-md px-2 py-1 border border-[#3E8262] focus:outline-none focus:ring-1 focus:ring-[#C08A2E] cursor-pointer"
                >
                  <option value="citizen">Role: Citizen</option>
                  <option value="student">Role: Student</option>
                  <option value="faculty">Role: Faculty</option>
                  <option value="industry">Role: Industry Partner</option>
                  <option value="government">Role: Government Official</option>
                  <option value="admin">Role: Platform Admin</option>
                </select>
              )}

              <button
                onClick={onLogout}
                className="p-1 text-[#A9C2B5] hover:text-red-400 transition cursor-pointer"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-2 bg-[#C08A2E] hover:bg-[#A97424] text-[#0F291E] font-semibold text-xs px-4 py-2 rounded-lg transition shadow-sm cursor-pointer"
            >
              <Fingerprint className="w-4 h-4" />
              <span>Aadhaar Login</span>
            </button>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <PWAInstallButton />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#E9F3ED] hover:bg-[#2D6A4F] rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0F291E] border-t border-[#2D6A4F] px-4 py-4 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-[#1B4332]">
            <span className="text-xs text-[#A9C2B5]">
              {currentUser ? `Signed in as ${currentUser.name}` : 'No Public Guest Access'}
            </span>
            <button
              onClick={onOpenAIPipeline}
              className="flex items-center gap-1 text-xs text-[#C08A2E]"
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>AI Engine</span>
            </button>
          </div>

          {currentUser ? (
            <div className="space-y-2">
              <label className="text-xs text-[#A9C2B5] block">Select Portal Role:</label>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(roleLabels) as Role[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      onSelectRole(r);
                      setMobileMenuOpen(false);
                    }}
                    className={`text-xs px-2.5 py-1.5 rounded text-left border ${
                      activeRole === r 
                        ? 'bg-[#C08A2E] text-[#0F291E] border-[#C08A2E] font-medium' 
                        : 'bg-[#1B4332] text-[#E9F3ED] border-[#2D6A4F]'
                    }`}
                  >
                    {r.toUpperCase()}
                  </button>
                ))}
              </div>
              <button
                onClick={() => {
                  onLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 mt-3 py-2 text-xs text-red-300 bg-red-900/30 rounded border border-red-800"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                onOpenAuth();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2 bg-[#C08A2E] text-[#0F291E] font-semibold text-xs rounded-lg flex items-center justify-center gap-1.5"
            >
              <Fingerprint className="w-4 h-4" />
              <span>Aadhaar Login</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
};
