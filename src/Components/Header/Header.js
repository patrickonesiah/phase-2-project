import React from 'react';
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <h1 className="header-left">
        <span className="logo" role="img">
        Ω Narrative Grove
        </span>
      </h1>
      <ul className="header-right">
        <li className="link"><Link to="/">All stories</Link></li>
        <li className="link"><Link to="/CreateAStory">Create</Link></li>
      </ul>
    </header>
  );
}

export default Header;