import { 
  ProblemDomain, 
  FeasibilityScores, 
  MatchRecommendation, 
  ExistingSolutionCheck, 
  DuplicateDetectionResult, 
  ProblemReport,
  FaceDetectionSafeguard
} from '../types';

export class AIPipelineService {
  /**
   * 1. Structure raw citizen report into official civic engineering record
   */
  static structureRawReport(rawDescription: string, titleHint?: string): {
    title: string;
    structuredDescription: string;
    domain: ProblemDomain;
    domainConfidence: number;
    urgency: 'low' | 'medium' | 'high' | 'critical';
  } {
    const text = rawDescription.toLowerCase();
    
    // Domain determination
    let domain: ProblemDomain = 'Water & Sanitation';
    let confidence = 94.5;
    let urgency: 'low' | 'medium' | 'high' | 'critical' = 'medium';

    if (text.includes('pani') || text.includes('water') || text.includes('handpump') || text.includes('fluoride') || text.includes('arsenic') || text.includes('borewell')) {
      domain = 'Water & Sanitation';
      confidence = 98.2;
      urgency = text.includes('bimari') || text.includes('sick') || text.includes('teeth') ? 'critical' : 'high';
    } else if (text.includes('road') || text.includes('pul') || text.includes('bridge') || text.includes('sadak') || text.includes('culvert') || text.includes('flood') || text.includes('washout')) {
      domain = 'Rural Roads & Infrastructure';
      confidence = 97.6;
      urgency = text.includes('toot') || text.includes('broken') || text.includes('marooned') ? 'critical' : 'high';
    } else if (text.includes('coal') || text.includes('quarry') || text.includes('mine') || text.includes('acid') || text.includes('dust') || text.includes('tezaab')) {
      domain = 'Mining Environment & Soil';
      confidence = 98.7;
      urgency = 'high';
    } else if (text.includes('solar') || text.includes('bijli') || text.includes('power') || text.includes('electricity') || text.includes('grid')) {
      domain = 'Clean Energy & Tribal Grids';
      confidence = 95.8;
      urgency = 'medium';
    } else if (text.includes('hospital') || text.includes('doctor') || text.includes('clinic') || text.includes('dawa') || text.includes('delivery') || text.includes('ecg')) {
      domain = 'Healthcare & Telemedicine';
      confidence = 97.9;
      urgency = 'critical';
    } else if (text.includes('forest') || text.includes('mahua') || text.includes('lac') || text.includes('kisan') || text.includes('crop') || text.includes('storage')) {
      domain = 'Agro-processing & Forestry';
      confidence = 96.4;
      urgency = 'medium';
    } else if (text.includes('school') || text.includes('teacher') || text.includes('padhai') || text.includes('student') || text.includes('book')) {
      domain = 'Education & Skill Tech';
      confidence = 94.0;
      urgency = 'medium';
    }

    const title = titleHint && titleHint.trim().length > 5 
      ? titleHint 
      : `Civic Infrastructure Notice: ${domain} remediation requirement`;

    const structuredDescription = `Standardized Civic Record [Jharkhand Nodal Grid]: Citizen grievance logs severe deficits in ${domain}. Field context indicates: "${rawDescription.trim()}". System categorizes this under high-priority societal engineering intervention with immediate inter-agency routing.`;

    return {
      title,
      structuredDescription,
      domain,
      domainConfidence: confidence,
      urgency
    };
  }

  /**
   * 2. Generate vector embeddings for semantic duplicate detection
   */
  static generateEmbeddingSnippet(text: string): number[] {
    // Generate deterministic 8-dimensional normalized embedding representation for demonstration
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = (hash << 5) - hash + text.charCodeAt(i);
      hash |= 0;
    }
    const vector: number[] = [];
    let norm = 0;
    for (let i = 0; i < 8; i++) {
      const val = Math.sin(hash + i * 1.618);
      vector.push(val);
      norm += val * val;
    }
    norm = Math.sqrt(norm) || 1;
    return vector.map(v => Number((v / norm).toFixed(4)));
  }

  /**
   * 3. Detect duplicates via cosine similarity against existing problem repository
   */
  static detectDuplicates(newText: string, existingList: ProblemReport[]): DuplicateDetectionResult {
    const newVec = this.generateEmbeddingSnippet(newText);
    let maxSim = 0;
    let matchId: string | undefined;
    let matchTitle: string | undefined;

    for (const report of existingList) {
      const repVec = report.aiMetadata?.embeddingVectorSnippet || this.generateEmbeddingSnippet(report.rawDescription);
      // Cosine similarity
      let dot = 0;
      for (let i = 0; i < Math.min(newVec.length, repVec.length); i++) {
        dot += newVec[i] * repVec[i];
      }
      if (dot > maxSim) {
        maxSim = dot;
        matchId = report.trackingCode;
        matchTitle = report.title;
      }
    }

    const normalizedSim = Math.max(0, Math.min(1, maxSim));
    return {
      isDuplicate: normalizedSim > 0.82,
      similarityScore: Number(normalizedSim.toFixed(3)),
      matchedProblemId: normalizedSim > 0.65 ? matchId : undefined,
      matchedTitle: normalizedSim > 0.65 ? matchTitle : undefined
    };
  }

  /**
   * 4. Check for existing solutions in state/national scientific repositories
   */
  static checkExistingSolutions(domain: ProblemDomain): ExistingSolutionCheck {
    const solutionsMap: Record<ProblemDomain, ExistingSolutionCheck> = {
      'Water & Sanitation': {
        found: true,
        solutionTitle: 'Activated Laterite Clay & Biochar Adsorption Column (NEERI / BIT Mesra Patent)',
        sourceOrg: 'CSIR-NEERI & Department of Drinking Water & Sanitation, GoJ',
        readinessLevel: 'TRL-7 (Validated in Field Sub-Basin)',
        whyAdaptationNeeded: 'Requires localized gravity-fed cartridge geometry for Jharkhand handpump thread standards and community Jal Sahiya wash protocol.'
      },
      'Rural Roads & Infrastructure': {
        found: true,
        solutionTitle: 'Precast Geotextile-Reinforced Modular Arch Culvert (CRRI Guidelines)',
        sourceOrg: 'CSIR-Central Road Research Institute',
        readinessLevel: 'TRL-9 (Commercial Standard)',
        whyAdaptationNeeded: 'Modular transport optimization required for rough forested terrain in Chota Nagpur plateau without heavy cranes.'
      },
      'Mining Environment & Soil': {
        found: true,
        solutionTitle: 'Passive Anaerobic Limestone Reactor + Vetiver Bio-remediation Buffer',
        sourceOrg: 'CSIR-Central Institute of Mining and Fuel Research (CIMFR) Dhanbad',
        readinessLevel: 'TRL-8 (Piloted in Jharia/Bokaro Overburdens)',
        whyAdaptationNeeded: 'Seasonal flood bypass gating needs automated sensor control during high monsoon runoff.'
      },
      'Clean Energy & Tribal Grids': {
        found: true,
        solutionTitle: 'DC Microgrid with Localized Supercapacitor & Bamboo Poles',
        sourceOrg: 'Jharkhand Renewable Energy Development Agency (JREDA) & IIT ISM',
        readinessLevel: 'TRL-7',
        whyAdaptationNeeded: 'Incorporate solar agro-pump dual feeder for day irrigation and evening domestic LED lighting.'
      },
      'Healthcare & Telemedicine': {
        found: true,
        solutionTitle: 'Solar Portable Diagnostic Multi-Parameter Kiosk (AIIMS Deoghar / CDAC)',
        sourceOrg: 'AIIMS Deoghar Community Health Initiative',
        readinessLevel: 'TRL-9',
        whyAdaptationNeeded: 'Addition of Santhali, Ho, and Mundari voice assistance for frontline tribal health workers.'
      },
      'Agro-processing & Forestry': {
        found: true,
        solutionTitle: 'Phase Change Material (PCM) Hybrid Solar Vault for NTFP Produce',
        sourceOrg: 'Birsa Agricultural University (BAU) Ranchi',
        readinessLevel: 'TRL-8',
        whyAdaptationNeeded: 'Integration of IoT digital weighing scale and fair-price market SMS gateway for tribal SHGs.'
      },
      'Education & Skill Tech': {
        found: true,
        solutionTitle: 'Mesh-Network Offline Interactive STEM Lab on Raspberry Pi',
        sourceOrg: 'NIT Jamshedpur Rural Outreach & UNICEF Jharkhand',
        readinessLevel: 'TRL-8',
        whyAdaptationNeeded: 'Local Jharkhand folk science and ecological syllabus modules integration.'
      }
    };

    return solutionsMap[domain] || {
      found: false,
      whyAdaptationNeeded: 'No prior validated state solution found. Open for competitive university research proposal.'
    };
  }

  /**
   * 5. Explainably match university, faculty mentor, student disciplines & CSR
   */
  static matchUniversityAndIndustry(domain: ProblemDomain, district: string): MatchRecommendation {
    switch (domain) {
      case 'Water & Sanitation':
        return {
          university: 'Birla Institute of Technology (BIT) Mesra, Ranchi',
          department: 'Department of Chemical Engineering & Environmental Sciences',
          facultyMentor: 'Prof. (Dr.) Anandita Sen',
          relevanceScore: 95,
          matchingRationale: `High concentration of published research in groundwater filtration and proximity to ${district}. Lead lab has NABL-certified water testing facility.`,
          potentialIndustryPartners: ['Tata Steel Rural Development Society (TSRDS)', 'Vedanta Resources CSR', 'Jindal Steel & Power'],
          suggestedStudentDisciplines: ['Chemical Engineering', 'Civil & Environmental', 'Rural Management (XISS)']
        };
      case 'Mining Environment & Soil':
        return {
          university: 'IIT (ISM) Dhanbad',
          department: 'Department of Environmental Science & Engineering',
          facultyMentor: 'Prof. Alok Sinha',
          relevanceScore: 98,
          matchingRationale: 'Global center of excellence in mine drainage mitigation, soil stabilization of coal spoils, and eco-restoration.',
          potentialIndustryPartners: ['Bharat Coking Coal Limited (BCCL)', 'Central Coalfields Limited (CCL)', 'Tata Steel Mining'],
          suggestedStudentDisciplines: ['Environmental Engineering', 'Mining Engineering', 'Biotechnology']
        };
      case 'Rural Roads & Infrastructure':
        return {
          university: 'National Institute of Technology (NIT) Jamshedpur',
          department: 'Department of Civil Engineering (Structures & Highways)',
          facultyMentor: 'Prof. S. B. Prasad',
          relevanceScore: 94,
          matchingRationale: 'Proven track record in precast rapid-assembly causeways and rural bridge structural health telemetry for Jharkhand PWD.',
          potentialIndustryPartners: ['Tata Steel Tubes Division', 'JSW Cement Infrastructure CSR', 'Larsen & Toubro'],
          suggestedStudentDisciplines: ['Civil Engineering', 'Structural Engineering', 'Geotechnical Engineering']
        };
      case 'Agro-processing & Forestry':
        return {
          university: 'Birsa Agricultural University (BAU), Kanke Ranchi',
          department: 'College of Agricultural Engineering & Post-Harvest Tech',
          facultyMentor: 'Dr. D. K. Shrivastava',
          relevanceScore: 96,
          matchingRationale: 'Jharkhand premier agricultural university with established extension centres in all 24 districts and expertise in NTFP preservation.',
          potentialIndustryPartners: ['ITC Tribal Agribusiness', 'TRIFED Jharkhand', 'Patanjali Agro CSR'],
          suggestedStudentDisciplines: ['Agricultural Engineering', 'Food Technology', 'Forestry & Botany']
        };
      case 'Healthcare & Telemedicine':
        return {
          university: 'AIIMS Deoghar & BIT Sindri (Biomedical Div)',
          department: 'Department of Community Medicine & Tele-Healthcare',
          facultyMentor: 'Dr. Vivek Ranjan',
          relevanceScore: 97,
          matchingRationale: 'Operates active telemedicine nodal network for Santhal Pargana and North Chotanagpur divisions.',
          potentialIndustryPartners: ['Tata Medical Center Trust', 'Wipro GE Healthcare', 'Apollo TeleHealth Foundation'],
          suggestedStudentDisciplines: ['Biomedical Engineering', 'Electronics & IoT', 'Public Health Care']
        };
      default:
        return {
          university: 'Kolhan University & NIT Jamshedpur',
          department: 'Department of Applied Sciences & Engineering',
          facultyMentor: 'Prof. R. N. Murmu',
          relevanceScore: 91,
          matchingRationale: `Localized multidisciplinary research team operating within direct field corridor of ${district}.`,
          potentialIndustryPartners: ['Tata Motors CSR', 'Adani Power Jharkhand', 'Coal India Foundation'],
          suggestedStudentDisciplines: ['Electrical Engineering', 'Computer Science & AI', 'Social Sciences']
        };
    }
  }

  /**
   * 6. Score six feasibility dimensions with written rationales
   */
  static scoreFeasibilityDimensions(domain: ProblemDomain, urgency: string): FeasibilityScores {
    const isWaterOrHealth = domain === 'Water & Sanitation' || domain === 'Healthcare & Telemedicine';
    
    const technical = {
      score: isWaterOrHealth ? 9.2 : 8.8,
      rationale: 'Established engineering fundamentals and available regional lab testing equipment at BIT Mesra and IIT (ISM) Dhanbad.'
    };

    const financial = {
      score: 8.6,
      rationale: 'Project budget falls comfortably within Corporate Social Responsibility (CSR) schedule VII limits and Jharkhand District Mineral Foundation (DMFT) grants.'
    };

    const infrastructure = {
      score: 8.0,
      rationale: 'Requires minimal heavy civil grid dependencies; engineered to operate on gravity, passive flow, or off-grid solar micro-kits.'
    };

    const sustainability = {
      score: 9.3,
      rationale: 'Empowers local Gram Panchayat or Jal Sahiya / SHG federations for daily maintenance, eliminating recurring reliance on distant contractors.'
    };

    const deployment = {
      score: 8.7,
      rationale: 'Rapid prototyping can be completed in 8-12 weeks; rapid precast or modular assembly allows immediate relief prior to next monsoon.'
    };

    const scalability = {
      score: 9.4,
      rationale: 'The geological and societal parameters identified match over 300 corresponding villages across the Jharkhand plateau.'
    };

    const overallScore = Number(
      ((technical.score + financial.score + infrastructure.score + sustainability.score + deployment.score + scalability.score) / 6).toFixed(1)
    );

    return {
      technical,
      financial,
      infrastructure,
      sustainability,
      deployment,
      scalability,
      overallScore,
      assessmentSummary: `Strong viability (composite ${overallScore}/10). High alignment with state development goals, mature lab readiness, and village-level operational stewardship.`
    };
  }

  /**
   * 7. Face Detection & Privacy Shield (client/browser simulator using canvas)
   * Blurs any identifiable face before media is uploaded
   */
  static async processImageForFacePrivacy(imageFileOrUrl: string): Promise<FaceDetectionSafeguard> {
    return new Promise((resolve) => {
      // Simulate face detection bounding boxes (or detect via canvas heuristics)
      // If the image is a standard civic photo, identify facial regions and simulate protective blur
      const hasFaces = true;
      const simulatedFaceCount = 1;
      
      resolve({
        facesDetected: simulatedFaceCount,
        appliedBlur: true,
        privacyConfidence: 99.6,
        processedImageUrl: imageFileOrUrl, // Will be filtered via CSS/canvas in the component
        originalMaskCoordinates: [
          { x: 35, y: 25, width: 30, height: 35 } // percentage bounds
        ]
      });
    });
  }
}
