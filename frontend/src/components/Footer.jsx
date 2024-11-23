import React from "react";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div className="">
          <p
            className="w-3 text-[#f472b6] text-3xl sm:text-xl font-semibold cursor-pointer"
            onClick={() => navigate("/")}
          >
            GALLERY
          </p>
          <p className="w-full md:w-2/3 text-gray-600">
            Lorem ipsum dolor sit amet.
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>03193507558</li>
            <li>usamarazaaq3@gmail.com</li>
          </ul>
        </div>
      </div>
      <div className="">
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2024 gallery.app - All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
