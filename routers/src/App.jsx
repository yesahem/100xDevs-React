import { useState, lazy, Suspense } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
// import Landing from '../components/Landing'
// import Dashboard from '../components/DashBoard'
// import Home from '../components/Home'
// Lazy Loading importing 
const Landing = lazy(() => import('../components/Landing'))
const Dashboard = lazy(() => import('../components/DashBoard'))
const Home = lazy(() => import('../components/Home'))
function App() {
  const [count, setCount] = useState(0)
  return (<>
    <BrowserRouter>
      <NavigationBar /> {/* Note: For useNavigate hook to tbe used it must be passed only under BrowserRouter else it will not work, that's why we have to wrap it in a seperate component and then call the component inside BrowserRouter */}

      <Routes>
        <Route path="/" element={<Suspense fallback={"Please Wait...."}><Home /></Suspense>} />
        <Route path="/Dashboard" element={<Suspense fallback={"Please Wait.."}><Dashboard /></Suspense>} />
        <Route path="/Landing" element={<Suspense fallback={"Please Wait"}><Landing /></Suspense>} />
      </Routes>
    </BrowserRouter>
  </>
  )
}

function NavigationBar() {

  const Navigate = useNavigate()
  return <div>
    <button onClick={() => {
      Navigate("/")
    }}>
      Home </button>
    <button onClick={() => {
      Navigate("/Landing")
    }}>
      Landing Page</button>
    <button onClick={() => {
      Navigate("/DashBoard")
    }}>
      DashBoard </button>

  </div>
}
export default App
