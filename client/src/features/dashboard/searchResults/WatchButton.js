import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAuth } from "../../auth/authSlice";
import { selectSearch, watchStock } from "../search/searchSlice";

const WatchButton = () => {
  const auth = useSelector(selectAuth);
  const search = useSelector(selectSearch);
  const dispatch = useDispatch();

  const followStock = (e) => {
    e.preventDefault();
    const { symbol } = search.currentTicker.quote;
    const id = auth.user._id;

    console.log(symbol, id);
    dispatch(watchStock({ id: id, symbol: symbol }));
  };

  console.log(auth);
  return (
    <button
      className="watch-button"
      onClick={(e) => {
        followStock(e);
      }}
    >
      <i className="fas fa-eye" />
    </button>
  );
};

export default WatchButton;
