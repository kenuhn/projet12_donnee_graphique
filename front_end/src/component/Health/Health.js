import React from 'react';

/**
 * Composant React pour afficher une information de santé.
 * @param {Object} props - Les propriétés passées au composant.
 * @param {number} props.infos - Le nombre d'informations à afficher.
 * @param {string} props.composant - Le nom du composant à afficher.
 * @param {string} props.unite - L'unité de mesure pour les informations à afficher.
 * @param {string} props.color - La couleur de fond de l'image d'information.
 * @param {string} props.image - Le chemin vers l'image à afficher.
 * @return {JSX.Element} - Le composant de l'information de santé.
 */
const Health = (props) => {
    const infosNombre = props.infos
    const composant = props.composant
    const unite = props.unite 
    const color = props.color
    const image = props.image
    return (
        <div className='infos_contenant'>
            <div className='infos_img' style={{backgroundColor: color}}> 
            <img src={`${image}`} alt={`${composant}`}/>
            </div>
            <div className='infos_contenant_unite'>
               
                <p className='infos_nombre'> {infosNombre}{unite} </p>
                <p className='infos_unite'> {composant}</p>
            </div>
            

        </div>
    );
};

export default Health;