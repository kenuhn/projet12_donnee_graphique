import React from "react";
import Logo from "../../images/logo.png"

// Header of the page for the moment only "Accueil" pages is accessible
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