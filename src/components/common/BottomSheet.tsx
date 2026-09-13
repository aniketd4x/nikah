import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { triggerHaptic } from '../../styles/designTokens';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      triggerHaptic(12);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end md:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal-900/65 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Sheet Content */}
      <div className="relative bg-white rounded-t-[2.5rem] shadow-app-sheet border-t border-emerald-900/10 z-10 max-h-[90vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300 ease-out">
        {/* Native Grab Handle */}
        <div className="w-full flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing">
          <div className="w-10 h-1.5 bg-cream-400/80 rounded-full" />
        </div>

        {/* Header */}
        {(title || subtitle) && (
          <div className="px-6 py-3 border-b border-cream-200 flex items-center justify-between">
            <div>
              {title && <h3 className="text-lg font-serif font-bold text-emerald-950">{title}</h3>}
              {subtitle && <p className="text-xs text-charcoal-500 mt-0.5">{subtitle}</p>}
            </div>
            <button
              onClick={() => {
                triggerHaptic(6);
                onClose();
              }}
              className="p-2 text-charcoal-500 hover:text-charcoal-800 bg-cream-100 hover:bg-cream-200 active:scale-90 rounded-full transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Content with safe bottom padding */}
        <div className="p-6 overflow-y-auto overscroll-contain pb-safe">{children}</div>
      </div>
    </div>
  );
};

