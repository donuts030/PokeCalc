import { useState, useEffect } from "react";

export function PokeCalcInput(){

    return(  
    <>
        <input type="text" placeholder="pokemon species" />
        <button>Random</button>
        <button>Confirm</button> 
    </>      
    )
}

export function PokeCalcOutput(props){

    return(  
    <div className="pokeCalc">
        <div className="pokeSections">
            <p className="pokeName">pokemon1 : {props.pokeData1?.name}</p>
            <p>moves: {props.pokeData1?.moves?.[1]?.move?.name}</p>
        </div>
        <div className="pokeSections">
            <p className="pokeName">pokemon2 : {props.pokeData2?.name}</p>
            <p>moves: {props.pokeData2?.moves?.[17]?.move?.name}</p>
        </div>
    </div>      
    )
}