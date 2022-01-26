import { useRef } from "react";

export default function StatsInput(){
    const statNames = ["hp", "atk", "def", "spAtk", "spDef", "spd"];
    const statInput = statNames.map((statType, index)=>{
        return(
            <div className={statType} key={index + 40}>
                <p>{statType} : </p>
                <input type="number" id={statType} className="stats"/>
            </div>
        )
    });
    return(
        <div>
            <p>Input Pokemon Stats</p>
            <div className="statInput">
                {statInput}
                <button>Confirm</button>
            </div>
            
        </div>
    )
}