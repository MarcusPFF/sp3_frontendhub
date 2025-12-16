import { useState, useEffect, useCallback } from "react";
import recipeFacade from "../../apiFacade.js";
import IngredientsList from "./IngredientsList";
import styles from "./RecipeModal.module.css";

export default function RecipeModal({ recipeId, onClose }) {
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [expandedIngredients, setExpandedIngredients] = useState(new Set());

  const loadRecipeDetails = useCallback(async () => {
    setLoading(true);
    setRecipeDetails(null);
    setExpandedIngredients(new Set());
    try {
      const data = await recipeFacade.getById(recipeId);
      console.log("Recipe details:", data);
      if (data.ingredients) {
        console.log("First ingredient:", data.ingredients[0]);
      }
      setRecipeDetails(data);
    } catch (err) {
      console.error("Error loading recipe details:", err);
      setRecipeDetails(null);
    } finally {
      setLoading(false);
    }
  }, [recipeId]);

  useEffect(() => {
    if (recipeId) {
      loadRecipeDetails();
    }
  }, [recipeId, loadRecipeDetails]);

  const toggleIngredient = (ingredientId) => {
    setExpandedIngredients((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(ingredientId)) {
        newSet.delete(ingredientId);
      } else {
        newSet.add(ingredientId);
      }
      return newSet;
    });
  };

  if (!recipeId) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        {loading && <p className={styles.modalMessage}>Loading recipe details...</p>}
        {!loading && recipeDetails && (
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>{recipeDetails.name}</h2>
              <span className={styles.modalCategoryBadge}>{recipeDetails.category}</span>
            </div>
            <p className={styles.modalDescription}>{recipeDetails.description}</p>
            
            <IngredientsList
              ingredients={recipeDetails.ingredients}
              expandedIngredients={expandedIngredients}
              onToggleIngredient={toggleIngredient}
            />
          </div>
        )}
        {!loading && !recipeDetails && (
          <p className={styles.modalMessage}>Failed to load recipe details.</p>
        )}
      </div>
    </div>
  );
}

