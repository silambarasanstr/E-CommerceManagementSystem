import { Search as SearchIcon } from "lucide-react";
import Button from "./button";


type SearchProps = {
  type?: "text" | "number" | "email";
  placeholder?: string;
  className?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchInput = ({
  type = "text",
  placeholder = "Search...",
  className,
  value,
  onChange,
}: SearchProps) => {
  return (
    <div className="flex items-center w-full max-w-md">
      {/* Input wrapper */}
      <div className="flex items-center flex-1 border rounded border-gray-300 rounded-l-md overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
        <SearchIcon className="ml-2 text-gray-500" size={20} />
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`flex-1 p-1 rounded bg-transparent outline-none ${
            className || ""
          }`}
        />
      </div>

      {/* Search button (attached to input) */}
      <Button
        type="submit"
        className="  bg-[#3e3e3e] text-white  ml-2"
      >
        Search
      </Button>
    </div>
  );
};

export default SearchInput;
