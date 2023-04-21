import React from "react";

/**

React component that displays links to select different users
@function
@returns {JSX.Element} - Rendered component
*/
const Chemin = () => {
  return (
    <div className="acceuil">
      <div className="chemin">
        <a className="chemin_lien" href="/12">
          {" "}
          Choisir Karl{" "}
        </a>
        <a className="chemin_lien" href="/18">
          {" "}
          Choisir Cecilia{" "}
        </a>
      </div>
    </div>
  );
};

export default Chemin;
