interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => (
  <input
    type="text"
    placeholder="Поиск по названию..."
    value={value}
    onChange={(e) => onChange(e.target.value)}
    style={{ padding: '8px', width: '100%', marginBottom: '16px',
       boxSizing: 'border-box' }}
  />
);

export default SearchBar;