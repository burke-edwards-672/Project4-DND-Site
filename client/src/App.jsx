import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { useState, useEffect } from 'react';
import { UserContext } from './context/UserContext';

import Selection from "./pages/selection";
import Dashboard from "./pages/dashboard";
import Players from "./pages/players";
import Npcs from "./pages/npcs";
import Entrance from "./pages/entrance";

function App() {

  const [userId, setUser] = useState(3);

  return (
    <BrowserRouter>
      <UserContext value={userId}>
        <Routes>
          <Route path="/" element={<Selection userSetter={setUser}/>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/players" element={<Players />} />
          <Route path="/npcs" element={<Npcs />} />
          <Route path="*" element={<Entrance />} />
        </Routes>
      </UserContext>
    </BrowserRouter>
  )
}

export default App
