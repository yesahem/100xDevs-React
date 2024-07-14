import { useContext, useState } from "react"
import { CountContext } from "./Context";

function App() {
  const [count, setCount] = useState(0);

  // wrap anyone that wants to use the teleported value inside the provider;
  // Generally creating the context part (Here in file name "Context.jsx" ) must be exported / defined in a sepearate file for better code readability
  return (
    <div>
      <CountContext.Provider value={{ count, setCount }}> {/* This "count" value which is being passed in the value and can be accessed using useContext */}
        <Count />
      </CountContext.Provider>
    </div >
  )
}

function Count() {
  return <div>
    <CountRenderer />
    <Buttons />
  </div>
}

function CountRenderer() {
  const { count } = useContext(CountContext); {/* The value "count" is used directly here using the useContext */ }
  return <div>
    {count}
  </div>
}

function Buttons() {
  const { count, setCount } = useContext(CountContext)
  return <div>
    <button onClick={() => {
      setCount(count + 1)
    }}>Increase</button>

    <button onClick={() => {
      setCount(count - 1)
    }}>Decrease</button>
  </div>
}

export default App
