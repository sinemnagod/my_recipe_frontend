import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import RecipeCard from '../../components/RecipeCard';
import Favorites from '../../components/Favorites';
import Footer from '../../components/Footer';
import './ProfilePage.css';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('https://powerful-sparkle-production.up.railway.app/api/users/me', {
          credentials: 'include',
        });
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
  
    const fetchRecipes = async () => {
      try {
        const res = await fetch('https://powerful-sparkle-production.up.railway.app/api/recipes/my-recipes', {
          credentials: 'include',
        });
        const data = await res.json();
        setRecipes(data);
      } catch (err) {
        console.error("Failed to fetch recipes:", err);
      }
    };
  
    const fetchFavorites = async () => {
      try {
        const res = await fetch('https://powerful-sparkle-production.up.railway.app/api/users/favorites', {
          credentials: 'include',
        });
        const data = await res.json();
        setFavorites(data);
      } catch (err) {
        console.error("Failed to fetch favorites:", err);
      }
    };
  
    fetchUser();
    fetchRecipes();
    fetchFavorites();
  }, []);
  

  return (
    <>
      <Header />
      <div className="layout">
        <main className="profile-content">
          <h2>My Profile</h2>

          {user && (
            <div className="user-card">
              <p><strong>First Name:</strong> {user.name}</p>
                <p><strong>Last Name:</strong> {user.surname}</p>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>

            </div>
          )}

            <section>
            <h3>My Recipes</h3>
            {recipes.length > 0 ? (
              <div className="my-recipes-grid">
                {recipes.map(r => (
                  <RecipeCard
                    key={r.id}
                    recipe={r}
                    onClick={() => window.location = `/recipes/${r.id}`}
                  />
                ))}
              </div>
            ) : (
              <p>No recipes posted yet!</p>
            )}
          </section>
        </main>

        <Favorites />
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
