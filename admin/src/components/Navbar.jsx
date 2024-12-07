import React from "react";

const Navbar = ({ setToken }) => {
  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <div className="flex items-center">
        {/* GALLERY Text */}
        <p
          className="text-teal-600 text-4xl sm:text-xl font-semibold cursor-pointer"
          onClick={() => navigate("/")}
        >
          GALLERY
        </p>
        {/* Admin Label */}
        <span className="ml-2 px-2 py-1 text-xs sm:text-sm bg-yellow-400 text-black rounded-lg font-medium">
          Admin
        </span>
      </div>

      <button
        className="bg-yellow-400 text-black px-4 py-4 sm:px-7 text-2xl sm:text-xs font-bold transition-transform duration-300 hover:scale-105"
        onClick={() => setToken("")}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
