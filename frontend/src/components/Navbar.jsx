import { useState } from "react";
import { FaLeaf } from "react-icons/fa"; // Importing an Ayurveda-themed icon

export default function Navbar() {
  const [theme, setTheme] = useState("light");

  return (
    <div className="relative">
      {/* White Underline Bar */}
      <div className="absolute top-full left-0 w-full border-t border-white opacity-50"></div>

      <div className="navbar bg-green-950 px-8 py-3">
        {/* Navbar Start (Logo) */}
        <div className="navbar-start">
          <a className="flex items-center text-white text-2xl font-thin">
            <FaLeaf className="text-green-500 mr-2" /> AI-YURVEDA
          </a>
        </div>

        {/* Navbar Center (Menu Items) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-4 text-white space-x-6 text-lg">
            <li><a href="/">Home</a></li>
            <li><a href="/">About</a></li>
            <li>
              <details>
                <summary>Services</summary>
                <ul className="p-2 bg-green-800 text-white rounded-md">
                  <li><a href="/">Ayurvedic Consultation</a></li>
                  <li><a href="/">Detox & Wellness</a></li>
                </ul>
              </details>
            </li>
            <li>
              <details>
                <summary>Pages</summary>
                <ul className="p-2 bg-green-800 text-white rounded-md">
                  <li><a href="/">Blog</a></li>
                  <li><a href="/">Testimonials</a></li>
                </ul>
              </details>
            </li>
          </ul>
        </div>

        {/* Navbar End (Appointment Button) */}
        <div className="navbar-end">
          <a className="btn bg-green-500 hover:bg-green-600 text-white px-5 rounded-full">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
