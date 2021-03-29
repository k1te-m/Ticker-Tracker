import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAuth, loadUser } from "../../auth/authSlice";

const Search = () => {
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState({
    searchTerm: "",
  });

  const { username } = auth.user;

  // Handles input changes for all form fields
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSearchTerm({ ...searchTerm, [name]: value });
    console.log(searchTerm);
  };

  return (
    <div className="container search p-0">
      <div className="row">
        <h3>Welcome, {username}</h3>
      </div>
      <div className="row">
        <form className="row align-items-center">
          <div className="col-12">
            <label className="visually-hidden" for="searchTerm">
              Ticker
            </label>
            <div className="input-group">
              <input
                onChange={handleInputChange}
                type="text"
                className="form-control mb-2"
                name="searchTerm"
              />
            </div>
          </div>
          <div className="col-12" align="center">
            <button>Search</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Search;
