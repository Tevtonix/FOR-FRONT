interface FilterBarProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

const FilterBar = ({ categories, selected, onSelect }: FilterBarProps) => {
  return (
    <div style={{ marginBottom: "16px", 
    display: "flex", 
    gap: "8px", flexWrap: "wrap" }}>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          style={{
            fontWeight: selected === cat ? "bold" : "normal",
            padding: "4px 12px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            background: selected === cat ? "#ddd" : "#fff",
            cursor: "pointer",
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default FilterBar; 