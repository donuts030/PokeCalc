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
    let moves1;
    let moves2;
    
    if (props.pokeMoves1 === null) {
        console.log("data not gotten");
    }
    else{
        moves1 = props.pokeMoves1.map((moveData, index) => {
            return (
            <p key={index}>Move {index + 1} : {moveData.name} </p>
            );
        })
    }

    if (props.pokeMoves2 === null) {
        console.log("data not gotten");
    }
    else{
        moves2 = props.pokeMoves2.map((moveData, index) => {
            return (
            <p key={index}>Move {index + 1} : {moveData.name} </p>
            );
        })
    }


    return(  
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
    )
}