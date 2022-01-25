import { useRef } from "react"

export function LevelInput(props){
    const lvlRef = useRef(15);
    const clickHandler = () => {
        console.log(lvlRef.current.value);
        props.setLvl(lvlRef.current.value)
    }
    return(
        <div className="lvlInput" id={props.index} >
            <p>Input Level:</p>
            <input  type="number" min="0" max="100" ref={lvlRef}></input>
            <button onClick={clickHandler}>Confirm</button>
        </div>
    )
}