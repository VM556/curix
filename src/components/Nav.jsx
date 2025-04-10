import React from "react";

export default function Nav() {
  return (
    <nav className="bg-gray-400 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">Curix</div>
        <div className="hidden md:flex space-x-4">
          <a href="/" className="text-black hover:text-gray-600">
            Home
          </a>
          <a href="/about" className="text-black hover:text-gray-600">
            About
          </a>
        </div>
        <div className="md:hidden">
          <button className="text-gray-300 hover:text-white focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
