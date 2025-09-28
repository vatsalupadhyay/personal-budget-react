import React from 'react'; 
import { Link } from 'react-router-dom';
function Menu() {
  return (
    <nav className="menu" aria-label="Main Navigation">
        <ul>
          <li><Link to="/">Homepage</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><a href="https://google.com" target="_blank" rel="noreferrer">Google</a></li>
        </ul>
      </nav>
  );
}

export default Menu;
