import { useState, useEffect, useCallback } from "react";
import facade from "../../../apiFacade.js";
import RecipeModal from "./modals/RecipeModal";
import { logError } from "../../../utils/logger";
import { showErrorNotification } from "../../../utils/notification";
import styles from "./css-modules/Recipes.module.css";

const CATEGORIES = ["All", "BREAKFAST", "LUNCH", "DINNER", "DESSERT", "SNACK"];

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

  const loadRecipes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const category = selectedCategory === "All" ? null : selectedCategory;
      const data = await facade.recipeFacade.getAll(category);
      setRecipes(data);
    } catch (err) {
      let errorMessage = "Failed to load recipes. Please try again.";
      if (err.message) {
        errorMessage = err.message;
      } else if (err.status === 0) {
        errorMessage = "Unable to connect to server. Please make sure the API server is running on https://recipeapi.kudskprogramming.dk/api/";
      } else if (err.status) {
        errorMessage = `Error ${err.status}: Failed to load recipes.`;
      }
      setError(errorMessage);
      logError("Error loading recipes", err, { category: selectedCategory, status: err.status });
      showErrorNotification(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    loadRecipes();
  }, [loadRecipes]);

  const handleRecipeClick = (recipeId) => {
    setSelectedRecipeId(recipeId);
  };

  const closeModal = () => {
    setSelectedRecipeId(null);
  };

  const renderCategoryFilterButtons = () => {
    return CATEGORIES.map((category) => (
      <button
        key={category}
        type="button"
        className={`${styles.categoryFilterButton} ${
          selectedCategory === category ? styles.categoryFilterButtonActive : ""
        }`}
        onClick={() => setSelectedCategory(category)}
      >
        {category}
      </button>
    ));
  };

  const renderRecipeCard = (recipe) => {
    return (
      <div
        key={recipe.id}
        className={styles.recipeCardItem}
        onClick={() => handleRecipeClick(recipe.id)}
      >
        <div className={styles.recipeCardHeader}>
          <h2 className={styles.recipeCardTitle}>{recipe.name}</h2>
          <span className={styles.recipeCategoryBadge}>{recipe.category}</span>
        </div>
        <p className={styles.recipeCardDescription}>{recipe.description}</p>
        <div className={styles.recipeCardFooter}>
          <span className={styles.recipeIngredientCount}>
            {recipe.ingredients?.length || 0} ingredient
            {recipe.ingredients?.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>
    );
  };

  return (
    <section className={styles.recipesPage}>
      <div className={styles.recipesCard}>
        <h1 className={styles.recipesTitle}>Recipes</h1>
        
        <div className={styles.categoryFilterButtons}>
          {renderCategoryFilterButtons()}
        </div>

        {loading && <p className={styles.statusMessage}>Loading recipes...</p>}
        
        {error && <p className={styles.errorMessage}>{error}</p>}

        {!loading && !error && recipes.length === 0 && (
          <p className={styles.statusMessage}>
            No recipes found{selectedCategory !== "All" ? ` in ${selectedCategory}` : ""}.
          </p>
        )}

        {!loading && !error && recipes.length > 0 && (
          <div className={styles.recipesScrollContainer}>
            <div className={styles.recipesGrid}>
              {recipes.map(renderRecipeCard)}
            </div>
          </div>
        )}
      </div>

      <RecipeModal recipeId={selectedRecipeId} onClose={closeModal} />
    </section>
  );
}

