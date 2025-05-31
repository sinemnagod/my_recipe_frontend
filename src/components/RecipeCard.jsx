import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './RecipeCard.css';

const RecipeCard = ({ recipe, onUnfavorite }) => {
  const [isFav, setIsFav] = useState(false);

  // grab current userId out of cookie
  const getUserIdFromCookie = () => {
    const match = document.cookie.match(/userId=(\d+)/);
    return match ? parseInt(match[1], 10) : null;
  };

  useEffect(() => {
    const me = getUserIdFromCookie();
    if (me !== null) {
      setIsFav(recipe.likedByUsers.includes(me));
    }
  }, [recipe.likedByUsers]);

  const toggleFav = async (e) => {
    e.preventDefault();
    const action = isFav ? 'remove' : 'add';
    await fetch(
      `https://myrecipeapi-production.up.railway.app/api/users/favorites/${action}/${recipe.id}`,
      {
        method: 'PUT',
        credentials: 'include'
      }
    );
    setIsFav(!isFav);
    if (onUnfavorite && isFav) onUnfavorite(recipe.id);
  };

  return (
    <div className="recipe-card">
      <Link to={`/recipes/${recipe.id}`} className="recipe-card-link">
        <div className="recipe-card-image-wrapper">
          <img
            src={recipe.imageUrl}
            alt={recipe.name}
            className="recipe-card-image"
          />
        </div>
        <div className="recipe-card-content">
          <h4 className="recipe-card-title">{recipe.name}</h4>
          <div className="recipe-card-meta">
            <span>⏱ {recipe.cookingTime}m</span>
            <span>⭐ {recipe.score ?? 'N/A'}</span>
          </div>
        </div>
      </Link>
      <button className="fav-btn" onClick={toggleFav}>
        {isFav ? '★' : '☆'}
      </button>
    </div>
  );
};

export default RecipeCard;
