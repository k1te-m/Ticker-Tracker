import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAuth } from "../../auth/authSlice";
import { selectSearch, watchStock, unwatchStock } from "../search/searchSlice";

const WatchButton = () => {
  const auth = useSelector(selectAuth);
  const search = useSelector(selectSearch);
  const dispatch = useDispatch();

  const followStock = (e) => {
    e.preventDefault();
    const { symbol } = search.currentTicker.quote;
    const id = auth.user._id;

    dispatch(watchStock({ id: id, symbol: symbol }));
  };

  const unFollowStock = (e) => {
    e.preventDefault();
    const { symbol } = search.currentTicker.quote;
    const id = auth.user._id;

    dispatch(unwatchStock({ id: id, symbol: symbol }));
  };

  const { userFollowedSymbols } = search;

  if (userFollowedSymbols.includes(search.currentTicker.quote.symbol)) {
    return (
      <button
        className="unwatch-button"
        onClick={(e) => {
          unFollowStock(e);
        }}
      >
        <span className="follow">Unfollow Stock</span>{" "}
        <i className="fas fa-eye-slash" />
      </button>
    );
  } else {
    return (
      <button
        className="watch-button"
        onClick={(e) => {
          followStock(e);
        }}
      >
        <span className="follow">Follow Stock</span>{" "}
        <i className="fas fa-eye" />
      </button>
    );
  }
};

export default WatchButton;
