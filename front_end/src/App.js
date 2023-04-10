import React from "react";
import { Routes, Route} from 'react-router-dom' 
import Header from "./component/header/header";
import Aside from "./component/aside/aside"
import Acceuil from "./pages/Acceuil";
import Chemin from "./pages/Chemin";
import NotFound from "./pages/notFound";
 function App () {

    return (
    <div className="App">
      <Header />
        <Routes>
            <Route path="/:id" element={ <Acceuil /> } />
            <Route path="/" element={ <Chemin /> }/>
            <Route path="*" element={<NotFound />} />
        </Routes>
      <Aside />
    </div>
  );

}

export default App;
