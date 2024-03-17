import React from 'react';

interface SelectDropdownProps {
  options: string[];
  onSelect: (selectedOption: string) => void;
  value: string;
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({ options, onSelect , value}) => {
  return (
    <select
      className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm select select-bordered w-full max-w-xs text-gray-400"
      onChange={(e) => onSelect(e.target.value)
    }
    value={value}
    >
      <option disabled selected>
        Completion status
      </option>
      {options.map((option, index) => (
        <option key={index}
        className={value === option ? 'text-black' : ''}
        >{option}</option>
      ))}
    </select>
  );
};

export default SelectDropdown;
