import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAuth } from "../../auth/authSlice";
import { setSearch } from "../search/searchSlice";

const Search = () => {
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState({
    query: "",
  });

  const { username } = auth.user;

  const { query } = searchTerm;

  // Handles input changes for all form fields
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSearchTerm({ ...searchTerm, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    dispatch(setSearch(query));
  };

  return (
    <div className="container search p-0">
      <div className="row">
        <h3>Welcome, {username}</h3>
      </div>
      <div className="row">
        <form className="row align-items-center">
          <div className="col-12">
            <label className="visually-hidden">Ticker</label>
            <div className="input-group">
              <input
                onChange={handleInputChange}
                type="text"
                className="form-control mb-2"
                name="query"
              />
            </div>
          </div>
          <div className="col-12" align="center">
            <button onClick={handleFormSubmit}>Search</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Search;
