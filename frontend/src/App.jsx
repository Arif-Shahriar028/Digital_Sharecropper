import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";
import Request from "./pages/Request";
import Appointment from "./pages/Appointment";

const App = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/request" element={<Request />} />
        <Route path="/appointment" element={<Appointment />} />
      </Routes>
      <Footer />
    </React.Fragment>
  );
};

export default App;
