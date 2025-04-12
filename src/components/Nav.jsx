import React from "react";

export default function Nav() {
  return (
    <nav className="bg-gray-200 py-1">
      <div className="container mx-auto flex justify-center items-center">
        <div className="text-3xl font-bold">
          Cur<i className="italic">i</i>x
        </div>
        {/* <div className="md:hidden">
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
        </div> */}
      </div>
    </nav>
  );
}
