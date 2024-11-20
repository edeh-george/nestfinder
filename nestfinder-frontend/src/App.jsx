import { useState } from "react";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import HouseListing from "./pages/HouseListing/HouseListing";
import HouseDetail from "./pages/HouseDetail/HouseDetail";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/houses" element={<HouseListing />} />
        <Route path="/houses/:apartmentId" element={<HouseDetail />} />
      </Routes>
    </Router>
    // <HouseDetail/>
  );
}

export default App;
