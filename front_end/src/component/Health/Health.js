import React from 'react';

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