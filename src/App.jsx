import { useState } from "react";
import "./App.css";
import {Route, Routes, Link} from "react-router-dom"
import { PokeCalcInput, PokeCalcOutput } from "./components/PokeCalc";
import Home from "./components/Home";
//import {Gen1} from "./pokedex";

export default function App() {

  const [pokemon1, setPoke1] = useState("ditto");
  const [pokemon2, setPoke2] = useState("pikachu");


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
  //damage calculations: damage = (((level*2/5+2)*power*attack/defense)/50+2)

  return (
    <div className="App">
      <nav>
        <Link to="/">
          <h1>Home</h1>
        </Link>
        <Link to="/pokeCalc">
          <h1>Pokemon Calculator</h1>
        </Link>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/pokeCalc" element={<PokeCalcInput setPoke1={setPoke1} setPoke2={setPoke2}/>} />
        </Routes>
        <PokeCalcOutput pokemon1={pokemon1} pokemon2={pokemon2}/>
      </main>
{/*       <header className="App-header">
        <PokeCalcInput/>
        <PokeCalcOutput pokemon1={pokemon1} pokemon2={pokemon2}/>
      </header> */}


    </div>
  );
}
