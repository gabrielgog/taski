import React from 'react';

interface SelectDropdownProps {
  options: string[];
  onSelect: (selectedOption: string) => void;
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({ options, onSelect }) => {
  return (
    <select
      className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm select select-bordered w-full max-w-xs"
      onChange={(e) => onSelect(e.target.value)}
    >
      <option disabled selected className="text-gray-400">
        Completion status
      </option>
      {options.map((option, index) => (
        <option key={index}>{option}</option>
      ))}
    </select>
  );
};

export default SelectDropdown;
