import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/common/Button';
import { ProgressBar } from '../components/common/ProgressBar';
import { Badge } from '../components/common/Badge';
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Camera, 
  BookOpen, 
  Heart, 
  Briefcase, 
  User, 
  ShieldCheck,
  ImagePlus,
  Upload,
  Trash2,
  Star,
  Loader2
} from 'lucide-react';
import { processImageFile, processMultipleImageFiles } from '../utils/imageUpload';

export const OnboardingScreen: React.FC = () => {
  const { currentUser, updateCurrentUser, navigateTo, addToast } = useApp();
  const [step, setStep] = useState<number>(1);
  const [isUploading, setIsUploading] = useState(false);

  const primaryPhotoInputRef = useRef<HTMLInputElement>(null);
  const galleryPhotosInputRef = useRef<HTMLInputElement>(null);

  // Form local state
  const [formData, setFormData] = useState({
    name: currentUser.name,
    age: currentUser.age,
    gender: currentUser.gender,
    maritalStatus: currentUser.maritalStatus,
    height: currentUser.height,
    motherTongue: currentUser.motherTongue,
    city: currentUser.city,
    country: currentUser.country,
    aboutMe: currentUser.aboutMe,
    education: currentUser.education,
    degree: currentUser.degree,
    profession: currentUser.profession,
    company: currentUser.company || '',
    sect: currentUser.religion.sect,
    prayerFrequency: currentUser.religion.prayerFrequency,
    halalDiet: currentUser.religion.halalDiet,
    hijabNiqabBeard: currentUser.religion.hijabNiqabBeard || 'Observes Hijab / Beard',
    familyType: currentUser.familyType,
    familyValues: currentUser.familyValues,
    relocation: currentUser.partnerPreferences.relocation,
    partnerAgeMin: currentUser.partnerPreferences.ageRange[0],
    partnerAgeMax: currentUser.partnerPreferences.ageRange[1],
    photo: currentUser.photo,
    galleryPhotos: currentUser.galleryPhotos && currentUser.galleryPhotos.length > 0 
      ? currentUser.galleryPhotos 
      : [currentUser.photo]
  });

  const totalSteps = 8;
  const progressPercent = Math.round((step / totalSteps) * 100);

  const handlePrimaryPhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploading(true);
      const dataUrl = await processImageFile(file);
      setFormData(prev => {
        const existing = prev.galleryPhotos || [];
        const updatedGallery = existing.includes(dataUrl) ? existing : [dataUrl, ...existing];
        return { ...prev, photo: dataUrl, galleryPhotos: updatedGallery };
      });
      addToast('Profile Photo Updated', 'Main profile picture uploaded successfully.', 'success');
    } catch (err) {
      addToast('Upload Failed', 'Could not process selected image.', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleGalleryPhotosChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    try {
      setIsUploading(true);
      const dataUrls = await processMultipleImageFiles(files);
      if (dataUrls.length > 0) {
        setFormData(prev => {
          const current = prev.galleryPhotos || [prev.photo];
          const combined = [...current];
          dataUrls.forEach(url => {
            if (!combined.includes(url)) combined.push(url);
          });
          return { ...prev, galleryPhotos: combined };
        });
        addToast('Photos Uploaded', `${dataUrls.length} photo(s) added to gallery.`, 'success');
      }
    } catch (err) {
      addToast('Upload Failed', 'Could not process gallery photos.', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemovePhoto = (photoUrl: string) => {
    setFormData(prev => {
      const filtered = (prev.galleryPhotos || []).filter(p => p !== photoUrl);
      const newPrimary = prev.photo === photoUrl ? (filtered[0] || '') : prev.photo;
      return { ...prev, photo: newPrimary, galleryPhotos: filtered };
    });
    addToast('Photo Removed', 'Removed photo from gallery.', 'info');
  };

  const handleSetPrimaryPhoto = (photoUrl: string) => {
    setFormData(prev => ({ ...prev, photo: photoUrl }));
    addToast('Primary Photo Set', 'Photo selected as main profile picture.', 'success');
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Finalize onboarding
      updateCurrentUser({
        name: formData.name,
        age: Number(formData.age),
        maritalStatus: formData.maritalStatus as any,
        height: formData.height,
        motherTongue: formData.motherTongue,
        city: formData.city,
        country: formData.country,
        aboutMe: formData.aboutMe,
        education: formData.education,
        degree: formData.degree,
        profession: formData.profession,
        photo: formData.photo,
        galleryPhotos: formData.galleryPhotos,
        religion: {
          ...currentUser.religion,
          sect: formData.sect,
          prayerFrequency: formData.prayerFrequency as any,
          halalDiet: formData.halalDiet as any,
          hijabNiqabBeard: formData.hijabNiqabBeard
        },
        familyType: formData.familyType as any,
        familyValues: formData.familyValues as any,
        partnerPreferences: {
          ...currentUser.partnerPreferences,
          ageRange: [formData.partnerAgeMin, formData.partnerAgeMax],
          relocation: formData.relocation as any
        }
      });
      addToast('Onboarding Complete!', 'Al-hamdulillah! Your profile is ready for discovery.', 'success');
      navigateTo('dashboard');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 sm:py-10 pb-28 md:pb-12">
      {/* Hidden File Inputs */}
      <input
        ref={primaryPhotoInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handlePrimaryPhotoChange}
      />
      <input
        ref={galleryPhotosInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleGalleryPhotosChange}
      />

      {/* Top Header Card */}
      <div className="bg-white/95 backdrop-blur-md rounded-[2rem] p-6 sm:p-8 border border-cream-300/80 shadow-soft mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-gold-700 bg-gold-50/90 px-3 py-1 rounded-full border border-gold-200 shadow-sm">
              <Sparkles className="w-3 h-3 text-gold-600" />
              Step {step} of {totalSteps}
            </span>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-emerald-950 mt-1.5 tracking-tight">
              {step === 1 && 'Basic Information'}
              {step === 2 && 'About Yourself'}
              {step === 3 && 'Education & Profession'}
              {step === 4 && 'Religious Practice & Values'}
              {step === 5 && 'Family & Lifestyle Preferences'}
              {step === 6 && 'Partner Preferences'}
              {step === 7 && 'Upload Profile Photos'}
              {step === 8 && 'Profile Completion & Review'}
            </h1>
          </div>
          <div className="text-right sm:w-48">
            <ProgressBar percentage={progressPercent} label="Progress" size="md" />
          </div>
        </div>

        {/* Motivational Banner */}
        <div className="bg-emerald-50/80 rounded-2xl p-3.5 border border-emerald-200/80 flex items-center gap-2.5 text-xs text-emerald-900 shadow-sm">
          <Sparkles className="w-4 h-4 text-gold-600 shrink-0" />
          <span>
            {step < 5 
              ? 'Complete profiles receive up to 5x more respectful responses from serious families.' 
              : 'Almost there! Adding thoughtful details ensures high Islamic compatibility.'}
          </span>
        </div>
      </div>

      {/* Step Contents */}
      <div className="bg-white/95 backdrop-blur-md rounded-[2rem] p-6 sm:p-8 border border-cream-300/80 shadow-card">
        {/* STEP 1: Basic Information */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-charcoal-700">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 rounded-2xl border border-cream-300 bg-cream-50 text-xs focus:ring-2 focus:ring-emerald-700"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-charcoal-700">Age</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                  className="w-full p-2.5 rounded-2xl border border-cream-300 bg-cream-50 text-xs focus:ring-2 focus:ring-emerald-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-charcoal-700">Marital Status</label>
                <select
                  value={formData.maritalStatus}
                  onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value as any })}
                  className="w-full p-2.5 rounded-2xl border border-cream-300 bg-cream-50 text-xs focus:ring-2 focus:ring-emerald-700"
                >
                  <option value="Never Married">Never Married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-charcoal-700">Height</label>
                <input
                  type="text"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                  placeholder={'e.g. 5\' 9" (175 cm)'}
                  className="w-full p-2.5 rounded-2xl border border-cream-300 bg-cream-50 text-xs focus:ring-2 focus:ring-emerald-700"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-charcoal-700">Mother Tongue</label>
                <input
                  type="text"
                  value={formData.motherTongue}
                  onChange={(e) => setFormData({ ...formData, motherTongue: e.target.value })}
                  placeholder="e.g. Urdu, Arabic, English"
                  className="w-full p-2.5 rounded-2xl border border-cream-300 bg-cream-50 text-xs focus:ring-2 focus:ring-emerald-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-charcoal-700">Current City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full p-2.5 rounded-2xl border border-cream-300 bg-cream-50 text-xs focus:ring-2 focus:ring-emerald-700"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-charcoal-700">Country</label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full p-2.5 rounded-2xl border border-cream-300 bg-cream-50 text-xs focus:ring-2 focus:ring-emerald-700"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: About Yourself */}
        {step === 2 && (
          <div className="space-y-4 animate-in fade-in">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-charcoal-700">
                Write a thoughtful bio about your character, routine, and interests
              </label>
              <textarea
                rows={5}
                value={formData.aboutMe}
                onChange={(e) => setFormData({ ...formData, aboutMe: e.target.value })}
                placeholder="Share your Islamic values, daily hobbies, personality traits, and what brings peace to your life..."
                className="w-full p-3 rounded-2xl border border-cream-300 bg-cream-50 text-xs leading-relaxed focus:ring-2 focus:ring-emerald-700"
              />
              <p className="text-[11px] text-charcoal-400">
                Tip: Mention your favorite Islamic studies, nature activities, and family traditions.
              </p>
            </div>
          </div>
        )}

        {/* STEP 3: Education & Profession */}
        {step === 3 && (
          <div className="space-y-4 animate-in fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-charcoal-700">Highest Education Level</label>
                <select
                  value={formData.education}
                  onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                  className="w-full p-2.5 rounded-2xl border border-cream-300 bg-cream-50 text-xs focus:ring-2 focus:ring-emerald-700"
                >
                  <option value="Doctorate">Doctorate (PhD / MD / Specialist)</option>
                  <option value="Postgraduate">Postgraduate (Masters / MBA / CA)</option>
                  <option value="Bachelors">Bachelors Degree</option>
                  <option value="Diploma">Diploma / Associate Degree</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-charcoal-700">Degree & Specialization</label>
                <input
                  type="text"
                  value={formData.degree}
                  onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                  placeholder="e.g. M.Tech in Software Engineering"
                  className="w-full p-2.5 rounded-2xl border border-cream-300 bg-cream-50 text-xs focus:ring-2 focus:ring-emerald-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-charcoal-700">Profession / Job Title</label>
                <input
                  type="text"
                  value={formData.profession}
                  onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                  placeholder="e.g. Senior Software Engineer"
                  className="w-full p-2.5 rounded-2xl border border-cream-300 bg-cream-50 text-xs focus:ring-2 focus:ring-emerald-700"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-charcoal-700">Company / Organization (Optional)</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g. Tech Solutions Pvt Ltd"
                  className="w-full p-2.5 rounded-2xl border border-cream-300 bg-cream-50 text-xs focus:ring-2 focus:ring-emerald-700"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Religious Preferences */}
        {step === 4 && (
          <div className="space-y-4 animate-in fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-charcoal-700">Islamic Sect / Tradition</label>
                <select
                  value={formData.sect}
                  onChange={(e) => setFormData({ ...formData, sect: e.target.value })}
                  className="w-full p-2.5 rounded-2xl border border-cream-300 bg-cream-50 text-xs focus:ring-2 focus:ring-emerald-700"
                >
                  <option value="Sunni (Hanafi)">Sunni (Hanafi)</option>
                  <option value="Sunni (Shafi)">Sunni (Shafi)</option>
                  <option value="Sunni (Maliki)">Sunni (Maliki)</option>
                  <option value="Sunni (Hanbali)">Sunni (Hanbali)</option>
                  <option value="Sunni (General)">Sunni (General)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-charcoal-700">Daily Salah Practice</label>
                <select
                  value={formData.prayerFrequency}
                  onChange={(e) => setFormData({ ...formData, prayerFrequency: e.target.value as any })}
                  className="w-full p-2.5 rounded-2xl border border-cream-300 bg-cream-50 text-xs focus:ring-2 focus:ring-emerald-700"
                >
                  <option value="Always (5 times daily)">Always (5 times daily)</option>
                  <option value="Usually">Usually</option>
                  <option value="Sometimes">Sometimes</option>
                  <option value="Only Jummah">Only Jummah</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-charcoal-700">Dietary Practice</label>
                <select
                  value={formData.halalDiet}
                  onChange={(e) => setFormData({ ...formData, halalDiet: e.target.value as any })}
                  className="w-full p-2.5 rounded-2xl border border-cream-300 bg-cream-50 text-xs focus:ring-2 focus:ring-emerald-700"
                >
                  <option value="Strictly Halal">Strictly Halal</option>
                  <option value="Halal Only">Halal Only</option>
                  <option value="Vegetarian / Halal">Vegetarian / Halal</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-charcoal-700">Hijab / Modest Dress / Beard</label>
                <input
                  type="text"
                  value={formData.hijabNiqabBeard}
                  onChange={(e) => setFormData({ ...formData, hijabNiqabBeard: e.target.value })}
                  placeholder="e.g. Observes Hijab & Modest Abaya or Sunnah Beard"
                  className="w-full p-2.5 rounded-2xl border border-cream-300 bg-cream-50 text-xs focus:ring-2 focus:ring-emerald-700"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Family & Lifestyle Preferences */}
        {step === 5 && (
          <div className="space-y-4 animate-in fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-charcoal-700">Family Structure</label>
                <select
                  value={formData.familyType}
                  onChange={(e) => setFormData({ ...formData, familyType: e.target.value as any })}
                  className="w-full p-2.5 rounded-2xl border border-cream-300 bg-cream-50 text-xs focus:ring-2 focus:ring-emerald-700"
                >
                  <option value="Nuclear">Nuclear Family</option>
                  <option value="Joint">Joint Family</option>
                  <option value="Extended">Extended Family</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-charcoal-700">Family Values</label>
                <select
                  value={formData.familyValues}
                  onChange={(e) => setFormData({ ...formData, familyValues: e.target.value as any })}
                  className="w-full p-2.5 rounded-2xl border border-cream-300 bg-cream-50 text-xs focus:ring-2 focus:ring-emerald-700"
                >
                  <option value="Moderate">Moderate & Balanced</option>
                  <option value="Traditional">Traditional</option>
                  <option value="Liberal">Progressive / Liberal</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-charcoal-700">Relocation Post-Nikah</label>
              <select
                value={formData.relocation}
                onChange={(e) => setFormData({ ...formData, relocation: e.target.value as any })}
                className="w-full p-2.5 rounded-2xl border border-cream-300 bg-cream-50 text-xs focus:ring-2 focus:ring-emerald-700"
              >
                <option value="Open to discussion">Open to discussion</option>
                <option value="Willing to relocate">Willing to relocate (GCC / International / Other City)</option>
                <option value="Not willing to relocate">Prefer to stay in current city</option>
              </select>
            </div>
          </div>
        )}

        {/* STEP 6: Partner Preferences */}
        {step === 6 && (
          <div className="space-y-4 animate-in fade-in">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-charcoal-700">Preferred Partner Age Range</label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] text-charcoal-500 block mb-1">Min Age: {formData.partnerAgeMin} yrs</span>
                  <input
                    type="range"
                    min="18"
                    max="45"
                    value={formData.partnerAgeMin}
                    onChange={(e) => setFormData({ ...formData, partnerAgeMin: Number(e.target.value) })}
                    className="w-full accent-emerald-900"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-charcoal-500 block mb-1">Max Age: {formData.partnerAgeMax} yrs</span>
                  <input
                    type="range"
                    min="18"
                    max="50"
                    value={formData.partnerAgeMax}
                    onChange={(e) => setFormData({ ...formData, partnerAgeMax: Number(e.target.value) })}
                    className="w-full accent-emerald-900"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 7: Photos */}
        {step === 7 && (
          <div className="space-y-6 animate-in fade-in">
            {/* Primary Profile Photo Header Card */}
            <div className="bg-cream-100/70 p-5 rounded-2xl border border-cream-300 flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
              <div 
                onClick={() => primaryPhotoInputRef.current?.click()}
                className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border-4 border-emerald-900 shadow-md cursor-pointer group shrink-0"
                title="Click to choose primary profile photo"
              >
                <img src={formData.photo} alt="Profile" className="w-full h-full object-cover group-hover:scale-105 transition-all" />
                <div className="absolute inset-0 bg-emerald-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-2">
                  {isUploading ? (
                    <Loader2 className="w-6 h-6 animate-spin text-gold-400" />
                  ) : (
                    <>
                      <Camera className="w-5 h-5 text-gold-400 mb-1" />
                      <span className="text-[10px] font-bold">Upload Photo</span>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h4 className="text-sm font-bold text-emerald-950">Primary Profile Photo</h4>
                  <Badge variant="gold" size="sm">Main Avatar</Badge>
                </div>
                <p className="text-xs text-charcoal-600 leading-relaxed">
                  Choose a clear, modest portrait photo from your device. Profiles with genuine photos receive 3x more halal responses.
                </p>
                <div className="pt-1 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <Button
                    size="sm"
                    variant="primary"
                    leftIcon={<Camera className="w-3.5 h-3.5" />}
                    onClick={() => primaryPhotoInputRef.current?.click()}
                    disabled={isUploading}
                  >
                    Select Main Photo
                  </Button>
                </div>
              </div>
            </div>

            {/* Multi-Photo Gallery Upload */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-sm font-bold text-emerald-950 flex items-center gap-1.5">
                    <ImagePlus className="w-4 h-4 text-emerald-800" />
                    Additional Gallery Photos (Upload Multiple)
                  </h4>
                  <p className="text-[11px] text-charcoal-500">
                    Upload multiple pictures from your phone or PC to complete your profile album.
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="gold"
                  leftIcon={<Upload className="w-3.5 h-3.5" />}
                  onClick={() => galleryPhotosInputRef.current?.click()}
                  disabled={isUploading}
                >
                  + Upload Multiple Photos
                </Button>
              </div>

              {/* Photos Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {(formData.galleryPhotos || [formData.photo]).map((photoUrl, idx) => {
                  const isMain = formData.photo === photoUrl;
                  return (
                    <div
                      key={idx}
                      className={`relative aspect-[3/4] rounded-2xl overflow-hidden border-2 group bg-cream-100 shadow-sm transition-all ${
                        isMain ? 'border-emerald-700 ring-2 ring-emerald-600/30' : 'border-cream-300 hover:border-gold-400'
                      }`}
                    >
                      <img src={photoUrl} alt={`Photo ${idx + 1}`} className="w-full h-full object-cover" />

                      {isMain && (
                        <span className="absolute top-2 left-2 bg-emerald-700 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-md flex items-center gap-1">
                          <Star className="w-2.5 h-2.5 fill-white" />
                          Main
                        </span>
                      )}

                      {/* Hover Actions */}
                      <div className="absolute inset-0 bg-emerald-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                        <div className="flex justify-end">
                          {(formData.galleryPhotos?.length || 0) > 1 && (
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
                            onClick={() => handleSetPrimaryPhoto(photoUrl)}
                            className="w-full py-1.5 px-2 bg-white/95 hover:bg-white text-emerald-950 text-[10px] font-bold rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-1"
                          >
                            <Star className="w-3 h-3 text-gold-600" />
                            Set as Main
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Add more button tile */}
                <div
                  onClick={() => galleryPhotosInputRef.current?.click()}
                  className="aspect-[3/4] rounded-2xl border-2 border-dashed border-cream-400 hover:border-emerald-700 bg-cream-50/60 hover:bg-emerald-50/40 flex flex-col items-center justify-center cursor-pointer transition-all p-3 text-center group"
                >
                  <div className="w-10 h-10 rounded-2xl bg-cream-200 group-hover:bg-emerald-100 flex items-center justify-center mb-2 transition-colors">
                    <Upload className="w-5 h-5 text-charcoal-600 group-hover:text-emerald-800" />
                  </div>
                  <span className="text-xs font-bold text-emerald-950 group-hover:text-emerald-800">Add More</span>
                  <span className="text-[10px] text-charcoal-500">From Device</span>
                </div>
              </div>
            </div>

            {/* Modest photo reminder */}
            <div className="bg-cream-50 p-3.5 rounded-2xl border border-cream-200 text-center">
              <p className="text-[11px] text-charcoal-600">
                🔒 <strong>Privacy Assurance:</strong> You can enable Photo Blur or Restrict Viewing to matches in your Privacy Settings anytime.
              </p>
            </div>
          </div>
        )}

        {/* STEP 8: Profile Completion & Review */}
        {step === 8 && (
          <div className="space-y-6 text-center animate-in fade-in py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto border-2 border-emerald-300 shadow-md">
              <CheckCircle2 className="w-8 h-8 text-emerald-800" />
            </div>

            <div>
              <span className="text-xs font-bold text-gold-600 uppercase tracking-widest bg-gold-50 px-3 py-1 rounded-full border border-gold-300">
                Profile 95% Complete
              </span>
              <h3 className="text-2xl font-serif font-bold text-emerald-950 mt-3">
                Masha'Allah! You're All Set
              </h3>
              <p className="text-xs text-charcoal-600 max-w-md mx-auto mt-2 leading-relaxed">
                Your profile is structured for high Islamic compatibility and verified discovery. Let's enter your personalized Match Dashboard.
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-4 pt-6 mt-6 border-t border-cream-200">
          {step > 1 ? (
            <Button
              variant="secondary"
              size="md"
              leftIcon={<ArrowLeft className="w-4 h-4" />}
              onClick={handleBack}
            >
              Back
            </Button>
          ) : (
            <div />
          )}

          <Button
            variant={step === totalSteps ? 'gold' : 'primary'}
            size="md"
            rightIcon={<ArrowRight className="w-4 h-4" />}
            onClick={handleNext}
          >
            {step === totalSteps ? 'Finish & Explore Matches' : 'Save & Continue'}
          </Button>
        </div>
      </div>
    </div>
  );
};
