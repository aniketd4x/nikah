import React from 'react';
import { useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { BottomNav } from './components/layout/BottomNav';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/common/ToastContainer';
import { CelebrationModal } from './components/common/CelebrationModal';
import { UpgradeModal } from './components/common/UpgradeModal';
import { VerificationModal } from './components/common/VerificationModal';

// Screens
import { LandingScreen } from './screens/LandingScreen';
import { LoginScreen } from './screens/LoginScreen';
import { RegisterScreen } from './screens/RegisterScreen';
import { OnboardingScreen } from './screens/OnboardingScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { DiscoverScreen } from './screens/DiscoverScreen';
import { SearchScreen } from './screens/SearchScreen';
import { SearchResultsScreen } from './screens/SearchResultsScreen';
import { ProfileDetailsScreen } from './screens/ProfileDetailsScreen';
import { InterestsScreen } from './screens/InterestsScreen';
import { MatchesScreen } from './screens/MatchesScreen';
import { FavoritesScreen } from './screens/FavoritesScreen';
import { MessagingScreen } from './screens/MessagingScreen';
import { NotificationsScreen } from './screens/NotificationsScreen';
import { MyProfileScreen } from './screens/MyProfileScreen';
import { EditProfileScreen } from './screens/EditProfileScreen';
import { VerificationScreen } from './screens/VerificationScreen';
import { PreferencesScreen } from './screens/PreferencesScreen';
import { PrivacySafetyScreen } from './screens/PrivacySafetyScreen';
import { SubscriptionScreen } from './screens/SubscriptionScreen';
import { SuccessStoriesScreen } from './screens/SuccessStoriesScreen';
import { IslamicGuidanceScreen } from './screens/IslamicGuidanceScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { HelpSupportScreen } from './screens/HelpSupportScreen';

export const AppContent: React.FC = () => {
  const { currentScreen, isLoggedIn } = useApp();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'landing':
        return <LandingScreen />;
      case 'login':
        return <LoginScreen />;
      case 'register':
        return <RegisterScreen />;
      case 'onboarding':
        return <OnboardingScreen />;
      case 'dashboard':
        return <DashboardScreen />;
      case 'discover':
        return <DiscoverScreen />;
      case 'search':
        return <SearchScreen />;
      case 'search-results':
        return <SearchResultsScreen />;
      case 'profile-details':
        return <ProfileDetailsScreen />;
      case 'interests':
        return <InterestsScreen />;
      case 'matches':
        return <MatchesScreen />;
      case 'favorites':
        return <FavoritesScreen />;
      case 'messages':
        return <MessagingScreen />;
      case 'notifications':
        return <NotificationsScreen />;
      case 'my-profile':
        return <MyProfileScreen />;
      case 'edit-profile':
        return <EditProfileScreen />;
      case 'verification':
        return <VerificationScreen />;
      case 'preferences':
        return <PreferencesScreen />;
      case 'privacy-safety':
        return <PrivacySafetyScreen />;
      case 'subscription':
        return <SubscriptionScreen />;
      case 'success-stories':
        return <SuccessStoriesScreen />;
      case 'islamic-guidance':
        return <IslamicGuidanceScreen />;
      case 'settings':
        return <SettingsScreen />;
      case 'help-support':
        return <HelpSupportScreen />;
      default:
        return <LandingScreen />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream-100 text-charcoal-DEFAULT bg-islamic-pattern antialiased selection:bg-emerald-900 selection:text-gold-200">
      {/* Header */}
      <Header />

      {/* Main Screen Body */}
      <main className="flex-1 w-full animate-in fade-in duration-300">
        {renderScreen()}
      </main>

      {/* Footer (always rendered on landing, or at bottom of main content) */}
      <Footer />

      {/* Mobile Sticky App Bottom Bar */}
      <BottomNav />

      {/* Global Interactive Modals & Toasts */}
      <CelebrationModal />
      <UpgradeModal />
      <VerificationModal />
      <ToastContainer />
    </div>
  );
};
