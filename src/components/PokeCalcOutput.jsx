import { LevelInput } from "./LevelInput";
import { useState } from "react";

export function PokeCalcOutput(props) {
  const [level1, setLvl1] = useState(5);
  const [level2, setLvl2] = useState(5);

  let moves1 = props.pokeData1.moves.map((moveData, moveIndex) => {
    return (
      <>
        <p key={moveIndex}>
          Move {moveIndex + 1} : {moveData.move.name}
        </p>
        {damageDisplay(props.damageData1, moveIndex)}
      </>
    );
  });

  let moves2 = props.pokeData2.moves.map((moveData, moveIndex) => {
    return (
      <>
        <p key={moveIndex}>
          Move {moveIndex + 1} : {moveData.move.name}
        </p>
        {damageDisplay(props.damageData2, moveIndex)}
      </>
    );
  });

  const calcButtonHandler = async() =>{
    console.log("clicked");
    const specMoveData1 = await getMoveData(props.pokeData1.moves);
    const specMoveData2 = await getMoveData(props.pokeData2.moves);
    props.setMovesData1(specMoveData1);
    props.setMovesData2(specMoveData2);
    
    let damageData1 = [];
    let damageData2 = [];
    for(let i = 0; i < specMoveData1.length; i++){
      damageData1.push(calculate(props.pokeData1.data, props.pokeData2.data, specMoveData1[i], level1));
      damageData2.push(calculate(props.pokeData2.data, props.pokeData1.data, specMoveData2[i], level2));
    }
    props.setDamage1(damageData1);
    props.setDamage2(damageData2);

  }

  const calcButtonShow = () =>{
    if (props.pokeData1.moves.length > 0 && props.pokeData2.moves.length > 0){
      return (
        <button onClick={calcButtonHandler}>Calculate Damage</button>
      )
    }
    else{
      return (
        <p>One or less pokemon is selected!</p>
      )
    }
  }

  return (
    <div className="pokeCalc">
      <p>Choose Pokemon Level: (Default Level: 5)</p>
      <div className="movesDisplay">
        <div className="movesSections">
          <LevelInput index={1} setLvl={setLvl1}/>
          <p className="pokeName">pokemon1 : {props.pokeData1?.data?.name}</p>
          {moves1}
        </div>
        <div className="movesSections">
          <LevelInput index={1} setLvl={setLvl2}/>
          <p className="pokeName">pokemon2 : {props.pokeData2?.data?.name}</p>
          {moves2}
        </div>
      </div>
      {calcButtonShow()}
    </div>
  );
}

async function getMoveData(moves){
  let movesData = [];

  for(let i = 0; i < moves.length; i++){
    const res = await fetch(moves[i].move.url);
    const data = await res.json();
    movesData.push({movedata: data});
    movesData[i]["movetype"] = await getMoveType(data);
  }
/*   for(let i = 0; i < movesData.length; i++){
    movesData[i].movetype = getMoveType(movesData[i].movedata);
  } */
  return movesData;
}

async function getMoveType(movedata){
  //console.log(movedata);
  let moveType;
  const res = await fetch(movedata.type.url);
  moveType = await res.json();
  console.log("get move type: ");
  console.log(moveType);
  return moveType;
}

function damageDisplay(damageData, index){
  if(damageData.length <= 0){
    return(
      <p></p>
    );
  }
  else{
    return(
      <p key={index+4} className="damage">
        Damage: {damageData[index]}
      </p>
    )
  }
}


function calculate(pokeData_A, pokeData_D, pokeMove, level) {
  let damage;
  const maxRandom = 1;
  const minRandom = 0.85;
  const random = 1;
  
  let stab = 1;
  if (pokeData_D.types.find((type) => (type = pokeMove.movedata.type.name))) {
    stab = 1.5;
  }
  const typeMult = findTypeMult(pokeData_D.types[0].type.name, pokeMove.movetype.damage_relations);

  switch (pokeMove.movedata.damage_class.name) {
    case "status":
      damage = "This is a status move.\n Effect:" +pokeMove.movedata.flavor_text_entries[0].flavor_text;
      break;
    case "special":
      damage =
        ((level * 0.4 + 2) *
          pokeMove.movedata.power *
          (pokeData_A.stats[3].base_stat / pokeData_D.stats[4].base_stat) *
          0.02 +
          2) *
        random *
        stab *
        typeMult;
      break;
    case "physical":
      damage =
        ((level * 0.4 + 2) *
          pokeMove.movedata.power *
          (pokeData_A.stats[1].base_stat / pokeData_D.stats[2].base_stat) *
          0.02 +
          2) *
        random *
        stab *
        typeMult;
      break;
  }

  return damage;
}

function findTypeMult(pokeType_D, moveRelations){
  let typeMult = 1;
  const tempRelArr = Object.keys(moveRelations);
  tempRelArr.map((key)=>{
    if (moveRelations[key].name === pokeType_D){
      switch (key){
        case "double_damage_to":
          typeMult = 2;
          break;
        case "half_damage_to":
          typeMult = 0.5;
          break;
        case "no_damage_to":
          typeMult = 0;
          break;
      }
    }
  })
  return typeMult;
}
