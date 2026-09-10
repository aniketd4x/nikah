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
import { ALL_PROFILES } from '../data/allProfiles';
import { 
  INITIAL_INTERESTS, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_CONVERSATIONS 
} from '../data/mockData';
import confetti from 'canvas-confetti';

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
  gender: 'female',
  ageRange: [20, 36],
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
  login: (credentials?: { email: string }) => void;
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
  
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true); // Default to logged-in experience for instant prototype testing
  const [currentUser, setCurrentUser] = useState<Profile>(CURRENT_USER_DEFAULT);
  const [profiles] = useState<Profile[]>(ALL_PROFILES);
  const [favorites, setFavorites] = useState<string[]>(['p-1', 'p-9', 'p-5']);
  const [interests, setInterests] = useState<InterestRequest[]>(INITIAL_INTERESTS);
  const [passes, setPasses] = useState<string[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [activeConversationId, setActiveConversationId] = useState<string | null>('conv-1');
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
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

  // Navigation helper
  const navigateTo = (screen: ScreenType, profileId?: string) => {
    if (profileId) {
      setSelectedProfileId(profileId);
    }
    setCurrentScreen(screen);
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
  const login = () => {
    setIsLoggedIn(true);
    setCurrentScreen('dashboard');
    addToast('Welcome Back!', 'Assalamu Alaikum Ahmed, you are now logged in.', 'success');
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentScreen('landing');
    addToast('Logged Out', 'May Allah bless your day. See you again soon.', 'info');
  };

  const registerUser = (data: any) => {
    setIsLoggedIn(true);
    if (data.name) {
      setCurrentUser(prev => ({
        ...prev,
        name: data.name,
        gender: data.lookingFor === 'groom' ? 'female' : 'male',
        city: data.location || prev.city
      }));
    }
    setCurrentScreen('onboarding');
    addToast('Account Created!', 'Welcome to Heavenly Nikah. Let\'s complete your profile.', 'success');
  };

  const updateCurrentUser = (data: Partial<Profile>) => {
    setCurrentUser((prev) => ({ ...prev, ...data }));
    addToast('Profile Updated', 'Your changes have been saved successfully.', 'success');
  };

  // Profile completion percentage
  const profileCompletionPercentage = useMemo(() => {
    let score = 50;
    if (currentUser.photo) score += 15;
    if (currentUser.aboutMe && currentUser.aboutMe.length > 50) score += 10;
    if (currentUser.verified.photo) score += 10;
    if (currentUser.partnerPreferences.education.length > 0) score += 5;
    if (currentUser.galleryPhotos.length > 1) score += 10;
    return Math.min(score, 100);
  }, [currentUser]);

  // Favorites
  const toggleFavorite = (profileId: string) => {
    const isFav = favorites.includes(profileId);
    if (isFav) {
      setFavorites((prev) => prev.filter((id) => id !== profileId));
      addToast('Removed', 'Profile removed from your saved list.', 'info');
    } else {
      setFavorites((prev) => [...prev, profileId]);
      const target = profiles.find((p) => p.id === profileId);
      addToast('Saved to Favorites', `Added ${target?.name || 'profile'} to your favorites list.`, 'success');
    }
  };

  // Interests / Requests
  const sendInterest = (profileId: string, note?: string) => {
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
    const target = profiles.find((p) => p.id === profileId);
    addToast('Interest Sent!', `Your request was respectfully delivered to ${target?.name || 'member'}.`, 'success');
  };

  const acceptInterest = (interestId: string) => {
    setInterests((prev) =>
      prev.map((item) => (item.id === interestId ? { ...item, status: 'accepted' } : item))
    );

    const interest = interests.find((i) => i.id === interestId);
    if (interest) {
      const partner = profiles.find((p) => p.id === interest.profileId);
      if (partner) {
        setCelebrationPartner(partner);
        setIsCelebrationModalOpen(true);
        // Fire confetti
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#0c4e2b', '#c59b27', '#ffffff']
          });
        } catch (e) {
          // ignore
        }
      }
    }
    addToast('Interest Accepted!', 'Al-hamdulillah, you are now connected and can converse respectfully.', 'success');
  };

  const declineInterest = (interestId: string) => {
    setInterests((prev) =>
      prev.map((item) => (item.id === interestId ? { ...item, status: 'declined' } : item))
    );
    addToast('Request Declined', 'The interest request has been politely declined.', 'info');
  };

  const cancelSentInterest = (interestId: string) => {
    setInterests((prev) => prev.filter((item) => item.id !== interestId));
    addToast('Request Cancelled', 'Your sent interest was removed.', 'info');
  };

  // Passes
  const passProfile = (profileId: string) => {
    setPasses((prev) => [...prev, profileId]);
    addToast('Profile Passed', 'This profile won\'t be shown in top suggestions.', 'info');
  };

  const unpassProfile = (profileId: string) => {
    setPasses((prev) => prev.filter((id) => id !== profileId));
  };

  // Messaging
  const sendMessage = (conversationId: string, text: string) => {
    if (!text.trim()) return;

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
      prev.map((conv) => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            messages: [...conv.messages, newMessage],
            lastMessage: text.trim(),
            lastMessageTime: 'Just now'
          };
        }
        return conv;
      })
    );

    // Simulated auto-reply after 2 seconds for prototype richness
    const conv = conversations.find((c) => c.id === conversationId);
    if (conv) {
      const partner = profiles.find((p) => p.id === conv.partnerId);
      setTimeout(() => {
        const replyText = `Wa Alaikum Assalam! JazakAllahu Khair for your message. I shared your profile details with my family as well, and we are happy to take the next step.`;
        const replyMsg: ChatMessage = {
          id: `msg-${Date.now() + 1}`,
          senderId: conv.partnerId,
          text: replyText,
          timestamp: 'Just now',
          isSelf: false,
          read: false
        };

        setConversations((prev) =>
          prev.map((c) => {
            if (c.id === conversationId) {
              return {
                ...c,
                messages: [...c.messages, replyMsg],
                lastMessage: replyText,
                lastMessageTime: 'Just now',
                unreadCount: c.unreadCount + 1
              };
            }
            return c;
          })
        );

        addToast(`New Message from ${partner?.name || 'Match'}`, replyText.slice(0, 45) + '...', 'info');
      }, 2500);
    }
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
    if (filterState.gender !== 'all' && filterState.gender !== 'female') count++;
    if (filterState.ageRange[0] !== 20 || filterState.ageRange[1] !== 36) count++;
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

  // Profile filtering
  const filteredProfiles = useMemo(() => {
    return profiles.filter((p) => {
      // Exclude blocked profiles
      if (blockedProfileIds.includes(p.id)) return false;

      // Gender filter
      if (filterState.gender !== 'all' && p.gender !== filterState.gender) return false;

      // Age filter
      if (p.age < filterState.ageRange[0] || p.age > filterState.ageRange[1]) return false;

      // Country filter
      if (filterState.country && !p.country.toLowerCase().includes(filterState.country.toLowerCase())) {
        return false;
      }

      // City filter
      if (filterState.city && !p.city.toLowerCase().includes(filterState.city.toLowerCase())) {
        return false;
      }

      // Education filter
      if (filterState.education && !p.education.toLowerCase().includes(filterState.education.toLowerCase())) {
        return false;
      }

      // Profession filter
      if (filterState.profession && !p.profession.toLowerCase().includes(filterState.profession.toLowerCase())) {
        return false;
      }

      // Marital Status filter
      if (filterState.maritalStatus && p.maritalStatus !== filterState.maritalStatus) {
        return false;
      }

      // Mother tongue filter
      if (filterState.motherTongue && !p.motherTongue.toLowerCase().includes(filterState.motherTongue.toLowerCase())) {
        return false;
      }

      // Religious practice
      if (filterState.religiousPractice && !p.religion.prayerFrequency.includes(filterState.religiousPractice)) {
        return false;
      }

      // Sect filter
      if (filterState.sect && !p.religion.sect.toLowerCase().includes(filterState.sect.toLowerCase())) {
        return false;
      }

      // Verified only
      if (filterState.verifiedOnly && !p.verified.photo) {
        return false;
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

  const reportProfile = (id: string, reason: string) => {
    addToast('Report Submitted', `Thank you for safeguarding the community. Reason recorded: ${reason}`, 'warning');
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
