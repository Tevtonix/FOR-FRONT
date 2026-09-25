interface FilterBarProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
  showFavorites: boolean;
  onToggleFavorites: () => void;
}

const FilterBar = ({
  categories,
  selected,
  onSelect,
  showFavorites,
  onToggleFavorites,
}: FilterBarProps) => {
  return (
    <div className="filter-bar">
      {/* Вкладка "Избранное" */}
      <div className="filter-bar__tabs">
        <button
          className={`filter-bar__tab ${
            showFavorites ? 'is-active' : ''
          }`}
          onClick={onToggleFavorites}
        >
          ★ Избранное
        </button>
      </div>

      {/* Категории */}
      <div className="filter-bar__categories">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-bar__category ${
              !showFavorites && selected === cat ? 'is-active' : ''
            }`}
            onClick={() => {
              onSelect(cat);
              if (showFavorites) onToggleFavorites();
            }}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;