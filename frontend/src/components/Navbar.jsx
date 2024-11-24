import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  // managing mobile menu state
  const [visible, setVisible] = useState(false);

  // for navigation
  const navigate = useNavigate();

  const { setShowSearch } = useContext(ShopContext);

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      {/* Logo */}
      <p
        className="w-3 text-[#f472b6] text-3xl sm:text-xl font-semibold cursor-pointer"
        onClick={() => navigate("/")}
      >
        GALLERY
      </p>

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink className="flex flex-col items-center gap-1" to={"/"}>
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-[#f43f5e] hidden py-1 px-4 rounded-md" />
        </NavLink>
        <NavLink
          className="flex flex-col items-center gap-1"
          to={"/collections"}
        >
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-[#f43f5e] hidden py-1 px-4 rounded-md" />
        </NavLink>
        <NavLink className="flex flex-col items-center gap-1" to={"/about"}>
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-[#f43f5e] hidden py-1 px-4 rounded-md" />
        </NavLink>
        <NavLink className="flex flex-col items-center gap-1" to={"/contact"}>
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-[#f43f5e] hidden py-1 px-4 rounded-md" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        <img
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          onClick={() => setShowSearch(true)}
        />
        <div className="group relative">
          <img
            src={assets.profile_icon}
            alt=""
            className="w-5 cursor-pointer"
          />
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 ">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
              <p className="cursor-pointer hover:text-black">Profile</p>
              <p className="cursor-pointer hover:text-black">Orders</p>
              <p className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>
        </div>
        <Link to={"/cart"} className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square text-[8px] rounded-full">
            10
          </p>
        </Link>
        <img
          src={assets.menu_icon}
          alt=""
          className="w-5 cursor-pointer sm:hidden"
          onClick={() => setVisible(true)}
        />
      </div>
      {/* Sidebar menu for small screens */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-black text-white transition-all text-center ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-base">
          <div
            className="flex items-center gap-4 p-3 cursor-pointer"
            onClick={() => setVisible(false)}
          >
            <img src={assets.dropdown_icon} alt="" className="h-4 rotate-180" />
            <p>Back</p>
          </div>
          <NavLink
            to="/home"
            className="py-6 pl-6"
            onClick={() => setVisible(false)}
          >
            HOME
          </NavLink>
          <NavLink
            to="/collections"
            className="py-6 pl-6"
            onClick={() => setVisible(false)}
          >
            COLLECTION
          </NavLink>
          <NavLink
            to="/about"
            className="py-6 pl-6"
            onClick={() => setVisible(false)}
          >
            ABOUT
          </NavLink>
          <NavLink
            to="/contact"
            className="py-6 pl-6"
            onClick={() => setVisible(false)}
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
