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
      <div className="filter-bar__group">
        <button
          type="button"
          className={`filter-bar__item ${
            showFavorites ? "is-active is-fav" : ""
          }`}
          onClick={onToggleFavorites}
        >
          ★ Избранное
        </button>
      </div>

      <div className="filter-bar__group filter-bar__group--separated">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`filter-bar__item ${
              !showFavorites && selected === cat ? "is-active" : ""
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