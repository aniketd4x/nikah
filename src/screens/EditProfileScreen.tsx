import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { 
  Save, 
  ArrowLeft, 
  User, 
  Briefcase, 
  GraduationCap, 
  Sparkles, 
  Users, 
  Heart, 
  Camera, 
  Check,
  ChevronDown,
  ChevronUp,
  ImagePlus,
  Trash2,
  Star,
  Upload
} from 'lucide-react';
import { processImageFile, processMultipleImageFiles } from '../utils/imageUpload';

export const EditProfileScreen: React.FC = () => {
  const { currentUser, updateCurrentUser, navigateTo, addToast } = useApp();

  const [form, setForm] = useState({ 
    ...currentUser, 
    galleryPhotos: currentUser.galleryPhotos && currentUser.galleryPhotos.length > 0 
      ? currentUser.galleryPhotos 
      : [currentUser.photo]
  });
  const [openSection, setOpenSection] = useState<string>('photos');
  const [isUploading, setIsUploading] = useState(false);

  const mainPhotoInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? '' : id);
  };

  const handleMainPhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploading(true);
      const dataUrl = await processImageFile(file);
      setForm((prev) => {
        const existingGallery = prev.galleryPhotos || [];
        const newGallery = existingGallery.includes(dataUrl) ? existingGallery : [dataUrl, ...existingGallery];
        return { ...prev, photo: dataUrl, galleryPhotos: newGallery };
      });
      addToast('Profile Photo Updated', 'Your main profile photo has been selected. Click Save All Changes to confirm.', 'success');
    } catch (err) {
      addToast('Upload Failed', 'Could not process the selected image.', 'error');
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
        setForm((prev) => {
          const currentGallery = prev.galleryPhotos || [prev.photo];
          const combined = [...currentGallery];
          dataUrls.forEach((url) => {
            if (!combined.includes(url)) combined.push(url);
          });
          return { ...prev, galleryPhotos: combined };
        });
        addToast('Photos Added', `${dataUrls.length} photo(s) added to your gallery!`, 'success');
      }
    } catch (err) {
      addToast('Upload Failed', 'Could not process gallery photos.', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveGalleryPhoto = (photoUrl: string) => {
    setForm((prev) => {
      const filtered = (prev.galleryPhotos || []).filter((p) => p !== photoUrl);
      const newPrimary = prev.photo === photoUrl ? (filtered[0] || '') : prev.photo;
      return { ...prev, photo: newPrimary, galleryPhotos: filtered };
    });
    addToast('Photo Removed', 'Removed photo from gallery.', 'info');
  };

  const handleSetPrimaryPhoto = (photoUrl: string) => {
    setForm((prev) => ({ ...prev, photo: photoUrl }));
    addToast('Primary Photo Set', 'This photo is now your main profile avatar.', 'success');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentUser(form);
    navigateTo('my-profile');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-6 pb-28 md:pb-12">
      {/* Hidden File Inputs */}
      <input
        ref={mainPhotoInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleMainPhotoChange}
      />
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleGalleryPhotosChange}
      />

      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigateTo('my-profile')}
          className="flex items-center gap-2 text-xs font-bold text-emerald-950 hover:text-emerald-700 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-cream-300 shadow-sm active:scale-95 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Profile</span>
        </button>

        <Button
          variant="gold"
          size="md"
          leftIcon={<Save className="w-4 h-4" />}
          onClick={handleSave}
          isLoading={isUploading}
        >
          Save All Changes
        </Button>
      </div>

      <div>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-gold-700 uppercase tracking-widest bg-gold-50/90 px-3 py-1 rounded-full border border-gold-200 shadow-sm">
          <User className="w-3 h-3 text-gold-600" />
          Profile Management
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-emerald-950 mt-1.5 tracking-tight">
          Edit Profile Details
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-500 mt-0.5">
          Keep your information up to date to find compatible suitors.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-4">
        {/* SECTION 0: Profile & Gallery Photos Upload */}
        <div className="bg-white/95 backdrop-blur-md rounded-[2rem] border border-cream-300/80 shadow-soft overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('photos')}
            className="w-full p-5 sm:p-6 text-left flex items-center justify-between font-serif font-bold text-lg text-emerald-950 hover:bg-cream-50/60 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Camera className="w-5 h-5 text-gold-600" />
              <span>Profile & Gallery Photos ({(form.galleryPhotos || []).length})</span>
            </div>
            {openSection === 'photos' ? <ChevronUp className="w-5 h-5 text-charcoal-400" /> : <ChevronDown className="w-5 h-5 text-charcoal-400" />}
          </button>

          {openSection === 'photos' && (
            <div className="p-5 sm:p-6 pt-0 border-t border-cream-200 space-y-6 animate-in fade-in">
              {/* Primary Profile Avatar Card */}
              <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-3xl bg-cream-50/70 border border-cream-200">
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border-4 border-emerald-900 shadow-md shrink-0 group">
                  <img src={form.photo} alt="Profile" className="w-full h-full object-cover" />
                  <div 
                    onClick={() => mainPhotoInputRef.current?.click()}
                    className="absolute inset-0 bg-emerald-950/60 text-white flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-center p-2"
                  >
                    <Camera className="w-6 h-6 mb-1 text-gold-300" />
                    <span className="text-[10px] font-bold">Change Photo</span>
                  </div>
                </div>

                <div className="space-y-2 text-center sm:text-left flex-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gold-700 bg-gold-50 px-2.5 py-0.5 rounded-full border border-gold-200">
                    Primary Profile Photo
                  </span>
                  <h3 className="font-serif font-bold text-base text-emerald-950">Your Public Avatar</h3>
                  <p className="text-xs text-charcoal-500 leading-relaxed max-w-md">
                    This photo is displayed on match cards, search results, and chat conversations. Upload clear, modest portraits.
                  </p>
                  <div className="pt-1 flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                    <Button
                      type="button"
                      variant="primary"
                      size="sm"
                      leftIcon={<Camera className="w-3.5 h-3.5" />}
                      onClick={() => mainPhotoInputRef.current?.click()}
                    >
                      Upload New Profile Photo
                    </Button>
                  </div>
                </div>
              </div>

              {/* Gallery Photos Upload Grid */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="font-serif font-bold text-base text-emerald-950 flex items-center gap-2">
                      <ImagePlus className="w-4 h-4 text-emerald-800" />
                      <span>Additional Gallery Photos</span>
                    </h3>
                    <p className="text-xs text-charcoal-500">Upload multiple photos to showcase your lifestyle and personality.</p>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    leftIcon={<Upload className="w-3.5 h-3.5" />}
                    onClick={() => galleryInputRef.current?.click()}
                  >
                    + Add Many Photos Direct
                  </Button>
                </div>

                {/* Photo Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pt-2">
                  {/* Upload Trigger Tile */}
                  <div
                    onClick={() => galleryInputRef.current?.click()}
                    className="border-2 border-dashed border-cream-300 hover:border-emerald-700 bg-cream-50/60 hover:bg-emerald-50/30 rounded-3xl h-36 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 text-center p-3 group"
                  >
                    <div className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center text-emerald-800 group-hover:scale-110 transition-transform">
                      <ImagePlus className="w-5 h-5 text-emerald-800" />
                    </div>
                    <span className="text-xs font-bold text-emerald-950">Add Photos</span>
                    <span className="text-[10px] text-charcoal-400">Direct multi-upload</span>
                  </div>

                  {/* Uploaded Gallery Items */}
                  {(form.galleryPhotos || []).map((photoUrl, idx) => {
                    const isMain = form.photo === photoUrl;
                    return (
                      <div
                        key={idx}
                        className="relative rounded-3xl overflow-hidden h-36 border-2 border-cream-200 bg-cream-100 shadow-sm group"
                      >
                        <img src={photoUrl} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                        
                        {isMain && (
                          <div className="absolute top-2 left-2 bg-emerald-950/85 text-gold-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-gold-500/30 shadow-sm flex items-center gap-1">
                            <Star className="w-2.5 h-2.5 fill-current" /> Main
                          </div>
                        )}

                        {/* Hover / Active Actions Overlay */}
                        <div className="absolute inset-0 bg-emerald-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                          {!isMain && (
                            <button
                              type="button"
                              onClick={() => handleSetPrimaryPhoto(photoUrl)}
                              className="p-2 rounded-xl bg-gold-500 text-emerald-950 hover:bg-gold-400 active:scale-95 transition-all shadow-sm"
                              title="Set as Main Profile Photo"
                            >
                              <Star className="w-3.5 h-3.5" />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleRemoveGalleryPhoto(photoUrl)}
                            className="p-2 rounded-xl bg-rose-600 text-white hover:bg-rose-500 active:scale-95 transition-all shadow-sm"
                            title="Remove Photo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
        {/* SECTION 1: Basic Information */}
        <div className="bg-white/95 backdrop-blur-md rounded-[2rem] border border-cream-300/80 shadow-soft overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('basic')}
            className="w-full p-5 sm:p-6 text-left flex items-center justify-between font-serif font-bold text-lg text-emerald-950 hover:bg-cream-50/60 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <User className="w-5 h-5 text-emerald-800" />
              <span>1. Basic Personal Information</span>
            </div>
            {openSection === 'basic' ? <ChevronUp className="w-5 h-5 text-charcoal-400" /> : <ChevronDown className="w-5 h-5 text-charcoal-400" />}
          </button>

          {openSection === 'basic' && (
            <div className="p-5 sm:p-6 pt-0 border-t border-cream-200 space-y-4 animate-in fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-charcoal-700 block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs rounded-2xl border border-cream-300 bg-cream-50/60 focus:bg-white focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-charcoal-700 block mb-1">Age</label>
                  <input
                    type="number"
                    value={form.age}
                    onChange={(e) => setForm({ ...form, age: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 text-xs rounded-2xl border border-cream-300 bg-cream-50/60 focus:bg-white focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-charcoal-700 block mb-1">City</label>
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs rounded-2xl border border-cream-300 bg-cream-50/60 focus:bg-white focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-charcoal-700 block mb-1">Country</label>
                  <input
                    type="text"
                    value={form.country}
                    onChange={(e) => setForm({ ...form, country: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs rounded-2xl border border-cream-300 bg-cream-50/60 focus:bg-white focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-charcoal-700 block mb-1">Marital Status</label>
                  <select
                    value={form.maritalStatus}
                    onChange={(e) => setForm({ ...form, maritalStatus: e.target.value as any })}
                    className="w-full px-4 py-2.5 text-xs rounded-2xl border border-cream-300 bg-cream-50/60 focus:bg-white focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 focus:outline-none transition-all"
                  >
                    <option value="Never Married">Never Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 2: About Me */}
        <div className="bg-white/95 backdrop-blur-md rounded-[2rem] border border-cream-300/80 shadow-soft overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('about')}
            className="w-full p-5 sm:p-6 text-left flex items-center justify-between font-serif font-bold text-lg text-emerald-950 hover:bg-cream-50/60 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-gold-600" />
              <span>2. About Myself & Values</span>
            </div>
            {openSection === 'about' ? <ChevronUp className="w-5 h-5 text-charcoal-400" /> : <ChevronDown className="w-5 h-5 text-charcoal-400" />}
          </button>

          {openSection === 'about' && (
            <div className="p-5 sm:p-6 pt-0 border-t border-cream-200 space-y-4 animate-in fade-in">
              <div>
                <label className="text-xs font-semibold text-charcoal-700 block mb-1">
                  Bio / Personal Description
                </label>
                <textarea
                  rows={5}
                  value={form.aboutMe}
                  onChange={(e) => setForm({ ...form, aboutMe: e.target.value })}
                  className="w-full p-3.5 text-xs leading-relaxed rounded-2xl border border-cream-300 bg-cream-50/60 focus:bg-white focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 focus:outline-none transition-all"
                />
              </div>
            </div>
          )}
        </div>

        {/* SECTION 3: Education & Career */}
        <div className="bg-white/95 backdrop-blur-md rounded-[2rem] border border-cream-300/80 shadow-soft overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('career')}
            className="w-full p-5 sm:p-6 text-left flex items-center justify-between font-serif font-bold text-lg text-emerald-950 hover:bg-cream-50/60 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Briefcase className="w-5 h-5 text-emerald-800" />
              <span>3. Education & Career</span>
            </div>
            {openSection === 'career' ? <ChevronUp className="w-5 h-5 text-charcoal-400" /> : <ChevronDown className="w-5 h-5 text-charcoal-400" />}
          </button>

          {openSection === 'career' && (
            <div className="p-5 sm:p-6 pt-0 border-t border-cream-200 space-y-4 animate-in fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-charcoal-700 block mb-1">Degree / Qualification</label>
                  <input
                    type="text"
                    value={form.degree}
                    onChange={(e) => setForm({ ...form, degree: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs rounded-2xl border border-cream-300 bg-cream-50/60 focus:bg-white focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-charcoal-700 block mb-1">Profession</label>
                  <input
                    type="text"
                    value={form.profession}
                    onChange={(e) => setForm({ ...form, profession: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs rounded-2xl border border-cream-300 bg-cream-50/60 focus:bg-white focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 focus:outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 4: Religion & Islamic Practice */}
        <div className="bg-white/95 backdrop-blur-md rounded-[2rem] border border-cream-300/80 shadow-soft overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('religion')}
            className="w-full p-5 sm:p-6 text-left flex items-center justify-between font-serif font-bold text-lg text-emerald-950 hover:bg-cream-50/60 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-gold-600" />
              <span>4. Religious Practice</span>
            </div>
            {openSection === 'religion' ? <ChevronUp className="w-5 h-5 text-charcoal-400" /> : <ChevronDown className="w-5 h-5 text-charcoal-400" />}
          </button>

          {openSection === 'religion' && (
            <div className="p-5 sm:p-6 pt-0 border-t border-cream-200 space-y-4 animate-in fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-charcoal-700 block mb-1">Sect</label>
                  <input
                    type="text"
                    value={form.religion.sect}
                    onChange={(e) => setForm({ ...form, religion: { ...form.religion, sect: e.target.value } })}
                    className="w-full px-4 py-2.5 text-xs rounded-2xl border border-cream-300 bg-cream-50/60 focus:bg-white focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-charcoal-700 block mb-1">Prayer Frequency</label>
                  <select
                    value={form.religion.prayerFrequency}
                    onChange={(e) => setForm({ ...form, religion: { ...form.religion, prayerFrequency: e.target.value as any } })}
                    className="w-full px-4 py-2.5 text-xs rounded-2xl border border-cream-300 bg-cream-50/60 focus:bg-white focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 focus:outline-none transition-all"
                  >
                    <option value="Always (5 times daily)">Always (5 times daily)</option>
                    <option value="Usually">Usually</option>
                    <option value="Sometimes">Sometimes</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 5: Family & Lifestyle */}
        <div className="bg-white/95 backdrop-blur-md rounded-[2rem] border border-cream-300/80 shadow-soft overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('family')}
            className="w-full p-5 sm:p-6 text-left flex items-center justify-between font-serif font-bold text-lg text-emerald-950 hover:bg-cream-50/60 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Users className="w-5 h-5 text-emerald-800" />
              <span>5. Family & Lifestyle</span>
            </div>
            {openSection === 'family' ? <ChevronUp className="w-5 h-5 text-charcoal-400" /> : <ChevronDown className="w-5 h-5 text-charcoal-400" />}
          </button>

          {openSection === 'family' && (
            <div className="p-5 sm:p-6 pt-0 border-t border-cream-200 space-y-4 animate-in fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-charcoal-700 block mb-1">Family Type</label>
                  <select
                    value={form.familyType}
                    onChange={(e) => setForm({ ...form, familyType: e.target.value as any })}
                    className="w-full px-4 py-2.5 text-xs rounded-2xl border border-cream-300 bg-cream-50/60 focus:bg-white focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 focus:outline-none transition-all"
                  >
                    <option value="Nuclear">Nuclear</option>
                    <option value="Joint">Joint</option>
                    <option value="Extended">Extended</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-charcoal-700 block mb-1">Family Values</label>
                  <select
                    value={form.familyValues}
                    onChange={(e) => setForm({ ...form, familyValues: e.target.value as any })}
                    className="w-full px-4 py-2.5 text-xs rounded-2xl border border-cream-300 bg-cream-50/60 focus:bg-white focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 focus:outline-none transition-all"
                  >
                    <option value="Moderate">Moderate</option>
                    <option value="Traditional">Traditional</option>
                    <option value="Liberal">Liberal</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 6: Partner Preferences */}
        <div className="bg-white/95 backdrop-blur-md rounded-[2rem] border border-cream-300/80 shadow-soft overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('preferences')}
            className="w-full p-5 sm:p-6 text-left flex items-center justify-between font-serif font-bold text-lg text-emerald-950 hover:bg-cream-50/60 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Heart className="w-5 h-5 text-rose-600" />
              <span>6. Partner Preferences</span>
            </div>
            {openSection === 'preferences' ? <ChevronUp className="w-5 h-5 text-charcoal-400" /> : <ChevronDown className="w-5 h-5 text-charcoal-400" />}
          </button>

          {openSection === 'preferences' && (
            <div className="p-5 sm:p-6 pt-0 border-t border-cream-200 space-y-4 animate-in fade-in">
              <div>
                <label className="text-xs font-semibold text-charcoal-700 block mb-1">What are you looking for?</label>
                <textarea
                  rows={3}
                  value={form.lookingForSummary}
                  onChange={(e) => setForm({ ...form, lookingForSummary: e.target.value })}
                  className="w-full p-3.5 text-xs leading-relaxed rounded-2xl border border-cream-300 bg-cream-50/60 focus:bg-white focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 focus:outline-none transition-all"
                />
              </div>
            </div>
          )}
        </div>

        {/* Save Bar */}
        <div className="pt-4 flex justify-end">
          <Button
            type="submit"
            variant="gold"
            size="lg"
            leftIcon={<Save className="w-4 h-4" />}
          >
            Save Profile Changes
          </Button>
        </div>
      </form>
    </div>
  );
};
