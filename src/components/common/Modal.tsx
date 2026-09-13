import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { triggerHaptic } from '../../styles/designTokens';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'lg'
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      triggerHaptic(10);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const widthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl'
  }[maxWidth];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal-900/65 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className={`relative w-full ${widthClasses} bg-white rounded-[2rem] shadow-app-float border border-emerald-950/10 z-10 overflow-hidden my-auto transform transition-all duration-300 animate-in fade-in zoom-in-95`}>
        {/* Header */}
        {(title || subtitle) && (
          <div className="px-6 pt-5 pb-4 border-b border-cream-200 flex items-start justify-between bg-cream-50/70">
            <div>
              {title && <h3 className="text-xl font-serif font-bold text-emerald-950">{title}</h3>}
              {subtitle && <p className="text-xs text-charcoal-500 mt-0.5">{subtitle}</p>}
            </div>
            <button
              onClick={() => {
                triggerHaptic(6);
                onClose();
              }}
              className="p-2 text-charcoal-500 hover:text-charcoal-800 bg-cream-100 hover:bg-cream-200 active:scale-90 rounded-full transition-all -mr-2"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* If no header title, still provide close button */}
        {!title && !subtitle && (
          <button
            onClick={() => {
              triggerHaptic(6);
              onClose();
            }}
            className="absolute top-4 right-4 p-2 text-charcoal-500 hover:text-charcoal-800 bg-cream-100 hover:bg-cream-200 active:scale-90 rounded-full transition-all z-20"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Body */}
        <div className="p-5 sm:p-6 max-h-[82vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

