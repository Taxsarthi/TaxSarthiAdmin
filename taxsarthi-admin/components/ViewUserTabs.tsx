'use client'
import { CheckCheck, Download, UserPen } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from './ui/button';
import ViewUser from './ViewUser';
import ViewITR from './ViewITR';
import ViewTDS from './ViewTDS';
import ViewDocs from './ViewDocs';

type Props = {};

const ViewUserTabs = (props: Props) => {
  const [activeTab, setActiveTab] = useState<'user' | 'itr' | 'tds' | 'docs'>('user');

  const handleTabClick = (tab: 'user' | 'itr' | 'tds' | 'docs') => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className='border p-1 w-full rounded-full grid grid-cols-4 bg-slate-200'>
        <h1
          onClick={() => handleTabClick('user')}
          className={`text-center rounded-full py-1 px-2 cursor-pointer ${activeTab === 'user' ? 'bg-green-500 text-white' : ''}`}
        >
          User Details
        </h1>
        <h1
          onClick={() => handleTabClick('itr')}
          className={`text-center rounded-full py-1 px-2 cursor-pointer ${activeTab === 'itr' ? 'bg-green-500 text-white' : ''}`}
        >
          ITR
        </h1>
        <h1
          onClick={() => handleTabClick('tds')}
          className={`text-center rounded-full py-1 px-2 cursor-pointer ${activeTab === 'tds' ? 'bg-green-500 text-white' : ''}`}
        >
          TDS
        </h1>
        <h1
          onClick={() => handleTabClick('docs')}
          className={`text-center rounded-full py-1 px-2 cursor-pointer ${activeTab === 'docs' ? 'bg-green-500 text-white' : ''}`}
        >
          Docs
        </h1>
      </div>
      <div className='mt-4'>
        {activeTab === 'user' && <ViewUser />}
        {activeTab === 'itr' && <ViewITR />}
        {activeTab === 'tds' && <ViewTDS />}
        {activeTab === 'docs' && <ViewDocs />}
      </div>
      <div className='flex gap-4 m-4 justify-end'>
        <Button variant="secondary"><UserPen/></Button>
        <Button variant="secondary"><CheckCheck/></Button>
        <Button variant="secondary"><Download/></Button>
      </div>
    </div>
  );
};

export default ViewUserTabs;
