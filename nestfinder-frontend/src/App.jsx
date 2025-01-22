import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import HouseListing from "./pages/HouseListing/HouseListing";
import HouseDetail from "./pages/HouseDetail/HouseDetail";
import Payment from "./pages/Payment/Payment";
import { UserProvider } from "./contexts/UserContext";

function App() {
  return (
    <UserProvider>
       <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/houses" element={<Layout />}>
            <Route index element={<HouseListing />} />
            <Route path=":apartmentId" element={<HouseDetail />} />
          </Route>

          <Route path="/payment" element={<Layout />}>
            <Route index element={<Payment />} />
            {/* <Route path="verify/" element={<HouseDetail />} /> */}
          </Route>

        </Routes>
      </Router>
    </UserProvider>
   
  );
}

export default App;
