import React from "react";
import Image from "next/image";
import SearchIcon from "../../public/icons/search-icon.svg";

interface SearchProps {
  value: string;
  onChange?: (data: any) => void;
  type?: string;
  placeholder?: string;
}

const Search = ({ value, onChange, type, placeholder }: SearchProps) => {
  return (
    <div className="pt-2 relative flex items-center text-gray-600">
      {type === "search" ? (
        <button type="submit" className="absolute left-3 top-0 mt-5">
          <Image src={SearchIcon} alt="search-icon" width={20} height={20} />
        </button>
      ) : null}
      {type === "checkbox" ? (
        <input
        checked={value === "completed"}
        onChange={onChange}
        type="checkbox"
        id="checkbox"
        className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all checked:border-pink-500 checked:bg-pink-500"
      />
      ) : (
        <input
          className="border-2 border-gray-300 bg-white h-10 px-5 pl-10 pr-16 
          rounded-lg text-sm focus:outline-primary focus:border-none w-full"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          type={type}
        />
      )}
    </div>
  );
};

export default Search;
