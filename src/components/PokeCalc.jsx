import { useRef } from "react";

export function PokeCalcInput(props) {
  const pokeRef1 = useRef("");

  // Onclick handle function
  const handleSubmit = () => {
    const inputName1 = pokeRef1.current.value;
    props.setPoke1(inputName1);

    fetch(`https://pokeapi.co/api/v2/pokemon/${inputName1}`)
      .then((res) => res.json())
      .then((data) => {
        props.setData1({
          moves: randomMoves(data),
          data: data
        });
      });
  }

  return (
    <>
      <input type="text" placeholder="pokemon species" ref={pokeRef1} />
      <button>Random</button>
      <button onClick={handleSubmit}>Confirm</button>
    </>
  );
}

function randomMoves(pokeData) {
    let randomNum;
    const tempArr = [];
    const moveData = [];
  
    if (Object.keys(pokeData).length === 0 ) {
      console.log("data not gotten at moves");
      return [];
    }
  
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
  

export function PokeCalcOutput(props) {
  let moves1 = props.pokeData1.moves.map((moveData, index) => {
    console.log(moveData);
    //const damage = calculate(props.pokeData1, props.pokeData2, moveData);
    return (
      <p key={index}>
        Move {index + 1} : {moveData.move.name}
      </p>
    );
  });

  let moves2;

  return (
    <div className="pokeCalc">
      <div className="pokeSections">
        <p className="pokeName">pokemon1 : {props.pokemon1}</p>
        {moves1}
      </div>
      <div className="pokeSections">
        <p className="pokeName">pokemon2 : {props.pokeData2?.name}</p>
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
  const random = 0.85;
  let moveType = {};
  let stab = 1;
  if (pokeData_D.types.find((type) => (type = pokeMove.type.name))) {
    stab = 1.5;
  }

  fetch(pokeMove.type.url)
    .then((res) => res.json())
    .then((data) => (moveType = data));

  switch (pokeMove.damage_class.name) {
    case "status":
      damage = "This is a status move";
      break;
    case "special":
      damage =
        ((level * 0.4 + 2) *
          pokeMove.power *
          (pokeData_A.stats[3].base_stat / pokeData_D.stats[4].base_stat) *
          0.02 +
          2) *
        random *
        stab;
      break;
    case "physical":
      damage =
        ((level * 0.4 + 2) *
          pokeMove.power *
          (pokeData_A.stats[1].base_stat / pokeData_D.stats[2].base_stat) *
          0.02 +
          2) *
        random *
        stab;
      break;
  }

  return damage;
}
