import { useState, useEffect, useCallback } from "react";
import facade from "../../../../apiFacade.js";
import IngredientsList from "./containers/IngredientsList";
import styles from "./css-modules/RecipeModal.module.css";

export default function RecipeModal({ recipeId, onClose }) {
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [expandedIngredients, setExpandedIngredients] = useState(new Set());

  const loadRecipeDetails = useCallback(async () => {
    setLoading(true);
    setRecipeDetails(null);
    setExpandedIngredients(new Set());
    try {
      const data = await facade.recipeFacade.getById(recipeId);
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
    <div className={styles.recipeModalOverlay} onClick={onClose}>
      <div className={styles.recipeModalContainer} onClick={(e) => e.stopPropagation()}>
        <button className={styles.recipeModalCloseButton} onClick={onClose}>
          ×
        </button>
        {loading && <p className={styles.recipeModalStatusMessage}>Loading recipe details...</p>}
        {!loading && recipeDetails && (
          <div className={styles.recipeModalContent}>
            <div className={styles.recipeModalHeader}>
              <h2 className={styles.recipeModalTitle}>{recipeDetails.name}</h2>
              <span className={styles.recipeModalCategoryBadge}>{recipeDetails.category}</span>
            </div>
            <p className={styles.recipeModalDescription}>{recipeDetails.description}</p>
            
            <IngredientsList
              ingredients={recipeDetails.ingredients}
              expandedIngredients={expandedIngredients}
              onToggleIngredient={toggleIngredient}
            />
          </div>
        )}
        {!loading && !recipeDetails && (
          <p className={styles.recipeModalStatusMessage}>Failed to load recipe details.</p>
        )}
      </div>
    </div>
  );
}

