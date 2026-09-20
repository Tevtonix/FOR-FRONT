import RecipeCard from './RecipeCard';
import TooltipRenderProp from './TooltipRenderProp';
import type { Recipe } from '../data/recipes';
interface Props {
 recipe: Recipe;
 onToggleFavorite: (id: number) => void;
 tooltipText: string;
}
const RecipeCardWithRenderProp = ({ recipe, onToggleFavorite, tooltipText }: Props) => (
 <TooltipRenderProp text={tooltipText}>
 {({ isVisible, show, hide }) => (
 <div onMouseEnter={show} onMouseLeave={hide} style={{ position: 'relative', display: 'inline-block' }}>
 <RecipeCard recipe={recipe} onToggleFavorite={onToggleFavorite} />
 </div>
 )}
 </TooltipRenderProp>
);
export default RecipeCardWithRenderProp;