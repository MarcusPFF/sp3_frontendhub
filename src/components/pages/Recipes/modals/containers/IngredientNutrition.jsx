import styles from "../css-modules/RecipeModal.module.css";

export default function IngredientNutrition({ nutrition, unit }) {
  if (!nutrition) return null;

  const unitLower = unit?.toLowerCase() || "";
  const isMl = unitLower === "ml";
  const nutritionLabel = isMl ? `Nutrition (per 100${unit})` : "Nutrition (per 100g)";

  return (
    <div className={styles.ingredientNutritionContainer}>
      <h4 className={styles.ingredientNutritionTitle}>{nutritionLabel}</h4>
      <div className={styles.ingredientNutritionGrid}>
        {nutrition.calories !== undefined && nutrition.calories !== null && (
          <div className={styles.ingredientNutritionItem}>
            <span className={styles.ingredientNutritionLabel}>Calories</span>
            <span className={styles.ingredientNutritionValue}>
              {nutrition.calories} kcal
            </span>
          </div>
        )}
        {nutrition.protein !== undefined && nutrition.protein !== null && (
          <div className={styles.ingredientNutritionItem}>
            <span className={styles.ingredientNutritionLabel}>Protein</span>
            <span className={styles.ingredientNutritionValue}>
              {nutrition.protein}g
            </span>
          </div>
        )}
        {nutrition.carbs !== undefined && nutrition.carbs !== null && (
          <div className={styles.ingredientNutritionItem}>
            <span className={styles.ingredientNutritionLabel}>Carbs</span>
            <span className={styles.ingredientNutritionValue}>
              {nutrition.carbs}g
            </span>
          </div>
        )}
        {nutrition.fat !== undefined && nutrition.fat !== null && (
          <div className={styles.ingredientNutritionItem}>
            <span className={styles.ingredientNutritionLabel}>Fat</span>
            <span className={styles.ingredientNutritionValue}>
              {nutrition.fat}g
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

