import type { Recipe } from "../data/recipes";
import { useTooltip } from "../hooks/useTooltip";

interface RecipeCardProps {
  recipe: Recipe;
  onToggleFavorite: (id: number) => void;
}

const RecipeCard = ({ recipe, onToggleFavorite }: RecipeCardProps) => {
  // Используем кастомный хук для тултипа
  const { isVisible, show, hide } = useTooltip();
  const tooltipText = recipe.tooltipText; // текст подсказки из данных

  return (
    <div
      style={{
        border: "1px solid #eee",
        borderRadius: "8px",
        padding: "12px",
        marginBottom: "8px",
        background: "#fafafa",
        position: "relative",
      }}
      // Навешиваем обработчики только если есть текст подсказки
      onMouseEnter={tooltipText ? show : undefined}
      onMouseLeave={tooltipText ? hide : undefined}
    >
      <h3>
        {recipe.title}{" "}
        {/* Звёздочка избранного — кликабельная */}
        <span
          onClick={() => onToggleFavorite(recipe.id)}
          style={{
            cursor: "pointer",
            fontSize: "20px",
            color: recipe.isFavorite ? "#f5b301" : "#ccc",
            userSelect: "none",
          }}
          title={recipe.isFavorite ? "Убрать из избранного" : "В избранное"}
        >
          {recipe.isFavorite ? "★" : "☆"}
        </span>
      </h3>
      <p>{recipe.description}</p>

      {/* Кнопка добавления/удаления из избранного */}
      <button
        onClick={() => onToggleFavorite(recipe.id)}
        style={{
          padding: "6px 12px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          background: recipe.isFavorite ? "#f5b301" : "#fff",
          color: recipe.isFavorite ? "#fff" : "#333",
          cursor: "pointer",
          fontWeight: 500,
        }}
      >
        {recipe.isFavorite ? "Убрать из избранного" : "В избранное"}
      </button>

      {/* Рендерим подсказку при видимости */}
      {tooltipText && isVisible && (
        <span
          style={{
            position: "absolute",
            bottom: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            background: "black",
            color: "white",
            padding: "4px 8px",
            borderRadius: "4px",
            whiteSpace: "nowrap",
            fontSize: "12px",
            zIndex: 10,
          }}
        >
          {tooltipText}
        </span>
      )}
    </div>
  );
};

export default RecipeCard;