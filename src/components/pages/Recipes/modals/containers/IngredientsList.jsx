import IngredientNutrition from "./IngredientNutrition";
import styles from "../css-modules/RecipeModal.module.css";

export default function IngredientsList({ ingredients, expandedIngredients, onToggleIngredient }) {
  if (!ingredients || ingredients.length === 0) return null;

  const renderIngredientItem = (recipeIngredient) => {
    const isExpanded = expandedIngredients.has(recipeIngredient.id);
    const hasNutrition = recipeIngredient.ingredient?.nutrition;

    return (
      <div key={recipeIngredient.id} className={styles.ingredientListItem}>
        <div className={styles.ingredientListItemInfo}>
          <div className={styles.ingredientListItemNameWrapper}>
            <span className={styles.ingredientListItemName}>
              {recipeIngredient.ingredient.name}
            </span>
            {recipeIngredient.ingredient.description && (
              <span className={styles.ingredientListItemDescription}>
                {recipeIngredient.ingredient.description}
              </span>
            )}
          </div>
          <div className={styles.ingredientListItemRight}>
            <span className={styles.ingredientListItemAmount}>
              {recipeIngredient.quantity} {recipeIngredient.unit}
            </span>
            {hasNutrition && (
              <button
                type="button"
                className={`${styles.ingredientNutritionToggle} ${isExpanded ? styles.ingredientNutritionToggleActive : ""}`}
                onClick={() => onToggleIngredient(recipeIngredient.id)}
              >
                {isExpanded ? "−" : "+"}
              </button>
            )}
          </div>
        </div>
        {recipeIngredient.preparation && (
          <p className={styles.ingredientListItemPreparation}>
            {recipeIngredient.preparation}
          </p>
        )}
        {hasNutrition && isExpanded && (
          <IngredientNutrition
            nutrition={recipeIngredient.ingredient.nutrition}
            unit={recipeIngredient.unit}
          />
        )}
      </div>
    );
  };

  return (
    <div className={styles.ingredientsSection}>
      <h3 className={styles.ingredientsSectionTitle}>Ingredients</h3>
      <div className={styles.ingredientsListContainer}>
        {ingredients.map(renderIngredientItem)}
      </div>
    </div>
  );
}

