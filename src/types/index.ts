export type ScreenType =
  | 'landing'
  | 'login'
  | 'register'
  | 'onboarding'
  | 'dashboard'
  | 'discover'
  | 'search'
  | 'search-results'
  | 'profile-details'
  | 'interests'
  | 'matches'
  | 'favorites'
  | 'messages'
  | 'notifications'
  | 'my-profile'
  | 'edit-profile'
  | 'verification'
  | 'preferences'
  | 'privacy-safety'
  | 'subscription'
  | 'success-stories'
  | 'islamic-guidance'
  | 'settings'
  | 'help-support'
  | 'admin'
  | 'admin-login';

export interface VerificationStatus {
  mobile: boolean;
  email: boolean;
  photo: boolean;
  identity: boolean;
  reviewed: boolean;
}

export interface PolygynyInfo {
  marriageType: 'First Marriage' | 'Second Marriage (Polygyny)' | 'Third/Fourth Marriage' | 'Open to Polygyny' | string;
  accommodationOffer: 'Separate Independent Home' | 'Independent Apartment' | 'Open to Discussion' | string;
  financialMaintenance: 'Full Independent Maintenance & Financial Justice' | 'Equal Maintenance Provided' | string;
  currentFamilyConsent: 'First Wife Informed & Consenting' | 'Not Applicable' | 'Family Aware' | string;
  waliInvolved: boolean;
  structure?: string;
  separateAccommodation?: boolean;
  residenceCity?: string;
  financialSupport?: string;
  waliInvolvement?: boolean;
  waliContactName?: string;
  waliRelationship?: string;
  additionalNotes?: string;
}

export interface Profile {
  id: string;
  name: string;
  age: number;
  gender: 'female' | 'male';
  city: string;
  state?: string;
  country: string;
  photo: string;
  galleryPhotos: string[];
  profession: string;
  company?: string;
  education: string;
  degree: string;
  university?: string;
  religion: {
    sect: string;
    prayerFrequency: 'Always (5 times daily)' | 'Usually' | 'Sometimes' | 'Only Jummah';
    quranRecitation?: 'Daily' | 'Weekly' | 'Occasionally';
    fastingRamadan: 'Always' | 'Usually' | 'Trying';
    halalDiet: 'Strictly Halal' | 'Halal Only' | 'Vegetarian / Halal';
    hijabNiqabBeard?: string;
    revertStatus?: 'Born Muslim' | 'Revert / Convert';
    islamicValues: string[];
  };
  maritalStatus: 'Never Married' | 'Married (Seeking 2nd Wife)' | 'Married (Seeking 3rd/4th Wife)' | 'Divorced' | 'Widowed' | 'Open to Polygyny (Co-Wife)' | string;
  hasChildren?: 'No' | 'Yes, living together' | 'Yes, living separately';
  polygynyInfo?: PolygynyInfo;
  height: string; // e.g. "5' 6\" (168 cm)"
  motherTongue: string;
  languages: string[];
  familyType: 'Nuclear' | 'Joint' | 'Extended';
  familyValues: 'Traditional' | 'Moderate' | 'Liberal';
  fatherOccupation?: string;
  motherOccupation?: string;
  siblings?: string;
  aboutMe: string;
  lookingForSummary: string;
  partnerPreferences: {
    ageRange: [number, number];
    heightRange: string;
    maritalStatus: string[];
    education: string[];
    profession: string[];
    country: string[];
    relocation: string;
    religiousCommitment: string;
    polygynyAcceptance?: 'Open to Polygyny / Second Wife' | 'First Marriage Only' | 'Either';
  };
  compatibilityScore: number;
  matchReasons: string[];
  verified: VerificationStatus;
  online: boolean;
  lastActive: string;
  createdDate: string;
  smoking: 'Never' | 'Occasionally' | 'Quit';
  blurPhotoByDefault?: boolean;
}

export interface InterestRequest {
  id: string;
  profileId: string;
  type: 'received' | 'sent';
  status: 'pending' | 'accepted' | 'declined';
  timestamp: string;
  message?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isSelf: boolean;
  read: boolean;
  status?: 'sent' | 'delivered' | 'read';
  isAudio?: boolean;
  audioDuration?: string;
}

export interface Conversation {
  id: string;
  partnerId: string;
  unreadCount: number;
  messages: ChatMessage[];
  lastMessage: string;
  lastMessageTime: string;
}

export interface NotificationItem {
  id: string;
  type: 'interest' | 'view' | 'match' | 'verification' | 'message' | 'system';
  title: string;
  body: string;
  timestamp: string;
  read: boolean;
  profileId?: string;
  avatar?: string;
  actionUrl?: string;
}

export interface SuccessStory {
  id: string;
  names: string;
  weddingDate: string;
  city: string;
  country: string;
  image: string;
  shortQuote: string;
  story: string;
  duration: string;
  badge?: string;
}

export interface GuidanceArticle {
  id: string;
  title: string;
  category: 'Preparation' | 'Compatibility' | 'Family & Wali' | 'Fiqh of Nikah' | 'Istikhara' | 'Polygyny & Justice';
  readTime: string;
  summary: string;
  content: string[];
  keyTakeaways: string[];
  iconName: string;
}

export interface FilterState {
  gender: 'all' | 'female' | 'male';
  ageRange: [number, number];
  heightMin: string;
  country: string;
  city: string;
  education: string;
  profession: string;
  maritalStatus: string;
  polygynyType?: string;
  motherTongue: string;
  religiousPractice: string;
  sect: string;
  hijabPreference: string;
  halalLifestyle: string;
  smoking: string;
  familyType: string;
  willingToRelocate: string;
  verifiedOnly: boolean;
  photoOnly: boolean;
}

export interface PrivacySettings {
  photoVisibility: 'public' | 'blur_all' | 'requests_only';
  phoneVisibility: 'accepted_only' | 'hidden' | 'public';
  showOnlineStatus: boolean;
  showProfileInSearch: boolean;
  allowDirectMessages: boolean;
  guardianSupervisionMode: boolean;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}
