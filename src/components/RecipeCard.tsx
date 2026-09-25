import { useState } from "react";
import type { Recipe } from "../data/recipes";
import { useTooltip } from "../hooks/useTooltip";
import HighlightText from "./HighlightText";

interface RecipeCardProps {
  recipe: Recipe;
  searchTerm: string;
  categories: string[];
  onToggleFavorite: (id: number) => void;
  onChangeCategory: (id: number, category: string) => void;
  onAddIngredient: (id: number, ingredient: string) => void;
  onRemoveIngredient: (id: number, ingredient: string) => void;
  onEdit: (recipe: Recipe) => void;
  onDelete: (recipe: Recipe) => void;
}

const RecipeCard = ({
  recipe,
  searchTerm,
  categories,
  onToggleFavorite,
  onChangeCategory,
  onAddIngredient,
  onRemoveIngredient,
  onEdit,
  onDelete,
}: RecipeCardProps) => {
  const { isVisible, show, hide } = useTooltip();
  const tooltipText = recipe.tooltipText;

  const [newIngredient, setNewIngredient] = useState("");

  const handleAddIngredient = () => {
    onAddIngredient(recipe.id, newIngredient);
    setNewIngredient("");
  };

  return (
    <div
      className="recipe-card"
      onMouseEnter={tooltipText ? show : undefined}
      onMouseLeave={tooltipText ? hide : undefined}
    >
      <h3 className="recipe-card__title">
        <HighlightText text={recipe.title} highlight={searchTerm} />{" "}
        <span
          className={`recipe-card__star ${recipe.isFavorite ? "is-fav" : ""}`}
          onClick={() => onToggleFavorite(recipe.id)}
          title={recipe.isFavorite ? "Убрать из избранного" : "В избранное"}
        >
          {recipe.isFavorite ? "★" : "☆"}
        </span>
      </h3>

      <p className="recipe-card__desc">{recipe.description}</p>

      <div className="recipe-card__category">
        <span>Категория:</span>
        <select
          value={recipe.category}
          onChange={(e) => onChangeCategory(recipe.id, e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
          {!categories.includes(recipe.category) && (
            <option value={recipe.category}>{recipe.category}</option>
          )}
        </select>
      </div>

      <div className="recipe-card__actions">
        <button className="btn" onClick={() => onToggleFavorite(recipe.id)}>
          {recipe.isFavorite ? "Убрать из избранного" : "В избранное"}
        </button>
        <button className="btn" onClick={() => onEdit(recipe)}>
          Редактировать
        </button>
        <button className="btn btn--danger" onClick={() => onDelete(recipe)}>
          Удалить
        </button>
      </div>

      <div className="recipe-card__ingredients">
        <strong>Ингредиенты:</strong>
        <ul>
          {recipe.ingredients.map((ing) => (
            <li key={ing}>
              <span>{ing}</span>
              <button
                className="recipe-card__remove-ing"
                onClick={() => onRemoveIngredient(recipe.id, ing)}
                aria-label={`Удалить ингредиент ${ing}`}
                title="Удалить"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>

        <div className="recipe-card__add-ing">
          <input
            type="text"
            placeholder="Новый ингредиент"
            value={newIngredient}
            onChange={(e) => setNewIngredient(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddIngredient();
              }
            }}
          />
          <button className="btn" onClick={handleAddIngredient}>
            Добавить
          </button>
        </div>
      </div>

      {tooltipText && isVisible && (
        <span className="recipe-card__tooltip">{tooltipText}</span>
      )}
    </div>
  );
};

export default RecipeCard;