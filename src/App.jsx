import { useState, useEffect } from "react";
import "./App.css";
import { Route, Routes, Link } from "react-router-dom";
import { PokeCalcInput, PokeCalcOutput } from "./components/PokeCalc";
import Home from "./components/Home";

//for document: pokemon 1 is attacking, pokemon 2 is defending

export default function App() {
  const [pokemon1, setPoke1] = useState("magikarp");
  const [pokemon2, setPoke2] = useState("pikachu");

  const [pokeData1, setpokeData1] = useState({});
  const [pokeData2, setpokeData2] = useState({});

  // const [pokeMoves1, setMoves1] = useState({});
  // const [pokeMoves2, setMoves2] = useState({});

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

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon1}`)
      .then((res) => res.json())
      .then((data) => {
        setpokeData1(data);
      });
  }, [pokemon1]);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon2}`)
      .then((res) => res.json())
      .then((data) => {
        setpokeData2(data);
      });
  }, [pokemon2]);

  console.log(pokeData1);
  const pokeMoves1 = randomMoves(pokeData1);
  const pokeMoves2 = randomMoves(pokeData2);

  //calculate(pokeData1, pokeData2);

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
          <Route path="/" element={<Home />} />
          <Route
            path="/pokeCalc"
            element={<PokeCalcInput setPoke1={setPoke1} setPoke2={setPoke2} />}
          />
        </Routes>
        <PokeCalcOutput pokeData1={pokeData1} pokeData2={pokeData2} pokeMoves1={pokeMoves1} pokeMoves2={pokeMoves2}/>
      </main>
      {/*       <header className="App-header">
        <PokeCalcInput/>
        <PokeCalcOutput pokemon1={pokemon1} pokemon2={pokemon2}/>
      </header> */}
    </div>
  );
}

function calculate(pokeData1, pokeData2, pokeMove) {
  const level = 5;
  const damage =
    (level * 0.4 + 2) *
      /* pokeMove.power */ 40 *
      (pokeData1?.stats?.[1]?.base_stat / pokeData2?.stats?.[2]?.base_stat) *
      0.02 +
    2;
  //console.log(damage);
}

function randomMoves(pokeData) {
  let randomNum;
  const tempArr = [];
  const moveData = [];

  if (Object.keys(pokeData).length === 0) {
    console.log("data not gotten");
    return null;
  }

  while (tempArr.length < 4) {
    randomNum = Math.floor(Math.random() * pokeData.moves.length);

    if (tempArr.includes(randomNum) === false && randomNum >= 0) {
      tempArr.push(randomNum);
      console.log(tempArr);
    }
  }

  for (let i = 0; i < tempArr.length; i++) {
    fetch(pokeData.moves[tempArr[i]].move.url)
      .then((res) => res.json())
      .then((data) => {
        moveData[i] = data;
      });
  }
  return moveData;
}
