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
    <div className="container-fluid search pt-3">
      <div className="row">
        <h3 className="welcome">Welcome, {username}!</h3>
      </div>
      <div className="row">
        <p>Enter any stock ticker and select search to retrieve ticker data.</p>
      </div>
      <div className="row">
        <div className="col-12">
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
            <div className="col-12">
              <button onClick={handleFormSubmit} className="search-button btn">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Search;
