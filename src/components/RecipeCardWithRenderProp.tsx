import RecipeCard from './RecipeCard';
import TooltipRenderProp from './TooltipRenderProp';
import type { Recipe } from '../data/recipes';

interface Props {
  recipe: Recipe;
  searchTerm: string;
  categories: string[];
  onToggleFavorite: (id: number) => void;
  onChangeCategory: (id: number, category: string) => void;
  onAddIngredient: (id: number, ingredient: string) => void;
  onRemoveIngredient: (id: number, ingredient: string) => void;
  onEdit: (recipe: Recipe) => void;
  onDelete: (recipe: Recipe) => void;
  tooltipText: string;
}

const RecipeCardWithRenderProp = ({
  recipe,
  tooltipText,
  ...cardProps
}: Props) => (
  <TooltipRenderProp text={tooltipText}>
    {({ show, hide }) => (
      <div
        onMouseEnter={show}
        onMouseLeave={hide}
        style={{ position: 'relative', display: 'inline-block' }}
      >
        <RecipeCard recipe={recipe} {...cardProps} />
      </div>
    )}
  </TooltipRenderProp>
);

export default RecipeCardWithRenderProp;