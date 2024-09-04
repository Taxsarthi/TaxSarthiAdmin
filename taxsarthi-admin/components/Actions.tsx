import React from 'react';
import { FaDownload, FaEdit, FaRegComment, FaEye } from 'react-icons/fa';
import ActionButton from './ui/actionbutton';
import EditUser from './EditUser';
import Remarks from './Remarks';
import Link from 'next/link';

type Props = {};

const Actions: React.FC<Props> = () => {
  return (
    <div className="flex justify-start items-center h-full">
      <div className="flex space-x-2">
        <ActionButton icon={<FaDownload />} label="Download" color="text-slate-900" />
        <EditUser/>
        <Remarks/>
        <Link href="/user"><ActionButton icon={<FaEye />} label="View" color="text-purple-700" /></Link>
      </div>
    </div>
  );
};
export default Actions;
