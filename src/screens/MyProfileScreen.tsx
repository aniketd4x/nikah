import React, { useRef, useState } from 'react';
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
  ArrowRight,
  ImagePlus,
  Trash2,
  Star,
  Upload,
  Loader2
} from 'lucide-react';
import { processImageFile, processMultipleImageFiles } from '../utils/imageUpload';

export const MyProfileScreen: React.FC = () => {
  const { 
    currentUser, 
    updateCurrentUser,
    navigateTo, 
    profileCompletionPercentage, 
    setIsVerificationModalOpen, 
    setIsUpgradeModalOpen, 
    currentPlan,
    addToast
  } = useApp();

  const [isUploading, setIsUploading] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const galleryList = currentUser.galleryPhotos && currentUser.galleryPhotos.length > 0 
    ? currentUser.galleryPhotos 
    : [currentUser.photo];

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploading(true);
      const dataUrl = await processImageFile(file);
      const existing = currentUser.galleryPhotos || [];
      const updatedGallery = existing.includes(dataUrl) ? existing : [dataUrl, ...existing];
      updateCurrentUser({ photo: dataUrl, galleryPhotos: updatedGallery });
      addToast('Profile Photo Updated', 'Your profile picture has been updated successfully.', 'success');
    } catch (err) {
      addToast('Upload Error', 'Failed to process selected picture.', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    try {
      setIsUploading(true);
      const dataUrls = await processMultipleImageFiles(files);
      if (dataUrls.length > 0) {
        const currentGallery = currentUser.galleryPhotos || [currentUser.photo];
        const combined = [...currentGallery];
        dataUrls.forEach((url) => {
          if (!combined.includes(url)) combined.push(url);
        });
        updateCurrentUser({ galleryPhotos: combined });
        addToast('Photos Uploaded', `${dataUrls.length} photo(s) added to your gallery.`, 'success');
      }
    } catch (err) {
      addToast('Upload Error', 'Failed to process gallery photos.', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSetPrimary = (photoUrl: string) => {
    updateCurrentUser({ photo: photoUrl });
    addToast('Primary Photo Changed', 'Selected photo set as your main profile avatar.', 'success');
  };

  const handleRemovePhoto = (photoUrl: string) => {
    const current = currentUser.galleryPhotos || [currentUser.photo];
    const filtered = current.filter((p) => p !== photoUrl);
    const newMain = currentUser.photo === photoUrl ? (filtered[0] || '') : currentUser.photo;
    updateCurrentUser({ photo: newMain, galleryPhotos: filtered });
    addToast('Photo Removed', 'Removed image from your gallery.', 'info');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-6 sm:space-y-8 pb-28 md:pb-12">
      {/* Hidden File Inputs */}
      <input
        ref={avatarInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleAvatarChange}
      />
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleGalleryUpload}
      />

      {/* PROFILE HEADER CARD */}
      <div className="bg-white/95 backdrop-blur-md rounded-[2rem] p-6 sm:p-8 border border-cream-300/80 shadow-card">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar with Quick Upload & Verified Ring */}
          <div className="relative group shrink-0">
            <div 
              onClick={() => avatarInputRef.current?.click()}
              className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border-4 border-emerald-900 shadow-md cursor-pointer group"
              title="Click to change profile picture"
            >
              <img src={currentUser.photo} alt={currentUser.name} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300" />
              
              {/* Hover / Active overlay with Camera icon */}
              <div className="absolute inset-0 bg-emerald-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-2 text-center">
                {isUploading ? (
                  <Loader2 className="w-6 h-6 animate-spin text-gold-400" />
                ) : (
                  <>
                    <Camera className="w-6 h-6 text-gold-400 mb-1" />
                    <span className="text-[10px] font-bold">Change Photo</span>
                  </>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={() => avatarInputRef.current?.click()}
              className="absolute -bottom-2 -right-2 bg-emerald-700 hover:bg-emerald-800 text-white p-2 rounded-2xl border-2 border-white shadow-md active:scale-95 transition-all"
              title="Change Profile Photo"
            >
              <Camera className="w-4 h-4" />
            </button>
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

      {/* PHOTO GALLERY SECTION */}
      <div className="bg-white/95 backdrop-blur-md rounded-[2rem] p-6 sm:p-8 border border-cream-300/80 shadow-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gold-100 flex items-center justify-center border border-gold-200">
                <ImagePlus className="w-4 h-4 text-gold-700" />
              </div>
              <h2 className="text-lg font-serif font-bold text-emerald-950">My Photos & Gallery</h2>
            </div>
            <p className="text-xs text-charcoal-500 mt-1">
              Upload multiple pictures directly from your device. You can set any picture as your main profile photo.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Camera className="w-3.5 h-3.5" />}
              onClick={() => avatarInputRef.current?.click()}
              disabled={isUploading}
            >
              Change Avatar
            </Button>
            <Button
              variant="gold"
              size="sm"
              leftIcon={<Upload className="w-3.5 h-3.5" />}
              onClick={() => galleryInputRef.current?.click()}
              disabled={isUploading}
            >
              + Add Photos
            </Button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 pt-2">
          {galleryList.map((photoUrl, idx) => {
            const isMain = currentUser.photo === photoUrl;
            return (
              <div
                key={idx}
                className={`relative aspect-[3/4] rounded-2xl overflow-hidden border-2 group bg-cream-100 shadow-sm transition-all ${
                  isMain ? 'border-emerald-700 ring-2 ring-emerald-600/30' : 'border-cream-300 hover:border-gold-400'
                }`}
              >
                <img src={photoUrl} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />

                {isMain && (
                  <span className="absolute top-2 left-2 bg-emerald-700 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-md flex items-center gap-1">
                    <Star className="w-2.5 h-2.5 fill-white" />
                    Main
                  </span>
                )}

                {/* Overlay actions on hover */}
                <div className="absolute inset-0 bg-emerald-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                  <div className="flex justify-end">
                    {galleryList.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemovePhoto(photoUrl)}
                        className="bg-rose-600/90 hover:bg-rose-600 text-white p-1.5 rounded-xl shadow-md transition-all active:scale-95"
                        title="Delete photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {!isMain && (
                    <button
                      type="button"
                      onClick={() => handleSetPrimary(photoUrl)}
                      className="w-full py-1.5 px-2 bg-white/95 hover:bg-white text-emerald-950 text-[10px] font-bold rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-1"
                    >
                      <Star className="w-3 h-3 text-gold-600" />
                      Set as Avatar
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          {/* Quick upload drop box */}
          <div
            onClick={() => galleryInputRef.current?.click()}
            className="aspect-[3/4] rounded-2xl border-2 border-dashed border-cream-400 hover:border-emerald-700 bg-cream-50/50 hover:bg-emerald-50/40 flex flex-col items-center justify-center cursor-pointer transition-all p-3 text-center group"
          >
            <div className="w-10 h-10 rounded-2xl bg-cream-200 group-hover:bg-emerald-100 flex items-center justify-center mb-2 transition-colors">
              <Upload className="w-5 h-5 text-charcoal-600 group-hover:text-emerald-800" />
            </div>
            <span className="text-xs font-bold text-emerald-950 group-hover:text-emerald-800">Add More</span>
            <span className="text-[10px] text-charcoal-500">Device Upload</span>
          </div>
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
