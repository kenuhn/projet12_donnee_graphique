import React from "react";
const aside = () => {
  console.log(`${process.env.REACT_APP_ADRESSE}/front_end/src/images/dumbbell-icon.svg`)
  return (
    <aside className="aside">
      <div className="aside_contenant">
        <a className="item1" href="/#gauge">
          {" "}
          <img
            alt="swimming_pool"
            src= {`${process.env.REACT_APP_ADRESSE}/front_end/src/images/yoga-icon.svg`}
          />
        </a>
        <a className="item2" href="/#radar">
          <img   
            alt="swimming_pool"
            src={`${process.env.REACT_APP_ADRESSE}/front_end/src/images/swimming-icon.svg`}
          />
        </a>
        <a className="item3" href="/#bar">
          {" "}
          <img
            alt="swimming_pool"
            src={`${process.env.REACT_APP_ADRESSE}/front_end/src/images/bike-icon.svg`}
          />
        </a>
        <a className="item4" href="/#line">
          {" "}
          <img
            alt="swimming_pool"
            src={`${process.env.REACT_APP_ADRESSE}/front_end/src/images/dumbbell-icon.svg`}
          />
        </a>
      </div>

      <small className="vertical-text">@Copyright SportSee 2020</small>
    </aside>
  );
};

export default aside;
