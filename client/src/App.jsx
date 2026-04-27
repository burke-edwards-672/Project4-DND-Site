import { BrowserRouter, Routes, Route} from 'react-router-dom'

import Selection from "./pages/selection";
import Dashboard from "./pages/dashboard";
import Players from "./pages/players";
import Npcs from "./pages/npcs";
import Entrance from "./pages/entrance";

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
