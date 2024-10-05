import React from 'react';
import { FaDownload, FaEdit, FaRegComment, FaEye } from 'react-icons/fa';
import ActionButton from './ui/actionbutton';
import EditUser from './EditUser';
import Link from 'next/link';
import { modifyAndDownloadPDF } from '../services/invoice';

type Props = {
  userData: any;
};

const Actions: React.FC<Props> = ({ userData }) => {
  const handleDownload = () => {
    modifyAndDownloadPDF(userData.pan); 
  };

  return (
    <div className="flex justify-start items-center h-full">
      <div className="flex space-x-2">
        <ActionButton
          icon={<FaDownload />}
          label="Download"
          color="text-slate-900"
          onClick={handleDownload} 
        />
        <EditUser userData={userData} />
        <Link href={`/user/${userData.pan}`}>
          <ActionButton icon={<FaEye />} label="View" color="text-purple-700" />
        </Link>
      </div>
    </div>
  );
};

export default Actions;
