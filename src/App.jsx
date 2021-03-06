import { useState, useEffect, useRef } from "react";
import "./App.css";
import { Route, Routes, Link } from "react-router-dom";
import { PokeCalcInput } from "./components/PokeCalcInput";
import { PokeCalcOutput } from "./components/PokeCalcOutput";
import Home from "./components/Home";

//for document: pokemon 1 is attacking, pokemon 2 is defending

export default function App() {
  //const gen1Data;
  const [pokemon1, setPoke1] = useState(null);
  const [pokeData1, setData1] = useState({moves: [], data: {}});
  const [pokemon2, setPoke2] = useState(null);
  const [pokeData2, setData2] = useState({moves: [], data: {}});
  const [specMovesData1, setMovesData1] = useState([]);
  const [specMovesData2, setMovesData2] = useState([]);
  const [damageData1, setDamage1] = useState([]);
  const [damageData2, setDamage2] = useState([]);
  const [stats1, setStat1] = useState(null);
  const [stats2, setStat2] = useState(null);
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
                <PokeCalcInput 
                  setPoke1={setPoke1} 
                  setData1={setData1} 
                  setPoke2={setPoke2} 
                  setData2={setData2}
                  setStat1={setStat1}
                  setStat2={setStat2}/> 
                <PokeCalcOutput 
                  pokemon1={pokemon1}
                  pokeData1={pokeData1} 
                  pokeData2={pokeData2} 
                  pokeMoves1={pokeMoves1} 
                  pokeMoves2={pokeMoves2}
                  setMovesData1={setMovesData1}
                  setMovesData2={setMovesData2}
                  setDamage1={setDamage1}
                  setDamage2={setDamage2}
                  damageData1={damageData1}
                  damageData2={damageData2}
                  setStat1={setStat1}
                  setStat2={setStat2}
                  stats1={stats1}
                  stats2={stats2}
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
