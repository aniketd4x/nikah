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
  User
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

  const handleSaveEditProfile = async () => {
    if (!editProfileData) return;
    triggerHaptic(15);
    await api.updateProfile(editProfileData.id, editProfileData);
    setProfilesList(prev => prev.map(p => p.id === editProfileData.id ? { ...p, ...editProfileData } : p));
    if (selectedProfile?.id === editProfileData.id) setSelectedProfile({ ...selectedProfile, ...editProfileData });
    setEditProfileData(null);
    addToast('Changes Saved', 'User profile details updated.', 'success');
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
        {/* Sticky Top Header (Clean Minimal White) */}
        <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="p-2 rounded-xl md:hidden text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/80"
              title="Open Navigation"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
                <span>Admin Console</span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-slate-700 capitalize">{activeTab}</span>
              </div>
              <h2 className="font-serif font-bold text-base sm:text-lg text-slate-900 tracking-tight">
                {activeTab === 'overview' && 'Analytics Overview'}
                {activeTab === 'users' && `Users & Profiles (${profilesList.length})`}
                {activeTab === 'verifications' && `KYC & Wali Queue (${verificationsList.filter(v => v.status === 'pending').length})`}
                {activeTab === 'reports' && `Safety & Moderation (${reportsList.filter(r => r.status === 'pending').length})`}
                {activeTab === 'subscriptions' && 'Subscriptions & VIP'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Change Admin ID & Password Button */}
            <button
              onClick={openSecurityModal}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-white text-slate-700 hover:text-slate-900 border border-slate-200/80 hover:bg-emerald-50/40 hover:border-emerald-200 transition-all shadow-xs flex items-center gap-1.5 text-xs font-semibold"
              title="Change Admin ID & Password"
            >
              <KeyRound className="w-3.5 h-3.5 text-emerald-700" />
              <span className="hidden lg:inline">Change ID / Password</span>
              <span className="inline lg:hidden">ID & Pass</span>
            </button>

            <button
              onClick={() => { triggerHaptic(10); loadData(); }}
              className="p-2 rounded-xl bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-50 transition-all shadow-xs flex items-center gap-1.5 text-xs font-semibold"
              title="Refresh Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-emerald-600' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              onClick={() => navigateTo('dashboard')}
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 px-3.5 py-2 rounded-xl bg-white border border-slate-200/80 hover:bg-slate-50 transition-colors shadow-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-slate-500" />
              <span>Switch to User View</span>
            </button>

            <button
              onClick={() => {
                localStorage.removeItem('nikah_admin_token');
                navigateTo('landing');
              }}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-rose-50 text-rose-700 border border-rose-200/70 hover:bg-rose-100 transition-colors text-xs font-semibold flex items-center gap-1.5"
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
              {/* Statistic Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Total Database Users */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-5 space-y-3 shadow-xs hover:shadow-md transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Total Database Users
                    </span>
                    <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100">
                      <Users className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-3xl font-serif font-bold text-slate-900 tracking-tight">
                    {profilesList.length}
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50/70 border border-emerald-100 px-2.5 py-1 rounded-full w-fit">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Live Hostinger MySQL</span>
                  </div>
                </div>

                {/* Verified Profiles */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-5 space-y-3 shadow-xs hover:shadow-md transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Verified Profiles
                    </span>
                    <div className="p-2 rounded-xl bg-blue-50 text-blue-700 border border-blue-100">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-3xl font-serif font-bold text-slate-900 tracking-tight">
                    {profilesList.filter(isProfileVerified).length}
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-blue-700 bg-blue-50/70 border border-blue-100 px-2.5 py-1 rounded-full w-fit">
                    <span>{Math.round((profilesList.filter(isProfileVerified).length / (profilesList.length || 1)) * 100)}% Verified</span>
                  </div>
                </div>

                {/* KYC & Wali Queue */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-5 space-y-3 shadow-xs hover:shadow-md transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      KYC & Wali Queue
                    </span>
                    <div className="p-2 rounded-xl bg-amber-50 text-amber-700 border border-amber-100">
                      <FileCheck2 className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-3xl font-serif font-bold text-slate-900 tracking-tight">
                    {verificationsList.filter(v => v.status === 'pending').length}
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-700 bg-amber-50/70 border border-amber-100 px-2.5 py-1 rounded-full w-fit">
                    <span>Action Required</span>
                  </div>
                </div>

                {/* Monthly Revenue */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-5 space-y-3 shadow-xs hover:shadow-md transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Monthly Revenue
                    </span>
                    <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100">
                      <Crown className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-3xl font-serif font-bold text-slate-900 tracking-tight">
                    ₹{stats.revenueMonthly.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50/70 border border-emerald-100 px-2.5 py-1 rounded-full w-fit">
                    <span>Active Subscriptions</span>
                  </div>
                </div>
              </div>

              {/* Administrative Actions Panel */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 space-y-4 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-serif font-bold text-base text-slate-900">
                    Administrative Actions
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">
                    Sharia Control Panel
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button
                    onClick={() => setIsAddUserModalOpen(true)}
                    className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50/70 to-teal-50/40 border border-emerald-200/80 hover:border-emerald-300 text-left transition-all duration-150 group shadow-xs hover:shadow-sm"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="p-3 rounded-xl bg-emerald-700 text-white group-hover:scale-105 transition-transform">
                        <Plus className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 group-hover:text-emerald-800 transition-colors">
                          + Add New Profile
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Create new member profile
                        </p>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveTab('users')}
                    className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-slate-300 text-left transition-all duration-150 group shadow-xs hover:shadow-sm"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="p-3 rounded-xl bg-slate-800 text-white group-hover:scale-105 transition-transform">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 group-hover:text-emerald-800 transition-colors">
                          Manage All Users
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Inspect, edit, verify or remove
                        </p>
                      </div>
                    </div>
                  </button>

                  {/* Change Admin ID & Password Action Card */}
                  <button
                    onClick={openSecurityModal}
                    className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-emerald-300 text-left transition-all duration-150 group shadow-xs hover:shadow-sm"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 group-hover:scale-105 transition-transform">
                        <KeyRound className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 group-hover:text-emerald-800 transition-colors">
                          Change ID & Password
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Update credentials & credentials
                        </p>
                      </div>
                    </div>
                  </button>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {filteredProfiles.length === 0 ? (
                    <div className="col-span-full bg-white border border-slate-200/80 rounded-2xl p-12 text-center text-slate-500 font-medium">
                      No profiles found matching your search and filter criteria.
                    </div>
                  ) : (
                    filteredProfiles.map(profile => {
                      const verified = isProfileVerified(profile);
                      return (
                        <div
                          key={profile.id}
                          className="bg-white border border-slate-200/80 rounded-3xl p-5 space-y-4 shadow-xs hover:shadow-card hover:border-emerald-300 transition-all duration-200 flex flex-col justify-between group"
                        >
                          <div className="space-y-3.5">
                            {/* Card Top Avatar & Identity */}
                            <div className="flex items-start gap-4">
                              <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border-2 border-slate-200 group-hover:border-emerald-500 transition-colors shadow-xs">
                                <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                {verified && (
                                  <div className="absolute top-1 right-1 bg-emerald-600 text-white p-0.5 rounded-full shadow-xs">
                                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                                  </div>
                                )}
                              </div>

                              <div className="space-y-1.5 flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h4 className="font-serif font-bold text-base text-slate-900 truncate">
                                    {profile.name}
                                  </h4>
                                  <span className="text-xs text-slate-500 font-medium">
                                    ({profile.age} yrs)
                                  </span>
                                </div>
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <span className={`inline-block text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase ${
                                    profile.gender === 'female' 
                                      ? 'bg-rose-50 text-rose-700 border border-rose-200/80' 
                                      : 'bg-blue-50 text-blue-700 border border-blue-200/80'
                                  }`}>
                                    {profile.gender}
                                  </span>
                                  {verified ? (
                                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                                      <ShieldCheck className="w-3 h-3" />
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

                            {/* Details Information */}
                            <div className="p-3 bg-slate-50/80 rounded-2xl border border-slate-100 space-y-1.5 text-xs text-slate-600">
                              <div className="flex items-center gap-1.5 text-slate-800 font-medium">
                                <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                <span className="truncate">{profile.profession}</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-slate-500">
                                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                <span className="truncate">{profile.city}, {profile.country}</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-[11px] text-amber-800 font-semibold pt-0.5">
                                <Heart className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                                <span className="truncate">{profile.maritalStatus} • {profile.polygynyPreference || 'Polygyny Open'}</span>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons Row */}
                          <div className="flex items-center gap-2 pt-3 border-t border-slate-100 justify-between">
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => setSelectedProfile(profile)}
                                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200/70 flex items-center gap-1 active:scale-95 transition-all"
                                title="Inspect Profile"
                              >
                                <Eye className="w-3.5 h-3.5 text-slate-500" />
                                <span>Inspect</span>
                              </button>

                              <button
                                onClick={() => setEditProfileData({ ...profile })}
                                className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold border border-emerald-200/80 flex items-center gap-1 active:scale-95 transition-all"
                                title="Edit Profile"
                              >
                                <Edit3 className="w-3.5 h-3.5 text-emerald-700" />
                                <span>Edit</span>
                              </button>
                            </div>

                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => handleToggleVerify(profile.id, verified)}
                                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 active:scale-95 transition-all ${
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
                                className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 active:scale-95 transition-colors"
                                title="Delete Profile & Account Permanently from MySQL"
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
                          <th className="py-3.5 px-3">Verification</th>
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
                                      <div className="text-[11px] text-slate-500">{profile.age} yrs</div>
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

                                {/* Verification Status */}
                                <td className="py-3 px-3">
                                  {verified ? (
                                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                                      <ShieldCheck className="w-3 h-3" />
                                      Verified
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                                      Unverified
                                    </span>
                                  )}
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
                                      title="Edit Profile"
                                    >
                                      <Edit3 className="w-3.5 h-3.5 text-emerald-700" />
                                      <span>Edit</span>
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
                                      title="Delete Profile & Account Permanently from MySQL"
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

      {/* ================= MODAL 2: EDIT PROFILE ================= */}
      {editProfileData && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white border border-slate-200 w-full max-w-lg rounded-3xl p-6 space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5 text-emerald-700">
                <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-100">
                  <Edit3 className="w-5 h-5 text-emerald-700" />
                </div>
                <h3 className="font-bold text-base text-slate-900">Edit Profile Details</h3>
              </div>
              <button 
                onClick={() => setEditProfileData(null)} 
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-700 mb-1 font-semibold">Name</label>
                <input
                  type="text"
                  value={editProfileData.name}
                  onChange={e => setEditProfileData({ ...editProfileData, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/10"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">City</label>
                  <input
                    type="text"
                    value={editProfileData.city}
                    onChange={e => setEditProfileData({ ...editProfileData, city: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Profession</label>
                  <input
                    type="text"
                    value={editProfileData.profession}
                    onChange={e => setEditProfileData({ ...editProfileData, profession: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-semibold">About Profile</label>
                <textarea
                  rows={3}
                  value={editProfileData.aboutMe || ''}
                  onChange={e => setEditProfileData({ ...editProfileData, aboutMe: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditProfileData(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveEditProfile}
                  className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold shadow-sm active:scale-98 transition-all"
                >
                  Update in Database
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
              <h3 className="font-bold text-base text-slate-900">Full Profile Inspector</h3>
              <button 
                onClick={() => setSelectedProfile(null)} 
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-3.5 p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80">
              <img src={selectedProfile.photo} alt={selectedProfile.name} className="w-16 h-16 rounded-2xl object-cover border border-slate-200" />
              <div>
                <h4 className="font-bold text-base text-slate-900">{selectedProfile.name}, {selectedProfile.age}</h4>
                <p className="text-xs text-slate-500">{selectedProfile.profession} • {selectedProfile.city}</p>
                <p className="text-xs text-amber-700 font-semibold">{selectedProfile.maritalStatus}</p>
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
                <p className="text-slate-600">Wali: <strong className="text-slate-900">Family Wali on File</strong></p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setSelectedProfile(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
              >
                Close
              </button>
              <button
                onClick={() => handleToggleVerify(selectedProfile.id, isProfileVerified(selectedProfile))}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
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
