import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Search from "../search/Search";
import { selectSearch, getFollowedData } from "../search/searchSlice";

const Home = () => {
  const search = useSelector(selectSearch);
  const dispatch = useDispatch();

  console.log(search.userFollowedSymbols);

  useEffect(() => {
    if (search.userFollowedSymbols) {
      let tickers = search.userFollowedSymbols.join(",");
      dispatch(getFollowedData(tickers));
    }
  }, [dispatch, search.userFollowedSymbols]);

  return (
    <div className="container home">
      <Search />
      <div className="row">
        <p>Home</p>
      </div>
    </div>
  );
};

export default Home;
