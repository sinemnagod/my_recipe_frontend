import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeCard from './RecipeCard';
import './Favorites.css';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await fetch('https://myrecipeapi-production.up.railway.app/api/users/favorites', {
          credentials: 'include',
        });
        if (!res.ok) throw new Error('Failed to fetch favorites');
        const data = await res.json();
        setFavorites(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFavorites();
  }, []);

  return (
    <aside className="favorites">
      <h2>Favorites</h2>

      {favorites.length === 0 ? (
        <p className="empty-message">No favorites added.</p>
      ) : (
        <div className="favorites-list">
          {favorites.map((recipe) => (
            <div
              key={recipe.id}
              className="favorite-item"
              onClick={() => navigate(`/recipes/${recipe.id}`)}
            >
              <RecipeCard recipe={recipe} />
            </div>
          ))}
        </div>
      )}
    </aside>
  );
};

export default Favorites;
