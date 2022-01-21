import { useState, useEffect, useRef} from "react";

export function PokeCalcInput(props) {
  return (
    <>
      <input type="text" placeholder="pokemon species"/>
      <button>Random</button>
      <button>Confirm</button>
    </>
  );
}

export function PokeCalcOutput(props) {
  let moves1;
  let moves2;
  //currently doesn't rerender after moves data gotten
  if (props.pokeMoves1 === null || props.pokeMoves2 === null) {
    console.log("data not gotten");
    return <p>loading</p>;
  }
//   useEffect(()=>{},[])
  
  moves1 = props.pokeMoves1.map((moveData, index) => {
    const damage = calculate(props.pokeData1, props.pokeData2, moveData)
    return (
      <p key={index}>
        Move {index + 1} : {moveData.name}{" "}  Damage: {damage}
      </p>
    );
  });

  moves2 = props.pokeMoves2.map((moveData, index) => {
    const damage = calculate(props.pokeData2, props.pokeData1, moveData)
    return (
      <p key={index}>
        Move {index + 1} : {moveData.name}{" "}  Damage: {damage}
      </p>
    );
  });
  console.log("this is rendering");
  

  return (
    <div className="pokeCalc">
      <div className="pokeSections">
        <p className="pokeName">pokemon1 : {props.pokeData1?.name}</p>
        <p>moves: {props.pokeData1?.moves?.[1]?.move?.name}</p>
        {moves1}
      </div>
      <div className="pokeSections">
        <p className="pokeName">pokemon2 : {props.pokeData2?.name}</p>
        <p>moves: {props.pokeData2?.moves?.[17]?.move?.name}</p>
        {moves2}
      </div>
    </div>
  );
}


function calculate(pokeData_A, pokeData_D, pokeMove) {
    let damage;
    const level = 15;
    const maxRandom = 1;
    const minRandom = 0.85;
    const random = .85;
    let moveType = {};
    let stab = 1;
    if(pokeData_D.types.find((type)=>type = pokeMove.type.name)){
      stab = 1.5;
    }

    fetch(pokeMove.type.url)
    .then((res)=>res.json())
    .then((data)=> moveType = data);



    switch (pokeMove.damage_class.name){
        case "status":
            damage = "This is a status move";
            break;
        case "special":
            damage =
            ((level * 0.4 + 2) * pokeMove.power *(pokeData_A.stats[3].base_stat / pokeData_D.stats[4].base_stat) * 0.02 + 2) * random * stab; 
            break;
        case "physical":
            damage =
            ((level * 0.4 + 2) * pokeMove.power *(pokeData_A.stats[1].base_stat / pokeData_D.stats[2].base_stat) * 0.02 + 2) * random * stab;
            break;

    }
    
    return damage;
  }