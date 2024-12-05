import { useState } from "react";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import HouseListing from "./pages/HouseListing/HouseListing";
import HouseDetail from "./pages/HouseDetail/HouseDetail";
// import Header from "./components/Header/Header";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Layout from "./Layout";

function App() {
  // const location = useLocation();
  // const shouldShowHeader = !['/login', '/signup'].includes(location.pathname);

  return (
    <Router>
      

      <Routes>
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/houses" element={<Layout />}/>
          {/* <Route index element={<HouseListing />} /> */}
          <Route path="/houses/:apartmentId" element={<HouseDetail />} />
        {/* <Route/> */}
      </Routes>
    </Router>
  );
}

export default App;
