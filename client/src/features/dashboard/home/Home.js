import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Search from "../search/Search";
import {
  selectSearch,
  getFollowedData,
  setSearch,
} from "../search/searchSlice";

const Home = () => {
  const search = useSelector(selectSearch);
  const dispatch = useDispatch();

  useEffect(() => {
    if (search.userFollowedSymbols) {
      const tickers = search.userFollowedSymbols.join(",");
      dispatch(getFollowedData(tickers));
    }
  }, [dispatch, search.userFollowedSymbols]);

  let followedTickers;

  if (search.userFollowedData) {
    const arrayOfFollwedData = Object.keys(search.userFollowedData).map(
      (ticker) => {
        return search.userFollowedData[ticker];
      }
    );

    const handleClick = (e, ticker) => {
      e.preventDefault();
      dispatch(setSearch(ticker));
    };

    followedTickers = arrayOfFollwedData.map((ticker) => (
      <button
        className="home-card"
        onClick={(e) => {
          handleClick(e, ticker.quote.symbol);
        }}
      >
        <div className="card">
          <div className="card-body">
            <div className="row">
              <h5 className="card-title">{ticker.quote.companyName}</h5>
            </div>
            <div className="row">
              <h6 className="card-text">${ticker.quote.latestPrice}</h6>
            </div>
            <div className="row">
              <div className="col-7">
                <span className="card-text">${ticker.quote.change} Today</span>
              </div>
              <div className="col-5">
                <span className="card-text">{ticker.quote.changePercent}%</span>
              </div>
            </div>
          </div>
        </div>
      </button>
    ));
  }

  return (
    <div className="container home">
      <Search />
      <div className="row row-cols-md-2">{followedTickers}</div>
    </div>
  );
};

export default Home;
