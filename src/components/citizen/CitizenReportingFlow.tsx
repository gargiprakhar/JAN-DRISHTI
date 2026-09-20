import React, { useState, useEffect, useRef } from 'react';
import { 
  FileText, 
  Camera, 
  MapPin, 
  CheckCircle2, 
  Mic, 
  MicOff, 
  Upload, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  AlertCircle, 
  Search, 
  Star, 
  RefreshCw,
  Send,
  Eye,
  EyeOff,
  Navigation
} from 'lucide-react';
import { ProblemReport, ProblemDomain, PostGISLocation, UserProfile } from '../../types';
import { JHARKHAND_DISTRICTS } from '../../data/mockData';
import { AIPipelineService } from '../../services/aiPipelineService';

interface CitizenReportingFlowProps {
  currentUser: UserProfile | null;
  problems: ProblemReport[];
  onSubmitNewReport: (report: ProblemReport) => void;
  onUpdateFeedback: (problemId: string, rating: number, comment: string) => void;
  onOpenAIPipelineForProblem?: (problem: ProblemReport) => void;
  selectedTrackingCode?: string;
}

export const CitizenReportingFlow: React.FC<CitizenReportingFlowProps> = ({
  currentUser,
  problems,
  onSubmitNewReport,
  onUpdateFeedback,
  onOpenAIPipelineForProblem,
  selectedTrackingCode
}) => {
  const [activeTab, setActiveTab] = useState<'report' | 'track'>(selectedTrackingCode ? 'track' : 'report');
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [voiceSeconds, setVoiceSeconds] = useState(0);
  const [language, setLanguage] = useState<'Hindi' | 'English' | 'Santhali'>('Hindi');
  
  // Media & Face Safeguard State
  const [selectedPhotoUrl, setSelectedPhotoUrl] = useState<string>(
    'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=800&q=80'
  );
  const [faceDetected, setFaceDetected] = useState(true);
  const [blurActive, setBlurActive] = useState(true);
  const [faceCount, setFaceCount] = useState(2);
  const [privacyConfidence, setPrivacyConfidence] = useState(99.8);

  // Location State
  const [district, setDistrict] = useState('Khunti');
  const [block, setBlock] = useState('Torpa');
  const [village, setVillage] = useState('Dormo Panchayat');
  const [address, setAddress] = useState('Near Torpa Weekly Haat, Khunti');
  const [lat, setLat] = useState<number>(22.9556);
  const [lng, setLng] = useState<number>(85.1214);
  const [isLocating, setIsLocating] = useState(false);

  // Submission / Tracking state
  const [searchTrackingId, setSearchTrackingId] = useState(selectedTrackingCode || '');
  const [searchedProblem, setSearchedProblem] = useState<ProblemReport | null>(null);
  const [justSubmittedCode, setJustSubmittedCode] = useState<string | null>(null);

  // Feedback form state
  const [feedbackRating, setFeedbackRating] = useState<number>(5);
  const [feedbackComment, setFeedbackComment] = useState('');
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

  useEffect(() => {
    if (selectedTrackingCode) {
      setActiveTab('track');
      setSearchTrackingId(selectedTrackingCode);
      const found = problems.find(p => p.trackingCode.toLowerCase() === selectedTrackingCode.toLowerCase());
      if (found) setSearchedProblem(found);
    }
  }, [selectedTrackingCode, problems]);

  // Voice Recording Simulator
  useEffect(() => {
    let interval: any;
    if (isRecordingVoice) {
      interval = setInterval(() => {
        setVoiceSeconds(s => s + 1);
      }, 1000);
    } else {
      setVoiceSeconds(0);
    }
    return () => clearInterval(interval);
  }, [isRecordingVoice]);

  const toggleVoiceRecording = () => {
    if (!isRecordingVoice) {
      setIsRecordingVoice(true);
    } else {
      setIsRecordingVoice(false);
      // Auto transcribe sample speech depending on language
      if (!description.trim()) {
        if (language === 'Hindi') {
          setDescription('हमारे गांव में 15 दिनों से पीने का पानी नहीं आ रहा है। मोटर जल गई है और सब लोग गंदा तालाब का पानी पी रहे हैं। कृपया मदद करें।');
          setTitle('गांव में पीने के पानी की मोटर जलने की समस्या');
        } else if (language === 'Santhali') {
          setDescription('Ato re dak banoa. Handpump kharap menaka. Gidra ko dharte bhedo kana.');
          setTitle('Handpump malfunction in Santhali tribal settlement');
        } else {
          setDescription('Borewell water in our block is showing reddish discoloration and heavy sediment. Villagers are suffering from joint pain.');
          setTitle('Heavy metal sedimentation in village borewells');
        }
      }
    }
  };

  // GPS Detector
  const handleDetectGPS = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLat(Number(pos.coords.latitude.toFixed(4)));
          setLng(Number(pos.coords.longitude.toFixed(4)));
          setIsLocating(false);
        },
        () => {
          // Fallback to central Ranchi coordinates
          setLat(23.3441);
          setLng(85.3096);
          setDistrict('Ranchi');
          setBlock('Kanke');
          setIsLocating(false);
        },
        { timeout: 5000 }
      );
    } else {
      setIsLocating(false);
    }
  };

  // Sample photo selections
  const samplePhotos = [
    {
      name: 'Contaminated Handpump',
      url: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=800&q=80',
      faces: 2
    },
    {
      name: 'Broken Rural Causeway',
      url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
      faces: 0
    },
    {
      name: 'Forest Agro Storage Need',
      url: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80',
      faces: 3
    },
    {
      name: 'Rural Clinic Disrepair',
      url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
      faces: 1
    }
  ];

  const handleSelectSamplePhoto = (sample: { name: string; url: string; faces: number }) => {
    setSelectedPhotoUrl(sample.url);
    setFaceCount(sample.faces);
    setFaceDetected(sample.faces > 0);
  };

  // Submit Handler
  const handleSubmit = () => {
    const rawDesc = description.trim() || 'Urgent civic problem reported by citizen.';
    const structuring = AIPipelineService.structureRawReport(rawDesc, title);
    const feasibility = AIPipelineService.scoreFeasibilityDimensions(structuring.domain, structuring.urgency);
    const matching = AIPipelineService.matchUniversityAndIndustry(structuring.domain, district);
    const existingCheck = AIPipelineService.checkExistingSolutions(structuring.domain);
    const duplicateCheck = AIPipelineService.detectDuplicates(rawDesc, problems);
    const embedding = AIPipelineService.generateEmbeddingSnippet(rawDesc);

    const trackingCode = `JD-JH-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newReport: ProblemReport = {
      id: `pr-${Date.now()}`,
      trackingCode,
      title: structuring.title,
      rawDescription: rawDesc,
      structuredDescription: structuring.structuredDescription,
      domain: structuring.domain,
      stage: 'report',
      verificationStatus: 'pending',
      urgency: structuring.urgency,
      citizenName: currentUser?.name || 'Citizen Informant',
      citizenContact: currentUser?.emailOrPhone || '+91 98*** **412',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      location: {
        latitude: lat,
        longitude: lng,
        district,
        block,
        villagePanchayat: village,
        address,
        postgisGeom: `SRID=4326;POINT(${lng} ${lat})`
      },
      media: [
        {
          type: 'photo',
          url: selectedPhotoUrl,
          caption: 'Geotagged photographic evidence with biometric blur',
          faceSafeguard: {
            facesDetected: faceCount,
            appliedBlur: blurActive,
            privacyConfidence,
            processedImageUrl: selectedPhotoUrl,
            originalMaskCoordinates: [{ x: 30, y: 20, width: 40, height: 40 }]
          }
        }
      ],
      aiMetadata: {
        classifiedDomain: structuring.domain,
        domainConfidence: structuring.domainConfidence,
        duplicateCheck,
        existingSolutionCheck: existingCheck,
        feasibilityScores: feasibility,
        matchRecommendation: matching,
        embeddingVectorSnippet: embedding
      }
    };

    onSubmitNewReport(newReport);
    setJustSubmittedCode(trackingCode);
    setSearchedProblem(newReport);
    setActiveTab('track');
    setSearchTrackingId(trackingCode);
  };

  const handleSearchTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTrackingId.trim()) return;
    const found = problems.find(p => p.trackingCode.toLowerCase() === searchTrackingId.trim().toLowerCase());
    setSearchedProblem(found || null);
  };

  const handleSendFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchedProblem) {
      onUpdateFeedback(searchedProblem.id, feedbackRating, feedbackComment);
      setFeedbackSuccess(true);
      setSearchedProblem({
        ...searchedProblem,
        citizenFeedback: {
          rating: feedbackRating,
          comment: feedbackComment,
          feedbackDate: new Date().toISOString().split('T')[0],
          resolvedSatisfactorily: feedbackRating >= 3
        }
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Top Banner with PWA Mobile Indicator */}
      <div className="bg-[#1B4332] text-white p-5 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C08A2E]" />
            <span className="text-xs font-semibold text-[#C08A2E] uppercase tracking-wider">
              Citizen Reporting Portal (नागरिक निवारण)
            </span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#F5F8F6]">
            Report or Track a Local Societal Challenge
          </h2>
          <p className="text-xs text-[#A9C2B5]">
            Every grievance is mapped into PostGIS coordinates, protected with face-blur privacy, and matched to university research labs.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-[#0F291E] p-1 rounded-xl border border-[#2D6A4F] self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('report')}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition cursor-pointer ${
              activeTab === 'report' ? 'bg-[#C08A2E] text-[#0F291E] font-bold shadow-xs' : 'text-[#A9C2B5] hover:text-white'
            }`}
          >
            1. Report Problem
          </button>
          <button
            onClick={() => setActiveTab('track')}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition cursor-pointer ${
              activeTab === 'track' ? 'bg-[#C08A2E] text-[#0F291E] font-bold shadow-xs' : 'text-[#A9C2B5] hover:text-white'
            }`}
          >
            2. Track Grievance
          </button>
        </div>
      </div>

      {/* SUBMISSION FLOW */}
      {activeTab === 'report' && (
        <div className="bg-white rounded-2xl border border-[#D6E3DC] shadow-sm p-6 space-y-6 text-[#14261C]">
          {/* Stepper Header */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div className="flex items-center gap-2 sm:gap-4 text-xs font-medium">
              <button 
                onClick={() => setCurrentStep(1)}
                className={`flex items-center gap-1.5 ${currentStep === 1 ? 'text-[#1B4332] font-bold' : 'text-gray-400'}`}
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${currentStep === 1 ? 'bg-[#1B4332] text-white' : 'bg-gray-100 text-gray-500'}`}>1</span>
                <span>Describe</span>
              </button>
              <span className="text-gray-300">→</span>
              <button 
                onClick={() => setCurrentStep(2)}
                className={`flex items-center gap-1.5 ${currentStep === 2 ? 'text-[#1B4332] font-bold' : 'text-gray-400'}`}
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${currentStep === 2 ? 'bg-[#1B4332] text-white' : 'bg-gray-100 text-gray-500'}`}>2</span>
                <span>Media & Face Shield</span>
              </button>
              <span className="text-gray-300">→</span>
              <button 
                onClick={() => setCurrentStep(3)}
                className={`flex items-center gap-1.5 ${currentStep === 3 ? 'text-[#1B4332] font-bold' : 'text-gray-400'}`}
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${currentStep === 3 ? 'bg-[#1B4332] text-white' : 'bg-gray-100 text-gray-500'}`}>3</span>
                <span>Location</span>
              </button>
              <span className="text-gray-300">→</span>
              <button 
                onClick={() => setCurrentStep(4)}
                className={`flex items-center gap-1.5 ${currentStep === 4 ? 'text-[#1B4332] font-bold' : 'text-gray-400'}`}
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${currentStep === 4 ? 'bg-[#1B4332] text-white' : 'bg-gray-100 text-gray-500'}`}>4</span>
                <span>Review & AI</span>
              </button>
            </div>

            <span className="text-xs text-[#C08A2E] font-semibold bg-[#FDF8EE] px-2.5 py-1 rounded-md border border-[#C08A2E]/30 hidden sm:inline">
              Step {currentStep} of 4
            </span>
          </div>

          {/* STEP 1: Describe with Text and Voice */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#1B4332]">
                    Step 1: Describe the Problem (समस्या का विवरण)
                  </h3>
                  <p className="text-xs text-gray-600">
                    Use text or record voice in Hindi, English, or Santhali. The AI engine extracts key details automatically.
                  </p>
                </div>

                <div className="flex items-center gap-1 bg-[#F5F8F6] p-1 rounded-lg border border-[#D6E3DC] text-xs self-start">
                  {(['Hindi', 'English', 'Santhali'] as const).map(lang => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => setLanguage(lang)}
                      className={`px-2 py-1 rounded cursor-pointer ${language === lang ? 'bg-[#1B4332] text-white font-medium' : 'text-gray-600'}`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              {/* Voice Input Simulator */}
              <div className="p-4 rounded-xl bg-[#F5F8F6] border border-[#D6E3DC] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={toggleVoiceRecording}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition cursor-pointer ${
                      isRecordingVoice 
                        ? 'bg-red-600 text-white animate-pulse ring-4 ring-red-200' 
                        : 'bg-[#1B4332] text-white hover:bg-[#143427]'
                    }`}
                  >
                    {isRecordingVoice ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </button>
                  <div>
                    <p className="text-xs font-bold text-[#14261C]">
                      {isRecordingVoice ? `Recording voice memo (${voiceSeconds}s)...` : 'Record voice report (आवाज़ में बताएं)'}
                    </p>
                    <p className="text-[11px] text-gray-500">
                      {isRecordingVoice ? 'Tap mic again to transcribe audio' : `Language: ${language}`}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={toggleVoiceRecording}
                  className="text-xs px-3 py-1.5 rounded-lg border border-[#C08A2E] text-[#8E6116] bg-[#FDF8EE] hover:bg-[#F9EED4] cursor-pointer"
                >
                  {isRecordingVoice ? 'Stop & Transcribe' : 'Simulate Voice Memo'}
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Brief Title / Subject (विषय):
                </label>
                <input
                  type="text"
                  placeholder="e.g. Red and turbid water coming from 14 borewells in Torpa block"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Detailed Description (विस्तृत जानकारी):
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe who is affected, how long the issue has persisted, and what consequences villagers are facing..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-5 py-2.5 bg-[#1B4332] text-white text-xs font-medium rounded-xl hover:bg-[#143427] transition flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>Proceed to Media & Face Shield</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Photo/Video with Face Privacy Shield */}
          {currentStep === 2 && (
            <div className="space-y-5">
              <div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-serif text-lg font-bold text-[#1B4332]">
                    Step 2: Photo/Video Evidence & Face Privacy Shield
                  </h3>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  In compliance with citizen protection guidelines, our AI face detector blurs all identifiable human faces before photos leave your device.
                </p>
              </div>

              {/* Sample Photo selector */}
              <div>
                <span className="block text-xs font-semibold text-gray-700 mb-2">
                  Select Evidence Photo (or test sample):
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {samplePhotos.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectSamplePhoto(s)}
                      className={`p-2 rounded-xl border text-left transition cursor-pointer ${
                        selectedPhotoUrl === s.url ? 'bg-[#E9F3ED] border-[#1B4332] ring-1 ring-[#1B4332]' : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <img src={s.url} alt={s.name} className="w-full h-16 object-cover rounded-lg mb-1.5" />
                      <p className="text-[11px] font-semibold text-gray-800 line-clamp-1">{s.name}</p>
                      <p className="text-[10px] text-gray-500">{s.faces} face(s) present</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Face Shield Simulator Preview */}
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#14261C]">Biometric Privacy Inspector:</span>
                    <span className="text-[11px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-medium">
                      {faceCount > 0 ? `${faceCount} Identifiable Face(s) Intercepted` : 'No Faces Detected'}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setBlurActive(!blurActive)}
                    className="flex items-center gap-1 text-xs text-[#1B4332] hover:underline cursor-pointer"
                  >
                    {blurActive ? <EyeOff className="w-3.5 h-3.5 text-emerald-600" /> : <Eye className="w-3.5 h-3.5 text-amber-600" />}
                    <span>{blurActive ? 'Privacy Blur ON' : 'Privacy Blur OFF'}</span>
                  </button>
                </div>

                <div className="relative max-w-md mx-auto h-56 rounded-xl overflow-hidden shadow-inner bg-black border border-gray-300">
                  <img
                    src={selectedPhotoUrl}
                    alt="Citizen Evidence"
                    className="w-full h-full object-cover"
                  />

                  {/* Dynamic Face Blur Overlays */}
                  {faceDetected && blurActive && (
                    <>
                      <div className="absolute top-8 left-1/3 w-16 h-20 rounded-full bg-white/20 backdrop-blur-lg border border-white/60 shadow-lg flex items-center justify-center">
                        <ShieldCheck className="w-5 h-5 text-emerald-400 opacity-90" />
                      </div>
                      {faceCount > 1 && (
                        <div className="absolute top-12 right-12 w-14 h-18 rounded-full bg-white/20 backdrop-blur-lg border border-white/60 shadow-lg flex items-center justify-center">
                          <ShieldCheck className="w-4 h-4 text-emerald-400 opacity-90" />
                        </div>
                      )}
                    </>
                  )}

                  <div className="absolute bottom-2 left-2 right-2 bg-black/75 text-white px-3 py-1 rounded-lg text-[10px] flex items-center justify-between">
                    <span>Client-Side Neural Keypoints: Active</span>
                    <span className="text-emerald-400 font-semibold">Privacy Confidence: {privacyConfidence}%</span>
                  </div>
                </div>

                <div className="text-[11px] text-gray-500 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Before file persistence in Jharkhand PostGIS cloud, blurred pixelation is baked into the image matrix. Informants remain completely anonymous.</span>
                </div>
              </div>

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 text-xs font-medium rounded-xl hover:bg-gray-50 cursor-pointer"
                >
                  ← Back to Description
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-5 py-2.5 bg-[#1B4332] text-white text-xs font-medium rounded-xl hover:bg-[#143427] transition flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>Proceed to Location</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: GPS & PostGIS Location */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#1B4332]">
                  Step 3: Location Details & PostGIS Spatial Tagging
                </h3>
                <p className="text-xs text-gray-600">
                  Select your Jharkhand district and block, or tap "Detect Automatic GPS" for instantaneous geospatial coordinate capture.
                </p>
              </div>

              {/* Automatic GPS Button */}
              <div className="p-4 rounded-xl bg-[#E9F3ED] border border-[#C6DDD1] flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1B4332] text-white flex items-center justify-center">
                    <Navigation className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1B4332]">Automatic GPS Geolocation</p>
                    <p className="text-[11px] text-[#2D6A4F]">
                      Current Coordinates: Latitude {lat.toFixed(4)}, Longitude {lng.toFixed(4)}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleDetectGPS}
                  disabled={isLocating}
                  className="px-4 py-2 bg-[#1B4332] text-white rounded-lg text-xs font-medium hover:bg-[#143427] transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isLocating ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <MapPin className="w-3.5 h-3.5" />}
                  <span>{isLocating ? 'Detecting GPS...' : 'Detect GPS Now'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    District (जिला):
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

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Block / Tehsil (प्रखंड):
                  </label>
                  <input
                    type="text"
                    value={block}
                    onChange={(e) => setBlock(e.target.value)}
                    placeholder="e.g. Torpa / Baghmara / Manoharpur"
                    className="w-full text-xs px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Gram Panchayat / Ward:
                  </label>
                  <input
                    type="text"
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    placeholder="e.g. Dormo Panchayat"
                    className="w-full text-xs px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Landmark / Street Address:
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. Near Weekly Village Haat"
                    className="w-full text-xs px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
                  />
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs font-mono text-gray-700">
                <span className="text-gray-400 select-none">PostGIS Geometry: </span>
                <span className="text-[#1B4332] font-semibold">SRID=4326;POINT({lng} {lat})</span>
              </div>

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 text-xs font-medium rounded-xl hover:bg-gray-50 cursor-pointer"
                >
                  ← Back to Media
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="px-5 py-2.5 bg-[#1B4332] text-white text-xs font-medium rounded-xl hover:bg-[#143427] transition flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>Review & Run AI Structuring</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Review & Run AI Structuring */}
          {currentStep === 4 && (
            <div className="space-y-5">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#1B4332]">
                  Step 4: Final Confirmation & Autonomous AI Pipeline Preview
                </h3>
                <p className="text-xs text-gray-600">
                  Confirm your grievance details. On submit, our core backend service structures the problem, computes vector embeddings, and cross-references existing university solutions.
                </p>
              </div>

              {/* Review Card */}
              <div className="p-5 rounded-2xl bg-[#F5F8F6] border border-[#D6E3DC] space-y-3 text-xs">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Title</span>
                    <h4 className="font-serif font-bold text-base text-[#14261C] mt-0.5">
                      {title || 'Civic Infrastructure Notice'}
                    </h4>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-[#1B4332] text-white font-medium text-[11px]">
                    District: {district}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Raw Statement</span>
                  <p className="text-gray-700 italic mt-0.5 bg-white p-3 rounded-lg border border-gray-200">
                    "{description || 'No detailed statement entered.'}"
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-[#E1ECE5]">
                  <div>
                    <span className="text-gray-500">Block & Panchayat:</span>
                    <p className="font-semibold text-gray-800">{block} • {village}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Face Privacy Status:</span>
                    <p className="font-semibold text-emerald-700 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{faceDetected ? 'Active (Blurred)' : 'No Faces Detected'}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* AI Pipeline Pre-computation Preview */}
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs space-y-2">
                <div className="flex items-center gap-2 text-amber-900 font-bold">
                  <Sparkles className="w-4 h-4 text-[#C08A2E]" />
                  <span>Immediate Post-Submission Actions:</span>
                </div>
                <ol className="list-decimal list-inside space-y-1 text-gray-700 text-[11px]">
                  <li>Classify grievance into 1 of 7 state societal domains</li>
                  <li>Scan 768-dim embeddings for duplicate complaints in {district}</li>
                  <li>Dispatch notification to District Nodal Officer verification queue</li>
                  <li>Auto-recommend lead university faculty (BIT Mesra / IIT ISM / NIT Jamshedpur)</li>
                </ol>
              </div>

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 text-xs font-medium rounded-xl hover:bg-gray-50 cursor-pointer"
                >
                  ← Back to Location
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-6 py-3 bg-[#C08A2E] hover:bg-[#A97424] text-[#0F291E] font-bold text-xs rounded-xl transition flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Grievance & Generate Tracking Code</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TRACKING & FEEDBACK VIEW */}
      {activeTab === 'track' && (
        <div className="bg-white rounded-2xl border border-[#D6E3DC] shadow-sm p-6 space-y-6 text-[#14261C]">
          {/* Tracking Search Form */}
          <div className="space-y-3">
            <h3 className="font-serif text-lg font-bold text-[#1B4332]">
              Track Grievance Status (अपनी शिकायत ट्रैक करें)
            </h3>
            <p className="text-xs text-gray-600">
              Enter the unique tracking code issued at submission (e.g. <span className="font-mono font-bold text-[#1B4332]">JD-JH-2026-1042</span>).
            </p>

            <form onSubmit={handleSearchTrack} className="flex gap-2 max-w-lg">
              <input
                type="text"
                placeholder="Enter Tracking Code..."
                value={searchTrackingId}
                onChange={(e) => setSearchTrackingId(e.target.value)}
                className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#1B4332] font-mono uppercase"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-[#1B4332] text-white text-xs font-medium rounded-xl hover:bg-[#143427] cursor-pointer flex items-center gap-1.5"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search</span>
              </button>
            </form>
          </div>

          {/* Searched Problem Details */}
          {searchedProblem ? (
            <div className="space-y-6 pt-4 border-t border-gray-100">
              {/* Problem Card Header */}
              <div className="p-5 rounded-2xl bg-[#F5F8F6] border border-[#D6E3DC] space-y-3 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="font-mono font-bold text-xs bg-[#1B4332] text-white px-2 py-0.5 rounded">
                      {searchedProblem.trackingCode}
                    </span>
                    <h4 className="font-serif text-base font-bold text-[#14261C] mt-1.5">
                      {searchedProblem.title}
                    </h4>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded bg-[#C08A2E]/20 text-[#8E6116] font-bold text-[11px] border border-[#C08A2E]/40">
                      {searchedProblem.domain}
                    </span>
                    {onOpenAIPipelineForProblem && (
                      <button
                        onClick={() => onOpenAIPipelineForProblem(searchedProblem)}
                        className="px-2.5 py-1 rounded bg-white text-[#1B4332] border border-[#D6E3DC] font-medium hover:bg-[#E9F3ED] transition cursor-pointer"
                      >
                        Inspect AI Pipeline
                      </button>
                    )}
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed">
                  {searchedProblem.structuredDescription}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-[#E1ECE5] text-[11px]">
                  <div>
                    <span className="text-gray-500">District:</span>
                    <p className="font-semibold text-gray-800">{searchedProblem.location.district}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Block:</span>
                    <p className="font-semibold text-gray-800">{searchedProblem.location.block}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Verification:</span>
                    <p className="font-semibold text-emerald-700 capitalize">{searchedProblem.verificationStatus}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Feasibility:</span>
                    <p className="font-semibold text-[#C08A2E]">
                      {searchedProblem.aiMetadata.feasibilityScores.overallScore} / 10
                    </p>
                  </div>
                </div>
              </div>

              {/* 9-Stage Progress Stepper */}
              <div>
                <h5 className="font-serif text-sm font-bold text-[#1B4332] mb-3">
                  Lifecycle Progress (नौ-चरणीय समाधान यात्रा):
                </h5>
                <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-1.5 text-center text-[10px]">
                  {[
                    { key: 'report', label: '1. Report' },
                    { key: 'ai_structuring', label: '2. AI Struct' },
                    { key: 'government_verification', label: '3. Gov Verify' },
                    { key: 'matching', label: '4. Match' },
                    { key: 'feasibility', label: '5. Feasibility' },
                    { key: 'proposal', label: '6. Proposal' },
                    { key: 'prototype_testing', label: '7. Prototype' },
                    { key: 'pilot', label: '8. Pilot' },
                    { key: 'impact_measurement', label: '9. Feedback' }
                  ].map((st, i) => {
                    const stagesOrder = [
                      'report', 'ai_structuring', 'government_verification', 
                      'matching', 'feasibility', 'proposal', 
                      'prototype_testing', 'pilot', 'impact_measurement'
                    ];
                    const currentIndex = stagesOrder.indexOf(searchedProblem.stage);
                    const isPassed = currentIndex >= i;
                    const isCurrent = currentIndex === i;

                    return (
                      <div 
                        key={st.key}
                        className={`p-2 rounded-xl border flex flex-col items-center justify-between ${
                          isCurrent
                            ? 'bg-[#1B4332] text-white border-[#1B4332] font-bold ring-2 ring-[#C08A2E]'
                            : isPassed
                            ? 'bg-[#E9F3ED] text-[#1B4332] border-[#C6DDD1] font-medium'
                            : 'bg-gray-50 text-gray-400 border-gray-200'
                        }`}
                      >
                        <span className="text-xs mb-1">
                          {isPassed ? '✓' : i + 1}
                        </span>
                        <span className="leading-tight">{st.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Lifecycle Stage Details Card */}
              <div className="p-4 rounded-xl bg-white border border-[#D6E3DC] space-y-2 text-xs">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  Current Execution State
                </span>
                {searchedProblem.assignedTeam && (
                  <p>
                    <strong>Assigned University Team:</strong> {searchedProblem.assignedTeam.teamName} ({searchedProblem.assignedTeam.institution}) • Lead: {searchedProblem.assignedTeam.leadStudent}
                  </p>
                )}
                {searchedProblem.facultyMentor && (
                  <p>
                    <strong>Faculty Mentor:</strong> {searchedProblem.facultyMentor.name} ({searchedProblem.facultyMentor.institution})
                  </p>
                )}
                {searchedProblem.industrySponsor && (
                  <p>
                    <strong>CSR Corporate Partner:</strong> {searchedProblem.industrySponsor.companyName} (Committed: ₹{(searchedProblem.industrySponsor.committedFundsINR / 100000).toFixed(1)} Lakhs)
                  </p>
                )}
                {searchedProblem.pilotStatus && (
                  <div className="mt-2 p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-900">
                    <p className="font-semibold">Live Pilot Deployment in Field:</p>
                    <p className="text-[11px] mt-0.5">Site: {searchedProblem.pilotStatus.siteName} • Beneficiaries: {searchedProblem.pilotStatus.beneficiariesReached}</p>
                    <p className="text-[11px] mt-0.5">{searchedProblem.pilotStatus.activeMetrics}</p>
                  </div>
                )}
              </div>

              {/* Citizen Feedback Loop Closure (Stage 8 or 9 or whenever citizen wants to provide validation) */}
              <div className="p-5 rounded-2xl bg-[#FDF8EE] border border-[#C08A2E]/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-[#C08A2E]" />
                    <h5 className="font-serif font-bold text-sm text-[#14261C]">
                      Citizen Feedback & Validation Loop (नागरिक प्रतिक्रिया)
                    </h5>
                  </div>
                  <span className="text-[10px] text-[#8E6116] font-semibold uppercase">
                    Stage 9 Requirement
                  </span>
                </div>
                <p className="text-xs text-gray-600">
                  Has the university prototype or government intervention resolved the issue in your village? Your review is recorded in public state impact logs.
                </p>

                {searchedProblem.citizenFeedback ? (
                  <div className="p-3 bg-white rounded-xl border border-[#C08A2E]/40 text-xs space-y-1">
                    <div className="flex items-center gap-1 text-[#C08A2E]">
                      {[...Array(searchedProblem.citizenFeedback.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                      <span className="text-gray-500 text-[11px] ml-1">
                        Logged on {searchedProblem.citizenFeedback.feedbackDate}
                      </span>
                    </div>
                    <p className="italic text-gray-700">"{searchedProblem.citizenFeedback.comment}"</p>
                    <p className="text-emerald-700 font-medium text-[11px] pt-1">
                      ✓ Citizen verified: Grievance loop satisfactorily closed.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSendFeedback} className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-gray-700">Your Rating:</span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setFeedbackRating(star)}
                            className="p-1 text-gray-300 hover:text-[#C08A2E] cursor-pointer"
                          >
                            <Star className={`w-5 h-5 ${star <= feedbackRating ? 'text-[#C08A2E] fill-current' : ''}`} />
                          </button>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 font-medium">({feedbackRating} / 5 Stars)</span>
                    </div>

                    <textarea
                      rows={2}
                      required
                      placeholder="Share your feedback on the solution deployed in your block (e.g. water quality improved, bridge open)..."
                      value={feedbackComment}
                      onChange={(e) => setFeedbackComment(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#1B4332] bg-white"
                    />

                    {feedbackSuccess && (
                      <p className="text-xs text-emerald-700 font-medium">
                        ✓ Thank you! Your feedback has been recorded and closes the civic loop.
                      </p>
                    )}

                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#1B4332] text-white text-xs font-medium rounded-xl hover:bg-[#143427] cursor-pointer shadow-xs"
                    >
                      Submit Citizen Validation
                    </button>
                  </form>
                )}
              </div>
            </div>
          ) : (
            <div className="p-8 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200 text-gray-500 text-xs">
              <p>No problem found matching the tracking code.</p>
              <p className="mt-1 text-[11px]">Please verify your code or report a new issue above.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
