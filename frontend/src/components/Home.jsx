import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-[url(/bg.jpg)] bg-gray-600 bg-cover bg-blend-overlay">
      <div className="relative text-center text-white px-8 md:px-14 mt-20">
        <h1 className="text-5xl md:text-6xl font-light leading-tight font-[IBM-Plex-Serif]">
          <span className="font-[300]">AI-Powered</span> <br />
          <span className="text-black">Ayurvedic Diet Planner</span>
        </h1>
        <p className="mt-4 text-2xl font-light max-w-2xl mx-auto">
          Personalized meal plans based on ancient Ayurveda & modern AI to
          balance your <span className="text-green-300 font-medium">dosha </span>
          and optimize your health.
        </p>
        <button
          onClick={() => navigate("/questions")}
          className="mt-6 btn bg-green-700 hover:bg-green-600 text-white px-6 py-3 rounded-full text-lg transition-transform transform hover:scale-105"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Hero;
