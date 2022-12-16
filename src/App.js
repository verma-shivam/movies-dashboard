import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Summary from "./pages/Summary";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/summary/:id" element={<Summary />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
