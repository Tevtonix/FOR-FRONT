import { useMemo } from 'react';
import type { Recipe } from '../data/recipes';

export const useFilteredRecipes = (
  recipes: Recipe[],
  selectedCategory: string,
  searchTerm: string,
  onlyFavorites: boolean = false
): Recipe[] => {
  return useMemo(() => {
    return recipes.filter((recipe) => {
      // 1. Фильтр по избранному
      if (onlyFavorites && !recipe.isFavorite) return false;

      if (
        !onlyFavorites &&
        selectedCategory !== 'Все' &&
        recipe.category !== selectedCategory
      ) {
        return false;
      }

      if (
        searchTerm.trim() &&
        !recipe.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
      ) {
        return false;
      }

      return true;
    });
  }, [recipes, selectedCategory, searchTerm, onlyFavorites]);
};