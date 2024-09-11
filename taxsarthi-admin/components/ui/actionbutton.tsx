import React from 'react'
import { Button } from './button';

type Props = {}

const ActionButton: React.FC<{ icon: React.ReactNode, label: string, color: string }> = ({ icon, label, color }) => {
    return (
      <div>
        <Button variant='outline' className="p-2 my-2 text-xl focus:outline-none">
          <span className={`text-xl ${color}`}>{icon}</span>
        </Button>
        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-700 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">{label}</span>
      </div>
    );
  };
  

export default ActionButton