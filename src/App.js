
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage         from './pages/Home/HomePage';
import LoginPage        from './pages/Login/LoginPage';
import SignUpPage       from './pages/Login/SignUpPage';
import RecipePage       from './pages/Recipes/RecipePage';
import RecipeForm       from './pages/Recipes/RecipeForm';
import ProfilePage      from './pages/UserProfile/ProfilePage';
import PrivateRoute     from './components/PrivateRoute';
import CategoryRecipes  from './pages/CategoryRecipes';

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/recipes/:id" element={<RecipePage />} />
        <Route path="/recipe/new" element={
          <PrivateRoute>
            <RecipeForm />
          </PrivateRoute>
        } />
        <Route path="/profile" element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        } />
        <Route path="/categories/:id" element={<CategoryRecipes />} />
      </Routes>
    
  );
}

export default App;
