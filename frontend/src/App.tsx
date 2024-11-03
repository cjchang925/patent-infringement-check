import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Search from "./components/Search";
import Result from "./components/Result";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
