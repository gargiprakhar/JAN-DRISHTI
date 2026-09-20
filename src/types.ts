export type Role = 
  | 'citizen' 
  | 'student' 
  | 'faculty' 
  | 'industry' 
  | 'government' 
  | 'admin';

export type ProblemStage = 
  | 'report'                    // 1. Report
  | 'ai_structuring'            // 2. AI Structuring & Classification
  | 'government_verification'   // 3. Government Verification
  | 'matching'                  // 4. Matching
  | 'feasibility'               // 5. Feasibility Assessment
  | 'proposal'                  // 6. Research Proposal
  | 'prototype_testing'         // 7. Prototype & Testing
  | 'pilot'                     // 8. Pilot
  | 'impact_measurement';       // 9. Impact Measurement & Feedback

export type ProblemDomain = 
  | 'Water & Sanitation'
  | 'Rural Roads & Infrastructure'
  | 'Clean Energy & Tribal Grids'
  | 'Healthcare & Telemedicine'
  | 'Agro-processing & Forestry'
  | 'Education & Skill Tech'
  | 'Mining Environment & Soil';

export interface PostGISLocation {
  latitude: number;
  longitude: number;
  district: string;
  block: string;
  villagePanchayat?: string;
  address: string;
  postgisGeom: string; // e.g., "SRID=4326;POINT(85.3096 23.3441)"
}

export interface FeasibilityDimensionScore {
  score: number; // 1-10
  rationale: string;
}

export interface FeasibilityScores {
  technical: FeasibilityDimensionScore;
  financial: FeasibilityDimensionScore;
  infrastructure: FeasibilityDimensionScore;
  sustainability: FeasibilityDimensionScore;
  deployment: FeasibilityDimensionScore;
  scalability: FeasibilityDimensionScore;
  overallScore: number;
  assessmentSummary: string;
}

export interface MatchRecommendation {
  university: string;
  department: string;
  facultyMentor: string;
  relevanceScore: number; // 0-100%
  matchingRationale: string;
  potentialIndustryPartners: string[];
  suggestedStudentDisciplines: string[];
}

export interface ExistingSolutionCheck {
  found: boolean;
  solutionTitle?: string;
  sourceOrg?: string;
  readinessLevel?: string;
  whyAdaptationNeeded?: string;
}

export interface DuplicateDetectionResult {
  isDuplicate: boolean;
  similarityScore: number; // 0.0 - 1.0
  matchedProblemId?: string;
  matchedTitle?: string;
}

export interface FaceDetectionSafeguard {
  facesDetected: number;
  appliedBlur: boolean;
  privacyConfidence: number; // e.g., 99.4%
  processedImageUrl: string;
  originalMaskCoordinates?: Array<{ x: number; y: number; width: number; height: number }>;
}

export interface ProblemReport {
  id: string;
  trackingCode: string; // e.g., JD-JH-2026-0814
  title: string;
  rawDescription: string;
  structuredDescription: string;
  domain: ProblemDomain;
  stage: ProblemStage;
  verificationStatus: 'pending' | 'verified' | 'rejected' | 'info_requested';
  verificationNotes?: string;
  verifiedBy?: string;
  location: PostGISLocation;
  media: {
    type: 'photo' | 'video' | 'voice_memo';
    url: string;
    caption?: string;
    faceSafeguard: FaceDetectionSafeguard;
  }[];
  voiceMemoTranscript?: string;
  citizenName: string;
  citizenContact: string; // masked for privacy: +91 98*** **412
  createdAt: string;
  updatedAt: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  
  // AI Pipeline Metadata
  aiMetadata: {
    classifiedDomain: ProblemDomain;
    domainConfidence: number;
    duplicateCheck: DuplicateDetectionResult;
    existingSolutionCheck: ExistingSolutionCheck;
    feasibilityScores: FeasibilityScores;
    matchRecommendation: MatchRecommendation;
    embeddingVectorSnippet: number[];
  };

  // Lifecycle Data
  assignedTeam?: {
    teamName: string;
    leadStudent: string;
    members: string[];
    institution: string;
  };
  facultyMentor?: {
    name: string;
    institution: string;
    email: string;
  };
  proposal?: {
    id: string;
    title: string;
    abstract: string;
    budgetINR: number;
    timelineMonths: number;
    status: 'draft' | 'under_review' | 'approved' | 'funded';
    submittedAt: string;
  };
  prototypeUpdates?: {
    version: string;
    testDate: string;
    metrics: string;
    status: 'lab_bench' | 'field_tested' | 'validated';
  }[];
  industrySponsor?: {
    companyName: string;
    committedFundsINR: number;
    commitmentType?: 'csr_grant' | 'technology_transfer' | 'mentorship';
    mentorshipLead?: string;
    status?: 'offered' | 'disbursed' | 'in_progress';
    sanctionDate?: string;
  };
  pilotStatus?: {
    siteName: string;
    beneficiariesReached: number;
    deploymentDate?: string;
    activeMetrics: string;
  };
  citizenFeedback?: {
    rating: number; // 1-5
    comment: string;
    feedbackDate: string;
    resolvedSatisfactorily: boolean;
  };
}

export interface UserProfile {
  id: string;
  name: string;
  role: Role;
  emailOrPhone: string;
  institutionOrOrg?: string;
  designation?: string;
  district?: string;
  expertiseTags?: string[];
  verifiedStatus: boolean;
}
