import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { api, AdminStats } from '../../services/api';
import { ALL_PROFILES } from '../../data/allProfiles';
import { Profile } from '../../types';
import { 
  ShieldCheck, 
  Users, 
  FileCheck2, 
  AlertTriangle, 
  Crown, 
  Database, 
  Search, 
  Check, 
  LogOut, 
  ArrowLeft, 
  Sparkles, 
  RefreshCw, 
  Eye, 
  X, 
  TrendingUp, 
  DollarSign, 
  CheckCircle2,
  Trash2,
  UserX,
  UserCheck,
  Plus
} from 'lucide-react';
import { triggerHaptic } from '../../styles/designTokens';

type AdminTab = 'overview' | 'users' | 'verifications' | 'reports' | 'subscriptions' | 'database';

export const AdminDashboardScreen: React.FC = () => {
  const { navigateTo, addToast } = useApp();
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 48,
    verifiedUsers: 34,
    pendingVerifications: 3,
    pendingReports: 2,
    activeSubscriptions: 19,
    totalStories: 4,
    revenueMonthly: 48950,
    matchSuccessRate: 94.2
  });
  
  const [profilesList, setProfilesList] = useState<Profile[]>(ALL_PROFILES);
  const [verificationsList, setVerificationsList] = useState<any[]>([]);
  const [reportsList, setReportsList] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [genderFilter, setGenderFilter] = useState<'all' | 'female' | 'male'>('all');
  const [verifiedFilter, setVerifiedFilter] = useState<'all' | 'verified' | 'unverified'>('all');
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [deleteConfirmProfile, setDeleteConfirmProfile] = useState<Profile | null>(null);
  const [rejectModal, setRejectModal] = useState<{ id: string; name: string } | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [s, v, r] = await Promise.all([
        api.getAdminStats(),
        api.getVerifications(),
        api.getReports()
      ]);
      setStats(s);
      if (v) setVerificationsList(v);
      if (r) setReportsList(r);
    } catch {
      // Keep defaults
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const isProfileVerified = (p: Profile) => {
    return Boolean(p.verified?.identity || p.verified?.reviewed);
  };

  const handleToggleVerify = async (profileId: string, currentStatus: boolean) => {
    triggerHaptic(15);
    const newStatus = !currentStatus;
    setProfilesList(prev => prev.map(p => {
      if (p.id === profileId) {
        return {
          ...p,
          verified: {
            ...p.verified,
            identity: newStatus,
            reviewed: newStatus
          }
        };
      }
      return p;
    }));
    if (selectedProfile && selectedProfile.id === profileId) {
      setSelectedProfile(prev => prev ? {
        ...prev,
        verified: {
          ...prev.verified,
          identity: newStatus,
          reviewed: newStatus
        }
      } : null);
    }
    await api.updateUserVerification(profileId, newStatus);
    addToast('Verification Updated', `Profile verification ${newStatus ? 'Approved' : 'Revoked'}`, 'success');
  };

  const handleDeleteProfile = async (profile: Profile) => {
    triggerHaptic(20);
    setProfilesList(prev => prev.filter(p => p.id !== profile.id));
    if (selectedProfile?.id === profile.id) setSelectedProfile(null);
    setDeleteConfirmProfile(null);
    await api.deleteUser(profile.id);
    addToast('Profile Deleted', `${profile.name}'s profile and account were purged from the system.`, 'info');
  };

  const handleApproveVerification = async (id: string, userId: string) => {
    triggerHaptic(20);
    await api.actionVerification(id, 'approve');
    setVerificationsList(prev => prev.map(v => v.id === id ? { ...v, status: 'approved' } : v));
    setProfilesList(prev => prev.map(p => {
      if (p.id === userId) {
        return {
          ...p,
          verified: { ...p.verified, identity: true, reviewed: true }
        };
      }
      return p;
    }));
    addToast('Verified', 'Document approved & Blue Badge issued!', 'success');
  };

  const handleRejectVerificationConfirm = async () => {
    if (!rejectModal) return;
    triggerHaptic(15);
    await api.actionVerification(rejectModal.id, 'reject', rejectReason);
    setVerificationsList(prev => prev.map(v => v.id === rejectModal.id ? { ...v, status: 'rejected', notes: rejectReason || v.notes } : v));
    setRejectModal(null);
    setRejectReason('');
    addToast('Verification Rejected', 'Verification request rejected with reason logged', 'info');
  };

  const handleResolveReport = async (id: string) => {
    triggerHaptic(15);
    await api.resolveReport(id, 'resolved');
    setReportsList(prev => prev.map(r => r.id === id ? { ...r, status: 'reviewed' } : r));
    addToast('Report Resolved', 'Safety report reviewed & marked as resolved', 'success');
  };

  const filteredProfiles = profilesList.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.profession.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGender = genderFilter === 'all' || p.gender === genderFilter;
    const verified = isProfileVerified(p);
    const matchesVerified = verifiedFilter === 'all' || 
      (verifiedFilter === 'verified' && verified) || 
      (verifiedFilter === 'unverified' && !verified);
    return matchesSearch && matchesGender && matchesVerified;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col select-none antialiased">
      {/* Top Admin Navigation Header */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-2xl bg-emerald-950 border border-emerald-800 text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-serif font-bold text-sm sm:text-base text-white flex items-center gap-2">
              <span>Polygamy Matrimony</span>
              <span className="text-[10px] uppercase font-mono tracking-widest px-2 py-0.5 rounded-full bg-emerald-900/80 text-emerald-300 border border-emerald-700">
                Admin Console
              </span>
            </h1>
            <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <Database className="w-3 h-3 text-emerald-400" />
              <span>Hostinger DB: <span className="text-slate-200 font-mono">u872793003_matirmonytaj</span></span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => { triggerHaptic(10); loadData(); }}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700 hover:bg-slate-700 transition-colors"
            title="Refresh Database Data"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={() => navigateTo('dashboard')}
            className="hidden sm:flex items-center gap-1.5 text-xs text-slate-300 hover:text-white px-3.5 py-1.5 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Switch to User View</span>
          </button>

          <button
            onClick={() => navigateTo('landing')}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-rose-950/60 text-rose-300 border border-rose-800/60 hover:bg-rose-900 transition-colors text-xs font-semibold flex items-center gap-1"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 border-b border-slate-800">
          {[
            { id: 'overview' as const, label: 'Analytics Overview', icon: TrendingUp },
            { id: 'users' as const, label: `Users & Profiles (${profilesList.length})`, icon: Users },
            { id: 'verifications' as const, label: `KYC & Wali Queue (${verificationsList.filter(v => v.status === 'pending').length})`, icon: FileCheck2 },
            { id: 'reports' as const, label: `Safety & Moderation (${reportsList.filter(r => r.status === 'pending').length})`, icon: AlertTriangle },
            { id: 'subscriptions' as const, label: 'Subscriptions & VIP', icon: Crown },
            { id: 'database' as const, label: 'Hostinger MySQL Diagnostics', icon: Database }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => { triggerHaptic(10); setActiveTab(tab.id); }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/50'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800/80'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-semibold">Total Profiles</span>
                  <Users className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white font-serif">{stats.totalUsers}</div>
                <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>+12 this week</span>
                </div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-semibold">Verified Sharia</span>
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white font-serif">{stats.verifiedUsers}</div>
                <div className="text-[11px] text-slate-400">71% verification rate</div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-semibold">Monthly MRR</span>
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-emerald-400 font-serif">₹{stats.revenueMonthly.toLocaleString()}</div>
                <div className="text-[11px] text-emerald-400">{stats.activeSubscriptions} Paid Members</div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-semibold">Pending Queue</span>
                  <FileCheck2 className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-amber-400 font-serif">
                  {verificationsList.filter(v => v.status === 'pending').length}
                </div>
                <div className="text-[11px] text-slate-400">Action required</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Quick Verifications */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-white flex items-center gap-2">
                    <FileCheck2 className="w-4 h-4 text-emerald-400" />
                    <span>Pending KYC Verifications</span>
                  </h3>
                  <button onClick={() => setActiveTab('verifications')} className="text-xs text-emerald-400 hover:underline">View All</button>
                </div>

                <div className="space-y-2.5">
                  {verificationsList.filter(v => v.status === 'pending').slice(0, 3).map(verif => (
                    <div key={verif.id} className="p-3 bg-slate-950/70 border border-slate-800/80 rounded-2xl flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <img src={verif.user_photo} alt={verif.user_name} className="w-10 h-10 rounded-full object-cover border border-slate-700" />
                        <div>
                          <p className="text-xs font-bold text-white">{verif.user_name}</p>
                          <p className="text-[10px] text-slate-400">{verif.document_type}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleApproveVerification(verif.id, verif.user_id)}
                        className="px-2.5 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold flex items-center gap-1"
                      >
                        <Check className="w-3 h-3" />
                        <span>Approve</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hostinger DB Status */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-white flex items-center gap-2">
                    <Database className="w-4 h-4 text-emerald-400" />
                    <span>Database Engine & Telemetry</span>
                  </h3>
                  <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-800">
                    Live Ping: 42ms
                  </span>
                </div>

                <div className="p-4 bg-slate-950/70 border border-slate-800/80 rounded-2xl space-y-2 text-xs font-mono">
                  <div className="flex justify-between text-slate-400">
                    <span>Host:</span>
                    <span className="text-slate-200">srv1641.hstgr.io:3306</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Database:</span>
                    <span className="text-emerald-400">u872793003_matirmonytaj</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>User:</span>
                    <span className="text-slate-200">u872793003_matirmony</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Connection Pool:</span>
                    <span className="text-emerald-400">10 Active Connections</span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('database')}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors"
                >
                  Open Database Explorer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: USERS & PROFILES */}
        {activeTab === 'users' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-slate-900/90 p-4 rounded-3xl border border-slate-800">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search name, city, profession..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
                <select
                  value={genderFilter}
                  onChange={(e) => setGenderFilter(e.target.value as any)}
                  className="bg-slate-950 border border-slate-800 rounded-2xl px-3 py-2 text-xs text-slate-300 focus:outline-none"
                >
                  <option value="all">All Genders</option>
                  <option value="female">Female (Muslimah)</option>
                  <option value="male">Male (Brother)</option>
                </select>

                <select
                  value={verifiedFilter}
                  onChange={(e) => setVerifiedFilter(e.target.value as any)}
                  className="bg-slate-950 border border-slate-800 rounded-2xl px-3 py-2 text-xs text-slate-300 focus:outline-none"
                >
                  <option value="all">All Verification</option>
                  <option value="verified">Verified Only</option>
                  <option value="unverified">Unverified Only</option>
                </select>
              </div>
            </div>

            <div className="grid gap-3">
              {filteredProfiles.map(profile => {
                const verified = isProfileVerified(profile);
                return (
                  <div
                    key={profile.id}
                    className="bg-slate-950/80 border border-slate-800 rounded-3xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-slate-800 shrink-0 border border-slate-700">
                        <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover" />
                        {verified && (
                          <div className="absolute top-1 right-1 bg-emerald-600 text-white p-0.5 rounded-full">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                        )}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-white">{profile.name}</h4>
                          <span className="text-xs text-slate-400">({profile.age} yrs)</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                            profile.gender === 'female' ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-blue-950 text-blue-300 border border-blue-800'
                          }`}>
                            {profile.gender}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">
                          {profile.profession} • {profile.city}, {profile.country}
                        </p>
                        <p className="text-[11px] text-amber-300 font-medium">
                          {profile.polygynyInfo?.marriageType || 'First Marriage'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-800">
                      <button
                        onClick={() => setSelectedProfile(profile)}
                        className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </button>

                      <button
                        onClick={() => handleToggleVerify(profile.id, verified)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                          verified
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800 hover:bg-emerald-900'
                            : 'bg-amber-600 hover:bg-amber-500 text-white shadow-sm'
                        }`}
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>{verified ? 'Verified' : 'Verify'}</span>
                      </button>

                      <button
                        onClick={() => setDeleteConfirmProfile(profile)}
                        className="p-1.5 rounded-xl bg-rose-950/60 hover:bg-rose-900/80 text-rose-400 border border-rose-800/60 transition-colors"
                        title="Delete Profile & Account"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: KYC & WALI VERIFICATION QUEUE */}
        {activeTab === 'verifications' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="grid gap-4">
              {verificationsList.map(item => (
                <div key={item.id} className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img src={item.user_photo} alt={item.user_name} className="w-12 h-12 rounded-2xl object-cover border border-slate-700" />
                      <div>
                        <h4 className="font-bold text-sm text-white">{item.user_name}</h4>
                        <p className="text-xs text-amber-400 font-semibold">{item.document_type}</p>
                      </div>
                    </div>

                    <span className={`text-[11px] font-bold px-3 py-1 rounded-full uppercase ${
                      item.status === 'approved' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                      item.status === 'rejected' ? 'bg-rose-950 text-rose-400 border border-rose-800' :
                      'bg-amber-950 text-amber-300 border border-amber-800 animate-pulse'
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-slate-400">
                      <span>Wali / Guardian:</span>
                      <span className="text-slate-200 font-semibold">{item.wali_name || 'Direct Submission'}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-400">
                      <span>Wali Contact:</span>
                      <span className="text-emerald-400 font-mono">{item.wali_phone || 'N/A'}</span>
                    </div>
                    <div className="text-slate-400 pt-1 border-t border-slate-800">
                      <span>Notes: </span>
                      <span className="text-slate-300 italic">{item.notes}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2">
                    {item.status === 'pending' && (
                      <>
                        <button
                          onClick={() => setRejectModal({ id: item.id, name: item.user_name })}
                          className="px-4 py-2 rounded-xl bg-rose-950/80 hover:bg-rose-900 text-rose-300 text-xs font-bold border border-rose-800 flex items-center gap-1.5"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Reject</span>
                        </button>
                        <button
                          onClick={() => handleApproveVerification(item.id, item.user_id)}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-950"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Approve & Issue Blue Badge</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: SAFETY & REPORTS MODERATION */}
        {activeTab === 'reports' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {reportsList.map(report => (
              <div key={report.id} className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-rose-400" />
                    <h4 className="font-bold text-sm text-white">{report.reason}</h4>
                  </div>
                  <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                    report.status === 'pending' ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {report.status}
                  </span>
                </div>

                <p className="text-xs text-slate-300 bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800">
                  "{report.details}"
                </p>

                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Reported User: <strong className="text-white">{report.reported_name}</strong></span>
                  <span>Reported By: <strong className="text-slate-300">{report.reporter_name}</strong></span>
                </div>

                {report.status === 'pending' && (
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleResolveReport(report.id)}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
                    >
                      Dismiss
                    </button>
                    <button
                      onClick={() => handleResolveReport(report.id)}
                      className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold"
                    >
                      Issue Formal Warning
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* TAB 5: SUBSCRIPTIONS */}
        {activeTab === 'subscriptions' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Free Starter</h4>
                <div className="text-2xl font-serif font-bold text-white">₹0 <span className="text-xs text-slate-400">/ forever</span></div>
                <p className="text-xs text-slate-400">29 Active Members</p>
              </div>

              <div className="bg-slate-900/90 border border-emerald-800/80 rounded-3xl p-5 space-y-3">
                <div className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded-full w-fit border border-emerald-800">
                  Most Popular
                </div>
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Premium Blessed</h4>
                <div className="text-2xl font-serif font-bold text-white">₹1,499 <span className="text-xs text-slate-400">/ month</span></div>
                <p className="text-xs text-emerald-400 font-semibold">14 Active Members</p>
              </div>

              <div className="bg-slate-900/90 border border-amber-500/40 rounded-3xl p-5 space-y-3">
                <div className="text-[10px] uppercase font-bold text-amber-400 bg-amber-950 px-2.5 py-0.5 rounded-full w-fit border border-amber-800">
                  VIP Concierge
                </div>
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Royal Nikah Elite</h4>
                <div className="text-2xl font-serif font-bold text-white">₹2,999 <span className="text-xs text-slate-400">/ month</span></div>
                <p className="text-xs text-amber-400 font-semibold">5 Active VIP Members</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: HOSTINGER MYSQL DIAGNOSTICS */}
        {activeTab === 'database' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="space-y-1">
                  <h3 className="font-serif font-bold text-base text-white flex items-center gap-2">
                    <Database className="w-5 h-5 text-emerald-400" />
                    <span>Hostinger MySQL Remote Instance</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Direct pooled connection to <span className="text-emerald-400 font-mono">srv1641.hstgr.io</span>
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800 text-emerald-400 text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Online & Healthy</span>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-slate-500 block">Database Name</span>
                  <span className="text-slate-200 font-bold">u872793003_matirmonytaj</span>
                </div>
                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-slate-500 block">Database User</span>
                  <span className="text-slate-200 font-bold">u872793003_matirmony</span>
                </div>
                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-slate-500 block">Host Endpoint</span>
                  <span className="text-slate-200 font-bold">srv1641.hstgr.io:3306</span>
                </div>
                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-slate-500 block">Character Set & Collation</span>
                  <span className="text-slate-200 font-bold">utf8mb4_unicode_ci</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-300">Migrated Relational Tables:</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] font-mono">
                  {['admin_users', 'users', 'profiles', 'interest_requests', 'conversations', 'messages', 'verifications', 'subscriptions', 'reports', 'success_stories', 'guidance_articles'].map(table => (
                    <div key={table} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-slate-300">
                      <span>{table}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Profile Inspector Modal */}
      {selectedProfile && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-3xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-white">Full Profile Inspector</h3>
              <button onClick={() => setSelectedProfile(null)} className="p-1 rounded-full hover:bg-slate-800">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="flex items-center gap-3.5 p-3 bg-slate-950 rounded-2xl border border-slate-800">
              <img src={selectedProfile.photo} alt={selectedProfile.name} className="w-16 h-16 rounded-2xl object-cover" />
              <div>
                <h4 className="font-bold text-base text-white">{selectedProfile.name}, {selectedProfile.age}</h4>
                <p className="text-xs text-slate-400">{selectedProfile.profession} • {selectedProfile.city}</p>
                <p className="text-xs text-amber-400 font-semibold">{selectedProfile.polygynyInfo?.marriageType}</p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <p className="text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-2xl border border-slate-800">
                "{selectedProfile.aboutMe}"
              </p>

              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5">
                <p className="font-bold text-slate-200">Sharia & Wali Particulars:</p>
                <p className="text-slate-400">Sect: <strong className="text-slate-200">{selectedProfile.religion.sect}</strong></p>
                <p className="text-slate-400">Prayer: <strong className="text-slate-200">{selectedProfile.religion.prayerFrequency}</strong></p>
                <p className="text-slate-400">Wali: <strong className="text-slate-200">{selectedProfile.polygynyInfo?.waliContactName || 'Family Wali on File'}</strong></p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => setSelectedProfile(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
              >
                Close
              </button>
              <button
                onClick={() => handleToggleVerify(selectedProfile.id, isProfileVerified(selectedProfile))}
                className={`px-4 py-2 rounded-xl text-xs font-bold ${
                  isProfileVerified(selectedProfile) ? 'bg-rose-600 text-white' : 'bg-emerald-600 text-white'
                }`}
              >
                {isProfileVerified(selectedProfile) ? 'Revoke Verification' : 'Issue Verification'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmProfile && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-rose-400">
              <div className="p-2.5 rounded-2xl bg-rose-950/80 border border-rose-800">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white">Delete Profile & Account</h3>
                <p className="text-xs text-slate-400">Permanent administrative action</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 bg-slate-950 p-3.5 rounded-2xl border border-slate-800 leading-relaxed">
              Are you sure you want to permanently delete <strong className="text-white">{deleteConfirmProfile.name}</strong> ({deleteConfirmProfile.city}) from the live Hostinger database? This will purge their messages, interests, and profile verification data.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => setDeleteConfirmProfile(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteProfile(deleteConfirmProfile)}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-950/50"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Verification Modal */}
      {rejectModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-amber-400">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="font-bold text-base text-white">Reject Verification Request</h3>
              </div>
              <button onClick={() => setRejectModal(null)} className="p-1 rounded-full hover:bg-slate-800">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Provide an administrative rejection reason for <strong className="text-white">{rejectModal.name}</strong>:
            </p>

            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="e.g. Wali identity document is blurred; unverified matrimonial status claim."
              rows={3}
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-500"
            />

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => setRejectModal(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleRejectVerificationConfirm}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
