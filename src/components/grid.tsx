'use client';

import Image from 'next/image';
import { Dispatch, SetStateAction, useState } from 'react';
import { Modal } from './modal';
import { useBlurUrl } from '@/hooks/use-blur-url';

const GridItem: React.FC<{
  id: string;
  url: string;
  setModal: (url: string) => void;
  showAlt: string | null;
  setShowAlt: Dispatch<SetStateAction<string | null>>;
}> = ({ id, url, setModal, showAlt, setShowAlt }) => {
  const blurUrl = useBlurUrl(url);
  return (
    <div
      className="relative w-[250px] h-[250px] cursor-pointer"
      key={`image-${id}`}
      onClick={() => {
        setModal(url);
      }}
    >
      <button
        className="absolute z-10 p-1 text-[10px] font-bold text-white bg-black bg-opacity-50 rounded-md cursor-pointer bottom-2 left-2 hover:cursor-help"
        onClick={(e) => {
          setShowAlt((prev) => (prev === id ? null : id));
          e.stopPropagation();
        }}
      >
        ALT
      </button>
      {showAlt === id && (
        <div className="absolute z-10 max-w-[235px] p-2 text-sm text-white bg-black bg-opacity-50 rounded-md cursor-pointer bottom-10 left-2">
          {id}
        </div>
      )}
      {blurUrl && (
        <Image
          src={url}
          key={id}
          alt={id}
          width={250}
          height={250}
          quality={50}
          placeholder="blur"
          blurDataURL={blurUrl}
          className="h-[250px] max-w-full rounded-lg"
        />
      )}
    </div>
  );
};

export const Grid: React.FC<{
  files: {
    key: string;
    url: string;
  }[];
}> = ({ files }) => {
  const [showAlt, setShowAlt] = useState<string | null>(null);
  const [modal, setModal] = useState<string | null>(null);
  return (
    <main className="flex items-center justify-center w-fit m-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {files.map(({ key, url }) => (
          <GridItem key={key} id={key} url={url} setModal={setModal} showAlt={showAlt} setShowAlt={setShowAlt} />
        ))}
      </div>
      {modal && (
        <Modal
          title={modal}
          onClose={() => {
            setModal(null);
          }}
          onLeft={() => {
            const index = files.findIndex((file) => file.url === modal);
            if (index > 0) {
              setModal(files[index - 1].url);
            }
          }}
          onRight={() => {
            const index = files.findIndex((file) => file.url === modal);
            if (index < files.length - 1) {
              setModal(files[index + 1].url);
            }
          }}
          leftDisabled={files.findIndex((file) => file.url === modal) === 0}
          rightDisabled={files.findIndex((file) => file.url === modal) === files.length - 1}
        >
          <Image src={modal} width={250} height={250} className="w-full" quality={100} alt={modal} />
        </Modal>
      )}
    </main>
  );
};
