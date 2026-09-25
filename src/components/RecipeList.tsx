import type { Recipe } from "../data/recipes";
import RecipeCard from "./RecipeCard";

interface RecipeListProps {
  recipes: Recipe[];
  searchTerm: string;
  categories: string[];
  onToggleFavorite: (id: number) => void;
  onChangeCategory: (id: number, category: string) => void;
  onAddIngredient: (id: number, ingredient: string) => void;
  onRemoveIngredient: (id: number, ingredient: string) => void;
  onEdit: (recipe: Recipe) => void;
  onDelete: (recipe: Recipe) => void;
}

const RecipeList = ({
  recipes,
  searchTerm,
  categories,
  onToggleFavorite,
  onChangeCategory,
  onAddIngredient,
  onRemoveIngredient,
  onEdit,
  onDelete,
}: RecipeListProps) => {
  return (
    <div>
      {recipes.length === 0 ? (
        <p>Рецептов не найдено</p>
      ) : (
        recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            searchTerm={searchTerm}
            categories={categories}
            onToggleFavorite={onToggleFavorite}
            onChangeCategory={onChangeCategory}
            onAddIngredient={onAddIngredient}
            onRemoveIngredient={onRemoveIngredient}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
};

export default RecipeList;