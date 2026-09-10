import React, { useEffect } from 'react';
import { X } from 'lucide-react';

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
        className="fixed inset-0 bg-charcoal-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Sheet Content */}
      <div className="relative bg-white rounded-t-[2rem] shadow-2xl border-t border-emerald-950/10 z-10 max-h-[88vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300">
        {/* Drag Handle */}
        <div className="w-full flex justify-center pt-3 pb-1">
          <div className="w-12 h-1.5 bg-cream-300 rounded-full" />
        </div>

        {/* Header */}
        {(title || subtitle) && (
          <div className="px-6 py-3 border-b border-cream-200 flex items-center justify-between">
            <div>
              {title && <h3 className="text-lg font-serif font-bold text-emerald-950">{title}</h3>}
              {subtitle && <p className="text-xs text-charcoal-500 mt-0.5">{subtitle}</p>}
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-charcoal-400 hover:text-charcoal-700 bg-cream-100 hover:bg-cream-200 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Content */}
        <div className="p-6 overflow-y-auto pb-10">{children}</div>
      </div>
    </div>
  );
};
