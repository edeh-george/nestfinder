import { useState } from 'react'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'

const App = () => {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Signup/>
      </div>
    </>
  )
}

export default App
