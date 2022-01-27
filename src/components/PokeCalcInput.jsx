import { useRef } from "react";
import { Gen1 } from "./pokedex";

export function PokeCalcInput(props) {
  const pokeRef1 = useRef("");
  const pokeRef2 = useRef("");

  const handleRandom = () => {
    const rdmNum1 = Math.floor(Math.random() * Gen1.length);
    const rdmNum2 = Math.floor(Math.random() * Gen1.length);
    pokeRef1.current.value = Gen1[rdmNum1];
    pokeRef2.current.value = Gen1[rdmNum2];
  }

  // Onclick handle function
  const handleSubmit = () => {
    const inputName1 = pokeRef1.current.value.toLowerCase().replace("'", "");
    const inputName2 = pokeRef2.current.value.toLowerCase().replace("'", "");
    if(inputName1 === "" && inputName2 === ""){
      console.log("nothing");
      return;
    }

    if (inputName1 !== ""){
      props.setPoke1(inputName1);
      getData(inputName1, props.setData1, props.setStat1);
    }

    if (inputName2 !== ""){
      props.setPoke2(inputName2);
      getData(inputName2, props.setData2, props.setStat2);
    }

  }

  return (
    <div className="pokeCalc">
      <h3>Input Pokemon Name:</h3>
      <div className="pokeSearch">
        <input type="text" placeholder="pokemon species 1" ref={pokeRef1} />
        <input type="text" placeholder="pokemon species 2" ref={pokeRef2} />
        <button onClick={handleRandom}>Random</button>
        <button onClick={handleSubmit}>Confirm</button>
      </div>
    </div>
  );
}

function getData(inputName, setData, setStats){
  fetch(`https://pokeapi.co/api/v2/pokemon/${inputName}`)
  .then((res) => res.json())
  .then((data) => {
    setData({
      moves: randomMoves(data),
      data: data
    });
    setStats({
      hp: data.stats[0].base_stat,
      atk: data.stats[1].base_stat,
      def: data.stats[2].base_stat,
      spAtk: data.stats[3].base_stat,
      spDef: data.stats[4].base_stat,
      spd: data.stats[5].base_stat,
    })
  });
}

function randomMoves(pokeData) {
    let randomNum;
    const tempArr = [];
    const moveData = [];
  
    while (tempArr.length < 4) {
      randomNum = Math.floor(Math.random() * pokeData?.moves?.length);
  
      if (tempArr.includes(randomNum) === false && randomNum >= 0) {
        tempArr.push(randomNum);
      }
    }
  
    for (let i = 0; i < tempArr.length; i++) {
      moveData[i] = pokeData.moves[tempArr[i]]
    }
    return moveData;
  }
  

