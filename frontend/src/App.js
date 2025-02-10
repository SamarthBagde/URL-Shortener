import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RedirectUrl from "./pages/RedirectUrl";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:shortId" element={<RedirectUrl />} />
      </Routes>
    </Router>
  );
}

export default App;
