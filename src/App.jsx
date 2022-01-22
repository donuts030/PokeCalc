import { useState, useEffect, useRef } from "react";
import "./App.css";
import { Route, Routes, Link } from "react-router-dom";
import { PokeCalcInput, PokeCalcOutput } from "./components/PokeCalc";
import Home from "./components/Home";

//for document: pokemon 1 is attacking, pokemon 2 is defending

export default function App() {
  //const gen1Data;
  const [pokemon1, setPoke1] = useState(null);
  const [pokeData1, setData1] = useState({moves: [], data: {}});
  const [pokemon2, setPoke2] = useState(null);
  const [pokeData2, setData2] = useState({moves: [], data: {}});
  let pokeMoves1 = [];
  let pokeMoves2 = [];

  return (
    <div className="App">
      <nav>
        <Link to="/">
          <h1>Home</h1>
        </Link>
        <Link to="/pokeCalc/">
          <h1>Pokemon Calculator</h1>
        </Link>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/pokeCalc/"
            element={
              <>
                <PokeCalcInput setPoke1={setPoke1} setData1={setData1} setPoke2={setPoke2} setData2={setData2}/> 
                <PokeCalcOutput 
                  pokemon1={pokemon1}
                  pokeData1={pokeData1} 
                  pokeData2={pokeData2} 
                  pokeMoves1={pokeMoves1} 
                  pokeMoves2={pokeMoves2}
                />
              </>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

  /* const pokeCache = caches.open("poke-cache"); */
  /*   pokeCache.then((cache) => {
    return cache.addAll(["./generation/1/","https://pokeapi.co/api/v2/generation/2/"]);
  }); */

  //pokeCache.put("https://pokeapi.co/api/v2/generation/1/")

  /*   fetch("https://pokeapi.co/api/v2/pokemon/ditto")
    .then((res) => {res.json(); cache.put("./generation/1/",res)})
    .then((data) => console.log(data));
   */

  //caches.delete("poke-cache");

  //console.log(pokeCache.match("./generation/1/"));
