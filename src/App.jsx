import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  fetch( "https://pokeapi.co/api/v2/pokemon/ditto")
  .then((res)=>res.json())
  .then((data)=>console.log(data));

  //damage calculations: damage = (((level*2/5+2)*power*attack/defense)/50+2)

  return (
    <div className="App">
      <header className="App-header">
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
      </header>
    </div>
  )
}

export default App
