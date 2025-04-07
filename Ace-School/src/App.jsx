import { useState } from "react";
import {Route , Routes} from "react-router"
import { Button } from "./components/Atoms/button";
import Applayout from "./components/Templates/Applayout";
import HomePage from "./components/Organisms/HomePage";
function App() {


  return (
    
    <Routes>
        <Route path="/" element={<Applayout />}>
        <Route index element={<HomePage/>} />
        </Route>
      </Routes>
     
  );
}

export default App;
