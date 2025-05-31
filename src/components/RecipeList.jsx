import React, { useEffect, useState } from 'react';
import RecipeCard from './RecipeCard';
import './RecipeList.css';

const RecipeList = ({ searchQuery = '' }) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch('https://myrecipeapi-production.up.railway.app/api/recipes', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setRecipes(data))
      .catch(err => console.error('Error fetching recipes:', err));
  }, []);

  const filtered = recipes.filter(r =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="recipe-list">
      <h2>All Recipes</h2>

      {filtered.length === 0 ? (
        <p>
          No recipes found{searchQuery ? ` for “${searchQuery}”` : ''}.
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
