'use client';

import { useEffect } from 'react';
import { CloseIcon } from './close-icon';
import { useKeypress } from '@/hooks/use-keypress';

export const Modal: React.FC<{
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onLeft?: () => void;
  onRight?: () => void;
  leftDisabled?: boolean;
  rightDisabled?: boolean;
}> = ({ title, children, onClose, onLeft, onRight, leftDisabled, rightDisabled }) => {
  const handleClose = () => {
    onClose();
    document.body.style.overflow = 'auto';
  };
  useKeypress(['ArrowLeft', 'a'], () => {
    onLeft?.();
  });
  useKeypress(['ArrowRight', 'd'], () => {
    onRight?.();
  });
  useKeypress('Escape', handleClose);
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-80"
      onClick={handleClose}
    >
      <div
        className="relative z-50 w-full max-w-3xl p-4 bg-[#181818] rounded-lg gap-2 grid grid-flow-cols"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {/* Left button */}
        {!leftDisabled && (
          <button className="bg-[#272729] absolute top-1/2 left-2 transform -translate-y-1/2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-[#3e3e3e] h-9 w-9">
            <svg
              className="w-5 h-5 text-[#d7d7d7]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              onClick={(e) => {
                onLeft?.();
                e.stopPropagation();
              }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#d7d7d7]">{title}</span>
          <button
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-[#272729] h-9 w-9"
            onClick={handleClose}
          >
            <CloseIcon />
          </button>
        </div>
        {/* Right button */}
        {!rightDisabled && (
          <button className="bg-[#272729] absolute top-1/2 right-2 transform -translate-y-1/2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-[#3e3e3e] h-9 w-9">
            <svg
              className="w-5 h-5 text-[#d7d7d7]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              onClick={(e) => {
                onRight?.();
                e.stopPropagation();
              }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
        <div className="flex items-center justify-center w-full h-full">{children}</div>
      </div>
    </div>
  );
};
