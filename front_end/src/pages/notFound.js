import React from 'react';
import { Link } from 'react-router-dom';
const notFound = () => {
    return (
        <div  className="not_found">
            <h1 className="not_found_404">404</h1>
            <p className="not_found_texte">Oups! La page que vous demandez n'existe pas.</p>
            <Link className ="not_found_link" to='/'>Retour sur la page d'Acceuil</Link>
        </div>
    );
};

export default notFound;