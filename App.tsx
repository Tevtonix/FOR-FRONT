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
import Modal from "./components/Modal/Modal";
import RecipeForm from "./components/RecipeForm";

function App() {
  const [recipes, setRecipes] = useLocalStorage<Recipe[]>("recipes", initialRecipes);
  const [selectedCategory, setSelectedCategory] = useState<string>("Все");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Состояние модалки
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);

  const debouncedSearch = useDebounce(searchTerm, 300);

  const categories = useMemo(
    () => ["Все", ...Array.from(new Set(initialRecipes.map((r) => r.category)))],
    []
  );

  const filteredRecipes = useFilteredRecipes(recipes, selectedCategory, debouncedSearch);

  const handleToggleFavorite = useCallback(
    (id: number) => {
      setRecipes((prev) =>
        prev.map((r) => (r.id === id ? { ...r, isFavorite: !r.isFavorite } : r))
      );
    },
    [setRecipes]
  );

  // Открыть модалку в режиме добавления
  const handleOpenAdd = () => {
    setEditingRecipe(null);
    setIsModalOpen(true);
  };

  // Открыть модалку в режиме редактирования
  const handleEdit = (recipe: Recipe) => {
    setEditingRecipe(recipe);
    setIsModalOpen(true);
  };

  // Единый обработчик сохранения (и для add, и для edit)
  const handleSaveRecipe = useCallback(
    (data: Omit<Recipe, "id">) => {
      if (editingRecipe) {
        // Обновляем существующий рецепт
        setRecipes((prev) =>
          prev.map((r) =>
            r.id === editingRecipe.id ? { ...r, ...data, id: r.id } : r
          )
        );
      } else {
        // Добавляем новый
        setRecipes((prev) => [...prev, { ...data, id: Date.now() }]);
      }
    },
    [editingRecipe, setRecipes]
  );

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "24px" }}>
      <Header />
      <button
        onClick={handleOpenAdd}
        style={{ marginBottom: "16px", padding: "8px 16px", cursor: "pointer" }}
      >
        + Добавить рецепт
      </button>
      <SearchBar value={searchTerm} onChange={setSearchTerm} />
      <FilterBar
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />
      <RecipeList
        recipes={filteredRecipes}
        onToggleFavorite={handleToggleFavorite}
        onEdit={handleEdit}
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <RecipeForm
          initialRecipe={editingRecipe}
          onSave={handleSaveRecipe}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}

export default App;