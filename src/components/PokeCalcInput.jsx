import { useRef } from "react";

export function PokeCalcInput(props) {
  const pokeRef1 = useRef("");
  const pokeRef2 = useRef("");

  // Onclick handle function
  const handleSubmit = () => {
    const inputName1 = pokeRef1.current.value.toLowerCase();
    const inputName2 = pokeRef2.current.value.toLowerCase();
    if(inputName1 === "" && inputName2 === ""){
      console.log("nothing")
      return;
    }

    if (inputName1 !== ""){
      props.setPoke1(inputName1);
      getData(inputName1, props.setData1)
    }

    if (inputName2 !== ""){
      props.setPoke2(inputName2);
      getData(inputName2, props.setData2)
    }

  }

  return (
    <div className="pokeCalc">
      <h3>Input Pokemon Name:</h3>
      <div className="pokeSearch">
        <input type="text" placeholder="pokemon species 1" ref={pokeRef1} />
        <input type="text" placeholder="pokemon species 2" ref={pokeRef2} />
        <button>Random</button>
        <button onClick={handleSubmit}>Confirm</button>
      </div>
    </div>
  );
}

function getData(inputName, setData){
  fetch(`https://pokeapi.co/api/v2/pokemon/${inputName}`)
  .then((res) => res.json())
  .then((data) => {
    setData({
      moves: randomMoves(data),
      data: data
    });
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
  

