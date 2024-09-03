import React from 'react';
import { FaDownload, FaEdit, FaRegComment, FaEye } from 'react-icons/fa';

type Props = {};

const Actions: React.FC<Props> = () => {
  return (
    <div className="flex justify-start items-center h-full">
      <div className="flex space-x-2">
        <ActionButton icon={<FaDownload />} label="Download" color="text-blue-950" />
        <ActionButton icon={<FaEdit />} label="Edit" color="text-green-600" />
        <ActionButton icon={<FaRegComment />} label="Remark" color="text-yellow-600" />
        <ActionButton icon={<FaEye />} label="View" color="text-purple-700" />
      </div>
    </div>
  );
};

const ActionButton: React.FC<{ icon: React.ReactNode, label: string, color: string }> = ({ icon, label, color }) => {
  return (
    <div className="relative flex items-center group">
      <button className="p-2 text-xl focus:outline-none">
        <span className={`text-xl ${color}`}>{icon}</span>
      </button>
      <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-700 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">{label}</span>
    </div>
  );
};

export default Actions;
