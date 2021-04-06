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
  }, [dispatch]);

  let symbolList;

  const hanldeClick = (e, symbol) => {
    e.preventDefault();
    dispatch(setSearch(symbol));
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    dispatch(REMOVE_SEARCH());
  };

  if (userFollowedSymbols) {
    symbolList = userFollowedSymbols.map((symbol) => (
      <li className="list-group-item card mt-2">
        <span className="side-symbol" onClick={(e) => hanldeClick(e, symbol)}>
          {symbol}
        </span>
      </li>
    ));
  }

  return (
    <div className="container-fluid sidebar">
      <ul className="list-group pt-2">
        <li className="list-group-item card mt-2">
          <i className="fas fa-home" onClick={(e) => handleHomeClick(e)} />
        </li>
        {symbolList}
      </ul>
    </div>
  );
};

export default Sidebar;
