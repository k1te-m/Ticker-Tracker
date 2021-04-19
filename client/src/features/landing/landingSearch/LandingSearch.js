import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SET_ALERT } from "../../alert/alertSlice";
import {
  REMOVE_SEARCH,
  selectSearch,
  setLandingSearch,
  CLEAR_ERROR,
} from "../../dashboard/search/searchSlice";

const LandingSearch = () => {
  const dispatch = useDispatch();
  const search = useSelector(selectSearch);

  const [searchTerm, setSearchTerm] = useState({
    query: "",
  });

  useEffect(() => {
    dispatch(REMOVE_SEARCH());
    // eslint-disable-next-line
    dispatch(setLandingSearch("NFLX"));
    // eslint-disable-next-line
  }, []);

  const { query } = searchTerm;

  // Handles input changes for all form fields
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSearchTerm({ ...searchTerm, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!query) {
      dispatch(
        SET_ALERT({
          message: "Ticker field must be populated.",
          type: "danger",
        })
      );
    } else if (search.error) {
      dispatch(
        SET_ALERT({ message: "Please enter a valid ticker.", type: "danger" })
      );
      dispatch(CLEAR_ERROR());
    } else if (query) {
      dispatch(setLandingSearch(query));
      window.scrollTo(0, document.body.scrollHeight);
    }
  };

  return (
    <div className="container-fluid land-search pt-1 pb-3">
      <div className="row">
        <p className="mb-1 secondary">
          Enter any stock ticker and select search to retrieve ticker data.
        </p>
      </div>
      <div className="row">
        <div className="col-12">
          <form className="row form-inline justify-content-center align-items-center">
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

export default LandingSearch;
