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
      className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
      onClick={handleClose}
    >
      <div
        className="relative z-50 w-full max-w-3xl p-4 bg-white rounded-lg"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#d7d7d7]">{title}</h2>
          <button className="font-bold p-2 text-white bg-black rounded-lg" onClick={handleClose}>
            <CloseIcon />
          </button>
        </div>
        <div className="flex items-center justify-center w-full h-full">{children}</div>
      </div>
    </div>
  );
};
