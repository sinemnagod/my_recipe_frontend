import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import RecipeList from '../../components/RecipeList';
import Favorites from '../../components/Favorites';
import Footer from '../../components/Footer';
import './HomePage.css';
import '../../index.css';

const HomePage = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const searchQuery = params.get('search') || '';

  return (
    <div className="homepage-container">
      <Header />
      <div className="layout">
        <Sidebar />
        <RecipeList searchQuery={searchQuery} />
        <Favorites />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
