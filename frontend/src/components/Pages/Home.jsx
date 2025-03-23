import React from "react";
import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";
import "./Home.css"; // Import the updated CSS file

const Home = () => {
  return (
    <div>
            <Navbar />

      <main className="home-container">
        <div className="hero-section">
          <h1>Welcome to the Job RaShPi</h1>
          <p>Start preparing for your dream job with our resources!</p>
          {/* <button className="cta-button">Get Started</button> */}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
