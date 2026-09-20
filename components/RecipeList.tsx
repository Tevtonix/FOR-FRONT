import type { Recipe } from "../data/recipes";
import RecipeCard from "./RecipeCard";

interface RecipeListProps {
  recipes: Recipe[];
  onToggleFavorite: (id: number) => void;
  onEdit: (recipe: Recipe) => void;   // ← новое
}

const RecipeList = ({ recipes, onToggleFavorite, onEdit }: RecipeListProps) => {
  return (
    <div>
      {recipes.length === 0 ? (
        <p>Рецептов не найдено</p>
      ) : (
        recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onToggleFavorite={onToggleFavorite}
            onEdit={onEdit}
          />
        ))
      )}
    </div>
  );
};

export default RecipeList;