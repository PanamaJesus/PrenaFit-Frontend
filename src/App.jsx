import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css' // <== IMPORTANTE


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
  <h1 className="text-5xl font-extrabold text-indigo-600 mb-4">Hola Tailwind</h1>
  <p className="text-gray-700 mb-6">Ya estás usando Tailwind CSS con Vite + React 🎉</p>
  <button
    onClick={() => setCount(count + 1)}
    className="px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-all"
  >
    count is {count}
  </button>
</div>

    </>
  )
}

export default App
