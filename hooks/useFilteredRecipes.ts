import {useMemo} from 'react';
import type {Recipe} from '../data/recipes';
export function useFilteredRecipes(recipes: Recipe[], category: string, 
    searchTerm: string): Recipe[]{
    const filtered = useMemo(() => {
        return recipes.filter(recipe =>{
            const matchesCategory = category === 'Все' ||
            recipe.category === category;
            const matchesSearch =
            recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [recipes, category, searchTerm])
    return filtered;
}