import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchedUser } from "../../store/reducers/authReducer";

import { SearchIcon } from "../../assets";

const SearchBox = ({ new_user, setOpen }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    dispatch(setSearchedUser(search));
  };

  return (
    <div className="search-box flex items-center">
      <div className="input-field flex items-center">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="txt w-full cleanbtn"
        />
        <div className="icon flex items-center justify-center">
          <SearchIcon />
        </div>
      </div>
      <button className="search-btn button" onClick={() => {
              // setOpen(false);
              new_user(search);
              // dispatch(setSearchedUser(search));

            }}>
        Search
      </button>
    </div>
  );
};

export default SearchBox;
