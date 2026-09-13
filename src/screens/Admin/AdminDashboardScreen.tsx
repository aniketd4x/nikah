import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { api, AdminStats } from '../../services/api';
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
  RefreshCw, 
  Eye, 
  EyeOff,
  X, 
  TrendingUp, 
  CheckCircle2,
  Trash2,
  Plus,
  Edit3,
  UserCheck,
  UserX,
  Menu,
  ChevronRight,
  LayoutGrid,
  List,
  MapPin,
  Briefcase,
  Heart,
  Sparkles,
  KeyRound,
  Lock,
  Mail,
  User,
  Phone,
  GraduationCap,
  Globe,
  Activity,
  BarChart3,
  ArrowUpRight,
  SlidersHorizontal,
  Zap,
  Clock,
  ShieldAlert
} from 'lucide-react';
import { triggerHaptic } from '../../styles/designTokens';

type AdminTab = 'overview' | 'users' | 'verifications' | 'reports' | 'subscriptions';

export const AdminDashboardScreen: React.FC = () => {
  const { navigateTo, addToast } = useApp();
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    verifiedUsers: 0,
    pendingVerifications: 0,
    pendingReports: 0,
    activeSubscriptions: 0,
    totalStories: 0,
    revenueMonthly: 0,
    matchSuccessRate: 100
  });
  
  const [profilesList, setProfilesList] = useState<Profile[]>([]);
  const [verificationsList, setVerificationsList] = useState<any[]>([]);
  const [reportsList, setReportsList] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [genderFilter, setGenderFilter] = useState<'all' | 'female' | 'male'>('all');
  const [verifiedFilter, setVerifiedFilter] = useState<'all' | 'verified' | 'unverified'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'deactivated'>('all');
  const [analyticsMetric, setAnalyticsMetric] = useState<'growth' | 'matches'>('growth');
  
  // Admin Profile & Security State
  const [adminProfile, setAdminProfile] = useState<{ id: string; email: string; name: string }>({
    id: 'admin-001',
    email: 'admin@polygamymatrimony.com',
    name: 'Chief Sharia Administrator'
  });
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);
  const [adminFormEmail, setAdminFormEmail] = useState('');
  const [adminFormName, setAdminFormName] = useState('');
  const [adminFormNewPassword, setAdminFormNewPassword] = useState('');
  const [adminFormConfirmPassword, setAdminFormConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSavingSecurity, setIsSavingSecurity] = useState(false);

  // Modals
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [deleteConfirmProfile, setDeleteConfirmProfile] = useState<Profile | null>(null);
  const [rejectModal, setRejectModal] = useState<{ id: string; name: string } | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [editProfileData, setEditProfileData] = useState<Profile | null>(null);
  const [showEditUserPassword, setShowEditUserPassword] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // New user form state
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    gender: 'female',
    age: 26,
    city: 'Mumbai',
    profession: 'Software Engineer',
    maritalStatus: 'Never Married',
    polygynyPreference: 'Open to Discussion',
    isVerified: true
  });

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [s, v, r, users, aProfile] = await Promise.all([
        api.getAdminStats(),
        api.getVerifications(),
        api.getReports(),
        api.getUsers(),
        api.getAdminProfile()
      ]);
      if (s) setStats(s);
      if (Array.isArray(v)) setVerificationsList(v);
      if (Array.isArray(r)) setReportsList(r);
      if (Array.isArray(users)) {
        setProfilesList(users);
      }
      if (aProfile) {
        setAdminProfile({
          id: aProfile.id || 'admin-001',
          email: aProfile.email || 'admin@polygamymatrimony.com',
          name: aProfile.name || 'Chief Sharia Administrator'
        });
      }
    } catch {
      // Keep state
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openSecurityModal = () => {
    setAdminFormEmail(adminProfile.email);
    setAdminFormName(adminProfile.name);
    setAdminFormNewPassword('');
    setAdminFormConfirmPassword('');
    setIsSecurityModalOpen(true);
    setIsMobileSidebarOpen(false);
  };

  const handleSaveSecurity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminFormEmail.trim()) {
      addToast('Error', 'Admin ID (Email) cannot be empty', 'error');
      return;
    }

    if (adminFormNewPassword && adminFormNewPassword !== adminFormConfirmPassword) {
      addToast('Password Mismatch', 'New password and confirmation password do not match', 'error');
      return;
    }

    if (adminFormNewPassword && adminFormNewPassword.length < 6) {
      addToast('Weak Password', 'New password must be at least 6 characters long', 'error');
      return;
    }

    try {
      setIsSavingSecurity(true);
      triggerHaptic(15);
      const res = await api.updateAdminCredentials(
        adminFormEmail.trim(), 
        adminFormNewPassword || undefined, 
        adminFormName.trim()
      );

      if (res.success) {
        setAdminProfile(prev => ({
          ...prev,
          email: adminFormEmail.trim(),
          name: adminFormName.trim() || prev.name
        }));
        setIsSecurityModalOpen(false);
        addToast(
          'Admin Credentials Updated', 
          `Your Admin ID (${adminFormEmail.trim()}) and password were saved successfully!`, 
          'success'
        );
      } else {
        addToast('Update Failed', res.error || 'Could not update credentials', 'error');
      }
    } catch {
      addToast('Error', 'An unexpected error occurred while saving credentials', 'error');
    } finally {
      setIsSavingSecurity(false);
    }
  };

  const isProfileVerified = (p: Profile) => {
    return Boolean(p.verified?.identity || p.verified?.reviewed || (p as any).is_verified);
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
    if (editProfileData?.id === profile.id) setEditProfileData(null);
    setDeleteConfirmProfile(null);
    setStats(prev => ({
      ...prev,
      totalUsers: Math.max(0, prev.totalUsers - 1),
      verifiedUsers: (profile.verified?.identity || profile.verified?.reviewed) ? Math.max(0, prev.verifiedUsers - 1) : prev.verifiedUsers
    }));
    await api.deleteUser(profile.id);
    addToast('Profile Deleted', `${profile.name}'s profile and account were purged permanently.`, 'info');
  };

  const handleCreateUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name.trim()) return;

    triggerHaptic(20);
    setIsLoading(true);
    try {
      await api.createAdminUser(newUser);
      addToast('User Created', `Successfully created ${newUser.name}'s profile!`, 'success');
      setIsAddUserModalOpen(false);
      setNewUser({
        name: '',
        email: '',
        gender: 'female',
        age: 26,
        city: 'Mumbai',
        profession: 'Software Engineer',
        maritalStatus: 'Never Married',
        polygynyPreference: 'Open to Discussion',
        isVerified: true
      });
      await loadData();
    } catch {
      addToast('Error', 'Failed to create user', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleActive = async (profileId: string, currentActive: boolean) => {
    triggerHaptic(15);
    const newActive = !currentActive;
    const newStatus = newActive ? 'active' : 'suspended';
    setProfilesList(prev => prev.map(p => {
      if (p.id === profileId) {
        return {
          ...p,
          isActive: newActive,
          status: newStatus,
          account_status: newActive ? 'active' : 'deactivated'
        };
      }
      return p;
    }));
    if (selectedProfile?.id === profileId) {
      setSelectedProfile(prev => prev ? {
        ...prev,
        isActive: newActive,
        status: newStatus,
        account_status: newActive ? 'active' : 'deactivated'
      } : null);
    }
    if (editProfileData?.id === profileId) {
      setEditProfileData(prev => prev ? {
        ...prev,
        isActive: newActive,
        status: newStatus,
        account_status: newActive ? 'active' : 'deactivated'
      } : null);
    }
    await api.updateUserStatus(profileId, newStatus);
    addToast(
      newActive ? 'Profile Activated' : 'Profile Deactivated',
      `Profile ${newActive ? 'is now Active and visible in matchmaking' : 'is now Deactivated / Suspended'}.`,
      newActive ? 'success' : 'info'
    );
  };

  const handleSaveEditProfile = async () => {
    if (!editProfileData) return;
    try {
      setIsSavingProfile(true);
      triggerHaptic(15);
      await api.updateProfile(editProfileData.id, editProfileData);
      setProfilesList(prev => prev.map(p => p.id === editProfileData.id ? { ...p, ...editProfileData } : p));
      if (selectedProfile?.id === editProfileData.id) {
        setSelectedProfile({ ...selectedProfile, ...editProfileData });
      }
      addToast('Profile Updated', `All details & credentials for ${editProfileData.name} saved successfully!`, 'success');
      setEditProfileData(null);
    } catch {
      addToast('Error', 'Failed to update profile details', 'error');
    } finally {
      setIsSavingProfile(false);
    }
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
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      p.name.toLowerCase().includes(query) ||
      p.city.toLowerCase().includes(query) ||
      p.profession.toLowerCase().includes(query) ||
      (p.email && p.email.toLowerCase().includes(query));
    const matchesGender = genderFilter === 'all' || p.gender === genderFilter;
    const verified = isProfileVerified(p);
    const matchesVerified = verifiedFilter === 'all' || 
      (verifiedFilter === 'verified' && verified) || 
      (verifiedFilter === 'unverified' && !verified);
    const matchesStatus = statusFilter === 'all' ||
      (statusFilter === 'active' && p.isActive !== false) ||
      (statusFilter === 'deactivated' && p.isActive === false);
    return matchesSearch && matchesGender && matchesVerified && matchesStatus;
  });

  const navTabs = [
    { id: 'overview' as const, label: 'Overview', fullLabel: 'Analytics Overview', icon: TrendingUp, count: null },
    { id: 'users' as const, label: 'Profiles', fullLabel: 'Users & Profiles', icon: Users, count: profilesList.length },
    { id: 'verifications' as const, label: 'KYC / Wali', fullLabel: 'KYC & Wali Queue', icon: FileCheck2, count: verificationsList.filter(v => v.status === 'pending').length },
    { id: 'reports' as const, label: 'Safety', fullLabel: 'Safety & Moderation', icon: AlertTriangle, count: reportsList.filter(r => r.status === 'pending').length },
    { id: 'subscriptions' as const, label: 'VIP Plans', fullLabel: 'Subscriptions & VIP', icon: Crown, count: null }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex antialiased select-none font-sans">
      {/* ================= DESKTOP SIDEBAR (PURE WHITE) ================= */}
      <aside className="hidden md:flex flex-col w-64 lg:w-72 shrink-0 h-screen sticky top-0 bg-white border-r border-slate-200/80 p-5 space-y-6 z-30 justify-between">
        <div className="space-y-6">
          {/* Brand Header */}
          <div className="flex items-center gap-3 px-1 py-1">
            <div className="p-2.5 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-700 shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-serif font-bold text-base text-slate-900 leading-tight">
                Polygamy Matrimony
              </h1>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                  Admin Console
                </span>
              </div>
            </div>
          </div>

          {/* Current Admin ID Badge & Edit Trigger */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3 space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-500 font-semibold">Active Admin ID</span>
              <button
                onClick={openSecurityModal}
                className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1 hover:underline"
              >
                <KeyRound className="w-3 h-3" />
                <span>Change</span>
              </button>
            </div>
            <div className="font-bold text-xs text-slate-900 truncate" title={adminProfile.email}>
              {adminProfile.email}
            </div>
            <div className="text-[10px] text-slate-500 truncate">
              {adminProfile.name}
            </div>
          </div>

          {/* Database Status Chip */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200/70 text-[11px] text-slate-600 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-slate-800">Live Hostinger MySQL</span>
            <span className="ml-auto text-emerald-700 font-bold">Online</span>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1.5 pt-1">
            {navTabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => { triggerHaptic(10); setActiveTab(tab.id); }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-900 border border-emerald-200/80 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-700' : 'text-slate-400'}`} />
                    <span>{tab.fullLabel}</span>
                  </div>
                  {tab.count !== null && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isActive 
                        ? 'bg-emerald-200/80 text-emerald-900' 
                        : tab.count > 0 && (tab.id === 'verifications' || tab.id === 'reports')
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-600'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Shortcuts */}
        <div className="pt-4 border-t border-slate-100 space-y-2">
          <button
            onClick={openSecurityModal}
            className="w-full flex items-center gap-2.5 text-xs text-slate-700 hover:text-slate-900 px-3.5 py-2 rounded-xl bg-white hover:bg-emerald-50/50 border border-slate-200/80 font-semibold transition-colors"
          >
            <KeyRound className="w-4 h-4 text-emerald-700" />
            <span>Change ID / Password</span>
          </button>

          <button
            onClick={() => navigateTo('dashboard')}
            className="w-full flex items-center gap-2.5 text-xs text-slate-700 hover:text-slate-900 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-slate-500" />
            <span>Switch to User View</span>
          </button>

          <button
            onClick={() => {
              localStorage.removeItem('nikah_admin_token');
              navigateTo('landing');
            }}
            className="w-full flex items-center gap-2.5 text-xs text-rose-600 hover:text-rose-700 px-3.5 py-2 rounded-xl hover:bg-rose-50 font-semibold transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ================= MOBILE DRAWER SIDEBAR ================= */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex animate-in fade-in duration-150">
          <div 
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          <div className="relative w-72 max-w-[80vw] bg-white h-full shadow-2xl p-5 flex flex-col justify-between z-10 space-y-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-serif font-bold text-sm text-slate-900">Polygamy Matrimony</h2>
                    <span className="text-[10px] font-bold uppercase text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                      Admin Console
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Admin ID Preview */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3 space-y-1">
                <div className="text-[10px] font-semibold text-slate-500">Logged in Admin ID:</div>
                <div className="text-xs font-bold text-slate-900 truncate">{adminProfile.email}</div>
                <button
                  onClick={openSecurityModal}
                  className="text-xs font-bold text-emerald-700 flex items-center gap-1 pt-1"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Change ID or Password</span>
                </button>
              </div>

              <nav className="space-y-1">
                {navTabs.map(tab => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => { 
                        triggerHaptic(10); 
                        setActiveTab(tab.id); 
                        setIsMobileSidebarOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold ${
                        isActive
                          ? 'bg-emerald-50 text-emerald-900 border border-emerald-200 font-bold'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-700' : 'text-slate-400'}`} />
                        <span>{tab.fullLabel}</span>
                      </div>
                      {tab.count !== null && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                          {tab.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-2">
              <button
                onClick={openSecurityModal}
                className="w-full flex items-center gap-2 text-xs text-slate-800 p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200 font-semibold"
              >
                <KeyRound className="w-4 h-4 text-emerald-700" />
                <span>Change ID & Password</span>
              </button>

              <button
                onClick={() => navigateTo('dashboard')}
                className="w-full flex items-center gap-2 text-xs text-slate-700 p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Switch to User View</span>
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem('nikah_admin_token');
                  navigateTo('landing');
                }}
                className="w-full flex items-center gap-2 text-xs text-rose-600 p-2 rounded-xl font-semibold"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MAIN CONTENT AREA ================= */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Sticky Top Header (Clean Modern SaaS Glassmorphism) */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-slate-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="p-2 rounded-xl md:hidden text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/80 transition-colors"
              title="Open Navigation"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-400 font-medium">
                <span>Admin Console</span>
                <ChevronRight className="w-3 h-3 text-slate-300" />
                <span className="text-slate-700 font-semibold capitalize">{activeTab}</span>
                <span className="text-slate-300">•</span>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold text-[10px] border border-emerald-200/70">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>Supabase Live</span>
                </div>
              </div>
              <h2 className="font-serif font-bold text-base sm:text-lg text-slate-900 tracking-tight">
                {activeTab === 'overview' && 'Executive Analytics Overview'}
                {activeTab === 'users' && `Users & Profiles (${profilesList.length})`}
                {activeTab === 'verifications' && `KYC & Wali Queue (${verificationsList.filter(v => v.status === 'pending').length})`}
                {activeTab === 'reports' && `Safety & Moderation (${reportsList.filter(r => r.status === 'pending').length})`}
                {activeTab === 'subscriptions' && 'Subscriptions & VIP'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => { triggerHaptic(10); loadData(); }}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-white text-slate-700 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-50 transition-all shadow-xs flex items-center gap-1.5 text-xs font-semibold active:scale-95"
              title="Refresh Data from Supabase"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-emerald-600' : 'text-slate-500'}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              onClick={() => navigateTo('dashboard')}
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 px-3.5 py-2 rounded-xl bg-white border border-slate-200/80 hover:bg-slate-50 transition-colors shadow-xs active:scale-95"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-slate-500" />
              <span>Switch to User View</span>
            </button>

            <button
              onClick={() => {
                localStorage.removeItem('nikah_admin_token');
                navigateTo('landing');
              }}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-rose-50 text-rose-700 border border-rose-200/70 hover:bg-rose-100 hover:border-rose-300 transition-colors text-xs font-semibold flex items-center gap-1.5 active:scale-95"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </header>

        {/* Dashboard Content Container with Native Mobile App Bottom Padding */}
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6 pb-28 md:pb-8">
          {/* ================= TAB 1: OVERVIEW ================= */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Executive Welcome Hero Banner */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-950 border border-emerald-800/40 p-6 sm:p-8 text-white shadow-xl">
                {/* Ambient Decorative Glows */}
                <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />
                <div className="absolute left-1/3 -bottom-20 w-72 h-72 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

                <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-semibold text-emerald-300">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Live Supabase Cloud Connected</span>
                      <span className="text-white/40">•</span>
                      <span className="text-white/80">Sharia Moderation Online</span>
                    </div>

                    <h1 className="font-serif font-bold text-2xl sm:text-3xl text-white tracking-tight">
                      Assalamu Alaikum, {adminProfile.name.split(' ')[0] || 'Administrator'}
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                      Administrative control center for Sharia-compliant polygyny matchmaking. Inspect active profiles, authorize Wali documentation, and maintain privacy standards.
                    </p>

                    <div className="flex items-center gap-2.5 pt-2 flex-wrap text-xs">
                      <span className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-slate-300 font-medium">
                        Active Profiles: <strong className="text-emerald-400">{profilesList.filter(p => p.isActive !== false).length}</strong>
                      </span>
                      <span className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-slate-300 font-medium">
                        Pending Wali: <strong className="text-amber-300">{verificationsList.filter(v => v.status === 'pending').length}</strong>
                      </span>
                      <span className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-slate-300 font-medium">
                        Success Rate: <strong className="text-teal-300">94.2%</strong>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 flex-wrap">
                    <button
                      onClick={() => setIsAddUserModalOpen(true)}
                      className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>+ Add Profile</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('users')}
                      className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/15 backdrop-blur-md active:scale-95 transition-all flex items-center gap-2"
                    >
                      <Users className="w-4 h-4 text-emerald-300" />
                      <span>Manage All ({profilesList.length})</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Elevated Statistic Cards Grid with Sparklines & Trend Indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {/* Total Profiles */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-5 space-y-3 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all duration-200 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400 opacity-80" />
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Total Database Users
                    </span>
                    <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100 group-hover:scale-105 transition-transform">
                      <Users className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <div className="text-3xl font-serif font-bold text-slate-900 tracking-tight">
                      {profilesList.length}
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/70">
                      <ArrowUpRight className="w-3 h-3" />
                      <span>+18.4%</span>
                    </div>
                  </div>
                  {/* Micro SVG Sparkline */}
                  <div className="h-6 w-full pt-1">
                    <svg className="w-full h-full text-emerald-500" viewBox="0 0 100 24" fill="none" preserveAspectRatio="none">
                      <path d="M0,18 Q15,14 30,16 T60,8 T80,11 T100,2 L100,24 L0,24 Z" fill="currentColor" fillOpacity="0.08" />
                      <path d="M0,18 Q15,14 30,16 T60,8 T80,11 T100,2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                    <span className="flex items-center gap-1.5 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {profilesList.filter(p => p.isActive !== false).length} Active Now
                    </span>
                    <span className="text-slate-400 font-mono">Live DB</span>
                  </div>
                </div>

                {/* Verified Profiles */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-5 space-y-3 shadow-xs hover:shadow-md hover:border-blue-300 transition-all duration-200 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-80" />
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Verified KYC Profiles
                    </span>
                    <div className="p-2.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-100 group-hover:scale-105 transition-transform">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <div className="text-3xl font-serif font-bold text-slate-900 tracking-tight">
                      {profilesList.filter(isProfileVerified).length}
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200/70">
                      <span>{Math.round((profilesList.filter(isProfileVerified).length / (profilesList.length || 1)) * 100)}% Rate</span>
                    </div>
                  </div>
                  {/* Micro SVG Sparkline */}
                  <div className="h-6 w-full pt-1">
                    <svg className="w-full h-full text-blue-500" viewBox="0 0 100 24" fill="none" preserveAspectRatio="none">
                      <path d="M0,20 Q20,16 40,12 T70,9 T100,3 L100,24 L0,24 Z" fill="currentColor" fillOpacity="0.08" />
                      <path d="M0,20 Q20,16 40,12 T70,9 T100,3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                    <span className="text-slate-600 font-medium">Identity & Wali Cleared</span>
                    <span className="text-blue-600 font-bold">100% Vetted</span>
                  </div>
                </div>

                {/* KYC & Wali Queue */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-5 space-y-3 shadow-xs hover:shadow-md hover:border-amber-300 transition-all duration-200 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-400 opacity-80" />
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Wali & KYC Queue
                    </span>
                    <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700 border border-amber-100 group-hover:scale-105 transition-transform">
                      <FileCheck2 className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <div className="text-3xl font-serif font-bold text-slate-900 tracking-tight">
                      {verificationsList.filter(v => v.status === 'pending').length}
                    </div>
                    <div className={`flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                      verificationsList.filter(v => v.status === 'pending').length > 0
                        ? 'text-amber-800 bg-amber-50 border-amber-200'
                        : 'text-emerald-800 bg-emerald-50 border-emerald-200'
                    }`}>
                      <span>{verificationsList.filter(v => v.status === 'pending').length > 0 ? 'Pending Action' : 'All Clear'}</span>
                    </div>
                  </div>
                  {/* Micro SVG Sparkline */}
                  <div className="h-6 w-full pt-1">
                    <svg className="w-full h-full text-amber-500" viewBox="0 0 100 24" fill="none" preserveAspectRatio="none">
                      <path d="M0,10 Q25,18 50,14 T75,6 T100,12 L100,24 L0,24 Z" fill="currentColor" fillOpacity="0.08" />
                      <path d="M0,10 Q25,18 50,14 T75,6 T100,12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                    <button onClick={() => setActiveTab('verifications')} className="text-amber-700 hover:text-amber-800 font-bold hover:underline">
                      Review Submissions →
                    </button>
                    <span className="text-slate-400">Queue</span>
                  </div>
                </div>

                {/* Monthly Platform Revenue */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-5 space-y-3 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all duration-200 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-600 to-amber-500 opacity-80" />
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Monthly VIP Revenue
                    </span>
                    <div className="p-2.5 rounded-xl bg-purple-50 text-purple-700 border border-purple-100 group-hover:scale-105 transition-transform">
                      <Crown className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <div className="text-3xl font-serif font-bold text-slate-900 tracking-tight">
                      ₹{stats.revenueMonthly.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/70">
                      <ArrowUpRight className="w-3 h-3" />
                      <span>+24.8% YoY</span>
                    </div>
                  </div>
                  {/* Micro SVG Sparkline */}
                  <div className="h-6 w-full pt-1">
                    <svg className="w-full h-full text-purple-500" viewBox="0 0 100 24" fill="none" preserveAspectRatio="none">
                      <path d="M0,22 Q25,18 50,11 T75,8 T100,2 L100,24 L0,24 Z" fill="currentColor" fillOpacity="0.08" />
                      <path d="M0,22 Q25,18 50,11 T75,8 T100,2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                    <span className="text-slate-600 font-medium">19 Active Subscriptions</span>
                    <span className="text-emerald-700 font-bold">₹2,499 avg</span>
                  </div>
                </div>
              </div>

              {/* Visual Analytics & Velocity Chart Section */}
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 space-y-6 shadow-xs">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-emerald-700" />
                      <h3 className="font-serif font-bold text-base sm:text-lg text-slate-900">
                        Platform Velocity & Matchmaking Analytics
                      </h3>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      6-month registration momentum and daily Halal proposal metrics
                    </p>
                  </div>

                  {/* Segmented Metric Switcher */}
                  <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/70 text-xs font-semibold">
                    <button
                      onClick={() => setAnalyticsMetric('growth')}
                      className={`px-3 py-1.5 rounded-lg transition-all ${
                        analyticsMetric === 'growth'
                          ? 'bg-white text-emerald-900 shadow-xs font-bold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Profile Registrations
                    </button>
                    <button
                      onClick={() => setAnalyticsMetric('matches')}
                      className={`px-3 py-1.5 rounded-lg transition-all ${
                        analyticsMetric === 'matches'
                          ? 'bg-white text-emerald-900 shadow-xs font-bold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Proposals & Matches
                    </button>
                  </div>
                </div>

                {/* SVG Visual Bar / Area Chart */}
                <div className="pt-2">
                  <div className="grid grid-cols-6 gap-3 sm:gap-6 items-end h-48 sm:h-56 px-2">
                    {[
                      { month: 'Apr', value: analyticsMetric === 'growth' ? 65 : 42, label: analyticsMetric === 'growth' ? '65 profiles' : '42 matches' },
                      { month: 'May', value: analyticsMetric === 'growth' ? 82 : 58, label: analyticsMetric === 'growth' ? '82 profiles' : '58 matches' },
                      { month: 'Jun', value: analyticsMetric === 'growth' ? 110 : 85, label: analyticsMetric === 'growth' ? '110 profiles' : '85 matches' },
                      { month: 'Jul', value: analyticsMetric === 'growth' ? 145 : 112, label: analyticsMetric === 'growth' ? '145 profiles' : '112 matches' },
                      { month: 'Aug', value: analyticsMetric === 'growth' ? 190 : 154, label: analyticsMetric === 'growth' ? '190 profiles' : '154 matches' },
                      { month: 'Sep', value: analyticsMetric === 'growth' ? 245 : 210, label: analyticsMetric === 'growth' ? '245 profiles (Current)' : '210 matches (Current)', current: true },
                    ].map((bar, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-2 group h-full justify-end">
                        <div className="text-[10px] font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white px-2 py-0.5 rounded-md -translate-y-1 shadow-sm whitespace-nowrap z-10">
                          {bar.label}
                        </div>
                        <div className="w-full max-w-[48px] bg-slate-100 rounded-2xl overflow-hidden h-full flex items-end p-1 border border-slate-200/50">
                          <div
                            style={{ height: `${(bar.value / 250) * 100}%` }}
                            className={`w-full rounded-xl transition-all duration-500 ${
                              bar.current
                                ? 'bg-gradient-to-t from-emerald-700 to-teal-500 shadow-sm group-hover:brightness-110'
                                : 'bg-gradient-to-t from-slate-300 to-slate-200 group-hover:from-emerald-400 group-hover:to-teal-300'
                            }`}
                          />
                        </div>
                        <span className={`text-xs font-semibold ${bar.current ? 'text-emerald-800 font-bold' : 'text-slate-500'}`}>
                          {bar.month}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Performance Highlights Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-100">
                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/70 space-y-1">
                    <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Matchmaking Success</span>
                    </div>
                    <div className="text-xl font-bold text-slate-900">94.2% Satisfaction</div>
                    <p className="text-[11px] text-slate-500">Across 2nd & 3rd wife Nikah inquiries</p>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/70 space-y-1">
                    <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span>Avg Wali Response Time</span>
                    </div>
                    <div className="text-xl font-bold text-slate-900">4.2 Hours</div>
                    <p className="text-[11px] text-slate-500">Fast verified authorization clearance</p>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/70 space-y-1">
                    <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Zero Spam Tolerance</span>
                    </div>
                    <div className="text-xl font-bold text-slate-900">100% Sharia Vetted</div>
                    <p className="text-[11px] text-slate-500">Real-time keyword & modesty filter</p>
                  </div>
                </div>
              </div>

              {/* Administrative Quick Actions & Recent Live Audit Stream */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left 2 Cols: Administrative Actions Panel */}
                <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-3xl p-6 space-y-4 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-emerald-700" />
                      <h3 className="font-serif font-bold text-base text-slate-900">
                        Administrative Action Center
                      </h3>
                    </div>
                    <span className="text-xs text-slate-400 font-medium">
                      Sharia Control Panel
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    <button
                      onClick={() => setIsAddUserModalOpen(true)}
                      className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50/40 border border-emerald-200/80 hover:border-emerald-300 text-left transition-all duration-150 group shadow-xs hover:shadow-md"
                    >
                      <div className="p-2.5 rounded-xl bg-emerald-700 text-white w-fit group-hover:scale-105 transition-transform mb-3 shadow-xs">
                        <Plus className="w-4 h-4" />
                      </div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-emerald-800 transition-colors">
                        Add New Profile
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Enroll a new member in MySQL
                      </p>
                    </button>

                    <button
                      onClick={() => setActiveTab('users')}
                      className="p-4 rounded-2xl bg-slate-50/90 border border-slate-200/80 hover:border-slate-300 text-left transition-all duration-150 group shadow-xs hover:shadow-md"
                    >
                      <div className="p-2.5 rounded-xl bg-slate-800 text-white w-fit group-hover:scale-105 transition-transform mb-3 shadow-xs">
                        <Users className="w-4 h-4" />
                      </div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-emerald-800 transition-colors">
                        Manage All Users
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Edit, activate, verify or purge
                      </p>
                    </button>

                    <button
                      onClick={openSecurityModal}
                      className="p-4 rounded-2xl bg-slate-50/90 border border-slate-200/80 hover:border-emerald-300 text-left transition-all duration-150 group shadow-xs hover:shadow-md"
                    >
                      <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800 w-fit group-hover:scale-105 transition-transform mb-3 shadow-xs">
                        <KeyRound className="w-4 h-4" />
                      </div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-emerald-800 transition-colors">
                        Change ID & Password
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Update admin credentials
                      </p>
                    </button>
                  </div>
                </div>

                {/* Right Col: Live Sharia Audit & Recent Activity Feed */}
                <div className="bg-white border border-slate-200/80 rounded-3xl p-6 space-y-4 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-emerald-700" />
                      <h3 className="font-bold text-sm text-slate-900">
                        Live System Stream
                      </h3>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="flex items-start gap-3 p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className="p-1.5 rounded-xl bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-900 truncate">Supabase Cloud Live</p>
                        <p className="text-[11px] text-slate-500">All member profiles synchronized</p>
                        <span className="text-[10px] text-slate-400">Just now</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className="p-1.5 rounded-xl bg-blue-100 text-blue-700 shrink-0 mt-0.5">
                        <ShieldCheck className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-900 truncate">KYC Verification Queue</p>
                        <p className="text-[11px] text-slate-500">{verificationsList.length} documents on file</p>
                        <span className="text-[10px] text-slate-400">Active</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className="p-1.5 rounded-xl bg-purple-100 text-purple-700 shrink-0 mt-0.5">
                        <Crown className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-900 truncate">Royal Nikah Concierge</p>
                        <p className="text-[11px] text-slate-500">19 VIP members active</p>
                        <span className="text-[10px] text-slate-400">Monthly</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 2: USERS & PROFILES CRUD (CARDS VIEW FIRST) ================= */}
          {activeTab === 'users' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* Search & Filter Header Bar */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
                {/* Search Input */}
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search name, city, profession..."
                    className="w-full bg-slate-50/80 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/10 transition-all"
                  />
                </div>

                {/* Filters & Actions */}
                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={genderFilter}
                    onChange={(e) => setGenderFilter(e.target.value as any)}
                    className="bg-slate-50/80 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:bg-white focus:outline-none focus:border-emerald-600"
                  >
                    <option value="all">All Genders</option>
                    <option value="female">Female (Muslimah)</option>
                    <option value="male">Male (Brother)</option>
                  </select>

                  <select
                    value={verifiedFilter}
                    onChange={(e) => setVerifiedFilter(e.target.value as any)}
                    className="bg-slate-50/80 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:bg-white focus:outline-none focus:border-emerald-600"
                  >
                    <option value="all">All Verification</option>
                    <option value="verified">Verified Only</option>
                    <option value="unverified">Unverified Only</option>
                  </select>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="bg-slate-50/80 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:bg-white focus:outline-none focus:border-emerald-600"
                  >
                    <option value="all">All Status ({profilesList.length})</option>
                    <option value="active">Active Only ({profilesList.filter(p => p.isActive !== false).length})</option>
                    <option value="deactivated">Deactivated ({profilesList.filter(p => p.isActive === false).length})</option>
                  </select>

                  {/* View Mode Switcher */}
                  <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/70">
                    <button
                      onClick={() => setViewMode('cards')}
                      className={`p-1.5 rounded-lg text-xs transition-colors ${
                        viewMode === 'cards' ? 'bg-white text-emerald-800 shadow-xs font-bold' : 'text-slate-500 hover:text-slate-800'
                      }`}
                      title="Cards View (Default)"
                    >
                      <LayoutGrid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('table')}
                      className={`p-1.5 rounded-lg text-xs transition-colors ${
                        viewMode === 'table' ? 'bg-white text-emerald-800 shadow-xs font-bold' : 'text-slate-500 hover:text-slate-800'
                      }`}
                      title="Table View"
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => setIsAddUserModalOpen(true)}
                    className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white text-xs font-bold flex items-center gap-1.5 shrink-0 shadow-xs hover:shadow active:scale-98 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Profile</span>
                  </button>
                </div>
              </div>

              {/* CARD VIEW (Every Profile in Clean White App Cards) */}
              {viewMode === 'cards' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {filteredProfiles.length === 0 ? (
                    <div className="col-span-full bg-white border border-slate-200/80 rounded-3xl p-12 text-center text-slate-500 font-medium space-y-2">
                      <p className="text-slate-700 font-semibold text-sm">No profiles found</p>
                      <p className="text-xs text-slate-400">Try adjusting your search keywords or filter dropdowns.</p>
                    </div>
                  ) : (
                    filteredProfiles.map(profile => {
                      const verified = isProfileVerified(profile);
                      const isSister = profile.gender === 'female';
                      const isActive = profile.isActive !== false;

                      return (
                        <div
                          key={profile.id}
                          className="bg-white border border-slate-200/80 hover:border-emerald-400/80 rounded-3xl p-5 space-y-4 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-xl hover:shadow-emerald-950/5 hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between group relative overflow-hidden"
                        >
                          {/* Top Status Gradient Bar */}
                          <div className={`absolute top-0 left-0 right-0 h-1 transition-all ${
                            isActive
                              ? 'bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-400'
                              : 'bg-slate-300'
                          }`} />

                          {/* Subtle ambient hover corner light */}
                          <div className="pointer-events-none absolute -right-10 -top-10 w-28 h-28 bg-emerald-500/5 rounded-full blur-xl group-hover:bg-emerald-500/10 transition-colors" />

                          <div className="space-y-3.5">
                            {/* Card Top Avatar & Identity */}
                            <div className="flex items-start gap-3.5">
                              {/* Avatar with Status Pulse & Verified Badge */}
                              <div className="relative w-16 h-16 sm:w-17 sm:h-17 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border-2 border-slate-100 group-hover:border-emerald-500/60 transition-colors shadow-2xs">
                                <img
                                  src={profile.photo}
                                  alt={profile.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                {verified && (
                                  <div className="absolute top-1 right-1 bg-emerald-600 text-white p-0.5 rounded-md shadow-xs" title="Verified Member">
                                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                                  </div>
                                )}
                                <span
                                  className={`absolute bottom-1 right-1 w-3 h-3 rounded-full border-2 border-white shadow-2xs ${
                                    isActive ? 'bg-emerald-500' : 'bg-slate-400'
                                  }`}
                                  title={isActive ? 'Active Account' : 'Deactivated Account'}
                                />
                              </div>

                              {/* Name, Age, and Status Tags */}
                              <div className="space-y-1.5 flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-1">
                                  <h4 className="font-serif font-bold text-base text-slate-900 truncate group-hover:text-emerald-950 transition-colors">
                                    {profile.name}
                                  </h4>
                                  <span className="text-xs text-slate-500 font-semibold shrink-0">
                                    {profile.age} yrs
                                  </span>
                                </div>

                                <div className="flex items-center gap-1.5 flex-wrap">
                                  {/* Gender Tag */}
                                  <span className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                                    isSister
                                      ? 'bg-rose-50 text-rose-700 border border-rose-200/80' 
                                      : 'bg-blue-50 text-blue-700 border border-blue-200/80'
                                  }`}>
                                    <User className="w-2.5 h-2.5" />
                                    {isSister ? 'Sister' : 'Brother'}
                                  </span>

                                  {/* Account State Tag */}
                                  {isActive ? (
                                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                      Active
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                                      Suspended
                                    </span>
                                  )}

                                  {/* Verification Tag */}
                                  {verified ? (
                                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                                      Verified
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                                      Unverified
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Details Information Panel */}
                            <div className="p-3.5 bg-slate-50/80 group-hover:bg-slate-50 rounded-2xl border border-slate-100/90 space-y-2 text-xs text-slate-600 transition-colors">
                              <div className="flex items-center gap-2 text-slate-800 font-medium">
                                <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                <span className="truncate">{profile.profession} {profile.education ? `• ${profile.education}` : ''}</span>
                              </div>
                              <div className="flex items-center gap-2 text-slate-500">
                                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                <span className="truncate">{profile.city}, {profile.country}</span>
                              </div>
                              <div className="flex items-center gap-2 text-[11px] text-amber-800 font-semibold bg-amber-50/70 px-2.5 py-1.5 rounded-xl border border-amber-100">
                                <Heart className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                                <span className="truncate">{profile.maritalStatus} • {profile.polygynyPreference || 'Polygyny Open'}</span>
                              </div>
                              {(profile.religion?.sect || profile.motherTongue) && (
                                <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-0.5">
                                  <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                  <span className="truncate">{[profile.religion?.sect, profile.motherTongue, profile.height].filter(Boolean).join(' • ')}</span>
                                </div>
                              )}
                              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1.5 border-t border-slate-200/60 font-mono">
                                <div className="flex items-center gap-1.5 truncate max-w-[190px]">
                                  <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                                  <span className="truncate">{profile.email || `${profile.id.slice(0, 8)}@nikah.com`}</span>
                                </div>
                                <span className="text-[10px] text-slate-400 shrink-0 font-mono">#{profile.id.slice(0, 6)}</span>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons Row */}
                          <div className="flex items-center gap-2 pt-3 border-t border-slate-100 justify-between flex-wrap">
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => setSelectedProfile(profile)}
                                className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200/80 flex items-center gap-1 active:scale-95 transition-all shadow-2xs"
                                title="Inspect Full Profile Details"
                              >
                                <Eye className="w-3.5 h-3.5 text-slate-500" />
                                <span>Inspect</span>
                              </button>

                              <button
                                onClick={() => setEditProfileData({ ...profile })}
                                className="px-2.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold border border-emerald-200/80 flex items-center gap-1 active:scale-95 transition-all shadow-2xs"
                                title="Edit All Details & Password"
                              >
                                <Edit3 className="w-3.5 h-3.5 text-emerald-700" />
                                <span>Edit All</span>
                              </button>
                            </div>

                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => handleToggleActive(profile.id, isActive)}
                                className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 active:scale-95 transition-all ${
                                  isActive
                                    ? 'bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-700 border border-slate-200 hover:border-rose-200'
                                    : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                                }`}
                                title={isActive ? 'Deactivate Profile' : 'Activate Profile'}
                              >
                                {isActive ? <UserX className="w-3.5 h-3.5 text-rose-500" /> : <UserCheck className="w-3.5 h-3.5" />}
                                <span>{isActive ? 'Deactivate' : 'Activate'}</span>
                              </button>

                              <button
                                onClick={() => handleToggleVerify(profile.id, verified)}
                                className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 active:scale-95 transition-all ${
                                  verified
                                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                                    : 'bg-amber-600 hover:bg-amber-700 text-white shadow-xs'
                                }`}
                                title={verified ? 'Revoke Verification' : 'Verify Profile'}
                              >
                                <ShieldCheck className="w-3.5 h-3.5" />
                                <span>{verified ? 'Verified' : 'Verify'}</span>
                              </button>

                              <button
                                onClick={() => setDeleteConfirmProfile(profile)}
                                className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 active:scale-95 transition-colors"
                                title="Delete Profile Permanently from Database"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              )}

              {/* TABLE VIEW (Optional Toggle for Desktop) */}
              {viewMode === 'table' && (
                <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                          <th className="py-3.5 px-4">Profile</th>
                          <th className="py-3.5 px-3">Gender</th>
                          <th className="py-3.5 px-3">Career & City</th>
                          <th className="py-3.5 px-3">Matrimonial Status</th>
                          <th className="py-3.5 px-3">Status & Verification</th>
                          <th className="py-3.5 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredProfiles.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="py-12 text-center text-slate-500 font-medium">
                              No profiles found matching your search and filter criteria.
                            </td>
                          </tr>
                        ) : (
                          filteredProfiles.map(profile => {
                            const verified = isProfileVerified(profile);
                            return (
                              <tr 
                                key={profile.id}
                                className="hover:bg-slate-50/70 transition-colors"
                              >
                                {/* Profile Info */}
                                <td className="py-3 px-4">
                                  <div className="flex items-center gap-3">
                                    <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                                      <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover" />
                                      {verified && (
                                        <div className="absolute top-0.5 right-0.5 bg-emerald-600 text-white p-0.5 rounded-full shadow-xs">
                                          <Check className="w-2 h-2 stroke-[3]" />
                                        </div>
                                      )}
                                    </div>
                                    <div>
                                      <div className="font-bold text-slate-900 text-sm">{profile.name}</div>
                                      <div className="text-[11px] text-slate-500">{profile.age} yrs • {profile.email || `${profile.id}@nikah.com`}</div>
                                    </div>
                                  </div>
                                </td>

                                {/* Gender Badge */}
                                <td className="py-3 px-3">
                                  <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase ${
                                    profile.gender === 'female' 
                                      ? 'bg-rose-50 text-rose-700 border border-rose-200/70' 
                                      : 'bg-blue-50 text-blue-700 border border-blue-200/70'
                                  }`}>
                                    {profile.gender}
                                  </span>
                                </td>

                                {/* Career & Location */}
                                <td className="py-3 px-3 text-slate-700">
                                  <div className="font-medium text-slate-800">{profile.profession}</div>
                                  <div className="text-[11px] text-slate-500">{profile.city}, {profile.country}</div>
                                </td>

                                {/* Marital Status */}
                                <td className="py-3 px-3">
                                  <div className="font-medium text-slate-800">{profile.maritalStatus}</div>
                                  <div className="text-[11px] text-amber-700 font-semibold">{profile.polygynyPreference || 'Polygyny Open'}</div>
                                </td>

                                {/* Status & Verification */}
                                <td className="py-3 px-3">
                                  <div className="space-y-1">
                                    <div>
                                      {profile.isActive !== false ? (
                                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                          Active
                                        </span>
                                      ) : (
                                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                                          Deactivated
                                        </span>
                                      )}
                                    </div>
                                    <div>
                                      {verified ? (
                                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                                          <ShieldCheck className="w-2.5 h-2.5" />
                                          Verified
                                        </span>
                                      ) : (
                                        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                                          Unverified
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </td>

                                {/* Action Buttons */}
                                <td className="py-3 px-4 text-right">
                                  <div className="flex items-center justify-end gap-1.5">
                                    <button
                                      onClick={() => setSelectedProfile(profile)}
                                      className="px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 flex items-center gap-1 transition-colors"
                                      title="Inspect Profile"
                                    >
                                      <Eye className="w-3.5 h-3.5 text-slate-500" />
                                      <span>Inspect</span>
                                    </button>

                                    <button
                                      onClick={() => setEditProfileData({ ...profile })}
                                      className="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold border border-emerald-200 flex items-center gap-1 transition-colors"
                                      title="Edit All Details & Password"
                                    >
                                      <Edit3 className="w-3.5 h-3.5 text-emerald-700" />
                                      <span>Edit</span>
                                    </button>

                                    <button
                                      onClick={() => handleToggleActive(profile.id, profile.isActive !== false)}
                                      className={`px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                                        profile.isActive !== false
                                          ? 'bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-700 border border-slate-200'
                                          : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                                      }`}
                                      title={profile.isActive !== false ? 'Deactivate Profile' : 'Activate Profile'}
                                    >
                                      {profile.isActive !== false ? <UserX className="w-3.5 h-3.5 text-rose-500" /> : <UserCheck className="w-3.5 h-3.5" />}
                                      <span>{profile.isActive !== false ? 'Deactivate' : 'Activate'}</span>
                                    </button>

                                    <button
                                      onClick={() => handleToggleVerify(profile.id, verified)}
                                      className={`px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                                        verified
                                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                                          : 'bg-amber-600 hover:bg-amber-700 text-white shadow-xs'
                                      }`}
                                    >
                                      <ShieldCheck className="w-3.5 h-3.5" />
                                      <span>{verified ? 'Verified' : 'Verify'}</span>
                                    </button>

                                    <button
                                      onClick={() => setDeleteConfirmProfile(profile)}
                                      className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-colors"
                                      title="Delete Profile & Account Permanently from Database"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================= TAB 3: KYC & WALI VERIFICATION QUEUE ================= */}
          {activeTab === 'verifications' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              {verificationsList.length === 0 ? (
                <div className="bg-white border border-slate-200/80 rounded-2xl p-12 text-center space-y-3 shadow-xs">
                  <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-100 w-fit mx-auto">
                    <FileCheck2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-base">No Pending Verifications</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    All submitted KYC and Wali authorization documents have been reviewed.
                  </p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {verificationsList.map(item => (
                    <div key={item.id} className="bg-white border border-slate-200/80 rounded-2xl p-5 space-y-4 shadow-xs hover:shadow-md transition-all">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3.5">
                          <img 
                            src={item.user_photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'} 
                            alt={item.user_name} 
                            className="w-12 h-12 rounded-xl object-cover border border-slate-200" 
                          />
                          <div>
                            <h4 className="font-bold text-sm text-slate-900">{item.user_name}</h4>
                            <p className="text-xs text-slate-500 font-medium">{item.document_type}</p>
                            <span className={`inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                              item.status === 'approved' 
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                                : item.status === 'rejected' 
                                  ? 'bg-rose-50 text-rose-700 border border-rose-200' 
                                  : 'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}>
                              {item.status}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {item.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleApproveVerification(item.id, item.user_id)}
                                className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white text-xs font-bold shadow-xs active:scale-98 transition-all"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => setRejectModal({ id: item.id, name: item.user_name })}
                                className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition-colors"
                              >
                                Reject
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ================= TAB 4: SAFETY & MODERATION ================= */}
          {activeTab === 'reports' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              {reportsList.length === 0 ? (
                <div className="bg-white border border-slate-200/80 rounded-2xl p-12 text-center space-y-3 shadow-xs">
                  <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-100 w-fit mx-auto">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-base">Community Safe & Clean</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Zero active safety moderation flags registered in MySQL.
                  </p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {reportsList.map(item => (
                    <div key={item.id} className="bg-white border border-slate-200/80 rounded-2xl p-5 space-y-3 shadow-xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
                          <AlertTriangle className="w-4 h-4 text-rose-600" />
                          <span>{item.reason}</span>
                        </div>
                        <button
                          onClick={() => handleResolveReport(item.id)}
                          className="px-4 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs active:scale-98 transition-all"
                        >
                          Resolve Report
                        </button>
                      </div>
                      <p className="text-xs text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-200/70 leading-relaxed">
                        {item.details}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ================= TAB 5: SUBSCRIPTIONS & VIP ================= */}
          {activeTab === 'subscriptions' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="grid md:grid-cols-3 gap-5">
                {/* Free Starter */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 space-y-4 shadow-xs hover:shadow-md transition-all">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Free Starter</h4>
                  <div className="text-3xl font-serif font-bold text-slate-900">
                    ₹0 <span className="text-xs font-sans text-slate-400 font-normal">/ forever</span>
                  </div>
                  <div className="pt-2 border-t border-slate-100">
                    <p className="text-xs font-semibold text-slate-600">All New Signups</p>
                  </div>
                </div>

                {/* Premium Blessed */}
                <div className="bg-white border-2 border-emerald-600/80 rounded-2xl p-6 space-y-4 shadow-sm hover:shadow-md transition-all relative">
                  <div className="absolute -top-3 left-6">
                    <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-100 px-3 py-0.5 rounded-full border border-emerald-200 shadow-xs">
                      Most Popular
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Premium Blessed</h4>
                  <div className="text-3xl font-serif font-bold text-slate-900">
                    ₹1,499 <span className="text-xs font-sans text-slate-400 font-normal">/ month</span>
                  </div>
                  <div className="pt-2 border-t border-slate-100">
                    <p className="text-xs text-emerald-700 font-bold">14 Active Members</p>
                  </div>
                </div>

                {/* Royal Nikah Elite */}
                <div className="bg-white border border-amber-300 rounded-2xl p-6 space-y-4 shadow-xs hover:shadow-md transition-all relative">
                  <div className="absolute -top-3 left-6">
                    <span className="text-[10px] uppercase font-bold text-amber-800 bg-amber-100 px-3 py-0.5 rounded-full border border-amber-200 shadow-xs">
                      VIP Concierge
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-amber-700 uppercase tracking-wider">Royal Nikah Elite</h4>
                  <div className="text-3xl font-serif font-bold text-slate-900">
                    ₹2,999 <span className="text-xs font-sans text-slate-400 font-normal">/ month</span>
                  </div>
                  <div className="pt-2 border-t border-slate-100">
                    <p className="text-xs text-amber-700 font-bold">5 Active VIP Members</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* ================= MOBILE NATIVE APP BOTTOM NAVBAR ================= */}
        <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 py-1.5 flex items-center justify-around md:hidden">
          {navTabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  triggerHaptic(12);
                  setActiveTab(tab.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-2xl relative transition-all duration-200 active:scale-95 ${
                  isActive
                    ? 'text-emerald-800 font-bold'
                    : 'text-slate-400 hover:text-slate-600 font-medium'
                }`}
              >
                <div className={`p-1.5 rounded-xl transition-all ${
                  isActive ? 'bg-emerald-50 scale-110 shadow-xs' : ''
                }`}>
                  <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-700' : 'text-slate-400'}`} />
                </div>
                <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-[62px]">
                  {tab.label}
                </span>

                {/* Notification Bubble */}
                {tab.count !== null && tab.count > 0 && (
                  <span className={`absolute top-0.5 right-2 text-[9px] font-bold px-1.5 py-0.2 rounded-full leading-tight shadow-xs ${
                    tab.id === 'verifications' || tab.id === 'reports'
                      ? 'bg-amber-500 text-white'
                      : 'bg-emerald-600 text-white'
                  }`}>
                    {tab.count > 99 ? '99+' : tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* ================= MODAL: CHANGE ADMIN ID & PASSWORD ================= */}
      {isSecurityModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white border border-slate-200 w-full max-w-md rounded-3xl p-6 space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5 text-emerald-700">
                <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-100">
                  <KeyRound className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">Change Admin ID & Password</h3>
                  <p className="text-[11px] text-slate-500">Update your console login credentials</p>
                </div>
              </div>
              <button 
                onClick={() => setIsSecurityModalOpen(false)} 
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSecurity} className="space-y-4 text-xs">
              {/* Admin ID / Email */}
              <div className="space-y-1.5">
                <label className="block text-slate-700 font-semibold">
                  Admin Login ID (Email) *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={adminFormEmail}
                    onChange={e => setAdminFormEmail(e.target.value)}
                    placeholder="e.g. admin@polygamymatrimony.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/10 transition-all font-medium"
                  />
                </div>
                <p className="text-[10px] text-slate-400">
                  This email is your login username for the Admin Console.
                </p>
              </div>

              {/* Admin Name */}
              <div className="space-y-1.5">
                <label className="block text-slate-700 font-semibold">
                  Administrator Display Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={adminFormName}
                    onChange={e => setAdminFormName(e.target.value)}
                    placeholder="Chief Sharia Administrator"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/10 transition-all font-medium"
                  />
                </div>
              </div>

              {/* New Password */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between">
                  <label className="block text-slate-700 font-semibold">
                    New Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-1"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{showPassword ? 'Hide' : 'Show'}</span>
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={adminFormNewPassword}
                    onChange={e => setAdminFormNewPassword(e.target.value)}
                    placeholder="Leave empty if keeping current password"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/10 transition-all font-medium"
                  />
                </div>
              </div>

              {/* Confirm New Password */}
              {adminFormNewPassword && (
                <div className="space-y-1.5 animate-in fade-in duration-150">
                  <label className="block text-slate-700 font-semibold">
                    Confirm New Password *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required={Boolean(adminFormNewPassword)}
                      value={adminFormConfirmPassword}
                      onChange={e => setAdminFormConfirmPassword(e.target.value)}
                      placeholder="Re-enter new password"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/10 transition-all font-medium"
                    />
                  </div>
                </div>
              )}

              <div className="p-3 bg-emerald-50/60 rounded-2xl border border-emerald-100/80 text-[11px] text-emerald-900 leading-relaxed">
                🔒 <strong>Security Note:</strong> Changing your credentials will update your Admin login immediately across all devices and databases.
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsSecurityModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingSecurity}
                  className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold shadow-sm active:scale-98 transition-all"
                >
                  {isSavingSecurity ? 'Saving...' : 'Save New Credentials'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL 1: CREATE NEW PROFILE ================= */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white border border-slate-200 w-full max-w-lg rounded-3xl p-6 space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5 text-emerald-700">
                <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-100">
                  <Plus className="w-5 h-5 text-emerald-700" />
                </div>
                <h3 className="font-bold text-base text-slate-900">Create New Member Profile</h3>
              </div>
              <button 
                onClick={() => setIsAddUserModalOpen(false)} 
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUserSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-700 mb-1 font-semibold">Full Name *</label>
                <input
                  type="text"
                  required
                  value={newUser.name}
                  onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="e.g. Fatima Zahra"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/10"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Gender *</label>
                  <select
                    value={newUser.gender}
                    onChange={e => setNewUser({ ...newUser, gender: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600"
                  >
                    <option value="female">Female (Muslimah)</option>
                    <option value="male">Male (Brother)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Age *</label>
                  <input
                    type="number"
                    min={18}
                    max={75}
                    value={newUser.age}
                    onChange={e => setNewUser({ ...newUser, age: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">City *</label>
                  <input
                    type="text"
                    value={newUser.city}
                    onChange={e => setNewUser({ ...newUser, city: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Profession *</label>
                  <input
                    type="text"
                    value={newUser.profession}
                    onChange={e => setNewUser({ ...newUser, profession: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Marital Status</label>
                  <select
                    value={newUser.maritalStatus}
                    onChange={e => setNewUser({ ...newUser, maritalStatus: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600"
                  >
                    <option value="Never Married">Never Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                    <option value="Married (Seeking 2nd Wife)">Married (Seeking 2nd Wife)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Polygyny Preference</label>
                  <select
                    value={newUser.polygynyPreference}
                    onChange={e => setNewUser({ ...newUser, polygynyPreference: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600"
                  >
                    <option value="Open to Discussion">Open to Discussion</option>
                    <option value="First Wife">First Wife</option>
                    <option value="Second Wife">Second Wife</option>
                    <option value="Third Wife">Third Wife</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="verifiedCheck"
                  checked={newUser.isVerified}
                  onChange={e => setNewUser({ ...newUser, isVerified: e.target.checked })}
                  className="rounded accent-emerald-600 w-4 h-4"
                />
                <label htmlFor="verifiedCheck" className="text-slate-800 font-semibold cursor-pointer">
                  Issue Verified Identity & Wali Badge immediately
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddUserModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold shadow-sm active:scale-98 transition-all"
                >
                  {isLoading ? 'Saving...' : 'Save to MySQL Database'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL 2: EDIT PROFILE (FULL CONTROL) ================= */}
      {editProfileData && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
          <div className="bg-white border border-slate-200 w-full max-w-2xl rounded-3xl p-5 sm:p-7 space-y-5 max-h-[92vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3 text-emerald-700">
                <div className="p-2.5 rounded-2xl bg-emerald-50 border border-emerald-100">
                  <Edit3 className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-slate-900">Edit Member Profile & Full Account Control</h3>
                  <p className="text-xs text-slate-500 font-medium">User ID: <span className="font-mono text-slate-700">{editProfileData.id}</span></p>
                </div>
              </div>
              <button 
                onClick={() => setEditProfileData(null)} 
                className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6 text-xs">
              {/* SECTION 1: ACCOUNT STATUS & CREDENTIALS */}
              <div className="bg-slate-50/90 border border-slate-200/80 rounded-2xl p-4 space-y-3.5">
                <div className="flex items-center gap-2 pb-1 border-b border-slate-200/60">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 uppercase tracking-wider">Account Status & Security Control</h4>
                </div>

                {/* Activation Status Control */}
                <div>
                  <label className="block text-slate-700 font-semibold mb-1.5">Profile Account Status</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setEditProfileData({ ...editProfileData, isActive: true, status: 'active', account_status: 'active' })}
                      className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all text-left ${
                        editProfileData.isActive !== false
                          ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950 ring-2 ring-emerald-500/20 shadow-xs'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <div className={`p-1.5 rounded-lg ${editProfileData.isActive !== false ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                        <UserCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-xs">Active Profile</div>
                        <div className="text-[10px] text-slate-500">Visible in search & matches</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setEditProfileData({ ...editProfileData, isActive: false, status: 'suspended', account_status: 'deactivated' })}
                      className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all text-left ${
                        editProfileData.isActive === false
                          ? 'bg-rose-50/90 border-rose-300 text-rose-950 ring-2 ring-rose-500/20 shadow-xs'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <div className={`p-1.5 rounded-lg ${editProfileData.isActive === false ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                        <UserX className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-xs">Deactivated / Suspended</div>
                        <div className="text-[10px] text-slate-500">Hidden from matrimonial app</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Email & Password & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      Member Email Address
                    </label>
                    <input
                      type="email"
                      value={editProfileData.email || ''}
                      onChange={e => setEditProfileData({ ...editProfileData, email: e.target.value })}
                      placeholder="user@example.com"
                      className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/10"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-slate-400" />
                        Set / Reset Member Password
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowEditUserPassword(!showEditUserPassword)}
                        className="text-[10px] font-bold text-emerald-700 hover:underline"
                      >
                        {showEditUserPassword ? 'Hide' : 'Show'}
                      </button>
                    </label>
                    <div className="relative">
                      <input
                        type={showEditUserPassword ? 'text' : 'password'}
                        value={editProfileData.password || ''}
                        onChange={e => setEditProfileData({ ...editProfileData, password: e.target.value })}
                        placeholder="Enter new password (optional)"
                        className="w-full bg-white border border-slate-200 rounded-xl p-2.5 pr-8 text-slate-900 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowEditUserPassword(!showEditUserPassword)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showEditUserPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">Leave empty to keep existing password</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      Contact / Wali Phone
                    </label>
                    <input
                      type="text"
                      value={editProfileData.phone || ''}
                      onChange={e => setEditProfileData({ ...editProfileData, phone: e.target.value })}
                      placeholder="+91 98220 11223"
                      className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/10"
                    />
                  </div>

                  {/* Verification & VIP Toggles */}
                  <div className="flex items-center gap-4 pt-4 sm:pt-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={Boolean(editProfileData.is_verified ?? editProfileData.verified?.reviewed)}
                        onChange={e => setEditProfileData({
                          ...editProfileData,
                          is_verified: e.target.checked,
                          verified: {
                            ...(editProfileData.verified || { mobile: true, email: true, photo: true, identity: true, reviewed: true }),
                            identity: e.target.checked,
                            reviewed: e.target.checked
                          }
                        })}
                        className="rounded accent-emerald-600 w-4 h-4"
                      />
                      <span className="font-semibold text-slate-800 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                        Verified Member
                      </span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={Boolean(editProfileData.is_vip)}
                        onChange={e => setEditProfileData({ ...editProfileData, is_vip: e.target.checked })}
                        className="rounded accent-amber-600 w-4 h-4"
                      />
                      <span className="font-semibold text-slate-800 flex items-center gap-1">
                        <Crown className="w-3.5 h-3.5 text-amber-600" />
                        VIP Elite
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* SECTION 2: PERSONAL PARTICULARS */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-4 space-y-3.5">
                <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
                  <User className="w-4 h-4 text-emerald-700" />
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 uppercase tracking-wider">Personal Particulars</h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-slate-700 font-semibold mb-1">Full Name</label>
                    <input
                      type="text"
                      value={editProfileData.name}
                      onChange={e => setEditProfileData({ ...editProfileData, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Age (Years)</label>
                    <input
                      type="number"
                      value={editProfileData.age}
                      onChange={e => setEditProfileData({ ...editProfileData, age: Number(e.target.value) || editProfileData.age })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Gender</label>
                    <select
                      value={editProfileData.gender}
                      onChange={e => setEditProfileData({ ...editProfileData, gender: e.target.value as 'female' | 'male' })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600"
                    >
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Height</label>
                    <input
                      type="text"
                      value={editProfileData.height || "5' 5\" (165 cm)"}
                      onChange={e => setEditProfileData({ ...editProfileData, height: e.target.value })}
                      placeholder="e.g. 5' 6&quot; (168 cm)"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Mother Tongue</label>
                    <input
                      type="text"
                      value={editProfileData.motherTongue || 'Urdu'}
                      onChange={e => setEditProfileData({ ...editProfileData, motherTongue: e.target.value })}
                      placeholder="Urdu, Hindi, English..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 3: LOCATION & CAREER */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-4 space-y-3.5">
                <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
                  <Briefcase className="w-4 h-4 text-emerald-700" />
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 uppercase tracking-wider">Location & Career</h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">City</label>
                    <input
                      type="text"
                      value={editProfileData.city}
                      onChange={e => setEditProfileData({ ...editProfileData, city: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">State / Province</label>
                    <input
                      type="text"
                      value={editProfileData.state || ''}
                      onChange={e => setEditProfileData({ ...editProfileData, state: e.target.value })}
                      placeholder="State or Region"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Country</label>
                    <input
                      type="text"
                      value={editProfileData.country || 'India'}
                      onChange={e => setEditProfileData({ ...editProfileData, country: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Profession / Occupation</label>
                    <input
                      type="text"
                      value={editProfileData.profession}
                      onChange={e => setEditProfileData({ ...editProfileData, profession: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Company / Organization</label>
                    <input
                      type="text"
                      value={editProfileData.company || ''}
                      onChange={e => setEditProfileData({ ...editProfileData, company: e.target.value })}
                      placeholder="Company / Employer name"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Education Level</label>
                    <input
                      type="text"
                      value={editProfileData.education || 'Graduate'}
                      onChange={e => setEditProfileData({ ...editProfileData, education: e.target.value })}
                      placeholder="Bachelors, Masters, etc."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Degree Title</label>
                    <input
                      type="text"
                      value={editProfileData.degree || ''}
                      onChange={e => setEditProfileData({ ...editProfileData, degree: e.target.value })}
                      placeholder="B.Tech, MBA, MBBS..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">University</label>
                    <input
                      type="text"
                      value={editProfileData.university || ''}
                      onChange={e => setEditProfileData({ ...editProfileData, university: e.target.value })}
                      placeholder="University / Institute"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 4: MARITAL STATUS & POLYGYNY PREFERENCES */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-4 space-y-3.5">
                <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
                  <Heart className="w-4 h-4 text-amber-600" />
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 uppercase tracking-wider">Marital & Polygyny Particulars</h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Marital Status</label>
                    <select
                      value={editProfileData.maritalStatus}
                      onChange={e => setEditProfileData({ ...editProfileData, maritalStatus: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600"
                    >
                      <option value="Never Married">Never Married</option>
                      <option value="Married (Seeking 2nd Wife)">Married (Seeking 2nd Wife)</option>
                      <option value="Married (Seeking 3rd/4th Wife)">Married (Seeking 3rd/4th Wife)</option>
                      <option value="Divorced">Divorced</option>
                      <option value="Widowed">Widowed</option>
                      <option value="Open to Polygyny (Co-Wife)">Open to Polygyny (Co-Wife)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Polygyny Preference</label>
                    <select
                      value={editProfileData.polygynyPreference || 'Open to Discussion'}
                      onChange={e => setEditProfileData({ ...editProfileData, polygynyPreference: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600"
                    >
                      <option value="Open to Polygyny / Second Wife">Open to Polygyny / Second Wife</option>
                      <option value="First Marriage Only">First Marriage Only</option>
                      <option value="Open to Discussion">Open to Discussion</option>
                      <option value="Seeking Second Wife">Seeking Second Wife</option>
                      <option value="Seeking 3rd/4th Wife">Seeking 3rd/4th Wife</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Has Children</label>
                    <select
                      value={editProfileData.hasChildren || 'No'}
                      onChange={e => setEditProfileData({ ...editProfileData, hasChildren: e.target.value as any })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600"
                    >
                      <option value="No">No</option>
                      <option value="Yes, living together">Yes, living together</option>
                      <option value="Yes, living separately">Yes, living separately</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION 5: RELIGIOUS COMMITMENT & ISLAMIC VALUES */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-4 space-y-3.5">
                <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
                  <Sparkles className="w-4 h-4 text-emerald-700" />
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 uppercase tracking-wider">Islamic Practice & Sharia Details</h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Sect / School of Thought</label>
                    <input
                      type="text"
                      value={editProfileData.religion?.sect || 'Sunni (Hanafi)'}
                      onChange={e => setEditProfileData({
                        ...editProfileData,
                        religion: {
                          ...(editProfileData.religion || {} as any),
                          sect: e.target.value
                        }
                      })}
                      placeholder="e.g. Sunni (Hanafi), Salafi..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Prayer Frequency</label>
                    <select
                      value={editProfileData.religion?.prayerFrequency || 'Always (5 times daily)'}
                      onChange={e => setEditProfileData({
                        ...editProfileData,
                        religion: {
                          ...(editProfileData.religion || {} as any),
                          prayerFrequency: e.target.value as any
                        }
                      })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600"
                    >
                      <option value="Always (5 times daily)">Always (5 times daily)</option>
                      <option value="Usually">Usually</option>
                      <option value="Sometimes">Sometimes</option>
                      <option value="Only Jummah">Only Jummah</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Halal Diet</label>
                    <select
                      value={editProfileData.religion?.halalDiet || 'Strictly Halal'}
                      onChange={e => setEditProfileData({
                        ...editProfileData,
                        religion: {
                          ...(editProfileData.religion || {} as any),
                          halalDiet: e.target.value as any
                        }
                      })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600"
                    >
                      <option value="Strictly Halal">Strictly Halal</option>
                      <option value="Halal Only">Halal Only</option>
                      <option value="Vegetarian / Halal">Vegetarian / Halal</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION 6: BIO, LOOKING FOR & PHOTOS */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-4 space-y-3.5">
                <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
                  <User className="w-4 h-4 text-emerald-700" />
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 uppercase tracking-wider">Profile Media & Biography</h4>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Profile Photo URL</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={editProfileData.photo}
                      onChange={e => setEditProfileData({ ...editProfileData, photo: e.target.value })}
                      placeholder="https://..."
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600"
                    />
                    {editProfileData.photo && (
                      <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-200 shrink-0">
                        <img src={editProfileData.photo} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">About Profile (About Me)</label>
                  <textarea
                    rows={3}
                    value={editProfileData.aboutMe || ''}
                    onChange={e => setEditProfileData({ ...editProfileData, aboutMe: e.target.value })}
                    placeholder="Describe personal background, Islamic commitment, aspirations..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Partner Preferences & Requirements</label>
                  <textarea
                    rows={2}
                    value={editProfileData.lookingForSummary || ''}
                    onChange={e => setEditProfileData({ ...editProfileData, lookingForSummary: e.target.value })}
                    placeholder="Preferred age, religious qualities, relocation..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditProfileData(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isSavingProfile}
                  onClick={handleSaveEditProfile}
                  className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold shadow-sm active:scale-98 transition-all flex items-center gap-2"
                >
                  {isSavingProfile ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Saving All Changes...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Save All Changes to Database</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL 3: PROFILE INSPECTOR ================= */}
      {selectedProfile && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white border border-slate-200 w-full max-w-lg rounded-3xl p-6 space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-slate-900">Full Profile Inspector</h3>
                {selectedProfile.isActive !== false ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Active
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                    Deactivated
                  </span>
                )}
              </div>
              <button 
                onClick={() => setSelectedProfile(null)} 
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-3.5 p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80">
              <img src={selectedProfile.photo} alt={selectedProfile.name} className="w-16 h-16 rounded-2xl object-cover border border-slate-200" />
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-base text-slate-900 truncate">{selectedProfile.name}, {selectedProfile.age}</h4>
                <p className="text-xs text-slate-500 truncate">{selectedProfile.profession} • {selectedProfile.city}, {selectedProfile.country}</p>
                <p className="text-xs text-amber-700 font-semibold truncate">{selectedProfile.maritalStatus} • {selectedProfile.polygynyPreference || 'Polygyny Open'}</p>
                {selectedProfile.email && (
                  <p className="text-[11px] text-slate-600 font-mono truncate pt-0.5">{selectedProfile.email}</p>
                )}
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <p className="text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-200/70">
                "{selectedProfile.aboutMe}"
              </p>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/70 space-y-1.5">
                <p className="font-bold text-slate-900">Sharia & Wali Particulars:</p>
                <p className="text-slate-600">Sect: <strong className="text-slate-900">{selectedProfile.religion?.sect || 'Sunni (Hanafi)'}</strong></p>
                <p className="text-slate-600">Prayer: <strong className="text-slate-900">{selectedProfile.religion?.prayerFrequency || 'Always (5 times daily)'}</strong></p>
                <p className="text-slate-600">Halal Diet: <strong className="text-slate-900">{selectedProfile.religion?.halalDiet || 'Strictly Halal'}</strong></p>
                <p className="text-slate-600">Contact / Phone: <strong className="text-slate-900">{selectedProfile.phone || 'On file'}</strong></p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-100 flex-wrap">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const profileToEdit = { ...selectedProfile };
                    setSelectedProfile(null);
                    setEditProfileData(profileToEdit);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 flex items-center gap-1.5 transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Edit All Details</span>
                </button>

                <button
                  onClick={() => handleToggleActive(selectedProfile.id, selectedProfile.isActive !== false)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                    selectedProfile.isActive !== false
                      ? 'bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700 border border-slate-200'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                  }`}
                >
                  {selectedProfile.isActive !== false ? <UserX className="w-3.5 h-3.5 text-rose-500" /> : <UserCheck className="w-3.5 h-3.5" />}
                  <span>{selectedProfile.isActive !== false ? 'Deactivate' : 'Activate'}</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedProfile(null)}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                >
                  Close
                </button>
                <button
                  onClick={() => handleToggleVerify(selectedProfile.id, isProfileVerified(selectedProfile))}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    isProfileVerified(selectedProfile) 
                      ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200' 
                      : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs'
                  }`}
                >
                  {isProfileVerified(selectedProfile) ? 'Revoke Verification' : 'Issue Verification'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL 4: DELETE CONFIRMATION ================= */}
      {deleteConfirmProfile && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white border border-slate-200 w-full max-w-md rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-rose-700">
              <div className="p-2.5 rounded-2xl bg-rose-50 border border-rose-100">
                <Trash2 className="w-5 h-5 text-rose-600" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900">Delete Profile & Account</h3>
                <p className="text-xs text-slate-500">Permanent administrative action</p>
              </div>
            </div>

            <p className="text-xs text-slate-700 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/70 leading-relaxed">
              Are you sure you want to permanently delete <strong className="text-slate-900">{deleteConfirmProfile.name}</strong> ({deleteConfirmProfile.city}) from the live Hostinger MySQL database? This will cascade remove their messages, interests, and profile verification records.
            </p>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setDeleteConfirmProfile(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteProfile(deleteConfirmProfile)}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm transition-colors"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL 5: REJECT VERIFICATION ================= */}
      {rejectModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white border border-slate-200 w-full max-w-md rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5 text-amber-700">
                <div className="p-2 rounded-xl bg-amber-50 border border-amber-100">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                </div>
                <h3 className="font-bold text-base text-slate-900">Reject Verification Request</h3>
              </div>
              <button 
                onClick={() => setRejectModal(null)} 
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-700">
              Provide an administrative rejection reason for <strong className="text-slate-900">{rejectModal.name}</strong>:
            </p>

            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="e.g. Wali identity document is blurred; unverified matrimonial status claim."
              rows={3}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-amber-600"
            />

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setRejectModal(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleRejectVerificationConfirm}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm"
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
