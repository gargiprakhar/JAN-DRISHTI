import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  KeyRound, 
  Smartphone, 
  Mail, 
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
  const [authMethod, setAuthMethod] = useState<'aadhaar' | 'mobile' | 'email'>('aadhaar');
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [aadhaarConsent, setAadhaarConsent] = useState(true);
  const [identifier, setIdentifier] = useState('');
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

    if (authMethod === 'aadhaar') {
      const cleanAadhaar = aadhaarNumber.replace(/\D/g, '');
      if (cleanAadhaar.length !== 12) {
        setErrorMsg('Please enter a valid 12-digit Aadhaar Number (आधार संख्या)');
        return;
      }
      if (!aadhaarConsent) {
        setErrorMsg('Consent for UIDAI Aadhaar authentication is required under DPDP Act & Aadhaar Act');
        return;
      }
      setIdentifier(`Aadhaar: XXXX-XXXX-${cleanAadhaar.slice(-4)}`);
    } else if (authMethod === 'mobile') {
      if (!identifier.trim()) {
        setErrorMsg('Please enter a valid 10-digit mobile number');
        return;
      }
    } else {
      if (!identifier.trim() || !identifier.includes('@')) {
        setErrorMsg('Please enter a valid institutional email address');
        return;
      }
    }

    setOtpStep(true);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const entered = otpCode.join('');
    if (entered.length < 4) {
      setErrorMsg('Please enter the 6-digit verification code');
      return;
    }

    const authId = authMethod === 'aadhaar'
      ? `Aadhaar: XXXX-XXXX-${aadhaarNumber.replace(/\D/g, '').slice(-4) || '1892'}`
      : identifier;

    const newUser: UserProfile = {
      id: `u-${selectedRole}-${Date.now().toString().slice(-4)}`,
      name: fullName.trim() || (authMethod === 'aadhaar' ? 'Aadhaar Verified Citizen' : `${selectedRole.toUpperCase()} User`),
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
              <KeyRound className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-base font-bold">Aadhaar & Role-Based Portal Authentication</h3>
              <p className="text-[11px] text-[#A9C2B5]">UIDAI e-KYC / OTP verified access. No public guest access.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-[#A9C2B5] hover:text-white rounded cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {!otpStep ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
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
                  Full Legal Name (as in Aadhaar / Official ID):
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

              {/* Authentication Option Selector */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-gray-700">
                    Authentication Option:
                  </label>
                  <span className="text-[10px] text-[#1B4332] font-semibold bg-[#E9F3ED] px-2 py-0.5 rounded">
                    UIDAI e-KYC Enabled
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-1.5 bg-[#F5F8F6] p-1 rounded-xl border border-gray-200 mb-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMethod('aadhaar');
                      setErrorMsg('');
                    }}
                    className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-medium transition cursor-pointer ${
                      authMethod === 'aadhaar'
                        ? 'bg-[#1B4332] text-white shadow-xs font-semibold'
                        : 'text-gray-600 hover:text-[#14261C] hover:bg-white/60'
                    }`}
                  >
                    <Fingerprint className="w-3.5 h-3.5" />
                    <span>Aadhaar</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setAuthMethod('mobile');
                      setErrorMsg('');
                    }}
                    className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-medium transition cursor-pointer ${
                      authMethod === 'mobile'
                        ? 'bg-[#1B4332] text-white shadow-xs font-semibold'
                        : 'text-gray-600 hover:text-[#14261C] hover:bg-white/60'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Mobile (+91)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setAuthMethod('email');
                      setErrorMsg('');
                    }}
                    className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-medium transition cursor-pointer ${
                      authMethod === 'email'
                        ? 'bg-[#1B4332] text-white shadow-xs font-semibold'
                        : 'text-gray-600 hover:text-[#14261C] hover:bg-white/60'
                    }`}
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email OTP</span>
                  </button>
                </div>

                {/* Method-Specific Inputs */}
                {authMethod === 'aadhaar' && (
                  <div className="space-y-2 bg-[#F9FBF9] p-3 rounded-xl border border-[#D6E3DC]">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-semibold text-[#1B4332] flex items-center gap-1">
                        <CreditCard className="w-3.5 h-3.5 text-[#C08A2E]" />
                        <span>12-Digit Aadhaar Number (आधार संख्या):</span>
                      </label>
                      <button
                        type="button"
                        onClick={setDemoAadhaar}
                        className="text-[10px] text-[#C08A2E] hover:underline font-semibold cursor-pointer"
                      >
                        Use Demo Aadhaar
                      </button>
                    </div>

                    <div className="relative">
                      <Fingerprint className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        maxLength={14}
                        placeholder="XXXX XXXX XXXX (e.g. 5821 9043 1892)"
                        value={aadhaarNumber}
                        onChange={(e) => handleAadhaarChange(e.target.value)}
                        className="w-full text-xs font-mono font-bold tracking-wider pl-9 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#1B4332] bg-white"
                      />
                    </div>

                    {/* Aadhaar Consent Checkbox */}
                    <div className="flex items-start gap-2 pt-1 text-[11px] text-gray-600">
                      <input
                        type="checkbox"
                        id="aadhaarConsent"
                        checked={aadhaarConsent}
                        onChange={(e) => setAadhaarConsent(e.target.checked)}
                        className="mt-0.5 rounded text-[#1B4332] focus:ring-[#1B4332] cursor-pointer"
                      />
                      <label htmlFor="aadhaarConsent" className="leading-snug cursor-pointer select-none">
                        I hereby consent to Jan Drishti (Govt. of Jharkhand) verifying my identity via UIDAI Aadhaar OTP / e-KYC in accordance with the Aadhaar Act, 2016.
                      </label>
                    </div>
                  </div>
                )}

                {authMethod === 'mobile' && (
                  <div className="relative">
                    <div className="flex items-center">
                      <span className="inline-flex items-center px-3 py-2 text-xs border border-r-0 border-gray-300 rounded-l-lg bg-gray-50 text-gray-600">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        placeholder="98765 43210"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        className="w-full text-xs px-3 py-2 rounded-r-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
                      />
                    </div>
                  </div>
                )}

                {authMethod === 'email' && (
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      required
                      placeholder="official.name@institution.gov.in"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
                    />
                  </div>
                )}
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
                <p className="text-xs text-red-600 bg-red-50 p-2 rounded-lg border border-red-200">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-[#1B4332] hover:bg-[#143427] text-white font-medium text-xs rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                {authMethod === 'aadhaar' ? (
                  <>
                    <Fingerprint className="w-4 h-4 text-[#C08A2E]" />
                    <span>Authenticate with Aadhaar (Generate UIDAI OTP)</span>
                  </>
                ) : (
                  <span>Generate Secure One-Time Password (OTP)</span>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-full bg-[#E9F3ED] text-[#1B4332] flex items-center justify-center mx-auto mb-2">
                  {authMethod === 'aadhaar' ? (
                    <Fingerprint className="w-6 h-6 text-[#1B4332]" />
                  ) : (
                    <Smartphone className="w-6 h-6" />
                  )}
                </div>
                <h4 className="font-serif text-base font-bold text-[#14261C]">
                  {authMethod === 'aadhaar' ? 'Enter 6-Digit Aadhaar OTP (आधार ओटीपी)' : 'Enter 6-Digit OTP'}
                </h4>
                <p className="text-xs text-gray-600">
                  {authMethod === 'aadhaar' ? (
                    <>
                      UIDAI verification OTP dispatched to registered mobile linked with{' '}
                      <strong className="text-[#1B4332]">
                        Aadhaar XXXX-XXXX-{aadhaarNumber.replace(/\D/g, '').slice(-4) || '1892'}
                      </strong>
                    </>
                  ) : (
                    <>
                      A verification code has been dispatched to{' '}
                      <strong className="text-[#1B4332]">{identifier || '+91 94311 88219'}</strong>
                    </>
                  )}
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
                    className="w-10 h-11 text-center text-base font-bold rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1B4332] bg-white"
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
                <span>
                  {authMethod === 'aadhaar' ? 'Verify Aadhaar & Enter Portal' : 'Verify Credentials & Enter Portal'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setOtpStep(false)}
                className="w-full py-1.5 text-xs text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                ← Back to Authentication Options
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

