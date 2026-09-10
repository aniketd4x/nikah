import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Info, AlertTriangle, AlertCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const icons = {
          success: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />,
          info: <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />,
          warning: <AlertTriangle className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />,
          error: <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
        }[toast.type];

        const borderClasses = {
          success: 'border-emerald-500/30 bg-white/95',
          info: 'border-blue-500/30 bg-white/95',
          warning: 'border-gold-500/40 bg-white/95',
          error: 'border-rose-500/30 bg-white/95'
        }[toast.type];

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl shadow-floating border ${borderClasses} backdrop-blur-md transform transition-all duration-300 animate-in slide-in-from-bottom-5 fade-in`}
          >
            {icons}
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wider">{toast.title}</h4>
              <p className="text-xs text-charcoal-600 mt-0.5 leading-relaxed">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-charcoal-400 hover:text-charcoal-700 p-1 -mr-1 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
