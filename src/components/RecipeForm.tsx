import { useState } from 'react';
import type { Recipe } from '../data/recipes';

interface RecipeFormProps {
  onSave: (recipe: Omit<Recipe, 'id'>) => void;
  onClose: () => void;
  initialRecipe?: Recipe | null;
}

interface FormErrors {
  title?: string;
  description?: string;
  category?: string;
}

const RecipeForm = ({ onSave, onClose, initialRecipe }: RecipeFormProps) => {
  const isEditMode = Boolean(initialRecipe);

  const [title, setTitle] = useState(initialRecipe?.title ?? '');
  const [description, setDescription] = useState(initialRecipe?.description ?? '');
  const [category, setCategory] = useState(initialRecipe?.category ?? '');
  const [ingredientsStr, setIngredientsStr] = useState(
    initialRecipe?.ingredients.join(', ') ?? ''
  );

  const [errors, setErrors] = useState<FormErrors>({});

  // Проверка одного поля
  const validateField = (name: keyof FormErrors, value: string): string | undefined => {
    if (!value.trim()) {
      switch (name) {
        case 'title':
          return 'Название обязательно';
        case 'description':
          return 'Описание обязательно';
        case 'category':
          return 'Категория обязательна';
      }
    }
    return undefined;
  };

  // Универсальный обработчик изменения с валидацией
  const handleChange = (
    name: keyof FormErrors,
    value: string,
    setter: (v: string) => void
  ) => {
    setter(value);
    // Ошибка исчезает, если поле стало валидным
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Валидация всей формы перед отправкой
  const validateAll = (): FormErrors => {
    const newErrors: FormErrors = {};
    const titleError = validateField('title', title);
    const descError = validateField('description', description);
    const catError = validateField('category', category);
    if (titleError) newErrors.title = titleError;
    if (descError) newErrors.description = descError;
    if (catError) newErrors.category = catError;
    return newErrors;
  };

  // Кнопка disabled, если есть хотя бы одна ошибка или поля пустые
  const hasErrors = Boolean(
    errors.title ||
    errors.description ||
    errors.category ||
    !title.trim() ||
    !description.trim() ||
    !category.trim()
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = validateAll();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const ingredients = ingredientsStr
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    onSave({
      title: title.trim(),
      description: description.trim(),
      category: category.trim(),
      ingredients,
      isFavorite: initialRecipe?.isFavorite ?? false,
      tooltipText: initialRecipe?.tooltipText,
    });
    onClose();
  };

  return (
    <form className="recipe-form" onSubmit={handleSubmit} noValidate>
      <h2 className="recipe-form__title">
        {isEditMode ? 'Редактировать рецепт' : 'Добавить рецепт'}
      </h2>

      <div className="recipe-form__field">
        <label>Название</label>
        <input
          className={errors.title ? 'is-invalid' : ''}
          value={title}
          onChange={(e) => handleChange('title', e.target.value, setTitle)}
        />
        {errors.title && <span className="recipe-form__error">{errors.title}</span>}
      </div>

      <div className="recipe-form__field">
        <label>Описание</label>
        <input
          className={errors.description ? 'is-invalid' : ''}
          value={description}
          onChange={(e) => handleChange('description', e.target.value, setDescription)}
        />
        {errors.description && (
          <span className="recipe-form__error">{errors.description}</span>
        )}
      </div>

      <div className="recipe-form__field">
        <label>Категория</label>
        <input
          className={errors.category ? 'is-invalid' : ''}
          value={category}
          onChange={(e) => handleChange('category', e.target.value, setCategory)}
        />
        {errors.category && (
          <span className="recipe-form__error">{errors.category}</span>
        )}
      </div>

      <div className="recipe-form__field">
        <label>Ингредиенты (через запятую)</label>
        <input
          value={ingredientsStr}
          onChange={(e) => setIngredientsStr(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="recipe-form__submit"
        disabled={hasErrors}
      >
        {isEditMode ? 'Сохранить' : 'Добавить'}
      </button>
    </form>
  );
};

export default RecipeForm;