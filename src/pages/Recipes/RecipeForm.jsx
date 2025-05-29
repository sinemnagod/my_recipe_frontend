import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Favorites from '../../components/Favorites';
import Footer from '../../components/Footer';
import './RecipeForm.css';
import '../../index.css';

const RecipeForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    cookingTime: '',
    personNumber: '',
    ingredients: '',
    categories: '',
    score: '',
    imageUrl: ''
  });

  const [categoriesList, setCategoriesList] = useState([]);
  const [ingredientsList, setIngredientsList] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://powerful-sparkle-production.up.railway.app/api/categories', {
          credentials: 'include'
        });
        const data = await response.json();
        setCategoriesList(data);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };

    const fetchIngredients = async () => {
      try {
        const response = await fetch('https://powerful-sparkle-production.up.railway.app/api/ingredients', {
          credentials: 'include'
        });
        const data = await response.json();
        setIngredientsList(data);
      } catch (err) {
        console.error('Failed to fetch ingredients:', err);
      }
    };

    fetchCategories();
    fetchIngredients();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleIngredientInputChange = (e) => {
    const input = e.target.value;
    const ids = input
      .split(',')
      .map(str => str.trim())
      .filter(id => id !== '')
      .map(id => parseInt(id));
    setFormData({
      ...formData,
      ingredientIds: ids
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isAuthenticated = localStorage.getItem('token');
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const payload = {
      name: formData.name,
      description: formData.description,
      cookingTime: formData.cookingTime,
      personNumber: formData.personNumber,
      ingredients: formData.ingredients,
      categoryIds: [ Number(formData.categories) ],
      score: formData.score,
      imageUrl: formData.imageUrl
    };

    try {
      const response = await fetch('https://powerful-sparkle-production.up.railway.app/api/recipes/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert('Recipe submitted!');
        navigate('/');
      } else {
        alert('Failed to submit recipe');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Header />
      <div className="layout">
        <Sidebar />
        <main className="form-wrapper">
          <div className="recipe-form-container">
            <h2>Submit a Recipe</h2>
            <form onSubmit={handleSubmit}>
              <input name="name" placeholder="Recipe Name" value={formData.name} onChange={handleChange} required />
              <textarea name="description" placeholder="Instructions" value={formData.description} onChange={handleChange} required />
              <input name="cookingTime" type="number" placeholder="Cooking Time (min)" value={formData.cookingTime} onChange={handleChange} required />
              <input name="personNumber" type="number" placeholder="Serves (people)" value={formData.personNumber} onChange={handleChange} required />
              <textarea
                name="ingredients"
                placeholder="Ingredients (comma separated)"
                value={formData.ingredients}
                onChange={e => setFormData({
                  ...formData,
                  ingredients: e.target.value
                })}
                required
              />

              <select name="categories" value={formData.categories} onChange={handleChange} required>
                <option value="">Select Category</option>
                {categoriesList.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>

              <input name="score" type="number" step="0.1" min="0" max="5" placeholder="Score (0–5)" value={formData.score} onChange={handleChange} />
              <input name="imageUrl" placeholder="Image URL" value={formData.imageUrl} onChange={handleChange} required />
              <button type="submit">Submit Recipe</button>
            </form>
          </div>
        </main>
        <Favorites />
      </div>
      <Footer />
    </>
  );
};

export default RecipeForm;
