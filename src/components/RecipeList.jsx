import React, { useEffect, useState } from 'react';
import RecipeCard from './RecipeCard';
import './RecipeList.css';
import { getRecipes } from '../api/api';

const RecipeList = ({ searchQuery = '' }) => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getRecipes();
        if (response.data && Array.isArray(response.data)) {
          setRecipes(response.data);
        } else {
          setError('Received invalid data format from server');
        }
      } catch (err) {
        console.error('Error fetching recipes:', err);
        const errorMessage = err.response?.data?.message || err.message || 'Failed to load recipes';
        setError(`Error: ${errorMessage}. The backend service might be temporarily unavailable.`);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const filtered = recipes.filter(r =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <main className="recipe-list">
        <h2>All Recipes</h2>
        <p>Loading recipes...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="recipe-list">
        <h2>All Recipes</h2>
        <div className="error-message" style={{ color: 'red', padding: '20px', textAlign: 'center' }}>
          <p>{error}</p>
          <p>Please try refreshing the page or contact support if the problem persists.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="recipe-list">
      <h2>All Recipes</h2>

      {filtered.length === 0 ? (
        <p>
          No recipes found{searchQuery ? ` for "${searchQuery}"` : ''}.
        </p>
      ) : (
        <div className="recipe-grid">
          {filtered.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </main>
  );
};

export default RecipeList;
