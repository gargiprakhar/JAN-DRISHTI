import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Users, 
  Database, 
  Activity, 
  Server, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Cpu, 
  KeyRound, 
  Terminal,
  Layers,
  Search
} from 'lucide-react';
import { UserProfile } from '../../types';
import { MOCK_USERS_ARRAY } from '../../data/mockData';

interface PlatformAdminDashboardProps {
  currentUser: UserProfile | null;
}

export const PlatformAdminDashboard: React.FC<PlatformAdminDashboardProps> = ({ currentUser }) => {
  const [activeTab, setActiveTab] = useState<'users' | 'database' | 'monitoring'>('monitoring');
  const [userList, setUserList] = useState<UserProfile[]>(MOCK_USERS_ARRAY);
  const [filterRole, setFilterRole] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [dbReindexing, setDbReindexing] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const filteredUsers = userList.filter((u) => {
    if (filterRole !== 'All' && u.role !== filterRole) return false;
    if (searchTerm.trim() && !u.name.toLowerCase().includes(searchTerm.toLowerCase()) && !(u.institutionOrOrg?.toLowerCase().includes(searchTerm.toLowerCase()))) return false;
    return true;
  });

  const toggleVerifyUser = (userId: string) => {
    setUserList(prev => prev.map(u => u.id === userId ? { ...u, verifiedStatus: !u.verifiedStatus } : u));
    showToast('User accreditation updated.');
  };

  const handleTriggerReindex = () => {
    setDbReindexing(true);
    setTimeout(() => {
      setDbReindexing(false);
      showToast('PostgreSQL PostGIS & HNSW Vector indexes successfully rebuilt.');
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6 text-[#14261C]">
      {/* Top Banner */}
      <div className="bg-[#0F291E] text-white p-6 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 border border-[#1B4332]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldAlert className="w-4 h-4 text-[#C08A2E]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C08A2E]">
              Platform Administration & State Data Center Operations (प्रणाली नियंत्रण)
            </span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-white">
            System Monitoring, User Access & PostGIS Database Core
          </h2>
          <p className="text-xs text-[#A9C2B5] mt-1 max-w-2xl">
            Distinct from content-verifying Government Officials. Manages underlying PostgreSQL 16 infrastructure, biometric face-blur privacy logs, and multi-tenant authentication.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-[#1B4332] p-1 rounded-xl border border-[#2D6A4F] self-start md:self-auto text-xs">
          <button
            onClick={() => setActiveTab('monitoring')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
              activeTab === 'monitoring' ? 'bg-[#C08A2E] text-[#0F291E] font-bold shadow-xs' : 'text-[#A9C2B5] hover:text-white'
            }`}
          >
            System Health
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
              activeTab === 'users' ? 'bg-[#C08A2E] text-[#0F291E] font-bold shadow-xs' : 'text-[#A9C2B5] hover:text-white'
            }`}
          >
            User RBAC ({userList.length})
          </button>
          <button
            onClick={() => setActiveTab('database')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
              activeTab === 'database' ? 'bg-[#C08A2E] text-[#0F291E] font-bold shadow-xs' : 'text-[#A9C2B5] hover:text-white'
            }`}
          >
            PostGIS & Vectors
          </button>
        </div>
      </div>

      {toastMsg && (
        <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-semibold rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* SYSTEM HEALTH TAB */}
      {activeTab === 'monitoring' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-[#D6E3DC] shadow-xs">
              <div className="flex justify-between items-start">
                <span className="text-xs text-gray-500">Service Status</span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <p className="font-serif text-xl font-bold text-[#1B4332] mt-1">99.98% Uptime</p>
              <p className="text-[11px] text-gray-500 mt-1">Ranchi SDC Cluster Online</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#D6E3DC] shadow-xs">
              <div className="flex justify-between items-start">
                <span className="text-xs text-gray-500">AI Structuring Latency</span>
                <Cpu className="w-4 h-4 text-[#C08A2E]" />
              </div>
              <p className="font-serif text-xl font-bold text-[#14261C] mt-1">182 ms avg</p>
              <p className="text-[11px] text-gray-500 mt-1">HNSW Cosine Vector Scans</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#D6E3DC] shadow-xs">
              <div className="flex justify-between items-start">
                <span className="text-xs text-gray-500">PWA Cache Hit Rate</span>
                <Activity className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="font-serif text-xl font-bold text-[#14261C] mt-1">98.4%</p>
              <p className="text-[11px] text-gray-500 mt-1">Offline Service Worker Sync</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#D6E3DC] shadow-xs">
              <div className="flex justify-between items-start">
                <span className="text-xs text-gray-500">Face Privacy Scans</span>
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="font-serif text-xl font-bold text-[#1B4332] mt-1">4,892 Redactions</p>
              <p className="text-[11px] text-emerald-700 mt-1">0 Biometric Leakages</p>
            </div>
          </div>

          {/* Telemetry Log Stream */}
          <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800 text-xs font-mono text-gray-300 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-gray-800">
              <span className="flex items-center gap-2 text-emerald-400 font-bold">
                <Terminal className="w-4 h-4" />
                <span>Live System Event Stream</span>
              </span>
              <span className="text-[10px] text-gray-500">STDOUT • Port 3000 Ingress</span>
            </div>

            <div className="space-y-1 text-[11px] text-gray-400">
              <p className="text-emerald-400">[2026-09-20 06:40:12 UTC] INFO: PostGIS spatial index loaded (24 districts active).</p>
              <p>[2026-09-20 06:40:15 UTC] AI_PIPELINE: Processed text report JD-JH-2026-1042 → Water & Sanitation (97.4% conf).</p>
              <p>[2026-09-20 06:40:16 UTC] PRIVACY_GUARD: Client Haar cascade detected 2 faces; blur mask coordinates applied.</p>
              <p>[2026-09-20 06:40:22 UTC] MATCHING_ENGINE: Paired JD-JH-2026-1042 with BIT Mesra Chem Dept (94% score).</p>
              <p className="text-amber-400">[2026-09-20 06:40:28 UTC] PWA_SW: Service worker registered for client node 10.42.0.18.</p>
            </div>
          </div>
        </div>
      )}

      {/* USER RBAC TAB */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#1B4332]">
                Multi-Tenant User Accreditation & Role Management
              </h3>
              <p className="text-xs text-gray-600">
                Strict login enforcement. Public and guest submissions are rejected by platform policy.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  placeholder="Search user / org..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 pr-3 py-1.5 rounded-lg border border-gray-300 text-xs w-48"
                />
              </div>

              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-gray-300 text-xs bg-white"
              >
                <option value="All">All Roles</option>
                <option value="citizen">Citizen</option>
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
                <option value="industry">Industry</option>
                <option value="government">Government</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#D6E3DC] overflow-hidden shadow-xs">
            <div className="divide-y divide-gray-100 text-xs">
              {filteredUsers.map((user) => (
                <div key={user.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#14261C]">{user.name}</span>
                      <span className="font-mono text-[10px] bg-gray-100 px-2 py-0.5 rounded uppercase font-semibold">
                        {user.role}
                      </span>
                      {user.verifiedStatus && (
                        <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-medium border border-emerald-200">
                          Accredited
                        </span>
                      )}
                    </div>
                    <p className="text-gray-500 text-[11px]">
                      {user.institutionOrOrg} • Operating District: {user.district}
                    </p>
                    <p className="text-gray-400 text-[10px] font-mono">{user.emailOrPhone}</p>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      onClick={() => toggleVerifyUser(user.id)}
                      className={`px-3 py-1 text-xs rounded-lg font-medium transition cursor-pointer ${
                        user.verifiedStatus
                          ? 'border border-gray-300 text-gray-700 hover:bg-gray-100'
                          : 'bg-[#1B4332] text-white hover:bg-[#143427]'
                      }`}
                    >
                      {user.verifiedStatus ? 'Revoke Badge' : 'Accredit User'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* DATABASE & POSTGIS TAB */}
      {activeTab === 'database' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#1B4332]">
                PostGIS 16 & pgvector Database Management
              </h3>
              <p className="text-xs text-gray-600">
                Spatial queries, HNSW embeddings index, and DPDP Act biometric logs managed via JAP-IT state specifications.
              </p>
            </div>

            <button
              onClick={handleTriggerReindex}
              disabled={dbReindexing}
              className="px-4 py-2 bg-[#1B4332] hover:bg-[#143427] text-white text-xs font-medium rounded-xl transition flex items-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${dbReindexing ? 'animate-spin' : ''}`} />
              <span>{dbReindexing ? 'Reindexing...' : 'Reindex PostGIS & Vector HNSW'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-white p-5 rounded-2xl border border-[#D6E3DC] shadow-xs space-y-3">
              <span className="font-bold text-[#14261C] flex items-center gap-1.5">
                <Database className="w-4 h-4 text-[#C08A2E]" />
                <span>PostGIS Spatial Geometry Repository</span>
              </span>
              <div className="space-y-1.5 text-gray-600">
                <div className="flex justify-between">
                  <span>Spatial Reference ID:</span>
                  <span className="font-mono font-bold text-gray-800">EPSG:4326 (WGS84)</span>
                </div>
                <div className="flex justify-between">
                  <span>Spatial Index:</span>
                  <span className="font-mono text-gray-800">GIST on (geom)</span>
                </div>
                <div className="flex justify-between">
                  <span>Active Geospatial Partitions:</span>
                  <span className="text-gray-800 font-bold">24 District Tables</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#D6E3DC] shadow-xs space-y-3">
              <span className="font-bold text-[#14261C] flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-[#C08A2E]" />
                <span>Semantic Embeddings (pgvector)</span>
              </span>
              <div className="space-y-1.5 text-gray-600">
                <div className="flex justify-between">
                  <span>Embedding Dimensions:</span>
                  <span className="font-mono font-bold text-gray-800">768 Float32</span>
                </div>
                <div className="flex justify-between">
                  <span>Vector Index Type:</span>
                  <span className="font-mono text-gray-800">HNSW (m=16, ef_construction=64)</span>
                </div>
                <div className="flex justify-between">
                  <span>Distance Metric:</span>
                  <span className="font-mono text-gray-800">Cosine Distance (&lt;=&gt;)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
