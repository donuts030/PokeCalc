import { LevelInput } from "./LevelInput";
import { useState } from "react";
import StatsInput from "./StatsInput";

export function PokeCalcOutput(props) {
  const [level1, setLvl1] = useState(5);
  const [level2, setLvl2] = useState(5);

  let moves1 = props.pokeData1.moves.map((moveData, moveIndex) => {
    return (
      <div className="moveInfo">
        <p key={moveIndex + 10}>
          Move {moveIndex + 1} : {moveData.move.name}
        </p>
        {damageDisplay(props.damageData1, moveIndex)}
      </div>
    );
  });

  let moves2 = props.pokeData2.moves.map((moveData, moveIndex) => {
    return (
      <div className="moveInfo">
        <p key={moveIndex + 20}>
          Move {moveIndex + 1} : {moveData.move.name}
        </p>
        {damageDisplay(props.damageData2, moveIndex)}
      </div>
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
      damageData1.push(calculate(props.pokeData1.data, props.pokeData2.data, specMoveData1[i], level1, level2));
      damageData2.push(calculate(props.pokeData2.data, props.pokeData1.data, specMoveData2[i], level2, level1));
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
      <div className="movesDisplay">
        <div className="movesSections">
          <div className="pokeInfo">
            <div className="pokeImg">
              <img src={props.pokeData1?.data?.sprites?.front_default} />
            </div>
            <div className="infoText">
              <p className="pokeName">pokemon1 : {props.pokeData1?.data?.name}</p>
              <LevelInput index={1} setLvl={setLvl1}/>
              <p className="pokeLvl">Level : {level1}</p>
              <StatsInput/>
            </div>
          </div>
          {moves1}
        </div>
        <div className="movesSections">
          <div className="pokeInfo">
            <div className="pokeImg">
              <img className="infoImg" src={props.pokeData2?.data?.sprites?.front_default} />
            </div>
            <div className="infoText">
              <p className="pokeName">pokemon2 : {props.pokeData2?.data?.name}</p>
              <LevelInput index={1} setLvl={setLvl2}/>
              <p className="pokeLvl">Level : {level2}</p>
              <StatsInput/>
            </div>
          </div>
          
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
    return null;
  }


  if(typeof damageData[index].maxDmg === "string"){
    return(
      <div key={index+4} className="damageInfo">
        <p key={index+4} className="damage">
          Damage: {damageData[index].maxDmg}
        </p>
        <p key={index+4} className="damage">
          Effect: {damageData[index].effect}
        </p>
      </div>
    )
  }
  else{
    return(
      <div key={index+4} className="damageInfo">
        <p className="damage">
          Max Damage: {damageData[index].maxDmg} 
        </p>
        <p className="damage">
          Min Damage: {damageData[index].minDmg}
        </p>
        <p className="damage">
          Effect: {damageData[index].effect}
        </p>
      </div>
              
              
    )
  }
}


function calculate(pokeData_A, pokeData_D, pokeMove, level_A, level_D) {
  let dmgMax;
  let dmgMin;
  const maxRandom = 1;
  const minRandom = 0.85;
  
  let stab = 1;
  if (pokeData_D.types.find((type) => (type = pokeMove.movedata.type.name))) {
    stab = 1.5;
  }
  const typeMult = findTypeMult(pokeData_D.types[0].type.name, pokeMove.movetype.damage_relations);

  switch (pokeMove.movedata.damage_class.name) {
    case "status":
      dmgMax = "This is a status move."
      break;
    case "special":
      const specialAtk_A = (pokeData_A.stats[3].base_stat * 2)* level_A * 0.01 + 5;
      const specialDef_D = (pokeData_D.stats[4].base_stat * 2)* level_D * 0.01 + 5;
      dmgMax = Math.floor(
        ((level_A * 0.4 + 2) *
          pokeMove.movedata.power *
          (specialAtk_A / specialDef_D) *
          0.02 +
          2) *
        maxRandom *
        stab *
        typeMult
        );

      dmgMin = Math.floor(
        ((level_A * 0.4 + 2) *
          pokeMove.movedata.power *
          (specialAtk_A / specialDef_D) *
          0.02 +
          2) *
        minRandom *
        stab *
        typeMult
        );
      break;
    case "physical":
      const phyAtk_A = (pokeData_A.stats[1].base_stat * 2) * level_A * 0.01 + 5;
      const phyDef_D = (pokeData_D.stats[2].base_stat * 2) * level_D * 0.01 + 5;
      dmgMax = Math.floor(
        ((level_A * 0.4 + 2) *
          pokeMove.movedata.power *
          (phyAtk_A / phyDef_D) *
          0.02 +
          2) *
        maxRandom *
        stab *
        typeMult
        );
      
      dmgMin = Math.floor(
        ((level_A * 0.4 + 2) *
          pokeMove.movedata.power *
          (phyAtk_A / phyDef_D) *
          0.02 +
          2) *
        minRandom *
        stab *
        typeMult
        );
      break;
  }

  const damage = {
    maxDmg: dmgMax, 
    minDmg: dmgMin, 
    effect: pokeMove.movedata.effect_entries[0].short_effect
  };

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
