import { useState, useMemo, useCallback } from "react";
import { useImmerLocalStorage } from "./hooks/useImmerLocalStorage";
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
import ConfirmDialog from "./components/ConfirmDialog";

function App() {
  const [recipes, updateRecipes] = useImmerLocalStorage<Recipe[]>(
    "recipes",
    initialRecipes
  );

  const [selectedCategory, setSelectedCategory] = useState<string>("Все");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showFavorites, setShowFavorites] = useState<boolean>(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [recipeToDelete, setRecipeToDelete] = useState<Recipe | null>(null);

  const debouncedSearch = useDebounce(searchTerm, 300);

  const categories = useMemo(
    () => ["Все", ...Array.from(new Set(initialRecipes.map((r) => r.category)))],
    []
  );

  const filteredRecipes = useFilteredRecipes(
    recipes,
    selectedCategory,
    debouncedSearch,
    showFavorites
  );


  const handleToggleFavorite = useCallback(
    (id: number) => {
      updateRecipes((draft) => {
        const recipe = draft.find((r) => r.id === id);
        if (recipe) recipe.isFavorite = !recipe.isFavorite;
      });
    },
    [updateRecipes]
  );

  const handleChangeCategory = useCallback(
    (id: number, category: string) => {
      updateRecipes((draft) => {
        const recipe = draft.find((r) => r.id === id);
        if (recipe) recipe.category = category;
      });
    },
    [updateRecipes]
  );

  const handleAddIngredient = useCallback(
    (id: number, ingredient: string) => {
      const value = ingredient.trim();
      if (!value) return;
      updateRecipes((draft) => {
        const recipe = draft.find((r) => r.id === id);
        if (recipe && !recipe.ingredients.includes(value)) {
          recipe.ingredients.push(value);
        }
      });
    },
    [updateRecipes]
  );

  const handleRemoveIngredient = useCallback(
    (id: number, ingredient: string) => {
      updateRecipes((draft) => {
        const recipe = draft.find((r) => r.id === id);
        if (recipe) {
          recipe.ingredients = recipe.ingredients.filter(
            (ing) => ing !== ingredient
          );
        }
      });
    },
    [updateRecipes]
  );

  const handleSaveRecipe = useCallback(
    (data: Omit<Recipe, "id">) => {
      if (editingRecipe) {
        updateRecipes((draft) => {
          const recipe = draft.find((r) => r.id === editingRecipe.id);
          if (recipe) Object.assign(recipe, data);
        });
      } else {
        updateRecipes((draft) => {
          draft.push({ ...data, id: Date.now() });
        });
      }
    },
    [editingRecipe, updateRecipes]
  );

  const handleConfirmDelete = () => {
    if (recipeToDelete) {
      updateRecipes((draft) => {
        const index = draft.findIndex((r) => r.id === recipeToDelete.id);
        if (index !== -1) draft.splice(index, 1);
      });
    }
    setRecipeToDelete(null);
  };


  const handleOpenAdd = () => {
    setEditingRecipe(null);
    setIsModalOpen(true);
  };

  const handleEdit = (recipe: Recipe) => {
    setEditingRecipe(recipe);
    setIsModalOpen(true);
  };

  const handleDeleteRequest = (recipe: Recipe) => setRecipeToDelete(recipe);
  const handleCancelDelete = () => setRecipeToDelete(null);
  const handleToggleFavorites = () => setShowFavorites((prev) => !prev);

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
        showFavorites={showFavorites}
        onToggleFavorites={handleToggleFavorites}
      />

      <RecipeList
        recipes={filteredRecipes}
        searchTerm={searchTerm}
        categories={categories.filter((c) => c !== "Все")}
        onToggleFavorite={handleToggleFavorite}
        onChangeCategory={handleChangeCategory}
        onAddIngredient={handleAddIngredient}
        onRemoveIngredient={handleRemoveIngredient}
        onEdit={handleEdit}
        onDelete={handleDeleteRequest}
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <RecipeForm
          key={editingRecipe?.id ?? "new"}
          initialRecipe={editingRecipe}
          onSave={handleSaveRecipe}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>

      <Modal isOpen={recipeToDelete !== null} onClose={handleCancelDelete}>
        <ConfirmDialog
          message="Вы уверены, что хотите удалить рецепт?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      </Modal>
    </div>
  );
}

export default App;