import React from "react";

const Navbar = ({ setToken }) => {
  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <p
        className="w-3 text-[#f472b6] text-3xl sm:text-xl font-semibold cursor-pointer"
        onClick={() => navigate("/")}
      >
        GALLERY
      </p>
      <button
        className="bg-teal-500 text-white px-5 py-2 sm:px-7 rounded-full text-xs sm:text-xs"
        onClick={() => setToken("")}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
