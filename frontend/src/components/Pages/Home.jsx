import React from "react";
import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <main className="home-container">
        <h1>Welcome to the Placement Prep Portal</h1>
        <p>Start preparing for your dream job with our resources!</p>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
