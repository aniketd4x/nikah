import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { 
  Heart, 
  Sparkles, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  ShieldCheck, 
  BookOpen, 
  CheckCircle2, 
  Users, 
  Clock, 
  ArrowLeft, 
  MessageCircle, 
  Flag, 
  Ban, 
  Share2,
  Calendar,
  Compass,
  AlertTriangle
} from 'lucide-react';

export const ProfileDetailsScreen: React.FC = () => {
  const { 
    selectedProfileId, 
    profiles, 
    navigateTo, 
    sendInterest, 
    interests, 
    toggleFavorite, 
    favorites, 
    startChatWithProfile,
    blockProfile,
    reportProfile,
    privacySettings 
  } = useApp();

  const profile = profiles.find((p) => p.id === selectedProfileId) || profiles[0];
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState('Inappropriate content');

  if (!profile) {
    return (
      <div className="max-w-md mx-auto py-16 text-center">
        <p>Profile not found.</p>
        <Button onClick={() => navigateTo('dashboard')} className="mt-4">Back to Dashboard</Button>
      </div>
    );
  }

  const isFav = favorites.includes(profile.id);
  const sentInterest = interests.find((i) => i.profileId === profile.id && i.type === 'sent');
  const photos = profile.galleryPhotos.length > 0 ? profile.galleryPhotos : [profile.photo];
  const isBlur = profile.blurPhotoByDefault && privacySettings.photoVisibility !== 'public';

  const handleReportSubmit = () => {
    reportProfile(profile.id, reportReason);
    setIsReportModalOpen(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 pb-28 md:pb-16">
      {/* Top Back & Action Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigateTo('search-results')}
          className="flex items-center gap-2 text-xs font-bold text-emerald-950 hover:text-emerald-700 bg-white px-4 py-2 rounded-2xl border border-cream-300 shadow-sm transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Matches</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
                alert('Profile link copied to clipboard.');
              }
            }}
            className="p-2.5 rounded-2xl bg-white border border-cream-300 text-charcoal-600 hover:bg-cream-100 shadow-sm"
            aria-label="Share Profile"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => toggleFavorite(profile.id)}
            className={`p-2.5 rounded-2xl border shadow-sm transition-all ${
              isFav
                ? 'bg-rose-50 border-rose-200 text-rose-600'
                : 'bg-white border-cream-300 text-charcoal-600 hover:text-rose-600'
            }`}
            aria-label="Favorite"
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* HERO SECTION: Gallery & Primary Identity */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-300 shadow-card">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Gallery */}
          <div className="lg:col-span-5 space-y-3">
            <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden bg-cream-200 border border-cream-300">
              <img
                src={photos[selectedPhotoIndex] || profile.photo}
                alt={profile.name}
                className={`w-full h-full object-cover ${isBlur ? 'blur-lg' : ''}`}
              />
              <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                <Badge variant="match" size="sm">
                  {profile.compatibilityScore}% Compatibility
                </Badge>
                {profile.verified.photo && <Badge variant="verified" size="sm">100% Verified</Badge>}
              </div>
            </div>

            {/* Thumbnail Row */}
            {photos.length > 1 && (
              <div className="flex gap-2">
                {photos.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedPhotoIndex(idx)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedPhotoIndex === idx ? 'border-emerald-800 scale-105 shadow-sm' : 'border-cream-300 opacity-70'
                    }`}
                  >
                    <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Primary Identity Info */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-emerald-950">
                  {profile.name}
                </h1>
                <span className="text-xl font-bold text-charcoal-500 font-sans">
                  , {profile.age}
                </span>
                {profile.online && (
                  <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Online
                  </span>
                )}
              </div>

              <p className="text-sm text-charcoal-600 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold-600 shrink-0" />
                <span>{profile.city}, {profile.state ? `${profile.state}, ` : ''}{profile.country}</span>
              </p>
            </div>

            {/* Quick Metrics Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="bg-cream-100 p-3 rounded-2xl border border-cream-200 text-xs">
                <span className="text-charcoal-500 block text-[10px] uppercase font-semibold">Profession</span>
                <span className="font-bold text-emerald-950 truncate block mt-0.5">{profile.profession}</span>
              </div>
              <div className="bg-cream-100 p-3 rounded-2xl border border-cream-200 text-xs">
                <span className="text-charcoal-500 block text-[10px] uppercase font-semibold">Education</span>
                <span className="font-bold text-emerald-950 truncate block mt-0.5">{profile.degree}</span>
              </div>
              <div className="bg-cream-100 p-3 rounded-2xl border border-cream-200 text-xs">
                <span className="text-charcoal-500 block text-[10px] uppercase font-semibold">Sect / Tradition</span>
                <span className="font-bold text-emerald-950 truncate block mt-0.5">{profile.religion.sect}</span>
              </div>
              <div className="bg-cream-100 p-3 rounded-2xl border border-cream-200 text-xs">
                <span className="text-charcoal-500 block text-[10px] uppercase font-semibold">Height</span>
                <span className="font-bold text-emerald-950 truncate block mt-0.5">{profile.height}</span>
              </div>
              <div className="bg-cream-100 p-3 rounded-2xl border border-cream-200 text-xs">
                <span className="text-charcoal-500 block text-[10px] uppercase font-semibold">Marital Status</span>
                <span className="font-bold text-emerald-950 truncate block mt-0.5">{profile.maritalStatus}</span>
              </div>
              <div className="bg-cream-100 p-3 rounded-2xl border border-cream-200 text-xs">
                <span className="text-charcoal-500 block text-[10px] uppercase font-semibold">Mother Tongue</span>
                <span className="font-bold text-emerald-950 truncate block mt-0.5">{profile.motherTongue}</span>
              </div>
            </div>

            {/* Why This Match Callout */}
            <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200/80 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-950">
                <Sparkles className="w-4 h-4 text-gold-600" />
                <span>Compatibility Breakdown ({profile.compatibilityScore}% Match)</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.matchReasons.map((reason, idx) => (
                  <span
                    key={idx}
                    className="bg-white text-emerald-900 text-xs font-medium px-3 py-1 rounded-xl border border-emerald-200 shadow-sm"
                  >
                    ✓ {reason}
                  </span>
                ))}
              </div>
            </div>

            {/* Primary CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                variant="gold"
                size="lg"
                fullWidth
                disabled={Boolean(sentInterest)}
                onClick={() => sendInterest(profile.id)}
                leftIcon={<Heart className="w-4 h-4" />}
              >
                {sentInterest ? 'Interest Request Sent' : 'Send Interest Request'}
              </Button>
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={() => startChatWithProfile(profile.id)}
                leftIcon={<MessageCircle className="w-4 h-4" />}
              >
                Direct Message
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* DETAILED TABS / SECTIONS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Section 1: About Me */}
        <div className="bg-white rounded-3xl p-6 border border-cream-300 shadow-soft space-y-3">
          <h3 className="font-serif font-bold text-lg text-emerald-950 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-800" />
            <span>About Me & Character</span>
          </h3>
          <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
            {profile.aboutMe}
          </p>
        </div>

        {/* Section 2: Religion & Values */}
        <div className="bg-white rounded-3xl p-6 border border-cream-300 shadow-soft space-y-3">
          <h3 className="font-serif font-bold text-lg text-emerald-950 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-gold-600" />
            <span>Religion & Islamic Practice</span>
          </h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-cream-200">
              <span className="text-charcoal-500">Salah Frequency:</span>
              <span className="font-bold text-emerald-900">{profile.religion.prayerFrequency}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-cream-200">
              <span className="text-charcoal-500">Dietary Standard:</span>
              <span className="font-bold text-emerald-900">{profile.religion.halalDiet}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-cream-200">
              <span className="text-charcoal-500">Hijab / Modest Dress:</span>
              <span className="font-bold text-emerald-900">{profile.religion.hijabNiqabBeard || 'Modest Attire'}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-cream-200">
              <span className="text-charcoal-500">Sect:</span>
              <span className="font-bold text-emerald-900">{profile.religion.sect}</span>
            </div>
          </div>
        </div>

        {/* Section 3: Education & Career */}
        <div className="bg-white rounded-3xl p-6 border border-cream-300 shadow-soft space-y-3">
          <h3 className="font-serif font-bold text-lg text-emerald-950 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-emerald-800" />
            <span>Education & Career Details</span>
          </h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-cream-200">
              <span className="text-charcoal-500">Profession:</span>
              <span className="font-bold text-emerald-950">{profile.profession}</span>
            </div>
            {profile.company && (
              <div className="flex justify-between py-1 border-b border-cream-200">
                <span className="text-charcoal-500">Organization:</span>
                <span className="font-bold text-emerald-950">{profile.company}</span>
              </div>
            )}
            <div className="flex justify-between py-1 border-b border-cream-200">
              <span className="text-charcoal-500">Highest Qualification:</span>
              <span className="font-bold text-emerald-950">{profile.degree}</span>
            </div>
            {profile.university && (
              <div className="flex justify-between py-1 border-b border-cream-200">
                <span className="text-charcoal-500">University:</span>
                <span className="font-bold text-emerald-950">{profile.university}</span>
              </div>
            )}
          </div>
        </div>

        {/* Section 4: Family Details */}
        <div className="bg-white rounded-3xl p-6 border border-cream-300 shadow-soft space-y-3">
          <h3 className="font-serif font-bold text-lg text-emerald-950 flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-800" />
            <span>Family Background</span>
          </h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-cream-200">
              <span className="text-charcoal-500">Family Type:</span>
              <span className="font-bold text-emerald-950">{profile.familyType} Family</span>
            </div>
            <div className="flex justify-between py-1 border-b border-cream-200">
              <span className="text-charcoal-500">Family Values:</span>
              <span className="font-bold text-emerald-950">{profile.familyValues}</span>
            </div>
            {profile.fatherOccupation && (
              <div className="flex justify-between py-1 border-b border-cream-200">
                <span className="text-charcoal-500">Father:</span>
                <span className="font-bold text-emerald-950">{profile.fatherOccupation}</span>
              </div>
            )}
            {profile.motherOccupation && (
              <div className="flex justify-between py-1 border-b border-cream-200">
                <span className="text-charcoal-500">Mother:</span>
                <span className="font-bold text-emerald-950">{profile.motherOccupation}</span>
              </div>
            )}
            {profile.siblings && (
              <div className="flex justify-between py-1 border-b border-cream-200">
                <span className="text-charcoal-500">Siblings:</span>
                <span className="font-bold text-emerald-950">{profile.siblings}</span>
              </div>
            )}
          </div>
        </div>

        {/* Section 5: Partner Preferences */}
        <div className="bg-white rounded-3xl p-6 border border-cream-300 shadow-soft space-y-3 md:col-span-2">
          <h3 className="font-serif font-bold text-lg text-emerald-950 flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-600" />
            <span>Partner Preferences & Expectations</span>
          </h3>
          <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed mb-3">
            "{profile.lookingForSummary}"
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-cream-50 p-4 rounded-2xl border border-cream-200">
            <div>
              <span className="text-charcoal-500 block font-medium">Age Range Preference</span>
              <span className="font-bold text-emerald-950">{profile.partnerPreferences.ageRange[0]} - {profile.partnerPreferences.ageRange[1]} years</span>
            </div>
            <div>
              <span className="text-charcoal-500 block font-medium">Relocation Willingness</span>
              <span className="font-bold text-emerald-950">{profile.partnerPreferences.relocation}</span>
            </div>
            <div>
              <span className="text-charcoal-500 block font-medium">Spiritual Expectation</span>
              <span className="font-bold text-emerald-950">{profile.partnerPreferences.religiousCommitment}</span>
            </div>
          </div>
        </div>
      </div>

      {/* VERIFICATION & SAFETY ACTIONS */}
      <div className="bg-white rounded-3xl p-6 border border-cream-300 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-emerald-950">Verified & Authenticated Profile</h4>
            <p className="text-[11px] text-charcoal-500">Reviewed by Heavenly Nikah Trust Team</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsReportModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-charcoal-500 hover:text-rose-700 hover:bg-rose-50 transition-colors"
          >
            <Flag className="w-3.5 h-3.5" />
            <span>Report Profile</span>
          </button>
          <button
            onClick={() => blockProfile(profile.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-charcoal-500 hover:text-charcoal-900 hover:bg-cream-200 transition-colors"
          >
            <Ban className="w-3.5 h-3.5" />
            <span>Block Member</span>
          </button>
        </div>
      </div>

      {/* REPORT MODAL */}
      <Modal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        title="Report Profile"
        subtitle="Help us maintain a respectful, halal matrimonial community"
        maxWidth="md"
      >
        <div className="space-y-4">
          <p className="text-xs text-charcoal-600">
            Please select the reason for reporting this profile. Our trust and safety team reviews reports within 24 hours.
          </p>

          <div className="space-y-2">
            {[
              'Fake or misleading photos',
              'Commercial / spam behavior',
              'Disrespectful or non-halal communication',
              'Underage or improper account',
              'Other safety concern'
            ].map((reason) => (
              <label
                key={reason}
                className={`flex items-center gap-2.5 p-3 rounded-2xl border text-xs cursor-pointer transition-colors ${
                  reportReason === reason
                    ? 'border-emerald-800 bg-emerald-50 text-emerald-950 font-bold'
                    : 'border-cream-300 hover:bg-cream-100 text-charcoal-700'
                }`}
              >
                <input
                  type="radio"
                  name="report"
                  checked={reportReason === reason}
                  onChange={() => setReportReason(reason)}
                  className="accent-emerald-900"
                />
                <span>{reason}</span>
              </label>
            ))}
          </div>

          <div className="flex gap-3 pt-2">
            <Button variant="secondary" size="md" fullWidth onClick={() => setIsReportModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" size="md" fullWidth onClick={handleReportSubmit}>
              Submit Report
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
