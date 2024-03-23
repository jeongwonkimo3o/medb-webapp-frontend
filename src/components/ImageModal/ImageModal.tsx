import React from "react";

interface ImageModalProps {
  imageSrc: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ imageSrc, onClose }) => {
  if (!imageSrc) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto flex bg-black bg-opacity-75">
      <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg">
        <span
          className="absolute top-0 right-0 p-4 cursor-pointer"
          onClick={onClose}
        >
          &#x2715;
        </span>
        <div className="my-5">
          <img src={imageSrc} alt="Modal" className="object-contain h-80 w-full" />
        </div>
      </div>
    </div>
  );
};


export default ImageModal;
