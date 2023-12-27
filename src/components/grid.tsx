'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Modal } from './modal';

export const Grid: React.FC<{
  files: {
    key: string;
    url: string;
  }[];
}> = ({ files }) => {
  const [showAlt, setShowAlt] = useState<string | null>(null);
  const width = globalThis['window']?.innerWidth ?? 1200;
  const [modal, setModal] = useState<string | null>(null);
  const chunkedFiles = files.reduce((acc, file, index) => {
    const chunkIndex = Math.floor(index / Math.floor(width / 250));

    if (!acc[chunkIndex]) {
      acc[chunkIndex] = [];
    }

    acc[chunkIndex].push(file);

    return acc;
  }, [] as (typeof files)[]);
  return (
    <main className="flex items-center justify-center w-fit m-auto p-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {chunkedFiles.map((chunk, chunkIndex) => (
          <div className="grid gap-4" key={`chunk-${chunkIndex}`}>
            {chunk.map(({ key, url }) => (
              <div
                key={`image-${key}`}
                className="relative"
                onClick={() => {
                  setModal(url);
                }}
              >
                {/* Add ALT badge that shows on click */}
                <button
                  className="absolute z-10 p-1 text-[10px] font-bold text-white bg-black bg-opacity-50 rounded-md cursor-pointer bottom-2 left-2 hover:cursor-help"
                  onClick={(e) => {
                    // Show ALT as a hovering div like twitter
                    setShowAlt((prev) => (prev === key ? null : key));
                    e.stopPropagation();
                  }}
                >
                  ALT
                </button>
                {showAlt === key && (
                  <div className="absolute z-10 max-w-[235px] p-2 text-sm text-white bg-black bg-opacity-50 rounded-md cursor-pointer bottom-10 left-2">
                    {key}
                  </div>
                )}
                <Image src={url} key={key} alt={key} width={250} height={250} className="h-[250px] max-w-full rounded-lg" />
              </div>
            ))}
          </div>
        ))}
      </div>
      {modal && (
        <Modal
          title={modal}
          onClose={() => {
            setModal(null);
          }}
        >
          <Image src={modal} width={250} height={250} className="w-full" alt={modal} />
        </Modal>
      )}
    </main>
  );
};
