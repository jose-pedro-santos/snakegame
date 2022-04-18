import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import './App.css';
import Start from "./components/Start.js"
// import Menu from "./components/MenuAlex.js"
import Menu from "./components/Menu.js"
import { SnakeNoBorder } from "./components/Borderless.js"
import { SnakeBorder } from "./components/Border.js"
import { SnakeMap3 } from "./components/BorderlessObs.js"
import { SnakeMapBorder } from "./components/BorderObs.js"
import { Borderless } from "./components/Borderless2"
import { Border } from "./components/Border2"
import { BorderlessObs } from "./components/BorderlessObs2"
import { BorderObs } from "./components/BorderObs2"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/home" element={<Menu />} />
        {/* <Route path="/play1" element={< SnakeNoBorder />} /> */}
        <Route path="/play1" element={< Borderless />} />
        {/* <Route path="/play2" element={< SnakeBorder />} /> */}
        <Route path="/play2" element={< Border />} />
        {/* <Route path="/play3" element={< SnakeMap3 />} /> */}
        <Route path="/play3" element={< BorderlessObs />} />
        {/* <Route path="/play4" element={< SnakeMapBorder />} /> */}
        <Route path="/play4" element={< BorderObs />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;