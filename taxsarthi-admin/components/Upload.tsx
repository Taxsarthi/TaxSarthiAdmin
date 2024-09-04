import React from "react";
import { IoDocumentAttachOutline } from "react-icons/io5";

type Props = {};

const Upload: React.FC<Props> = (props: Props) => {
  return (
    <button className="group relative flex flex-col justify-center items-center p-2 transition-transform transform hover:scale-105 cursor-pointer">
      <div className="flex items-center justify-center w-12 h-12 mb-3">
        <IoDocumentAttachOutline className="text-4xl text-red-500 hover:animate-bounce transition-transform duration-500" />
      </div>
      <h2 className="text-lg font-bold">Upload</h2>
    </button>
  );
};

export default Upload;
