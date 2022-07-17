import "./App.css";
import Homepage from "./pages/Homepage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import Favorites from "./pages/Favorites";

function App() {
  return (
    <Router>
      <main className="App">
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/login" element={<Signin />} />
          <Route exact path="/viewList" element={<Favorites />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
