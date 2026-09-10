import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from './Modal';
import { Button } from './Button';
import { Camera, CheckCircle2, ShieldCheck, Upload, AlertCircle, Sparkles } from 'lucide-react';

export const VerificationModal: React.FC = () => {
  const { isVerificationModalOpen, setIsVerificationModalOpen, updateCurrentUser, addToast } = useApp();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isVerifying, setIsVerifying] = useState(false);
  const [poseIndex, setPoseIndex] = useState(0);

  const poses = [
    'Look straight into the camera and smile gently',
    'Turn your head slightly to the left',
    'Turn your head slightly to the right'
  ];

  const handleSimulateVerification = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setStep(3);
      updateCurrentUser({
        verified: {
          mobile: true,
          email: true,
          photo: true,
          identity: true,
          reviewed: true
        }
      });
      addToast('Verification Approved!', 'Al-hamdulillah! Your profile has been granted the Verified Crown badge.', 'success');
    }, 2000);
  };

  const handleClose = () => {
    setIsVerificationModalOpen(false);
    setTimeout(() => setStep(1), 300);
  };

  return (
    <Modal
      isOpen={isVerificationModalOpen}
      onClose={handleClose}
      title="Profile Trust & Verification"
      subtitle="Safeguarding the sanctity and safety of our Muslim matrimonial community"
      maxWidth="md"
    >
      <div className="py-2">
        {step === 1 && (
          <div className="space-y-4">
            <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200/80 text-center">
              <div className="w-14 h-14 rounded-2xl bg-emerald-900 text-gold-400 flex items-center justify-center mx-auto mb-3 shadow-md">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h4 className="font-serif font-bold text-emerald-950 text-base">
                Why get verified?
              </h4>
              <p className="text-xs text-charcoal-600 mt-1 max-w-sm mx-auto leading-relaxed">
                Profiles with verified badges receive <strong>4.2x more responses</strong> and gain full trust from families and Walis.
              </p>
            </div>

            <div className="space-y-2.5">
              <div className="p-3.5 rounded-2xl border border-cream-300 bg-cream-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-emerald-950">Mobile & OTP Verified</h5>
                    <p className="text-[10px] text-charcoal-500">+91 ••••••••82</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  Completed
                </span>
              </div>

              <div className="p-3.5 rounded-2xl border border-cream-300 bg-cream-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-emerald-950">Email Verified</h5>
                    <p className="text-[10px] text-charcoal-500">ahmed.khan@example.com</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  Completed
                </span>
              </div>

              <div className="p-3.5 rounded-2xl border-2 border-gold-400 bg-gold-50/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gold-200 text-gold-900 flex items-center justify-center text-xs font-bold">
                    <Camera className="w-4 h-4 text-gold-800" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-emerald-950">Selfie Liveness Photo Check</h5>
                    <p className="text-[10px] text-charcoal-600">Ensure your photo matches your uploaded profile</p>
                  </div>
                </div>
                <Button size="sm" variant="gold" onClick={() => setStep(2)}>
                  Start Check
                </Button>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="text-center py-4 space-y-4">
            <div className="relative w-48 h-48 mx-auto rounded-full border-4 border-dashed border-emerald-700 p-2 flex items-center justify-center bg-cream-100 shadow-inner">
              <div className="w-full h-full rounded-full overflow-hidden bg-charcoal-900 flex items-center justify-center relative">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
                  alt="Camera simulator"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 border-2 border-gold-400 rounded-full animate-pulse" />
                {isVerifying && (
                  <div className="absolute inset-0 bg-emerald-950/70 flex flex-col items-center justify-center text-white">
                    <div className="w-8 h-8 border-3 border-gold-400 border-t-transparent rounded-full animate-spin mb-2" />
                    <span className="text-xs font-bold">Verifying Biometrics...</span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-cream-100 rounded-2xl p-3 border border-cream-300 max-w-sm mx-auto">
              <p className="text-xs font-semibold text-emerald-950">{poses[poseIndex]}</p>
              <div className="flex justify-center gap-1.5 mt-2">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className={`w-6 h-1 rounded-full ${
                      poseIndex === i ? 'bg-emerald-800' : 'bg-cream-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex gap-3 justify-center">
              <Button
                variant="secondary"
                size="md"
                onClick={() => setPoseIndex((prev) => (prev + 1) % 3)}
              >
                Next Pose
              </Button>
              <Button
                variant="primary"
                size="md"
                isLoading={isVerifying}
                onClick={handleSimulateVerification}
              >
                Capture & Verify
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto border-2 border-emerald-300 shadow-md animate-bounce">
              <CheckCircle2 className="w-10 h-10 text-emerald-700" />
            </div>

            <div>
              <h4 className="text-xl font-serif font-bold text-emerald-950">Verification Complete!</h4>
              <p className="text-xs text-charcoal-600 max-w-xs mx-auto mt-1 leading-relaxed">
                Your profile now displays the 100% Verified Badge across all search, discovery, and match screens.
              </p>
            </div>

            <Button variant="gold" size="lg" fullWidth onClick={handleClose}>
              Done & Return to Profile
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};
