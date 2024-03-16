import Image from "next/image";
import SearchIcon from "../../public/icons/search-icon.svg";

interface SearchProps {
  value: string;
  onChange?: () => void;
  type?:string;
  placeholder?:string
}

const Search = ({ value, onChange, type, placeholder}: SearchProps) => {
  return (
    <div className="pt-2 relative flex items-center text-gray-600">
      {type === "search" ? <button type="submit" className="absolute left-3 top-0 mt-5">
        <Image src={SearchIcon} alt="search-icon" width={20} height={20} />
      </button> : null}
      <input
        className="border-2 border-gray-300 bg-white h-10 px-5 pl-10 pr-16 rounded-lg text-sm focus:outline-primary focus:border-none"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Search;
