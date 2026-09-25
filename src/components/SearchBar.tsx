import { useRef } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    onChange("");
    inputRef.current?.focus();
  };

  return (
    <div className="search-bar">
      <input
        ref={inputRef}
        type="text"
        className="search-bar__input"
        placeholder="Поиск по названию..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      {value && (
        <button
          type="button"
          className="search-bar__clear"
          onClick={handleClear}
          aria-label="Очистить поиск"
          title="Очистить"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchBar;