'use client';

import { useEffect } from 'react';
import { CloseIcon } from './close-icon';
import { useKeypress } from '@/hooks/use-keypress';

export const Modal: React.FC<{
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}> = ({ onClose, title, children }) => {
  const handleClose = () => {
    onClose();
    document.body.style.overflow = 'auto';
  };
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
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#d7d7d7]">{title}</span>
          <button
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-[#272729] h-9 w-9"
            onClick={handleClose}
          >
            <CloseIcon />
          </button>
        </div>
        <div className="flex items-center justify-center w-full h-full">{children}</div>
      </div>
    </div>
  );
};
