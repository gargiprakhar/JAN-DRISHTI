import { ProblemReport, UserProfile } from '../types';

export const JHARKHAND_DISTRICTS = [
  'Ranchi',
  'Dhanbad',
  'East Singhbhum',
  'Bokaro',
  'Hazaribagh',
  'Dumka',
  'Deoghar',
  'Khunti',
  'West Singhbhum',
  'Palamu',
  'Giridih',
  'Ramgarh',
  'Gumla',
  'Simdega',
  'Latehar',
  'Garhwa',
  'Chatra',
  'Koderma',
  'Jamtara',
  'Godda',
  'Sahibganj',
  'Pakur',
  'Saraikela Kharsawan',
  'Lohardaga'
];

export const INITIAL_PROBLEMS: ProblemReport[] = [
  {
    id: 'pr-001',
    trackingCode: 'JD-JH-2026-1042',
    title: 'Fluoride & Iron Contamination in Tribal Drinking Borewells',
    rawDescription: 'Hamare gaon Torpa me handpump ka paani laal aur peela nikalta hai. Bachon ke daant aur haddiyan tedhi ho rahi hain. Filters kharab pade hain koi theek nahi karta.',
    structuredDescription: 'High incidence of endemic fluorosis and ferrous sedimentation (>3.2 mg/L) detected in 14 community borewells across Torpa block. Affecting approximately 2,400 tribal residents with progressive dental and skeletal morbidity.',
    domain: 'Water & Sanitation',
    stage: 'prototype_testing',
    verificationStatus: 'verified',
    verifiedBy: 'Er. R. K. Singh, Superintending Engineer, PHED Ranchi',
    verificationNotes: 'Groundwater laboratory sample confirms fluoride level 3.4 mg/L against permissible limit of 1.0 mg/L. Fast-track university prototype required.',
    urgency: 'critical',
    citizenName: 'Somra Munda',
    citizenContact: '+91 94*** **219',
    createdAt: '2026-03-02T09:30:00Z',
    updatedAt: '2026-03-18T14:20:00Z',
    location: {
      latitude: 22.9556,
      longitude: 85.1214,
      district: 'Khunti',
      block: 'Torpa',
      villagePanchayat: 'Dormo Gram Panchayat',
      address: 'Near Torpa Weekly Haat, Khunti District',
      postgisGeom: 'SRID=4326;POINT(85.1214 22.9556)'
    },
    media: [
      {
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=800&q=80',
        caption: 'Turbid iron-rich water from communal handpump',
        faceSafeguard: {
          facesDetected: 2,
          appliedBlur: true,
          privacyConfidence: 99.8,
          processedImageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=800&q=80',
          originalMaskCoordinates: [{ x: 120, y: 80, width: 90, height: 110 }]
        }
      }
    ],
    aiMetadata: {
      classifiedDomain: 'Water & Sanitation',
      domainConfidence: 97.4,
      duplicateCheck: {
        isDuplicate: false,
        similarityScore: 0.18
      },
      existingSolutionCheck: {
        found: true,
        solutionTitle: 'Activated Alumina & Terracotta Composite Filtration (NEERI / CSIR)',
        sourceOrg: 'CSIR National Environmental Engineering Research Institute',
        readinessLevel: 'TRL-6',
        whyAdaptationNeeded: 'Requires localized regeneration medium using native Jharkhand laterite clay for zero-chemical operating costs.'
      },
      feasibilityScores: {
        technical: { score: 9.1, rationale: 'Adsorbent technology is proven; laterite clay activation tested at BIT Mesra Chemical Dept.' },
        financial: { score: 8.5, rationale: 'Low CAPEX estimated at ₹42,000 per community well with CSR subsidy.' },
        infrastructure: { score: 7.8, rationale: 'Requires gravity-feed gravity standpipes without dependent electric grid.' },
        sustainability: { score: 8.9, rationale: 'Zero toxic backwash; spent laterite can be safely stabilized in building bricks.' },
        deployment: { score: 8.4, rationale: 'Panchayat water committees (Jal Sahiya) trained to backwash filters monthly.' },
        scalability: { score: 9.3, rationale: 'Replicable across 410 contaminated habitations in Khunti, Simdega, and Palamu.' },
        overallScore: 8.7,
        assessmentSummary: 'High-impact civic solution with mature technical basis, requiring only regional mineral tailoring and village self-management.'
      },
      matchRecommendation: {
        university: 'Birla Institute of Technology (BIT) Mesra',
        department: 'Department of Chemical Engineering & Environmental Science',
        facultyMentor: 'Prof. (Dr.) Anandita Sen',
        relevanceScore: 94,
        matchingRationale: 'Patented work on porous lateritic ceramic filter candles with high fluoride sorption affinity.',
        potentialIndustryPartners: ['Tata Steel Rural Development Society (TSRDS)', 'Vedanta CSR'],
        suggestedStudentDisciplines: ['Chemical Engineering', 'Material Science', 'Rural Development (XISS)']
      },
      embeddingVectorSnippet: [0.082, -0.412, 0.651, -0.198, 0.334, 0.521, -0.045, 0.771]
    },
    assignedTeam: {
      teamName: 'JalShuddhi Innovators',
      leadStudent: 'Ankit Raj (B.Tech Chem)',
      members: ['Pooja Soren (M.Sc Env)', 'Nikhil Agarwal (B.Tech Civil)', 'Kalyani Roy (XISS Rural Mgmt)'],
      institution: 'BIT Mesra'
    },
    facultyMentor: {
      name: 'Prof. (Dr.) Anandita Sen',
      institution: 'BIT Mesra, Ranchi',
      email: 'asen@bitmesra.ac.in'
    },
    proposal: {
      id: 'prop-001',
      title: 'Decentralized Laterite-Clay Fluoride Remediation Unit for Torpa',
      abstract: 'Deployment of gravity-driven laterite composite column filters with regeneration kits handled by Gram Panchayat Jal Sahiyas.',
      budgetINR: 385000,
      timelineMonths: 4,
      status: 'approved',
      submittedAt: '2026-03-10T11:00:00Z'
    },
    prototypeUpdates: [
      {
        version: 'v1.2 Pilot Pod',
        testDate: '2026-03-16',
        metrics: 'Fluoride lowered from 3.4 mg/L to 0.45 mg/L; Flow rate: 85 L/hr continuous gravity flow.',
        status: 'field_tested'
      }
    ],
    industrySponsor: {
      companyName: 'Tata Steel CSR Foundation',
      committedFundsINR: 500000,
      mentorshipLead: 'Dr. Sanjay Mukherjee, Head Water Initiatives',
      status: 'disbursed'
    }
  },
  {
    id: 'pr-002',
    trackingCode: 'JD-JH-2026-0911',
    title: 'Acid Mine Drainage Runoff Poisoning Damodar Tributary',
    rawDescription: 'Purana coal quarry se peela tezaabi paani river me jaa raha hai. Machhliyan mar gayi hain aur kheto ki mitti banjar ho rahi hai.',
    structuredDescription: 'Severe acid mine drainage (pH 2.8 to 3.2) discharge into tributary of Damodar river from abandoned open-cast overburden dumps in Katras sector, leaching heavy metals (sulfate > 1800 mg/L, iron precipitates).',
    domain: 'Mining Environment & Soil',
    stage: 'feasibility',
    verificationStatus: 'verified',
    verifiedBy: 'Smt. Anjali Murmu, District Environmental Officer, JSPCB Dhanbad',
    verificationNotes: 'Site inspection validated. pH at discharge point recorded 2.9. Immediate bioremediation wetlands proposal needed.',
    urgency: 'high',
    citizenName: 'Rameshwar Mahato',
    citizenContact: '+91 97*** **814',
    createdAt: '2026-02-28T14:15:00Z',
    updatedAt: '2026-03-15T10:00:00Z',
    location: {
      latitude: 23.8112,
      longitude: 86.2941,
      district: 'Dhanbad',
      block: 'Baghmara',
      villagePanchayat: 'Katras Colliery Fringe',
      address: 'South of Katras Bazar, Baghmara Block, Dhanbad',
      postgisGeom: 'SRID=4326;POINT(86.2941 23.8112)'
    },
    media: [
      {
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&w=800&q=80',
        caption: 'Ochre iron precipitate crust along stream bank',
        faceSafeguard: {
          facesDetected: 1,
          appliedBlur: true,
          privacyConfidence: 99.4,
          processedImageUrl: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&w=800&q=80'
        }
      }
    ],
    aiMetadata: {
      classifiedDomain: 'Mining Environment & Soil',
      domainConfidence: 98.2,
      duplicateCheck: {
        isDuplicate: false,
        similarityScore: 0.12
      },
      existingSolutionCheck: {
        found: true,
        solutionTitle: 'Passive Limestone Anaerobic Constructed Wetlands for AMD',
        sourceOrg: 'Central Institute of Mining and Fuel Research (CSIR-CIMFR)',
        readinessLevel: 'TRL-7',
        whyAdaptationNeeded: 'Requires modular prefabricated cascading limestone channels tailored for monsoon heavy inundation.'
      },
      feasibilityScores: {
        technical: { score: 8.8, rationale: 'CIMFR Dhanbad and IIT (ISM) Dhanbad possess extensive field pilots in Jharia coalfields.' },
        financial: { score: 8.2, rationale: 'Eligible for Coal India Mine Closure Funds and District Mineral Foundation (DMFT).' },
        infrastructure: { score: 7.9, rationale: 'Gravity feed channel requires terraced earth grading on overburden slope.' },
        sustainability: { score: 9.0, rationale: 'Biological reed-bed (Typha latifolia) self-regenerates with minimal operating cost.' },
        deployment: { score: 7.5, rationale: 'Requires inter-agency clearance between BCCL, Forest Department, and Panchayat.' },
        scalability: { score: 9.4, rationale: 'Applicable to 120+ unclosed legacy quarry voids across Dhanbad, Bokaro, and Ramgarh.' },
        overallScore: 8.5,
        assessmentSummary: 'High priority environmental rehabilitation project with readily available regional expertise at IIT (ISM).'
      },
      matchRecommendation: {
        university: 'Indian Institute of Technology (ISM) Dhanbad',
        department: 'Department of Environmental Science & Engineering',
        facultyMentor: 'Prof. Alok Sinha',
        relevanceScore: 98,
        matchingRationale: 'Statewide authority on Jharia coalfield AMD treatment and eco-restoration of coal overburden dumps.',
        potentialIndustryPartners: ['Bharat Coking Coal Limited (BCCL)', 'Tata Steel Mining'],
        suggestedStudentDisciplines: ['Environmental Engineering', 'Mining Engineering', 'Biotechnology']
      },
      embeddingVectorSnippet: [0.312, 0.154, -0.421, 0.812, 0.109, -0.328, 0.612, 0.042]
    }
  },
  {
    id: 'pr-003',
    trackingCode: 'JD-JH-2026-0789',
    title: 'Lack of Solar Cold Chain for Mahua Flower & Lac Forest Produce',
    rawDescription: 'Humare Chaibasa forest samuh me mahua aur lac ka fasal bekaar ho jata hai storage nahi hone se. Bichauliye 1/4 daam me khareedte hain.',
    structuredDescription: 'Absence of humidity-controlled decentralized pre-cooling facilities causing 40% post-harvest degradation of non-timber forest products (Mahua blossoms & Kusmi lac) in Saranda tribal belt.',
    domain: 'Agro-processing & Forestry',
    stage: 'pilot',
    verificationStatus: 'verified',
    verifiedBy: 'Shri Manoj Hembrom, Divisional Forest Officer, Chaibasa',
    verificationNotes: 'Verified at Manoharpur Tribal cooperative. High economic loss to SHG members documented.',
    urgency: 'medium',
    citizenName: 'Sukanti Gope',
    citizenContact: '+91 93*** **511',
    createdAt: '2026-01-15T11:00:00Z',
    updatedAt: '2026-03-12T16:45:00Z',
    location: {
      latitude: 22.5621,
      longitude: 85.8012,
      district: 'West Singhbhum',
      block: 'Manoharpur',
      villagePanchayat: 'Anandpur Gram Panchayat',
      address: 'Saranda Forest Fringe, Manoharpur Block',
      postgisGeom: 'SRID=4326;POINT(85.8012 22.5621)'
    },
    media: [
      {
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80',
        caption: 'Traditional open sun-drying of forest blossoms subject to mold',
        faceSafeguard: {
          facesDetected: 3,
          appliedBlur: true,
          privacyConfidence: 99.9,
          processedImageUrl: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80'
        }
      }
    ],
    aiMetadata: {
      classifiedDomain: 'Agro-processing & Forestry',
      domainConfidence: 96.1,
      duplicateCheck: {
        isDuplicate: false,
        similarityScore: 0.08
      },
      existingSolutionCheck: {
        found: true,
        solutionTitle: 'Solar Hybrid Biomass Micro-Cold Vault',
        sourceOrg: 'Birsa Agricultural University (BAU) Ranchi',
        readinessLevel: 'TRL-8',
        whyAdaptationNeeded: 'Needs off-grid IoT telemetry for cooperative SHG digital weighment and inventory accounting.'
      },
      feasibilityScores: {
        technical: { score: 9.3, rationale: 'Phase-change material thermal storage operates reliably with zero battery maintenance.' },
        financial: { score: 8.7, rationale: 'TRIFED and Tribal Welfare Dept subsidy covers 75% of setup costs.' },
        infrastructure: { score: 8.0, rationale: 'Fits within standard village community shed footprint with roof solar panels.' },
        sustainability: { score: 9.5, rationale: 'Doubles seasonal farmer income from ₹14,000 to ₹31,000 per SHG family.' },
        deployment: { score: 8.6, rationale: 'Operated and maintained directly by women SHG Federation (Jharkhand JSLPS).' },
        scalability: { score: 9.2, rationale: 'Applicable across 14 tribal districts with active NTFP collection.' },
        overallScore: 8.9,
        assessmentSummary: 'Outstanding socio-economic uplift project empowering tribal women forest gatherers with zero carbon cold chain.'
      },
      matchRecommendation: {
        university: 'Birsa Agricultural University (BAU)',
        department: 'College of Agricultural Engineering',
        facultyMentor: 'Dr. D. K. Shrivastava',
        relevanceScore: 96,
        matchingRationale: 'Lead institution for post-harvest engineering in Jharkhand tribal agriculture.',
        potentialIndustryPartners: ['ITC Tribal Agribusiness', 'TRIFED', 'Jindal Foundation'],
        suggestedStudentDisciplines: ['Agricultural Engineering', 'Electrical/Solar Tech', 'Rural Entrepreneurship']
      },
      embeddingVectorSnippet: [-0.112, 0.442, 0.089, -0.612, 0.231, 0.514, -0.218, 0.392]
    },
    assignedTeam: {
      teamName: 'Vanya Cold Innovations',
      leadStudent: 'Deepak Tudu',
      members: ['Ragini Kumari', 'Amit Hansda', 'Sneha Minz'],
      institution: 'NIT Jamshedpur & BAU Ranchi'
    },
    pilotStatus: {
      siteName: 'Anandpur Forest Produce Cooperative Shed #2',
      beneficiariesReached: 380,
      deploymentDate: '2026-02-10',
      activeMetrics: 'Internal temp maintained at 8°C-12°C; spoilage reduced from 42% to 3.8% over 35 days.'
    },
    industrySponsor: {
      companyName: 'Jindal Steel & Power CSR',
      committedFundsINR: 750000,
      mentorshipLead: 'Er. Sandeep Verma',
      status: 'in_progress'
    }
  },
  {
    id: 'pr-004',
    trackingCode: 'JD-JH-2026-1120',
    title: 'Flash Flood Washout of Bamboo Culvert on Tenughat Feeder Road',
    rawDescription: 'Barsaat me lakdi aur baans ka temporary pul toot gaya hai. 6 gaon ke school bachhe aur mareez block hospital nahi jaa pa rahe hain.',
    structuredDescription: 'Seasonal monsoon spate washed out critical 18-meter culvert spanning stream tributary on rural connector road between Gomia and Nawadih, isolating 6 revenue villages (population ~4,800) from primary health sub-centre.',
    domain: 'Rural Roads & Infrastructure',
    stage: 'government_verification',
    verificationStatus: 'pending',
    urgency: 'critical',
    citizenName: 'Babulal Soren',
    citizenContact: '+91 91*** **902',
    createdAt: '2026-03-18T08:20:00Z',
    updatedAt: '2026-03-18T10:15:00Z',
    location: {
      latitude: 23.7842,
      longitude: 85.8741,
      district: 'Bokaro',
      block: 'Gomia',
      villagePanchayat: 'Saran Gram Panchayat',
      address: 'Kilometer 4, Gomia-Nawadih Rural Link, Bokaro',
      postgisGeom: 'SRID=4326;POINT(85.8741 23.7842)'
    },
    media: [
      {
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
        caption: 'Severed approach embankment and breached drainage causeway',
        faceSafeguard: {
          facesDetected: 0,
          appliedBlur: false,
          privacyConfidence: 100,
          processedImageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80'
        }
      }
    ],
    aiMetadata: {
      classifiedDomain: 'Rural Roads & Infrastructure',
      domainConfidence: 98.9,
      duplicateCheck: {
        isDuplicate: false,
        similarityScore: 0.14
      },
      existingSolutionCheck: {
        found: true,
        solutionTitle: 'Modular Precast Geo-Composite Arch Culvert (CRRI Guidelines)',
        sourceOrg: 'CSIR-Central Road Research Institute',
        readinessLevel: 'TRL-9',
        whyAdaptationNeeded: 'Prefabricated modular sections that can be hauled on light tractors and installed in under 72 hours without ready-mix trucks.'
      },
      feasibilityScores: {
        technical: { score: 9.4, rationale: 'Standard precast reinforced concrete modular boxes with gabion scour aprons.' },
        financial: { score: 8.9, rationale: 'Can be sanctioned under PMGSY emergency repair or DMFT Bokaro fund.' },
        infrastructure: { score: 8.1, rationale: 'Requires basic backhoe and village shramdaan for approach revetment.' },
        sustainability: { score: 9.0, rationale: '50-year hydraulic design with boulder riprap prevents recurrent scouring.' },
        deployment: { score: 9.2, rationale: 'NIT Jamshedpur Structural Dept can certify standard drawings in 48 hours.' },
        scalability: { score: 9.5, rationale: 'Standard solution for 800+ vulnerable flash-flood causeways in Chota Nagpur plateau.' },
        overallScore: 9.0,
        assessmentSummary: 'Urgent humanitarian and connectivity imperative with high engineering certainty and rapid precast deployment.'
      },
      matchRecommendation: {
        university: 'National Institute of Technology (NIT) Jamshedpur',
        department: 'Department of Civil Engineering (Structural & Highway Div)',
        facultyMentor: 'Prof. S. B. Prasad',
        relevanceScore: 95,
        matchingRationale: 'Pioneered low-cost rural precast culvert rapid deployment manuals for Jharkhand PWD.',
        potentialIndustryPartners: ['Tata Steel Long Products', 'JSW Cement'],
        suggestedStudentDisciplines: ['Civil Engineering', 'Transportation Planning', 'Disaster Management']
      },
      embeddingVectorSnippet: [0.551, -0.092, 0.281, 0.742, -0.312, 0.198, 0.441, -0.128]
    }
  },
  {
    id: 'pr-005',
    trackingCode: 'JD-JH-2026-0650',
    title: 'Telemedicine Diagnostics Gap in Parasnath Foothills Primary Health Centre',
    rawDescription: 'Hamare Madhuban hospital me doctor mahine me 2 din aate hain. ECG aur blood test ki machine dhool kha rahi hai kyunki operator nahi hai.',
    structuredDescription: 'Unmanned automated testing equipment and lack of tele-cardiology link at Madhuban PHC leading to critical delays in maternal pre-eclampsia screening and cardiac triage for tribal pilgrims and locals.',
    domain: 'Healthcare & Telemedicine',
    stage: 'impact_measurement',
    verificationStatus: 'verified',
    verifiedBy: 'Dr. S. P. Gupta, Civil Surgeon, Giridih',
    urgency: 'high',
    citizenName: 'Kavita Marandi',
    citizenContact: '+91 96*** **331',
    createdAt: '2025-11-20T10:00:00Z',
    updatedAt: '2026-03-10T12:00:00Z',
    location: {
      latitude: 23.9621,
      longitude: 86.1345,
      district: 'Giridih',
      block: 'Pirtand',
      villagePanchayat: 'Madhuban Panchayat',
      address: 'Foot of Shikharji / Parasnath Hills, Giridih',
      postgisGeom: 'SRID=4326;POINT(86.1345 23.9621)'
    },
    media: [
      {
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
        caption: 'Uncalibrated diagnostics kiosk at rural primary health centre',
        faceSafeguard: {
          facesDetected: 1,
          appliedBlur: true,
          privacyConfidence: 99.7,
          processedImageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80'
        }
      }
    ],
    aiMetadata: {
      classifiedDomain: 'Healthcare & Telemedicine',
      domainConfidence: 97.8,
      duplicateCheck: { isDuplicate: false, similarityScore: 0.11 },
      existingSolutionCheck: {
        found: true,
        solutionTitle: 'AI-Assisted Point-of-Care Diagnostic Tablet (e-Sanjeevani Integrated)',
        sourceOrg: 'AIIMS Deoghar / CDAC Mohali',
        readinessLevel: 'TRL-9',
        whyAdaptationNeeded: 'Equipped with Santhali & Khortha voice guidance for local ASHA workers.'
      },
      feasibilityScores: {
        technical: { score: 9.6, rationale: 'Cloud telemetry with AIIMS Deoghar tele-specialist pool already mapped.' },
        financial: { score: 9.1, rationale: 'National Health Mission innovation fund provides 100% operational budget.' },
        infrastructure: { score: 8.3, rationale: 'Runs on 4G solar tablet with satellite backup fallback.' },
        sustainability: { score: 9.2, rationale: 'Trained 18 Sahiya workers with verified digital diagnostic certification.' },
        deployment: { score: 9.4, rationale: 'Active in 4 sub-centres with 100% attendance.' },
        scalability: { score: 9.7, rationale: 'Can scale to all 2,800 Ayushman Arogya Mandirs across Jharkhand.' },
        overallScore: 9.2,
        assessmentSummary: 'Exemplary project transitioning into statewide public health policy adoption.'
      },
      matchRecommendation: {
        university: 'AIIMS Deoghar & BIT Sindri (Biomedical Div)',
        department: 'Department of Community Medicine & Electronics',
        facultyMentor: 'Dr. Vivek Ranjan',
        relevanceScore: 97,
        matchingRationale: 'Active tele-consultation hub running daily OPD referrals for Santhal Pargana.',
        potentialIndustryPartners: ['Tata Medical Center CSR', 'Wipro GE Healthcare'],
        suggestedStudentDisciplines: ['Electronics/IoT', 'Biomedical Tech', 'Public Health']
      },
      embeddingVectorSnippet: [0.124, 0.381, -0.512, 0.219, 0.612, -0.198, 0.245, 0.491]
    },
    assignedTeam: {
      teamName: 'Aarogya Drishti Tele-Care',
      leadStudent: 'Simran Singh (M.Tech IoT)',
      members: ['Rahul Besra (MBBS Intern)', 'Aditi Sinha (Data Science)', 'Pradeep Kumar (Hardware)'],
      institution: 'AIIMS Deoghar & BIT Sindri'
    },
    pilotStatus: {
      siteName: 'Madhuban & Pirtand Ayushman Mandir Subcentres',
      beneficiariesReached: 1840,
      deploymentDate: '2025-12-05',
      activeMetrics: '1,840 patient tele-consultations; 42 acute STEMI heart attacks intercepted and airlifted/ambulance referred in time.'
    },
    citizenFeedback: {
      rating: 5,
      comment: 'Meri mausi ka blood pressure aur ECG turant Deoghar AIIMS ke doctor ne dekhkar dawai di. Ab Ranchi nahi bhagna pada.',
      feedbackDate: '2026-03-08',
      resolvedSatisfactorily: true
    }
  }
];

export const MOCK_USERS: Record<string, UserProfile> = {
  'citizen-1': {
    id: 'u-cit-101',
    name: 'Somra Munda',
    role: 'citizen',
    emailOrPhone: '+91 94311 88219',
    district: 'Khunti',
    verifiedStatus: true
  },
  'student-1': {
    id: 'u-stu-201',
    name: 'Ankit Raj',
    role: 'student',
    emailOrPhone: 'ankit.raj@bitmesra.ac.in',
    institutionOrOrg: 'Birla Institute of Technology (BIT) Mesra',
    designation: 'Final Year B.Tech Chemical Engineering',
    expertiseTags: ['Water Purification', 'Material Synthesis', 'Nanotech Filters'],
    verifiedStatus: true
  },
  'faculty-1': {
    id: 'u-fac-301',
    name: 'Prof. (Dr.) Anandita Sen',
    role: 'faculty',
    emailOrPhone: 'asen@bitmesra.ac.in',
    institutionOrOrg: 'BIT Mesra',
    designation: 'Head, Dept of Chemical & Environmental Engineering',
    expertiseTags: ['Lateritic Sorption', 'Heavy Metal Remediation', 'Tribal Hydrology'],
    verifiedStatus: true
  },
  'industry-1': {
    id: 'u-ind-401',
    name: 'Dr. Sanjay Mukherjee',
    role: 'industry',
    emailOrPhone: 'sanjay.m@tatasteel.com',
    institutionOrOrg: 'Tata Steel Rural Development Society (TSRDS)',
    designation: 'Head — Water Security & Environmental CSR',
    district: 'East Singhbhum',
    verifiedStatus: true
  },
  'government-1': {
    id: 'u-gov-501',
    name: 'Er. R. K. Singh',
    role: 'government',
    emailOrPhone: 'rk.singh.phed@jharkhand.gov.in',
    institutionOrOrg: 'Drinking Water & Sanitation Dept, Govt of Jharkhand',
    designation: 'Superintending Engineer & State Nodal Officer',
    district: 'Ranchi',
    verifiedStatus: true
  },
  'admin-1': {
    id: 'u-adm-601',
    name: 'Chief Systems Administrator',
    role: 'admin',
    emailOrPhone: 'admin@jandrishti.jharkhand.gov.in',
    institutionOrOrg: 'Jharkhand Agency for Promotion of Information Technology (JAP-IT)',
    designation: 'Director of Infrastructure & PostGIS Operations',
    verifiedStatus: true
  }
};

export const MOCK_PROBLEMS: ProblemReport[] = INITIAL_PROBLEMS;
export const MOCK_USERS_ARRAY: UserProfile[] = Object.values(MOCK_USERS);
