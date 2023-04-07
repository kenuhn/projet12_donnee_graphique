import React from "react";
import { Routes, Route} from 'react-router-dom' 
import Header from "./component/header/header";
import Aside from "./component/aside/aside"
import Acceuil from "./pages/Acceuil";
import Chemin from "./pages/Chemin";
 function App () {

    return (
    <div className="App">
      <Header />
        <Routes>
            <Route path="/:id" element={ <Acceuil /> } />
            <Route path="/" element={ <Chemin /> }/>
        </Routes>
      <Aside />
    </div>
  );

}

export default App;
