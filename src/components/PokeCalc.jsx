import { useState, useEffect } from "react";

export function PokeCalcInput(){
    return(  
    <>
        <input type="text" placeholder="pokemon species" />
        <button>Confirm</button>
    </>      
    )
}

export function PokeCalcOutput(props){
    const[pokeData2, setpokeData2] = useState({});

    useEffect(()=>{
        fetch(`https://pokeapi.co/api/v2/pokemon/${props.pokemon2}` )
        .then((res)=>res.json())
        .then((data)=>{
            setpokeData2(data);
        })
    },[props.pokemon2])

    console.log(pokeData2);


    return(  
    <>
        <div>
            <p className="pokeName">pokemon1 : {props.pokemon1}</p>
            {/* <p>abilities: {pokeData1?.abilities?.[0]?.ability?.name}</p> */}
        </div>
        <div>
            <p className="pokeName">pokemon2 : {props.pokemon2}</p>
            <p>abilities: {pokeData2?.abilities?.[0]?.ability?.name}</p>
        </div>
    </>      
    )
}