import { useState, useMemo, useCallback } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useFilteredRecipes } from "./hooks/useFilteredRecipes";
import { useDebounce } from "./hooks/useDebounce";
import type { Recipe } from "./data/recipes";
import { initialRecipes } from "./data/recipes";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import RecipeList from "./components/RecipeList";

function App() {
  // 1. Храним рецепты в localStorage
  const [recipes, setRecipes] = useLocalStorage<Recipe[]>(
    "recipes",
    initialRecipes
  );

  // 2. Состояния для фильтрации и поиска
  const [selectedCategory, setSelectedCategory] = useState<string>("Все");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // 3. Задержка поиска
  const debouncedSearch = useDebounce(searchTerm, 300);

  // 4. Статический список категорий
  const categories = useMemo(
    () => ["Все", ...Array.from(new Set(initialRecipes.map((r) => r.category)))],
    []
  );

  // 5. Отфильтрованные рецепты
  const filteredRecipes = useFilteredRecipes(
    recipes,
    selectedCategory,
    debouncedSearch
  );

  // 6. Колбэк для переключения избранного
  const handleToggleFavorite = useCallback(
    (id: number) => {
      setRecipes((prev) =>
        prev.map((recipe) =>
          recipe.id === id
            ? { ...recipe, isFavorite: !recipe.isFavorite }
            : recipe
        )
      );
    },
    [setRecipes]
  );

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "24px" }}>
      <Header />
      <SearchBar value={searchTerm} onChange={setSearchTerm} />
      <FilterBar
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />
      <RecipeList
        recipes={filteredRecipes}
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  );
}

export default App;