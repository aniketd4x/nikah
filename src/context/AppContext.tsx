import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { 
  Profile, 
  ScreenType, 
  InterestRequest, 
  Conversation, 
  NotificationItem, 
  FilterState, 
  PrivacySettings, 
  ToastMessage,
  ChatMessage
} from '../types';
import confetti from 'canvas-confetti';
import { api } from '../services/api';

const CURRENT_USER_DEFAULT: Profile = {
  id: 'current-user',
  name: 'Ahmed Khan',
  age: 28,
  gender: 'male',
  city: 'Pune',
  state: 'Maharashtra',
  country: 'India',
  photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
  galleryPhotos: [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80'
  ],
  profession: 'Senior Product Lead',
  company: 'Fintech Corp India',
  education: 'Postgraduate',
  degree: 'B.Tech & MBA',
  university: 'Symbiosis International University',
  religion: {
    sect: 'Sunni (Hanafi)',
    prayerFrequency: 'Always (5 times daily)',
    quranRecitation: 'Daily',
    fastingRamadan: 'Always',
    halalDiet: 'Strictly Halal',
    hijabNiqabBeard: 'Maintains Neat Beard',
    revertStatus: 'Born Muslim',
    islamicValues: ['Taqwa', 'Truthfulness', 'Honest Livelihood', 'Family Caring']
  },
  maritalStatus: 'Never Married',
  hasChildren: 'No',
  height: "5' 11\" (180 cm)",
  motherTongue: 'Urdu',
  languages: ['Urdu', 'English', 'Hindi', 'Arabic (Basic)'],
  familyType: 'Nuclear',
  familyValues: 'Moderate',
  fatherOccupation: 'Executive Engineer (Retd)',
  motherOccupation: 'Homemaker & Quran Teacher',
  siblings: '1 Younger Brother (Software Engineer)',
  aboutMe: 'Assalamu Alaikum. I am a product strategist in Pune with deep appreciation for faith, technological advancement, and healthy living. I cherish weekend family dinners, football, Seerah studies, and scenic mountain drives. I am looking for a pious, kind-hearted Muslimah with whom I can build a warm, peaceful Islamic household oriented toward Jannah.',
  lookingForSummary: 'A practicing Muslimah with good family values, a gentle character, and high moral integrity.',
  partnerPreferences: {
    ageRange: [23, 28],
    heightRange: "5' 2\" to 5' 8\"",
    maritalStatus: ['Never Married'],
    education: ['Bachelors', 'Postgraduate'],
    profession: ['Tech', 'Education', 'Medicine', 'Any respectable field'],
    country: ['India', 'United Arab Emirates', 'Qatar', 'United Kingdom', 'Canada'],
    relocation: 'Open to discussion',
    religiousCommitment: 'Regular in 5 prayers, observes modesty'
  },
  compatibilityScore: 100,
  matchReasons: ['Your own verified profile'],
  verified: {
    mobile: true,
    email: true,
    photo: true,
    identity: true,
    reviewed: true
  },
  online: true,
  lastActive: 'Now',
  createdDate: '2026-01-01',
  smoking: 'Never'
};

const DEFAULT_FILTERS: FilterState = {
  keyword: '',
  gender: 'all',
  ageRange: [18, 60],
  heightMin: '',
  country: '',
  city: '',
  education: '',
  profession: '',
  maritalStatus: '',
  motherTongue: '',
  religiousPractice: '',
  sect: '',
  hijabPreference: '',
  halalLifestyle: '',
  smoking: '',
  familyType: '',
  willingToRelocate: '',
  verifiedOnly: false,
  photoOnly: false
};

const DEFAULT_PRIVACY: PrivacySettings = {
  photoVisibility: 'public',
  phoneVisibility: 'accepted_only',
  showOnlineStatus: true,
  showProfileInSearch: true,
  allowDirectMessages: true,
  guardianSupervisionMode: false
};

interface AppContextType {
  currentScreen: ScreenType;
  navigateTo: (screen: ScreenType, profileId?: string) => void;
  selectedProfileId: string | null;
  setSelectedProfileId: (id: string | null) => void;
  selectedStoryId: string | null;
  setSelectedStoryId: (id: string | null) => void;
  selectedArticleId: string | null;
  setSelectedArticleId: (id: string | null) => void;
  isLoggedIn: boolean;
  currentUser: Profile;
  updateCurrentUser: (data: Partial<Profile>) => void;
  login: (email?: string | { email?: string; password?: string }, password?: string) => void | Promise<void>;
  logout: () => void;
  registerUser: (data: any) => void;
  profiles: Profile[];
  favorites: string[];
  toggleFavorite: (profileId: string) => void;
  interests: InterestRequest[];
  sendInterest: (profileId: string, note?: string) => void;
  acceptInterest: (interestId: string) => void;
  declineInterest: (interestId: string) => void;
  cancelSentInterest: (interestId: string) => void;
  passes: string[];
  passProfile: (profileId: string) => void;
  unpassProfile: (profileId: string) => void;
  conversations: Conversation[];
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;
  sendMessage: (conversationId: string, text: string) => void;
  startChatWithProfile: (profileId: string) => void;
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  unreadNotificationsCount: number;
  unreadMessagesCount: number;
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  appliedFiltersCount: number;
  filteredProfiles: Profile[];
  toasts: ToastMessage[];
  addToast: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
  privacySettings: PrivacySettings;
  updatePrivacySettings: (settings: Partial<PrivacySettings>) => void;
  currentPlan: 'Free' | 'Premium' | 'Premium Plus';
  upgradePlan: (plan: 'Free' | 'Premium' | 'Premium Plus') => void;
  isUpgradeModalOpen: boolean;
  setIsUpgradeModalOpen: (open: boolean) => void;
  isVerificationModalOpen: boolean;
  setIsVerificationModalOpen: (open: boolean) => void;
  isCelebrationModalOpen: boolean;
  celebrationPartner: Profile | null;
  closeCelebrationModal: () => void;
  blockedProfileIds: string[];
  blockProfile: (id: string) => void;
  reportProfile: (id: string, reason: string) => void;
  isMobileFilterOpen: boolean;
  setIsMobileFilterOpen: (open: boolean) => void;
  profileCompletionPercentage: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('landing');
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return Boolean(typeof window !== 'undefined' && localStorage.getItem('nikah_token'));
  });
  const [currentUser, setCurrentUser] = useState<Profile>(CURRENT_USER_DEFAULT);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  
  // Live local state initialized cleanly (no hardcoded demo rows)
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('nikah_favorites');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  
  const [interests, setInterests] = useState<InterestRequest[]>([]);
  const [passes, setPasses] = useState<string[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [filterState, setFilterState] = useState<FilterState>(DEFAULT_FILTERS);
  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>(DEFAULT_PRIVACY);
  const [currentPlan, setCurrentPlan] = useState<'Free' | 'Premium' | 'Premium Plus'>('Premium');
  
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [isCelebrationModalOpen, setIsCelebrationModalOpen] = useState(false);
  const [celebrationPartner, setCelebrationPartner] = useState<Profile | null>(null);
  
  const [blockedProfileIds, setBlockedProfileIds] = useState<string[]>([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Synchronize live profiles from Supabase Cloud API and handle separate URL paths
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.includes('admin') || hash.includes('admin')) {
        const adminToken = localStorage.getItem('nikah_admin_token');
        if (adminToken) {
          setCurrentScreen('admin');
        } else {
          setCurrentScreen('admin-login');
        }
      }
    }

    const loadLiveDatabase = async () => {
      try {
        const liveProfiles = await api.fetchProfiles();
        if (Array.isArray(liveProfiles)) {
          setProfiles(liveProfiles);
        }
        const savedUserId = localStorage.getItem('nikah_user_id') || 'current-user';
        if (localStorage.getItem('nikah_token')) {
          const me = await api.fetchMe(savedUserId);
          if (me) {
            setCurrentUser(me);
            setIsLoggedIn(true);
            const userInterests = await api.fetchInterests(me.id);
            if (Array.isArray(userInterests)) setInterests(userInterests);
            const userConvs = await api.fetchConversations(me.id);
            if (Array.isArray(userConvs) && userConvs.length > 0) setConversations(userConvs);
          }
        }
      } catch (err) {
        console.warn('API sync fallback:', err);
      }
    };
    loadLiveDatabase();
  }, []);

  // Navigation helper with URL synchronization
  const navigateTo = (screen: ScreenType, profileId?: string) => {
    if (profileId) {
      setSelectedProfileId(profileId);
    }
    setCurrentScreen(screen);

    if (typeof window !== 'undefined') {
      if (screen === 'admin') {
        window.history.pushState(null, '', '/admin');
      } else if (screen === 'admin-login') {
        window.history.pushState(null, '', '/admin/login');
      } else if (window.location.pathname.includes('admin')) {
        window.history.pushState(null, '', '/');
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toast helper
  const addToast = (
    title: string, 
    message: string, 
    type: 'success' | 'info' | 'warning' | 'error' = 'success'
  ) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Auth actions
  const login = async (email?: string | { email?: string; password?: string }, password?: string) => {
    const emailStr = typeof email === 'string' ? email : email?.email;
    const passStr = typeof email === 'object' ? email?.password : password;
    if (emailStr && passStr) {
      const res = await api.login(emailStr, passStr);
      if (res?.user) {
        setCurrentUser(res.user);
        const userInterests = await api.fetchInterests(res.user.id);
        if (Array.isArray(userInterests)) setInterests(userInterests);
      }
    }
    setIsLoggedIn(true);
    setCurrentScreen('dashboard');
    addToast('Welcome Back!', 'Assalamu Alaikum, you are logged in to your account.', 'success');
  };

  const logout = () => {
    localStorage.removeItem('nikah_token');
    localStorage.removeItem('nikah_user_id');
    setIsLoggedIn(false);
    setInterests([]);
    setConversations([]);
    setCurrentScreen('landing');
    addToast('Logged Out', 'May Allah bless your day. See you again soon.', 'info');
  };

  const registerUser = async (data: any) => {
    try {
      const res = await api.register(data);
      const newUserId = res?.user?.id || `u-${Date.now()}`;
      const defaultPhoto = data.gender === 'female'
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'
        : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80';

      const newUserProfile: Profile = {
        ...CURRENT_USER_DEFAULT,
        id: newUserId,
        name: data.name || (data.gender === 'male' ? 'Brother Ahmed' : 'Sister Ayesha'),
        age: Number(data.age) || 26,
        gender: data.gender || 'male',
        city: data.city || 'Mumbai',
        country: data.country || 'India',
        profession: data.profession || 'Professional',
        maritalStatus: data.maritalStatus || 'Never Married',
        photo: defaultPhoto,
        galleryPhotos: [defaultPhoto],
        aboutMe: `Assalamu Alaikum, my name is ${data.name}. I am seeking a pious, God-fearing partner for a blessed Nikah.`,
        lookingForSummary: 'A practicing Muslim partner with good Islamic character, honesty, and family values.'
      };

      setCurrentUser(newUserProfile);
      setProfiles(prev => [newUserProfile, ...prev]);
      setIsLoggedIn(true);
      if (res?.token) {
        localStorage.setItem('nikah_token', res.token);
      }
      localStorage.setItem('nikah_user_id', newUserId);
      setCurrentScreen('onboarding');
      addToast('Profile Created!', 'Al-hamdulillah! Your new profile has been saved to the database.', 'success');
    } catch (err) {
      console.error('Registration error:', err);
      setIsLoggedIn(true);
      setCurrentScreen('onboarding');
    }
  };

  const updateCurrentUser = async (data: Partial<Profile>) => {
    const targetId = data.id || currentUser.id || (typeof window !== 'undefined' ? localStorage.getItem('nikah_user_id') : null) || 'current-user';
    const updatedData = { ...data, id: targetId };

    setCurrentUser((prev) => {
      const updated = { ...prev, ...updatedData };
      setProfiles(pList => pList.map(p => (p.id === updated.id || p.id === targetId) ? { ...p, ...updatedData } : p));
      return updated;
    });

    try {
      await api.updateProfile(targetId, updatedData);
    } catch (err) {
      console.warn('Profile update API error:', err);
    }
    addToast('Profile Updated', 'Your changes have been saved to the database.', 'success');
  };

  // Profile completion percentage
  const profileCompletionPercentage = useMemo(() => {
    let score = 50;
    if (currentUser.photo) score += 15;
    if (currentUser.aboutMe && currentUser.aboutMe.length > 50) score += 10;
    if (currentUser.verified?.photo) score += 10;
    if (currentUser.partnerPreferences?.education?.length > 0) score += 5;
    if (currentUser.galleryPhotos && currentUser.galleryPhotos.length > 1) score += 10;
    return Math.min(score, 100);
  }, [currentUser]);

  // Favorites (Saved in localStorage)
  const toggleFavorite = (profileId: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(profileId);
      const updated = exists ? prev.filter((id) => id !== profileId) : [...prev, profileId];
      try {
        localStorage.setItem('nikah_favorites', JSON.stringify(updated));
      } catch {}
      const target = profiles.find((p) => p.id === profileId);
      if (exists) {
        addToast('Removed', 'Profile removed from saved favorites.', 'info');
      } else {
        addToast('Saved to Favorites', `Added ${target?.name || 'profile'} to your favorites list.`, 'success');
      }
      return updated;
    });
  };

  // Interests / Requests CRUD
  const sendInterest = async (profileId: string, note?: string) => {
    const existing = interests.find((i) => i.profileId === profileId && i.type === 'sent');
    if (existing) {
      addToast('Already Sent', 'You have already sent an interest request to this profile.', 'info');
      return;
    }

    const newReq: InterestRequest = {
      id: `int-${Date.now()}`,
      profileId,
      type: 'sent',
      status: 'pending',
      timestamp: 'Just now',
      message: note || 'Assalamu Alaikum, I would like to respectfully connect for matrimonial discussion.'
    };

    setInterests((prev) => [newReq, ...prev]);
    try {
      await api.sendInterest(currentUser.id, profileId, note);
    } catch {}
    const target = profiles.find((p) => p.id === profileId);
    addToast('Interest Sent!', `Your request was respectfully delivered to ${target?.name || 'member'}.`, 'success');
  };

  const acceptInterest = async (interestId: string) => {
    setInterests((prev) =>
      prev.map((item) => (item.id === interestId ? { ...item, status: 'accepted' } : item))
    );
    try {
      await api.actionInterest(interestId, 'accepted');
    } catch {}

    const interest = interests.find((i) => i.id === interestId);
    if (interest) {
      const partner = profiles.find((p) => p.id === interest.profileId);
      if (partner) {
        setCelebrationPartner(partner);
        setIsCelebrationModalOpen(true);

        setConversations((prev) => {
          if (prev.some((c) => c.partnerId === partner.id)) return prev;
          const newConv: Conversation = {
            id: `conv-${Date.now()}`,
            partnerId: partner.id,
            unreadCount: 0,
            lastMessage: 'Connected! You can now exchange respectful matrimonial messages.',
            lastMessageTime: 'Just now',
            messages: [
              {
                id: `msg-${Date.now()}`,
                senderId: partner.id,
                text: 'Assalamu Alaikum wa Rahmatullah. JazakAllah for connecting. Looking forward to discussing our matrimonial goals in accordance with Islamic values.',
                timestamp: 'Just now',
                isSelf: false,
                read: true
              }
            ]
          };
          return [newConv, ...prev];
        });

        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#0c4e2b', '#c59b27', '#ffffff']
          });
        } catch {}
      }
    }
    addToast('Interest Accepted!', 'Al-hamdulillah, you are now connected and can converse respectfully.', 'success');
  };

  const declineInterest = async (interestId: string) => {
    setInterests((prev) =>
      prev.map((item) => (item.id === interestId ? { ...item, status: 'declined' } : item))
    );
    try {
      await api.actionInterest(interestId, 'declined');
    } catch {}
    addToast('Request Declined', 'The interest request has been politely declined.', 'info');
  };

  const cancelSentInterest = async (interestId: string) => {
    setInterests((prev) => prev.filter((item) => item.id !== interestId));
    try {
      await api.cancelInterest(interestId);
    } catch {}
    addToast('Request Cancelled', 'Your sent interest was removed from the live database.', 'info');
  };

  // Passes
  const passProfile = (profileId: string) => {
    setPasses((prev) => [...prev, profileId]);
    addToast('Profile Passed', 'This profile won\'t be shown in top suggestions.', 'info');
  };

  const unpassProfile = (profileId: string) => {
    setPasses((prev) => prev.filter((id) => id !== profileId));
  };

  // Messaging CRUD
  const sendMessage = async (conversationId: string, text: string) => {
    if (!text.trim()) return;

    const conv = conversations.find((c) => c.id === conversationId);
    const partnerId = conv?.partnerId || '';

    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      text: text.trim(),
      timestamp: 'Just now',
      isSelf: true,
      read: true,
      status: 'sent'
    };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === conversationId) {
          return {
            ...c,
            messages: [...c.messages, newMessage],
            lastMessage: text.trim(),
            lastMessageTime: 'Just now'
          };
        }
        return c;
      })
    );

    try {
      await api.sendMessage({
        conversationId,
        senderId: currentUser.id,
        receiverId: partnerId,
        messageText: text.trim()
      });
    } catch {}
  };

  const startChatWithProfile = (profileId: string) => {
    let existing = conversations.find((c) => c.partnerId === profileId);
    if (!existing) {
      const partner = profiles.find((p) => p.id === profileId);
      const newConv: Conversation = {
        id: `conv-${Date.now()}`,
        partnerId: profileId,
        unreadCount: 0,
        lastMessage: 'Conversation started',
        lastMessageTime: 'Just now',
        messages: [
          {
            id: `msg-start-${Date.now()}`,
            senderId: 'system',
            text: `Connected with ${partner?.name || 'Match'}. In the spirit of Islamic etiquette, please maintain respectful and purposeful communication.`,
            timestamp: 'Just now',
            isSelf: false,
            read: true
          }
        ]
      };
      setConversations((prev) => [newConv, ...prev]);
      setActiveConversationId(newConv.id);
    } else {
      setActiveConversationId(existing.id);
    }
    navigateTo('messages');
  };

  // Notifications
  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
    addToast('All Read', 'All notifications marked as read.', 'info');
  };

  const unreadNotificationsCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  const unreadMessagesCount = useMemo(
    () => conversations.reduce((acc, curr) => acc + curr.unreadCount, 0),
    [conversations]
  );

  // Filters & Applied calculation
  const resetFilters = () => {
    setFilterState(DEFAULT_FILTERS);
    addToast('Filters Reset', 'Showing all verified matching profiles.', 'info');
  };

  const appliedFiltersCount = useMemo(() => {
    let count = 0;
    if (filterState.keyword && filterState.keyword.trim().length > 0) count++;
    if (filterState.gender && filterState.gender !== 'all') count++;
    if (filterState.ageRange[0] !== 18 || filterState.ageRange[1] !== 60) count++;
    if (filterState.country) count++;
    if (filterState.city) count++;
    if (filterState.education) count++;
    if (filterState.profession) count++;
    if (filterState.maritalStatus) count++;
    if (filterState.motherTongue) count++;
    if (filterState.religiousPractice) count++;
    if (filterState.sect) count++;
    if (filterState.hijabPreference) count++;
    if (filterState.halalLifestyle) count++;
    if (filterState.smoking) count++;
    if (filterState.willingToRelocate) count++;
    if (filterState.verifiedOnly) count++;
    if (filterState.photoOnly) count++;
    return count;
  }, [filterState]);

  // Comprehensive profile search and filtering logic
  const filteredProfiles = useMemo(() => {
    return profiles.filter((p) => {
      // 1. Blocked profiles check
      if (blockedProfileIds.includes(p.id)) return false;

      // 2. Keyword search logic (searches across name, city, state, country, profession, bio, education, sect)
      if (filterState.keyword && filterState.keyword.trim().length > 0) {
        const queryTerms = filterState.keyword.toLowerCase().trim().split(/\s+/);
        const searchableText = [
          p.name,
          p.city,
          p.state,
          p.country,
          p.profession,
          p.company,
          p.education,
          p.degree,
          p.university,
          p.maritalStatus,
          p.polygynyPreference,
          p.aboutMe,
          p.lookingForSummary,
          p.motherTongue,
          p.religion?.sect,
          ...(Array.isArray(p.languages) ? p.languages : [])
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();

        const matchesAllTerms = queryTerms.every((term) => searchableText.includes(term));
        if (!matchesAllTerms) return false;
      }

      // 3. Gender filter
      if (filterState.gender && filterState.gender !== 'all' && p.gender !== filterState.gender) {
        return false;
      }

      // 4. Age range filter
      if (typeof p.age === 'number') {
        if (p.age < filterState.ageRange[0] || p.age > filterState.ageRange[1]) return false;
      }

      // 5. Country filter
      if (filterState.country) {
        const pCountry = (p.country || '').toLowerCase();
        const fCountry = filterState.country.toLowerCase();
        if (!pCountry.includes(fCountry)) return false;
      }

      // 6. City filter
      if (filterState.city) {
        const pCity = (p.city || '').toLowerCase();
        const fCity = filterState.city.toLowerCase();
        if (!pCity.includes(fCity)) return false;
      }

      // 7. Education filter
      if (filterState.education) {
        const pEdu = `${p.education || ''} ${p.degree || ''} ${p.university || ''}`.toLowerCase();
        const fEdu = filterState.education.toLowerCase();
        if (!pEdu.includes(fEdu)) return false;
      }

      // 8. Profession filter
      if (filterState.profession) {
        const pProf = `${p.profession || ''} ${p.company || ''}`.toLowerCase();
        const fProf = filterState.profession.toLowerCase();
        if (!pProf.includes(fProf)) return false;
      }

      // 9. Marital Status & Polygyny filter
      if (filterState.maritalStatus) {
        const pStatus = `${p.maritalStatus || ''} ${p.polygynyPreference || ''}`.toLowerCase();
        const fStatus = filterState.maritalStatus.toLowerCase();
        if (!pStatus.includes(fStatus)) return false;
      }

      // 10. Mother Tongue filter
      if (filterState.motherTongue) {
        const pLang = `${p.motherTongue || ''} ${(p.languages || []).join(' ')}`.toLowerCase();
        const fLang = filterState.motherTongue.toLowerCase();
        if (!pLang.includes(fLang)) return false;
      }

      // 11. Religious Practice (Salah frequency)
      if (filterState.religiousPractice) {
        const pPrayer = (p.religion?.prayerFrequency || '').toLowerCase();
        const fPrayer = filterState.religiousPractice.toLowerCase();
        if (!pPrayer.includes(fPrayer)) return false;
      }

      // 12. Islamic Sect filter
      if (filterState.sect) {
        const pSect = (p.religion?.sect || '').toLowerCase();
        const fSect = filterState.sect.toLowerCase();
        if (!pSect.includes(fSect)) return false;
      }

      // 13. Verified Only filter
      if (filterState.verifiedOnly) {
        const isVerified = Boolean(p.is_verified || p.verified?.identity || p.verified?.reviewed);
        if (!isVerified) return false;
      }

      // 14. Photo Only filter
      if (filterState.photoOnly) {
        if (!p.photo || p.photo.includes('placeholder')) return false;
      }

      return true;
    });
  }, [profiles, filterState, blockedProfileIds]);

  // Privacy
  const updatePrivacySettings = (settings: Partial<PrivacySettings>) => {
    setPrivacySettings((prev) => ({ ...prev, ...settings }));
    addToast('Privacy Settings Saved', 'Your preferences have been updated.', 'success');
  };

  // Subscription
  const upgradePlan = (plan: 'Free' | 'Premium' | 'Premium Plus') => {
    setCurrentPlan(plan);
    setIsUpgradeModalOpen(false);
    addToast('Plan Upgraded!', `Al-hamdulillah! You are now subscribed to ${plan}.`, 'success');
  };

  // Block & Report
  const blockProfile = (id: string) => {
    setBlockedProfileIds((prev) => [...prev, id]);
    addToast('Profile Blocked', 'This member will no longer see your profile or contact you.', 'info');
    navigateTo('dashboard');
  };

  const reportProfile = async (id: string, reason: string) => {
    try {
      await api.submitReport({ reporterId: currentUser.id, reportedUserId: id, reason, details: `Report against profile ${id}` });
    } catch {}
    addToast('Report Submitted', `Thank you for safeguarding the community. Reason recorded in live database: ${reason}`, 'warning');
  };

  const closeCelebrationModal = () => {
    setIsCelebrationModalOpen(false);
    setCelebrationPartner(null);
  };

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        navigateTo,
        selectedProfileId,
        setSelectedProfileId,
        selectedStoryId,
        setSelectedStoryId,
        selectedArticleId,
        setSelectedArticleId,
        isLoggedIn,
        currentUser,
        updateCurrentUser,
        login,
        logout,
        registerUser,
        profiles,
        favorites,
        toggleFavorite,
        interests,
        sendInterest,
        acceptInterest,
        declineInterest,
        cancelSentInterest,
        passes,
        passProfile,
        unpassProfile,
        conversations,
        activeConversationId,
        setActiveConversationId,
        sendMessage,
        startChatWithProfile,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        unreadNotificationsCount,
        unreadMessagesCount,
        filterState,
        setFilterState,
        resetFilters,
        appliedFiltersCount,
        filteredProfiles,
        toasts,
        addToast,
        removeToast,
        privacySettings,
        updatePrivacySettings,
        currentPlan,
        upgradePlan,
        isUpgradeModalOpen,
        setIsUpgradeModalOpen,
        isVerificationModalOpen,
        setIsVerificationModalOpen,
        isCelebrationModalOpen,
        celebrationPartner,
        closeCelebrationModal,
        blockedProfileIds,
        blockProfile,
        reportProfile,
        isMobileFilterOpen,
        setIsMobileFilterOpen,
        profileCompletionPercentage
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
