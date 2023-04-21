import React from "react";
import Logo from "../../images/logo.png"

/**
 * Représente le header  avec le logo du site
 * @returns {JSX.Element} - Le header avec une liste des pages ou naviguer 
 */
const Header = () => {

  return (
      <header className="header">
         <img className="logo"  src={Logo}  alt="logo"/>
        <nav className="navbare"> 
     
          <ul className="navbare_liste">
            <li><a href="/">Acceuil</a></li>
            <li><a href="/Profil">Profil</a></li>
            <li><a href="/Reglages">Réglages</a></li>
            <li><a href="/Communaute">Communauté</a></li>
          </ul>
        </nav>
      </header>
    );
};

export default Header;