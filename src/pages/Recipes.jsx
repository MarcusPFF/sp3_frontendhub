import { useState, useEffect, useCallback } from "react";
import recipeFacade from "../../apiFacade.js";
import RecipeModal from "../components/RecipeModal";
import styles from "./Recipes.module.css";

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
      const data = await recipeFacade.getAll(category);
      setRecipes(data);
    } catch (err) {
      let errorMessage = "Failed to load recipes. Please try again.";
      if (err.message) {
        errorMessage = err.message;
      } else if (err.status === 0) {
        errorMessage = "Unable to connect to server. Please make sure the API server is running on http://localhost:7070";
      } else if (err.status) {
        errorMessage = `Error ${err.status}: Failed to load recipes.`;
      }
      setError(errorMessage);
      console.error("Error loading recipes:", err);
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

  return (
    <section className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Recipes</h1>
        
        <div className={styles.filterButtons}>
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              className={`${styles.filterButton} ${
                selectedCategory === category ? styles.filterButtonActive : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {loading && <p className={styles.message}>Loading recipes...</p>}
        
        {error && <p className={styles.error}>{error}</p>}

        {!loading && !error && recipes.length === 0 && (
          <p className={styles.message}>
            No recipes found{selectedCategory !== "All" ? ` in ${selectedCategory}` : ""}.
          </p>
        )}

        {!loading && !error && recipes.length > 0 && (
          <div className={styles.scrollContainer}>
            <div className={styles.grid}>
              {recipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className={styles.recipeCard}
                  onClick={() => handleRecipeClick(recipe.id)}
                >
                  <div className={styles.cardHeader}>
                    <h2 className={styles.cardTitle}>{recipe.name}</h2>
                    <span className={styles.categoryBadge}>{recipe.category}</span>
                  </div>
                  <p className={styles.cardDescription}>{recipe.description}</p>
                  <div className={styles.cardFooter}>
                    <span className={styles.ingredientCount}>
                      {recipe.ingredients?.length || 0} ingredient
                      {recipe.ingredients?.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <RecipeModal recipeId={selectedRecipeId} onClose={closeModal} />
    </section>
  );
}
