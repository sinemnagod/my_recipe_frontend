import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const [categories, setCategories] = useState([]);
  const { id: activeCat } = useParams(); 

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('https://myrecipeapi-production.up.railway.app/api/categories', {
          credentials: 'include'
        });
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error('Failed to load categories:', err);
      }
    };
    fetchCategories();
  }, []);

  return (
    <aside className="sidebar">
      <h3>Categories</h3>
      <ul>
        
        <li className={!activeCat ? 'active' : ''}>
          <Link to="/">All Categories</Link>
        </li>

        
        {categories.map(cat => (
          <li
            key={cat.id}
            className={String(cat.id) === activeCat ? 'active' : ''}
          >
            <Link to={`/categories/${cat.id}`}>
            🍽️ {cat.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
