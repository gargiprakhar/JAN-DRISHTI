import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  UserCheck, 
  Building2, 
  GraduationCap, 
  Briefcase, 
  Landmark, 
  ShieldAlert,
  Fingerprint,
  CreditCard
} from 'lucide-react';
import { Role, UserProfile } from '../../types';
import { JHARKHAND_DISTRICTS } from '../../data/mockData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticate: (user: UserProfile) => void;
  initialRole?: Role;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onAuthenticate,
  initialRole = 'citizen'
}) => {
  const [selectedRole, setSelectedRole] = useState<Role>(initialRole);
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [aadhaarConsent, setAadhaarConsent] = useState(true);
  const [fullName, setFullName] = useState('');
  const [institution, setInstitution] = useState('');
  const [district, setDistrict] = useState(JHARKHAND_DISTRICTS[0]);
  const [otpStep, setOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const roleDefinitions: Record<Role, { title: string; subtitle: string; icon: any; defaultOrg: string }> = {
    citizen: {
      title: 'Citizen',
      subtitle: 'Report local challenges, track resolutions & provide feedback',
      icon: UserCheck,
      defaultOrg: 'Gram Panchayat Citizen'
    },
    student: {
      title: 'Student Researcher',
      subtitle: 'Form interdisciplinary teams, submit proposals & upload prototypes',
      icon: GraduationCap,
      defaultOrg: 'Birla Institute of Technology (BIT) Mesra'
    },
    faculty: {
      title: 'Faculty Mentor',
      subtitle: 'Review research proposals, guide teams & tap statewide repository',
      icon: Building2,
      defaultOrg: 'IIT (ISM) Dhanbad'
    },
    industry: {
      title: 'Industry Partner',
      subtitle: 'Deploy CSR funding, provide technical mentorship & track pilots',
      icon: Briefcase,
      defaultOrg: 'Tata Steel Rural Development Society'
    },
    government: {
      title: 'Government Official',
      subtitle: 'Verify field complaints, monitor Jharkhand GIS map & impact',
      icon: Landmark,
      defaultOrg: 'Govt. of Jharkhand Nodal Office'
    },
    admin: {
      title: 'Platform Administrator',
      subtitle: 'Manage user access, PostGIS spatial database & AI telemetry',
      icon: ShieldAlert,
      defaultOrg: 'JAP-IT State Data Operations'
    }
  };

  const handleAadhaarChange = (val: string) => {
    const clean = val.replace(/\D/g, '').slice(0, 12);
    const formatted = clean.match(/.{1,4}/g)?.join(' ') || clean;
    setAadhaarNumber(formatted);
  };

  const setDemoAadhaar = () => {
    setAadhaarNumber('5821 9043 1892');
    if (!fullName) setFullName('Birsa Soren');
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanAadhaar = aadhaarNumber.replace(/\D/g, '');
    if (cleanAadhaar.length !== 12) {
      setErrorMsg('Aadhaar login is compulsory. Please enter a valid 12-digit Aadhaar Number (अनिवार्य आधार संख्या)');
      return;
    }
    if (!aadhaarConsent) {
      setErrorMsg('Aadhaar verification consent is compulsory under the Aadhaar Act, 2016 and DPDP Act, 2023');
      return;
    }

    setOtpStep(true);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const entered = otpCode.join('');
    if (entered.length < 4) {
      setErrorMsg('Please enter the 6-digit UIDAI Aadhaar verification OTP');
      return;
    }

    const cleanAadhaar = aadhaarNumber.replace(/\D/g, '');
    const authId = `Aadhaar: XXXX-XXXX-${cleanAadhaar.slice(-4) || '1892'}`;

    const newUser: UserProfile = {
      id: `u-${selectedRole}-${Date.now().toString().slice(-4)}`,
      name: fullName.trim() || 'Aadhaar Verified Citizen',
      role: selectedRole,
      emailOrPhone: authId,
      institutionOrOrg: institution || roleDefinitions[selectedRole].defaultOrg,
      district: district,
      verifiedStatus: true
    };

    onAuthenticate(newUser);
    onClose();
  };

  const autoFillDemo = () => {
    setOtpCode(['8', '2', '4', '9', '1', '2']);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs overflow-y-auto">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#D6E3DC] overflow-hidden my-auto text-[#14261C]">
        {/* Header */}
        <div className="bg-[#1B4332] px-6 py-4 text-[#F5F8F6] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#C08A2E] text-[#0F291E] flex items-center justify-center">
              <Fingerprint className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-base font-bold">Compulsory Aadhaar Portal Login</h3>
                <span className="bg-[#C08A2E] text-[#0F291E] font-mono text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                  Compulsory
                </span>
              </div>
              <p className="text-[11px] text-[#A9C2B5]">Mandatory UIDAI e-KYC authentication. No unverified or guest access.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-[#A9C2B5] hover:text-white rounded cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {!otpStep ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              {/* Mandatory Notice */}
              <div className="bg-[#E9F3ED] p-2.5 rounded-xl border border-[#2D6A4F]/20 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#1B4332] shrink-0 mt-0.5" />
                <p className="text-[11px] text-[#1B4332] leading-relaxed">
                  <strong>Government of Jharkhand Mandate:</strong> Aadhaar authentication is compulsory across all portals to eliminate duplicate submissions, authenticate research credentials, and ensure auditability under the DPDP Act.
                </p>
              </div>

              {/* Role Selection Grid */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">
                  Select Your Accredited Role:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(roleDefinitions) as Role[]).map((r) => {
                    const info = roleDefinitions[r];
                    const Icon = info.icon;
                    const isSelected = selectedRole === r;
                    return (
                      <button
                        type="button"
                        key={r}
                        onClick={() => setSelectedRole(r)}
                        className={`p-2.5 rounded-xl border text-left transition flex items-start gap-2 cursor-pointer ${
                          isSelected
                            ? 'bg-[#E9F3ED] border-[#1B4332] ring-1 ring-[#1B4332]'
                            : 'bg-white border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <div className={`p-1.5 rounded-lg mt-0.5 ${isSelected ? 'bg-[#1B4332] text-white' : 'bg-gray-100 text-gray-600'}`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#14261C]">{info.title}</p>
                          <p className="text-[10px] text-[#4A5E52] line-clamp-1">{info.subtitle}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Name input */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Full Legal Name (as in Aadhaar card):
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rameshwar Soren / Dr. S. Mukherjee"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
                />
              </div>

              {/* Compulsory Aadhaar Authentication Section */}
              <div className="space-y-2 bg-[#F9FBF9] p-3.5 rounded-xl border border-[#1B4332]/30 shadow-xs">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#1B4332] flex items-center gap-1.5">
                    <Fingerprint className="w-4 h-4 text-[#C08A2E]" />
                    <span>Compulsory 12-Digit Aadhaar Number (अनिवार्य आधार संख्या):</span>
                  </label>
                  <button
                    type="button"
                    onClick={setDemoAadhaar}
                    className="text-[10px] text-[#C08A2E] hover:underline font-bold cursor-pointer"
                  >
                    Use Demo Aadhaar
                  </button>
                </div>

                <div className="relative">
                  <CreditCard className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    maxLength={14}
                    placeholder="XXXX XXXX XXXX (e.g. 5821 9043 1892)"
                    value={aadhaarNumber}
                    onChange={(e) => handleAadhaarChange(e.target.value)}
                    className="w-full text-xs font-mono font-bold tracking-wider pl-9 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1B4332] bg-white"
                  />
                </div>
                <p className="text-[10px] text-gray-500">
                  UIDAI OTP will be sent to the mobile number registered with your Aadhaar.
                </p>

                {/* Aadhaar Consent Checkbox */}
                <div className="flex items-start gap-2 pt-1.5 text-[11px] text-gray-700">
                  <input
                    type="checkbox"
                    id="aadhaarConsent"
                    checked={aadhaarConsent}
                    onChange={(e) => setAadhaarConsent(e.target.checked)}
                    className="mt-0.5 rounded text-[#1B4332] focus:ring-[#1B4332] cursor-pointer"
                  />
                  <label htmlFor="aadhaarConsent" className="leading-snug cursor-pointer select-none">
                    <span className="font-semibold text-[#1B4332]">Mandatory Consent:</span> I hereby consent to Jan Drishti (Govt. of Jharkhand) verifying my identity via UIDAI Aadhaar OTP / e-KYC in accordance with the Aadhaar Act, 2016 and DPDP Act, 2023.
                  </label>
                </div>
              </div>

              {/* Role specific input */}
              {selectedRole !== 'citizen' && (
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Affiliated Institution, Department, or Corporate Entity:
                  </label>
                  <input
                    type="text"
                    placeholder={`e.g. ${roleDefinitions[selectedRole].defaultOrg}`}
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
                  />
                </div>
              )}

              {/* District */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Primary Operating District (Jharkhand):
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#1B4332] bg-white"
                >
                  {JHARKHAND_DISTRICTS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              {errorMsg && (
                <p className="text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200 font-medium">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-[#1B4332] hover:bg-[#143427] text-white font-medium text-xs rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Fingerprint className="w-4 h-4 text-[#C08A2E]" />
                <span>Authenticate with Aadhaar (Generate UIDAI OTP)</span>
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-full bg-[#E9F3ED] text-[#1B4332] flex items-center justify-center mx-auto mb-2">
                  <Fingerprint className="w-6 h-6 text-[#1B4332]" />
                </div>
                <h4 className="font-serif text-base font-bold text-[#14261C]">
                  Enter 6-Digit Aadhaar OTP (आधार ओटीपी)
                </h4>
                <p className="text-xs text-gray-600">
                  UIDAI verification OTP dispatched to registered mobile linked with{' '}
                  <strong className="text-[#1B4332]">
                    Aadhaar XXXX-XXXX-{aadhaarNumber.replace(/\D/g, '').slice(-4) || '1892'}
                  </strong>
                </p>
              </div>

              <div className="flex justify-center gap-2 my-4">
                {[0, 1, 2, 3, 4, 5].map((idx) => (
                  <input
                    key={idx}
                    type="text"
                    maxLength={1}
                    value={otpCode[idx] || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      const next = [...otpCode];
                      next[idx] = val;
                      setOtpCode(next);
                      if (val && e.target.nextElementSibling) {
                        (e.target.nextElementSibling as HTMLInputElement).focus();
                      }
                    }}
                    className="w-10 h-11 text-center text-base font-mono font-bold rounded-lg border border-gray-300 focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332]"
                  />
                ))}
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500 px-2">
                <span>Didn't receive code?</span>
                <button
                  type="button"
                  onClick={autoFillDemo}
                  className="text-[#C08A2E] hover:underline font-semibold cursor-pointer"
                >
                  Quick Fill Demo OTP (824912)
                </button>
              </div>

              {errorMsg && (
                <p className="text-xs text-red-600 bg-red-50 p-2 rounded-lg border border-red-200">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-[#C08A2E] hover:bg-[#A97424] text-[#0F291E] font-bold text-xs rounded-xl transition cursor-pointer shadow-sm flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Verify Aadhaar & Enter Portal</span>
              </button>

              <button
                type="button"
                onClick={() => setOtpStep(false)}
                className="w-full py-1.5 text-xs text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                ← Back to Aadhaar Entry
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

