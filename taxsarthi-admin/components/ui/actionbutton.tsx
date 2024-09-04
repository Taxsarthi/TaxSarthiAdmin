import React from 'react'

type Props = {}

const ActionButton: React.FC<{ icon: React.ReactNode, label: string, color: string }> = ({ icon, label, color }) => {
    return (
      <div>
        <button className="p-2 text-xl focus:outline-none">
          <span className={`text-xl ${color}`}>{icon}</span>
        </button>
        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-700 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">{label}</span>
      </div>
    );
  };
  

export default ActionButton