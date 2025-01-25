import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import HouseListing from "./pages/HouseListing/HouseListing";
import HouseDetail from "./pages/HouseDetail/HouseDetail";
import Payment from "./pages/Payment/Payment";
import Profile from "./pages/Profile/Profile";
import { UserProvider } from "./contexts/UserContext";
import { PaymentProvider } from "./contexts/PaymentContext";
import { FilterProvider } from "./contexts/FilterContext";
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <UserProvider>
      <PaymentProvider>
        <FilterProvider>
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
              </Route>
              <Route path="profile/" element={<Layout />}> 
                <Route index element={<Profile />} />
              </Route>
            </Routes>
            <Analytics />
          </Router>
        </FilterProvider>
      </PaymentProvider>
    </UserProvider>
   
  );
}

export default App;
