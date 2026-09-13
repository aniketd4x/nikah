import React, { useState } from 'react';
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
  ShieldCheck 
} from 'lucide-react';

export const OnboardingScreen: React.FC = () => {
  const { currentUser, updateCurrentUser, navigateTo, addToast } = useApp();
  const [step, setStep] = useState<number>(1);

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
    photo: currentUser.photo
  });

  const totalSteps = 8;
  const progressPercent = Math.round((step / totalSteps) * 100);

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
          <div className="space-y-4 animate-in fade-in text-center">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-emerald-800 mx-auto shadow-md">
              <img src={formData.photo} alt="Profile" className="w-full h-full object-cover" />
            </div>

            <div className="bg-cream-100 p-4 rounded-2xl border border-cream-300 max-w-md mx-auto space-y-2">
              <h4 className="text-xs font-bold text-emerald-950">Modest Photo Guidelines</h4>
              <p className="text-[11px] text-charcoal-600 leading-relaxed">
                Clear portrait with modest clothing, high resolution, single person (no group photos). You can enable Photo Blur in Privacy Settings anytime.
              </p>
              <div className="pt-2">
                <Button size="sm" variant="outline" leftIcon={<Camera className="w-3.5 h-3.5" />}>
                  Change Photo (Demo)
                </Button>
              </div>
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
