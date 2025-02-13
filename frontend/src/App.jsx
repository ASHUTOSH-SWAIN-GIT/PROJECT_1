import { useState } from 'react'
import Sighnup from './pages/Sighnup'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Sighnup/>
    </>
  )
}

export default App
