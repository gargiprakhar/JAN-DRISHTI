import React from 'react';
import { ShieldCheck, MapPin, Database, Sparkles, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0F291E] text-[#A9C2B5] border-t border-[#1B4332] text-xs mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#C08A2E] flex items-center justify-center text-[#0F291E] font-bold text-xs">
                JD
              </div>
              <span className="font-serif text-lg font-bold text-[#F5F8F6]">Jan Drishti</span>
            </div>
            <p className="text-[12px] leading-relaxed text-[#87A294]">
              Official civic-technology engine for Jharkhand. Connecting grassroots societal grievances to premier state universities, corporate CSR, and verified administrative execution.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-[#C08A2E]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>DPDP Act 2023 Biometric Face-Blurring Safeguard Active</span>
            </div>
          </div>

          {/* 9-Stage Solution Lifecycle */}
          <div className="space-y-2 md:col-span-2">
            <h4 className="font-serif text-sm font-semibold text-[#F5F8F6] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C08A2E]" />
              <span>The Nine-Stage Civic Solution Lifecycle</span>
            </h4>
            <div className="grid grid-cols-3 gap-2 text-[11px] pt-1">
              <div className="p-2 rounded bg-[#1B4332]/40 border border-[#2D6A4F]/40">
                <span className="font-semibold text-[#E9F3ED]">1. Report</span>
                <p className="text-[10px] text-[#87A294]">Text, voice, photo + GPS</p>
              </div>
              <div className="p-2 rounded bg-[#1B4332]/40 border border-[#2D6A4F]/40">
                <span className="font-semibold text-[#E9F3ED]">2. AI Structuring</span>
                <p className="text-[10px] text-[#87A294]">Domain & duplicate vector</p>
              </div>
              <div className="p-2 rounded bg-[#1B4332]/40 border border-[#2D6A4F]/40">
                <span className="font-semibold text-[#E9F3ED]">3. Gov Verification</span>
                <p className="text-[10px] text-[#87A294]">Nodal officer approval</p>
              </div>
              <div className="p-2 rounded bg-[#1B4332]/40 border border-[#2D6A4F]/40">
                <span className="font-semibold text-[#E9F3ED]">4. Matching</span>
                <p className="text-[10px] text-[#87A294]">Univ & Industry pairing</p>
              </div>
              <div className="p-2 rounded bg-[#1B4332]/40 border border-[#2D6A4F]/40">
                <span className="font-semibold text-[#E9F3ED]">5. Feasibility</span>
                <p className="text-[10px] text-[#87A294]">6-dimension rationale score</p>
              </div>
              <div className="p-2 rounded bg-[#1B4332]/40 border border-[#2D6A4F]/40">
                <span className="font-semibold text-[#E9F3ED]">6. Proposal</span>
                <p className="text-[10px] text-[#87A294]">Multidisciplinary team plan</p>
              </div>
              <div className="p-2 rounded bg-[#1B4332]/40 border border-[#2D6A4F]/40">
                <span className="font-semibold text-[#E9F3ED]">7. Prototype</span>
                <p className="text-[10px] text-[#87A294]">Lab testing & telemetry</p>
              </div>
              <div className="p-2 rounded bg-[#1B4332]/40 border border-[#2D6A4F]/40">
                <span className="font-semibold text-[#E9F3ED]">8. Pilot</span>
                <p className="text-[10px] text-[#87A294]">Gram Panchayat field run</p>
              </div>
              <div className="p-2 rounded bg-[#1B4332]/40 border border-[#2D6A4F]/40">
                <span className="font-semibold text-[#C08A2E]">9. Impact & Feedback</span>
                <p className="text-[10px] text-[#87A294]">Citizen loop closure</p>
              </div>
            </div>
          </div>

          {/* Academic & Tech Partners */}
          <div className="space-y-2">
            <h4 className="font-serif text-sm font-semibold text-[#F5F8F6] flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-[#C08A2E]" />
              <span>Infrastructure Architecture</span>
            </h4>
            <ul className="space-y-1.5 text-[11px] text-[#87A294]">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-[#C08A2E]" />
                <span>PostgreSQL 16 + PostGIS Spatial Engine</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-[#C08A2E]" />
                <span>HNSW Vector Index for Semantic Matching</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-[#C08A2E]" />
                <span>Academic Consortium: BIT, ISM, NIT, BAU</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-[#C08A2E]" />
                <span>CSR Council: Tata Steel, BCCL, Jindal</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-[#1B4332] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#6E887B]">
          <p>© 2026 Government of Jharkhand. Developed for Citizen Empowerment & Societal Innovation.</p>
          <div className="flex items-center gap-4 mt-2 sm:mt-0">
            <span>Ranchi Central Operations Hub</span>
            <span>•</span>
            <span>Helpline: 1800-345-6577</span>
            <span>•</span>
            <span className="text-[#A9C2B5]">Version 2.4 PWA-PROD</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
