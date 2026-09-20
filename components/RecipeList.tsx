import type { Recipe } from "../data/recipes";
import RecipeCard from "./RecipeCard";

interface RecipeListProps {
  recipes: Recipe[];
  onToggleFavorite: (id: number) => void;
}

const RecipeList = ({ recipes, onToggleFavorite }: RecipeListProps) => {
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
          />
        ))
      )}
    </div>
  );
};

export default RecipeList;