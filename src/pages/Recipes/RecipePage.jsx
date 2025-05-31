import React, { useEffect, useState } from 'react';
import { useParams }           from 'react-router-dom';
import Header                  from '../../components/Header';
import Footer                  from '../../components/Footer';
import Favorites               from '../../components/Favorites';
import './RecipePage.css';

const RecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe]           = useState(null);
  const [allIngredients, setAllIngredients] = useState([]);

  
  useEffect(() => {
    fetch(`https://myrecipeapi-production.up.railway.app/api/recipes/${id}`, { credentials: 'include' })
      .then(res => res.json())
      .then(setRecipe)
      .catch(err => console.error('Error fetching recipe:', err));
  }, [id]);

  
  useEffect(() => {
    fetch(`https://myrecipeapi-production.up.railway.app/api/ingredients`, { credentials: 'include' })
      .then(res => res.json())
      .then(setAllIngredients)
      .catch(err => console.error('Error fetching ingredients:', err));
  }, []);

  if (!recipe) return <p>Loading recipe…</p>;

  /*
  const nameOf = (ingId) => {
    const ing = allIngredients.find(i => i.id === ingId);
    return ing ? ing.name : `#${ingId}`;
  }; */

  return (
    <>
      <Header />
      <div className="recipe-detail-layout">
        <main className="recipe-detail-content">
          <img
            src={recipe.imageUrl}
            alt={recipe.name}
            className="recipe-detail-image"
          />

          <h2>{recipe.name}</h2>
          <div className="recipe-meta">
            <span>⏱ {recipe.cookingTime} min</span>
            <span>👥 Serves {recipe.personNumber}</span>
            <span>⭐ {recipe.score ?? 'N/A'}</span>
          </div>

          <h3>Ingredients</h3>
          {recipe.ingredients
            ? <ul>
                {recipe.ingredients
                    .split(',')
                    .map(s => s.trim())
                    .map((line,i)=><li key={i}>🍅 {line}</li>)}
                </ul>
            : <p>No ingredients listed.</p>
            }



          <h3>Directions</h3>
          <p className="recipe-description">{recipe.description}</p>
        </main>

        <Favorites />
      </div>
      <Footer />
    </>
  );
};

export default RecipePage;
