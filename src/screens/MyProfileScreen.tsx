import React from 'react';
import { useApp } from '../context/AppContext';
import { ProgressBar } from '../components/common/ProgressBar';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { 
  User, 
  SlidersHorizontal, 
  ShieldCheck, 
  Heart, 
  Lock, 
  Crown, 
  Settings, 
  Camera, 
  Eye, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  BookOpen, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const MyProfileScreen: React.FC = () => {
  const { 
    currentUser, 
    navigateTo, 
    profileCompletionPercentage, 
    setIsVerificationModalOpen, 
    setIsUpgradeModalOpen, 
    currentPlan 
  } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-6 sm:space-y-8 pb-28 md:pb-12">
      {/* PROFILE HEADER CARD */}
      <div className="bg-white/95 backdrop-blur-md rounded-[2rem] p-6 sm:p-8 border border-cream-300/80 shadow-card">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar with Verified Ring */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border-4 border-emerald-900 shadow-md shrink-0">
            <img src={currentUser.photo} alt={currentUser.name} className="w-full h-full object-cover" />
            <span className="absolute bottom-2 right-2 bg-emerald-600 text-white p-1 rounded-full border-2 border-white shadow-sm">
              <ShieldCheck className="w-4 h-4" />
            </span>
          </div>

          {/* Details & Status */}
          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-emerald-950">
                {currentUser.name}, {currentUser.age}
              </h1>
              <Badge variant="verified" size="md">100% Verified Profile</Badge>
              <Badge variant="gold" size="md">{currentPlan}</Badge>
            </div>

            <p className="text-xs sm:text-sm text-charcoal-600 flex items-center justify-center sm:justify-start gap-1.5">
              <MapPin className="w-4 h-4 text-gold-600 shrink-0" />
              <span>{currentUser.city}, {currentUser.country}</span>
              <span>•</span>
              <span>{currentUser.profession}</span>
            </p>

            <p className="text-xs text-charcoal-500 italic max-w-xl leading-relaxed">
              "{currentUser.aboutMe.slice(0, 140)}..."
            </p>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2">
              <Button
                variant="primary"
                size="sm"
                leftIcon={<SlidersHorizontal className="w-3.5 h-3.5" />}
                onClick={() => navigateTo('edit-profile')}
              >
                Edit Profile Information
              </Button>
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Eye className="w-3.5 h-3.5" />}
                onClick={() => navigateTo('profile-details', currentUser.id)}
              >
                Preview Public Profile
              </Button>
            </div>
          </div>
        </div>

        {/* Profile Strength Bar */}
        <div className="mt-8 pt-6 border-t border-cream-200">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold-600" />
              <span className="text-xs font-bold text-emerald-950">Profile Completion: {profileCompletionPercentage}%</span>
            </div>
            <span className="text-xs font-semibold text-emerald-800">
              {profileCompletionPercentage === 100 ? 'All Set!' : 'Add more details to increase visibility'}
            </span>
          </div>
          <ProgressBar percentage={profileCompletionPercentage} showText={false} size="md" />
        </div>
      </div>

      {/* DASHBOARD SHORTCUT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {[
          {
            title: 'Edit Full Profile',
            desc: 'Update your career, education, bio, and personal details.',
            icon: <User className="w-5 h-5 text-emerald-800" />,
            screen: 'edit-profile' as const,
            btnText: 'Edit Details'
          },
          {
            title: 'Trust & Verification',
            desc: 'Selfie verification, phone OTP & identity credentials.',
            icon: <ShieldCheck className="w-5 h-5 text-emerald-800" />,
            action: () => setIsVerificationModalOpen(true),
            btnText: 'Manage Status'
          },
          {
            title: 'Partner Preferences',
            desc: 'Set preferred age range, relocation, education, and sect.',
            icon: <Heart className="w-5 h-5 text-emerald-800" />,
            screen: 'preferences' as const,
            btnText: 'Configure Match'
          },
          {
            title: 'Privacy & Safety',
            desc: 'Control photo blur, phone number visibility, and guardian mode.',
            icon: <Lock className="w-5 h-5 text-emerald-800" />,
            screen: 'privacy-safety' as const,
            btnText: 'Privacy Controls'
          },
          {
            title: 'Membership & Upgrades',
            desc: `Current Plan: ${currentPlan}. Unlock unlimited features.`,
            icon: <Crown className="w-5 h-5 text-gold-600" />,
            action: () => setIsUpgradeModalOpen(true),
            btnText: 'View Plans'
          },
          {
            title: 'Account Settings',
            desc: 'Notifications, email preferences, security, and account management.',
            icon: <Settings className="w-5 h-5 text-emerald-800" />,
            screen: 'settings' as const,
            btnText: 'Settings'
          }
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-white/95 backdrop-blur-md rounded-[2rem] p-5 sm:p-6 border border-cream-300/80 shadow-soft hover:shadow-card active:scale-[0.99] transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-cream-100 flex items-center justify-center mb-3 border border-cream-200">
                {item.icon}
              </div>
              <h3 className="font-serif font-bold text-base text-emerald-950">{item.title}</h3>
              <p className="text-xs text-charcoal-600 mt-1 leading-relaxed">{item.desc}</p>
            </div>

            <Button
              variant="outline"
              size="sm"
              fullWidth
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              onClick={() => {
                if (item.action) item.action();
                else if (item.screen) navigateTo(item.screen);
              }}
            >
              {item.btnText}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
