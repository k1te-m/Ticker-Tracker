import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFollowedSymbols,
  selectSearch,
  setSearch,
  REMOVE_SEARCH,
} from "../search/searchSlice";
import { selectAuth } from "../../auth/authSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const search = useSelector(selectSearch);
  const auth = useSelector(selectAuth);

  const { userFollowedSymbols } = search;

  const id = auth.user._id;

  useEffect(() => {
    dispatch(getFollowedSymbols(id));
  }, [dispatch, id]);

  let symbolList;

  // Function to handle sidebar button click
  const hanldeClick = (e, symbol) => {
    window.scrollTo(0, 0);
    e.preventDefault();
    dispatch(setSearch(symbol));
  };
  // Function to handle sidebar home button click, sets currentTicker to null
  const handleHomeClick = (e) => {
    e.preventDefault();
    dispatch(REMOVE_SEARCH());
  };

  // If the user is following any stocks, render a li for sidebar
  if (userFollowedSymbols) {
    const sortedUserSymbols = userFollowedSymbols.slice().sort();
    symbolList = sortedUserSymbols.map((symbol) => (
      <li className="list-group-item card mt-2" key={symbol}>
        <span className="side-symbol" onClick={(e) => hanldeClick(e, symbol)}>
          {symbol}
        </span>
      </li>
    ));
  }

  return (
    <div className=" sidebar">
      <ul className="list-group pt-2 pb-2">
        <li
          className="list-group-item card"
          onClick={(e) => handleHomeClick(e)}
        >
          <i className="fas fa-home" />
        </li>
        {symbolList}
      </ul>
    </div>
  );
};

export default Sidebar;
