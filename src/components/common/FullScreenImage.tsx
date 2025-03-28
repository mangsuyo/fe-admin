import React from "react";

interface FullScreenImageProps {
  imageUri: string;
  onClose: () => void;
}

const FullScreenImage: React.FC<FullScreenImageProps> = ({
  imageUri,
  onClose,
}) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/80 z-50"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-5xl font-bold p-2 focus:outline-none"
      >
        &times;
      </button>
      <img
        src={imageUri}
        alt="Full Screen"
        className="max-w-full max-h-full"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};

export default FullScreenImage;
