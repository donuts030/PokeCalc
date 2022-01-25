import { useRef } from "react";

export default function StatsInput(){
    const statNames = ["hp", "atk", "def", "spAtk", "spDef", "spd"];
    const statInput = statNames.map((statType, index)=>{
        return(
            <div className="stats">
                <p>{statType} : </p>
                <input type="number" id={statType}/>
            </div>
        )
    });
    return(
        <div>
            <h3>Input Pokemon Stats</h3>
            <div className="statInput">
                {statInput}
            </div>
        </div>
    )
}