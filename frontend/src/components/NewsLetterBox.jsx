import React, { useState } from "react";

const NewsLetterBox = () => {
  const [email, setEmail] = useState([]);

  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">Stay Informed</p>
      <p className="text-gray-400 mt-3">
        Subscribe to our newsletter and get 20% off your next purchase.
      </p>
      <form
        className="sm:w-1/2 w-full flex items-center gap-3 mx-auto my-6 border pl-3"
        onSubmit={onSubmitHandler}
      >
        <input
          type="email"
          placeholder="Enter Email"
          className="w-full flex-1 outline-none"
          required
          onChange={() => setEmail(e.target.value)}
          value={email}
        />
        <button
          type="submit"
          className="bg-black text-white text-xs px-10 py-4"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsLetterBox;
