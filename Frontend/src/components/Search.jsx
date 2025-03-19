import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchPage, setIsSearchPage] = useState(false);

  useEffect(() => {
    const page = location.pathname === "/search";
    setIsSearchPage(page);
  }, [location]);

  const redirectToSerach = () => {
    navigate("/search");
  };

  return (
    <div className="w-full min-w-[300px] lg:min-w-[420px] h-12 rounded-md border border-gray-400 overflow-hidden flex items-center bg-slate-50">
      <button className="flex justify-center items-center h-full p-3 text-gray-500">
        <IoSearch size={22} />
      </button>

      <div className="w-full h-full">
        {!isSearchPage ? (
          <div
            onClick={redirectToSerach}
            className="text-[15px] h-full w-full flex items-center text-gray-500"
          >
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed once, initially
                'Search "Milk"',
                1000,
                'Search "Eggs',
                1000,
                'Search "Panner',
                1000,
                'Search "Bread',
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />{" "}
          </div>
        ) : (
          <div className="w-full h-full">
            <input
              type="text"
              placeholder="Search for Aata Dal and Rice"
              autoFocus
              className="w-full h-full outline-none"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
