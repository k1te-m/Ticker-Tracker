import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAuth, LOGOUT } from "../../auth/authSlice";
import LogoutButton from "../../logout/LogoutButton";
import { setSearch, selectSearch, CLEAR_SEARCH } from "../search/searchSlice";
import { SET_ALERT } from "../../alert/alertSlice";

const Search = () => {
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();
  const search = useSelector(selectSearch);

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

  // Dispatches alerts for blank input/no response & dispatches setSearch
  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!query) {
      dispatch(
        SET_ALERT({
          message: "Ticker field must be populated.",
          type: "danger",
        })
      );
    } else if (search.error === "Error fetching results.") {
      dispatch(
        SET_ALERT({ message: "Please enter a valid ticker.", type: "danger" })
      );
    } else {
      dispatch(setSearch(query));
    }
  };

  const logout = () => {
    dispatch(CLEAR_SEARCH());
    dispatch(LOGOUT());
  };

  return (
    <div className="container-fluid search pt-3">
      <div className="row">
        <div className="col-10 col-lg-11">
          <h3 className="welcome pt-1">
            Welcome, <span className="gain">{username}</span>!
          </h3>
        </div>
        <div className="col-2 col-lg-1">
          <LogoutButton logout={() => logout()} />
        </div>
      </div>
      <div className="row">
        <p className="mb-1">
          Enter any stock ticker and select search to retrieve ticker data.
        </p>
      </div>
      <div className="row">
        <div className="col-12">
          <form className="row align-items-center">
            <div className="col-12 col-md-3 col-lg-3">
              <label className="visually-hidden">Ticker</label>
              <div className="input-group">
                <input
                  onChange={handleInputChange}
                  type="text"
                  className="form-control mb-2"
                  name="query"
                  placeholder="Ticker"
                />
              </div>
            </div>
            <div className="col-12">
              <button onClick={handleFormSubmit} className="search-button btn">
                <i className="fas fa-search-dollar" /> SEARCH
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Search;
