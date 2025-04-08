import React, { ReactNode } from 'react';

type ButtonTypeProps = {
  object: { label: string; type: string; icon?: ReactNode; }[];
  handleSelected: (type: string) => void;
  selected?: string;
};

export const ButtonType: React.FC<ButtonTypeProps> = ({ object, handleSelected, selected }) => {
  return (
    <div className="flex justify-center gap-3">
      {object.map((item, i) => (
        <button
          key={i}
          onClick={() => handleSelected(item.type)}
          className={`px-5 py-3 rounded-lg font-medium w-full sm:w-auto transition-all duration-200 ${
            selected === item.type
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
              : 'bg-white text-gray-700 border cursor-pointer border-gray-300 hover:bg-indigo-50 hover:border-indigo-300'
          }`}
        >
          <div className="flex gap-3 items-center">
            <div> {object[i].icon || ''} </div>
            {item.label}
          </div>
        </button>
      ))}
    </div>
  );
};
