import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Questions from "./components/Questions";
import Results from "./components/Results";
import Footer from "./components/Footer";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/results" element={<Results />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
