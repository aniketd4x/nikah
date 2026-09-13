import { SuccessStory, GuidanceArticle, NotificationItem, Conversation, InterestRequest } from '../types';

export const SUCCESS_STORIES: SuccessStory[] = [
  {
    id: 'story-1',
    names: 'Farhan, Zoya & Sarah',
    weddingDate: 'November 2025',
    city: 'Mumbai & Dubai',
    country: 'India / UAE',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
    shortQuote: 'Transparent communication, separate apartments in Dubai, and complete peace of mind.',
    story: 'Farhan was transparent from day one about his marriage and seeking a second wife in accordance with Sunnah. Through Polygamy Matrimony, our Walis met, reviewed his financial capabilities, and confirmed independent accommodations. We now live in harmony with mutual respect, fulfilling our Deen.',
    duration: 'Connected in 4 months',
    badge: 'Polygyny Nikah'
  },
  {
    id: 'story-2',
    names: 'Dr. Tariq & Dr. Samira',
    weddingDate: 'January 2026',
    city: 'London',
    country: 'United Kingdom',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    shortQuote: 'Finding someone with matching medical shifts and deep Islamic values felt impossible until Polygamy Matrimony.',
    story: 'Both of us were working busy NHS hospital schedules and were worried about finding someone who understood our career demands while putting Deen first. The compatibility filters on Polygamy Matrimony matched our values on prayer, halal income, and family balance. Al-hamdulillah, our Nikah was held at Regent’s Park Mosque.',
    duration: 'Connected in 3 months',
    badge: 'First Marriage'
  },
  {
    id: 'story-3',
    names: 'Bilal & Maryam',
    weddingDate: 'December 2025',
    city: 'Toronto & Chicago',
    country: 'Canada / USA',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
    shortQuote: 'The focus on Islamic compatibility questions helped us align our life goals instantly.',
    story: 'We used the Islamic Guidance questions recommended on the platform during our chaperoned video calls with our parents. It made discussing serious matters like finance, relocation, and family expectations effortless and respectful. We are forever grateful to Polygamy Matrimony!',
    duration: 'Connected in 5 months',
    badge: 'First Marriage'
  },
  {
    id: 'story-4',
    names: 'Saad, Zainab & Ayesha',
    weddingDate: 'August 2025',
    city: 'Hyderabad & Doha',
    country: 'India / Qatar',
    image: 'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=800&q=80',
    shortQuote: 'The photo privacy, strict financial verification, and Wali mediation ensured 100% halal dignity.',
    story: 'As an educated sister open to a co-wife arrangement, finding an honest, God-fearing brother was paramount. Polygamy Matrimony provided full transparency on Saad’s background, first wife’s consent, and separate housing. The process was respectful and dignified for both families.',
    duration: 'Connected in 2 months',
    badge: 'Second Marriage'
  }
];

export const ISLAMIC_GUIDANCE_ARTICLES: GuidanceArticle[] = [
  {
    id: 'guide-polygyny',
    title: 'The Islamic Fiqh of Polygyny: Justice (Adl), Rights, and Responsibilities',
    category: 'Polygyny & Justice',
    readTime: '7 min read',
    summary: 'A deep Quranic and Sunnah exploration of polygyny, the paramount requirement of equal treatment (Adl), separate living arrangements, and financial capability.',
    iconName: 'ShieldCheck',
    content: [
      'Polygyny is permitted in Islam under specific conditions stipulated by Allah in Surah An-Nisa (4:3): "...then marry those that please you of [other] women, two or three or four. But if you fear that you will not be just, then [marry only] one."',
      '1. The Golden Rule of Justice (Adl): Islam demands strict equality in time allocation (overnight stays), provision of separate adequate housing, and equal financial maintenance (Nafaqah).',
      '2. Separate Accommodations: Classical jurists agree that each wife is entitled to her own private living quarters (separate home or private self-contained apartment) to preserve modesty, dignity, and prevent domestic friction.',
      '3. Financial Capability: A man must possess verifiable means to provide for multiple households without causing financial distress or neglect to any family.',
      '4. Transparency and Sincerity: Deceit or secret marriages are contrary to the prophetic spirit of open Nikah announcement and family involvement.'
    ],
    keyTakeaways: [
      'Justice (Adl) in time and financial provision is a non-negotiable Quranic mandate.',
      'Each wife is entitled to separate independent accommodation by Islamic law.',
      'Transparency and Wali involvement prevent harm and foster long-term barakah.'
    ]
  },
  {
    id: 'guide-1',
    title: 'The Sunnah of Istikhara: Seeking Allah\'s Guidance in Marriage',
    category: 'Istikhara',
    readTime: '5 min read',
    summary: 'How and when to pray Salat al-Istikhara when considering a matrimonial match, understanding its true outcome and clearing common misconceptions.',
    iconName: 'Sparkles',
    content: [
      'Salat al-Istikhara is a profound Sunnah taught by Prophet Muhammad (peace and blessings be upon him) for any major decision, particularly choosing a spouse.',
      'A common misconception is that one must see a dream or colors (green/white). In reality, Istikhara works by making the right path easy and smooth, or placing obstacles in the way of what is not good for your Deen and Dunya.',
      'Steps to perform Istikhara:',
      '1. Pray two voluntary (Nafl) rak’ahs of prayer with sincerity.',
      '2. Recite the comprehensive Istikhara Dua with full trust in Allah’s divine knowledge and decree.',
      '3. Consult wise family elders and mentors (Mashwarah).',
      '4. Proceed with confidence in whichever direction Allah unfolds with tranquility in your heart.'
    ],
    keyTakeaways: [
      'Istikhara does not require a dream; it manifests as ease or removal of harm.',
      'Pair Istikhara with Mashwarah (consultation with wise family members).',
      'Make Dua with true submission to Allah’s wisdom.'
    ]
  },
  {
    id: 'guide-2',
    title: '50 Critical Questions to Discuss Respectfully Before Nikah',
    category: 'Compatibility',
    readTime: '8 min read',
    summary: 'A structured, respectful question guide covering Deen, finances, family relations, career aspirations, and conflict resolution.',
    iconName: 'HelpCircle',
    content: [
      'Open, respectful dialogue before marriage prevents future misunderstandings and establishes mutual trust.',
      '1. Religious Life & Daily Routine: What does your daily Salah and Quran routine look like? How do you want to educate your future children in Islam?',
      '2. Finances & Halal Livelihood: What are your perspectives on budgeting, savings, Mahr, and Shariah-compliant investments?',
      '3. Family & Boundaries: How do you envision the involvement of extended family? How do we approach living arrangements (nuclear vs joint)?',
      '4. Career & Ambitions: What are each partner’s career plans post-marriage, and how will household responsibilities be shared with compassion?',
      '5. Conflict Resolution: How do you handle anger or disagreement? What role does apology and patience play in your life?'
    ],
    keyTakeaways: [
      'Discuss core values first before minor lifestyle preferences.',
      'Ensure transparency regarding finances, health, and family dynamics.',
      'Approach conversations with humility, kindness, and active listening.'
    ]
  },
  {
    id: 'guide-3',
    title: 'Involving the Wali & Family: Blessing & Protection in the Nikah Journey',
    category: 'Family & Wali',
    readTime: '6 min read',
    summary: 'The Islamic wisdom behind family involvement, the role of the Wali (guardian), and how to bridge generational perspectives with grace.',
    iconName: 'ShieldCheck',
    content: [
      'Islam places high emphasis on the sanctity of family and the protection of both bride and groom through guardian involvement.',
      'The role of the Wali is to provide supportive counsel, verify the character and background of the suitor, and ensure the bride’s rights and dignity are safeguarded.',
      'Tips for healthy family communication:',
      '• Keep parents informed early in the discovery phase.',
      '• Express your partner preferences clearly and respectfully to your family.',
      '• Arrange chaperoned virtual or in-person meetings where both families can converse in a relaxed, warm setting.',
      '• Remember that a marriage blessed by parental dua carries immense Barakah.'
    ],
    keyTakeaways: [
      'Family involvement brings divine protection and communal barakah.',
      'The Wali acts as a protector and advocate for the bride’s best interest.',
      'Open communication between youth and elders eliminates misunderstandings.'
    ]
  },
  {
    id: 'guide-4',
    title: 'Mutual Rights and Responsibilities in an Islamic Marriage',
    category: 'Fiqh of Nikah',
    readTime: '7 min read',
    summary: 'Understanding the Qur’anic vision of Mawaddah (love) and Rahmah (mercy), and the rights owed to each spouse.',
    iconName: 'HeartHandshake',
    content: [
      'Allah subhanahu wa ta\'ala says in Surah Ar-Rum (30:21): "And of His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy."',
      'Key Islamic rights of the wife include: Mahr (marital gift), financial maintenance (Nafaqah), kind treatment, emotional support, and privacy.',
      'Key Islamic rights of the husband include: Mutual respect, leadership in righteous stewardship (Qawwamun), support in creating a peaceful haven, and loyalty.',
      'The highest standard taught by the Prophet (pbuh): "The best of you are those who are best to their wives, and I am the best among you to my family."'
    ],
    keyTakeaways: [
      'Marriage is built on Mawaddah (love) and Rahmah (mercy), not mere transactional duty.',
      'Mahr is the exclusive property and Islamic right of the bride.',
      'Gentleness, humor, and emotional validation are core prophetic Sunnahs in marriage.'
    ]
  }
];

export const INITIAL_INTERESTS: InterestRequest[] = [
  {
    id: 'int-1',
    profileId: 'p-1',
    type: 'received',
    status: 'pending',
    timestamp: '2 hours ago',
    message: 'Assalamu Alaikum, I went through your profile and was impressed by your values, transparent family expectations, and career focus. I would love to connect and involve our families.'
  },
  {
    id: 'int-2',
    profileId: 'p-3',
    type: 'received',
    status: 'pending',
    timestamp: 'Yesterday',
    message: 'Assalamu Alaikum! Your preferences align well with what our family is seeking. Looking forward to knowing more.'
  },
  {
    id: 'int-3',
    profileId: 'p-9',
    type: 'sent',
    status: 'accepted',
    timestamp: '3 days ago',
    message: 'Assalamu Alaikum Hafsa, your focus on CA, financial independence, and Islamic principles resonated with me. Best regards.'
  },
  {
    id: 'int-4',
    profileId: 'p-5',
    type: 'sent',
    status: 'pending',
    timestamp: '4 days ago',
    message: 'Assalamu Alaikum Maryam, I found our mutual background in technology and values very inspiring.'
  },
  {
    id: 'int-5',
    profileId: 'p-7',
    type: 'received',
    status: 'declined',
    timestamp: '1 week ago',
    message: 'Assalamu Alaikum.'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    type: 'interest',
    title: 'New Interest Received',
    body: 'Ayesha Khan (Software Engineer, Mumbai) expressed interest in your profile.',
    timestamp: '10 mins ago',
    read: false,
    profileId: 'p-1',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'notif-2',
    type: 'match',
    title: 'Mutual Match!',
    body: 'Hafsa Rahman accepted your interest! You can now start a respectful conversation.',
    timestamp: '1 hour ago',
    read: false,
    profileId: 'p-9',
    avatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'notif-3',
    type: 'view',
    title: 'Profile View',
    body: 'Dr. Noor Al-Huda and 7 other verified profiles viewed your profile today.',
    timestamp: '3 hours ago',
    read: true,
    profileId: 'p-13',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'notif-4',
    type: 'verification',
    title: 'Photo Verification Approved',
    body: 'Al-hamdulillah! Your selfie verification was reviewed and your profile now has a Verified Badge.',
    timestamp: '1 day ago',
    read: true
  },
  {
    id: 'notif-5',
    type: 'interest',
    title: 'New Interest Received',
    body: 'Fatima Zahra Sheikh sent you a connection request with a personalized message.',
    timestamp: '2 days ago',
    read: true,
    profileId: 'p-3',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
  }
];

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    partnerId: 'p-9',
    unreadCount: 1,
    lastMessage: 'Wa Alaikum Assalam! Yes, my father would be very glad to speak with your family over the weekend.',
    lastMessageTime: '11:42 AM',
    messages: [
      {
        id: 'm-1',
        senderId: 'current-user',
        text: 'Assalamu Alaikum Hafsa, JazakAllahu Khair for accepting the interest request. I hope you and your family are well.',
        timestamp: 'Yesterday, 4:15 PM',
        isSelf: true,
        read: true,
        status: 'read'
      },
      {
        id: 'm-2',
        senderId: 'p-9',
        text: 'Wa Alaikum Assalam wa Rahmatullah. Al-hamdulillah all is well. I read through your profile and was pleased to see your dedication to both career, regular prayers, and transparent family arrangements.',
        timestamp: 'Yesterday, 5:30 PM',
        isSelf: false,
        read: true
      },
      {
        id: 'm-3',
        senderId: 'current-user',
        text: 'Al-hamdulillah. I would love to understand your thoughts on family dynamics, and arrange an introductory call with our parents when convenient for you.',
        timestamp: 'Today, 9:20 AM',
        isSelf: true,
        read: true,
        status: 'read'
      },
      {
        id: 'm-4',
        senderId: 'p-9',
        text: 'Wa Alaikum Assalam! Yes, my father would be very glad to speak with your family over the weekend. Shall I share his contact number for an initial introduction?',
        timestamp: 'Today, 11:42 AM',
        isSelf: false,
        read: false
      }
    ]
  },
  {
    id: 'conv-2',
    partnerId: 'p-1',
    unreadCount: 0,
    lastMessage: 'Insha\'Allah, looking forward to discussing our shared goals in Deen.',
    lastMessageTime: 'Yesterday',
    messages: [
      {
        id: 'm-201',
        senderId: 'p-1',
        text: 'Assalamu Alaikum! Thank you for reviewing my profile.',
        timestamp: '2 days ago',
        isSelf: false,
        read: true
      },
      {
        id: 'm-202',
        senderId: 'current-user',
        text: 'Wa Alaikum Assalam Ayesha. Your background in software engineering and Quran studies is truly commendable.',
        timestamp: 'Yesterday, 2:00 PM',
        isSelf: true,
        read: true,
        status: 'read'
      },
      {
        id: 'm-203',
        senderId: 'p-1',
        text: 'Insha\'Allah, looking forward to discussing our shared goals in Deen.',
        timestamp: 'Yesterday, 3:30 PM',
        isSelf: false,
        read: true
      }
    ]
  }
];

export const SUBSCRIPTION_PLANS = [
  {
    id: 'free',
    name: 'Free Starter',
    badge: 'Standard',
    priceMonthly: '₹0',
    priceAnnual: '₹0',
    description: 'Essential access for discovering verified profiles and receiving interest requests.',
    features: [
      { text: 'Create & verify your complete profile', included: true },
      { text: 'Browse & search all verified profiles', included: true },
      { text: 'Send up to 5 interests per month', included: true },
      { text: 'Receive & accept incoming interests', included: true },
      { text: 'Basic matching compatibility score', included: true },
      { text: 'Unlimited messaging with mutual matches', included: false },
      { text: 'See who viewed your profile', included: false },
      { text: 'Priority profile ranking & boost', included: false },
      { text: 'Dedicated Matrimonial Advisor (Wali support)', included: false }
    ],
    popular: false,
    ctaText: 'Current Plan',
    ctaVariant: 'outline'
  },
  {
    id: 'premium',
    name: 'Premium Blessed',
    badge: 'Most Popular',
    priceMonthly: '₹1,499',
    priceAnnual: '₹999',
    billingNote: 'billed annually or ₹1,499 monthly',
    description: 'Designed for serious individuals and families seeking seamless communication.',
    features: [
      { text: 'Everything in Free Starter', included: true },
      { text: 'Unlimited interest requests', included: true },
      { text: 'Unlimited messaging & voice notes', included: true },
      { text: 'See full list of who viewed your profile', included: true },
      { text: 'Advanced religious, polygyny & lifestyle filters', included: true },
      { text: 'Direct contact request for verified Wali/Guardians', included: true },
      { text: 'Photo privacy control (Blur & request mode)', included: true },
      { text: 'Priority profile ranking & boost', included: false },
      { text: 'Dedicated Matrimonial Advisor', included: false }
    ],
    popular: true,
    ctaText: 'Upgrade to Premium',
    ctaVariant: 'primary'
  },
  {
    id: 'premium-plus',
    name: 'Royal Nikah Elite',
    badge: 'VIP Concierge',
    priceMonthly: '₹2,999',
    priceAnnual: '₹2,199',
    billingNote: 'billed annually or ₹2,999 monthly',
    description: 'Exclusive maximum visibility and personalized matchmaking assistance.',
    features: [
      { text: 'Everything in Premium Blessed', included: true },
      { text: '3x Profile Visibility Boost in search & discover', included: true },
      { text: 'Personal Matchmaking Concierge assistance', included: true },
      { text: 'Manual profile screening & background verification', included: true },
      { text: 'VIP Gold Verified Crown Badge', included: true },
      { text: 'Direct phone & WhatsApp contact unlock', included: true },
      { text: 'Weekly hand-picked compatible matches by advisor', included: true },
      { text: 'Wali-to-Wali introductory facilitation', included: true }
    ],
    popular: false,
    ctaText: 'Get Royal Elite',
    ctaVariant: 'gold'
  }
];
