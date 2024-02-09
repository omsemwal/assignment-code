

import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { Route, Routes } from "react-router-dom";
import MakePayment from "./pages/MakePayment";
import PaymentDetails from "./pages/PaymentDetails";

function App() {
  const [userDetails, setUserDetails] = useState("");

  return (
    <>
      <Routes>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<SignIn setUserDetails={setUserDetails} />} />
        <Route path='/make-payment' element={<MakePayment userDetails={userDetails} />} />
        <Route path="/payment/:email" element={<PaymentDetails userDetails={userDetails} />} /> {/* Provide the PaymentDetails component */}
      </Routes>
    </>
  );
}

export default App;
