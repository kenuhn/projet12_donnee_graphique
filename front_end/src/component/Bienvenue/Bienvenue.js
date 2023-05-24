import React from 'react';
/**
 * Composant react de bienvenue
 * @param {Object} props 
 * @returns {JSX.Element} Affiche bienvenue suivi du de l'utilisateur
 */

const Bienvenue = (props) => {
    const firstName = props.firstName
   
    return (
        <div className="bienvenue">
            <h1> Bonjour <p className="bienvenue_name">{firstName}</p> </h1>
            <p className='bienvenue_texte'>Félicitation! vous avez explosé vos objectifs hier</p>
        </div>
    );
};

export default Bienvenue;