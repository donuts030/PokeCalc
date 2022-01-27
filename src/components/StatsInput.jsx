import { useState, useRef } from "react";

export default function StatsInput(props){
    const hpRef = useRef(0);
    const atkRef = useRef("");
    const defRef = useRef("");
    const spAtkRef = useRef("");
    const spDefRef = useRef("");
    const spdRef = useRef("");
    const statRefs = [hpRef, atkRef, defRef, spAtkRef, spDefRef, spdRef]
    const [confirmed, setConfirm]= useState(false) 
    const stats = props.pokeBaseStats;

    if (props.pokeBaseStats === null){
        return null;
    }
    
    const confirmStat = (confirm) => {
        console.log(props.pokeBaseStats.hp)
        stats.hp = (hpRef.current.value === "")?props.pokeBaseStats.hp:hpRef.current.value;
        stats.atk = (atkRef.current.value === "")?props.pokeBaseStats.atk:atkRef.current.value;
        stats.def = (defRef.current.value === "")?props.pokeBaseStats.def:defRef.current.value;
        stats.spAtk = (spAtkRef.current.value === "")?props.pokeBaseStats.spAtk:spAtkRef.current.value;
        stats.spDef = (spDefRef.current.value === "")?props.pokeBaseStats.spDef:spDefRef.current.value;
        stats.spd = (spdRef.current.value == "")?props.pokeBaseStats.spd:spdRef.current.value;
        props.setStats(stats)
        setConfirm(confirm);
    }

    const unConfirmStat = () =>{
        setConfirm(false);
    }

    function StatDisplay(props){
        const statNames = [["hp", props.statRefs[0]], ["atk", props.statRefs[1]], ["def", props.statRefs[2]], ["spAtk", props.statRefs[3]], ["spDef", props.statRefs[4]], ["spd", props.statRefs[5]]];
        const statInput = statNames.map((statType, index)=>{
            return(
                <div className={statType[0]} key={index + 90}>
                    <p>{statType[0]} : </p>
                    <input type="number" id={statType[0]} className="stats" ref={statType[1]}/>
                </div>
            )
        });
        const confirmedStats = statNames.map((statType, index)=>{
            return(
                <div className={statType[0]} key={index + 100}>
                    <p>{statType[0]} : </p>
                    <p>{props.currStats[statType[0]]}</p>
                </div>
            )}
        )
        if(confirmed){
            return(
                <>
                    {confirmedStats}
                </> 
            )
        }
        else if(!confirmed){
            return(
                <>
                    {statInput}
                </>
            )
        }
    }

    return(
        <div>
            <p>Input Pokemon Stats</p>
            <div className="statInput">
                <StatDisplay currStats={stats} statRefs={statRefs}/>
                <button onClick={()=>confirmStat(true)}>Confirm</button>
                <button onClick={unConfirmStat}>Change Stats</button>
            </div>
            
        </div>
    )
}