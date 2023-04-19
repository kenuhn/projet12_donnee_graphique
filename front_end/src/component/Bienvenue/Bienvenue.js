import React from 'react';
//welwome component 
const Bienvenue = (props) => {
    const firstName = props.firstName
    console.log(firstName)
   
    return (
        <div className="bienvenue">
            <h1> Bonjour <p className="bienvenue_name">{firstName}</p> </h1>
            <p className='bienvenue_texte'>Félicitation! vous avez explosé vos objectifs hier</p>
        </div>
    );
};

export default Bienvenue;