import { BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Selection />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/players" element={<Players />} />
        <Route path="/npcs" element={<Npcs />} />
        <Route path="*" element={<Entrance />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
