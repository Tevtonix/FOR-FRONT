export interface Recipe {
 id: number;
 title: string;
 description: string;
 category: string;
 ingredients: string[];
 isFavorite: boolean;
 tooltipText?: string; // добавлено
}
export const initialRecipes: Recipe[] = [
 {
 id: 1,
 title: "Борщ",
 description: "Классический украинский суп",
 category: "Супы",
 ingredients: ["свекла", "капуста", "мясо"],
 isFavorite: false,
 tooltipText: "Горячий суп со свеклой",
 },
    {
    id: 2,
    title: "Цезарь",
    description: "Салат с курицей и сухариками",
    category: "Салаты",
    ingredients: ["курица", "салат", "сухарики", "пармезан"],
    isFavorite: true,
 tooltipText: "Полезный салатик! Ням ням!",
    },
    {
        id: 3,
        title: "Панкейки",
        description: "Американские блинчики",
        category: "Десерты",
        ingredients: ["мука", "молоко", "яйца"],
        isFavorite: false,
 tooltipText: "Жирно и вкусно! ааах!",
    },
    {
    id: 4,
    title: "Куриный суп",
    description: "Легкий суп с курицей",
    category: "Супы",
    ingredients: ["курица", "лапша", "морковь"],
    isFavorite: false,
 tooltipText: "И вкусно и полезно! Ням ням!",
    },
]