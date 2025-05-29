import React, { useEffect, useState } from 'react';
import { useParams }                   from 'react-router-dom';
import Header                          from '../components/Header';
import Sidebar                         from '../components/Sidebar';
import Footer                          from '../components/Footer';
import Favorites                       from '../components/Favorites';
import RecipeCard                      from '../components/RecipeCard';
import './CategoryRecipes.css';

const CategoryRecipes = () => {
  const { id } = useParams();
  const [recipes, setRecipes]       = useState([]);
  const [categoryName, setCategoryName] = useState('');

  
  useEffect(() => {
    const endpoint = id
      ? `https://powerful-sparkle-production.up.railway.app/api/recipes/category/${id}`
      : `https://powerful-sparkle-production.up.railway.app/api/recipes`;
    fetch(endpoint, { credentials: 'include' })
      .then(res => res.json())
      .then(setRecipes)
      .catch(console.error);
  }, [id]);

  
  useEffect(() => {
    if (!id) {
      setCategoryName('');
      return;
    }
    fetch(`https://powerful-sparkle-production.up.railway.app/api/categories/${id}`)
      .then(res => res.json())
      .then(data => setCategoryName(data.name))
      .catch(console.error);
  }, [id]);

  
  const heading = id
    ? categoryName || 'Loading…'
    : 'All Recipes';

  return (
    <>
      <Header />
      <div className="layout">
        <Sidebar />
        <main className="content">
          <h2>🍽️ {heading}</h2>

          {recipes.length > 0 ? (
            <div className="recipe-grid">
              {recipes.map(r => (
                <RecipeCard key={r.id} recipe={r} />
              ))}
            </div>
          ) : (
            <p>No recipes found.</p>
          )}
        </main>
        <Favorites />
      </div>
      <Footer />
    </>
  );
};

export default CategoryRecipes;
