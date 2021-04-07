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

  const formatDollarAmount = (number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(number);
  };

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

    followedTickers = arrayOfFollwedData.map((ticker) => {
      if (ticker.quote.change >= 0) {
        return (
          <button
            className="ticker-button"
            onClick={(e) => {
              handleClick(e, ticker.quote.symbol);
            }}
          >
            <div className="card home-card">
              <div className="card-body">
                <div className="row">
                  <h5 className="card-title">
                    {ticker.quote.companyName}, ({ticker.quote.symbol})
                  </h5>
                </div>
                <div className="row">
                  <h6 className="card-text price gain mb-1">
                    {formatDollarAmount(ticker.quote.latestPrice)}
                  </h6>
                </div>
                <div className="row">
                  <div className="col-7">
                    <span className="card-text gain">
                      <i className="fas fa-long-arrow-alt-up" />{" "}
                      {formatDollarAmount(ticker.quote.change)} Today
                    </span>
                  </div>
                  <div className="col-5">
                    <span className="card-text gain">
                      <i className="fas fa-long-arrow-alt-up" />{" "}
                      {ticker.quote.changePercent}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </button>
        );
      } else if (ticker.quote.change < 0) {
        return (
          <button
            className="ticker-button"
            onClick={(e) => {
              handleClick(e, ticker.quote.symbol);
            }}
          >
            <div className="card home-card">
              <div className="card-body">
                <div className="row">
                  <h5 className="card-title">
                    {ticker.quote.companyName}, ({ticker.quote.symbol})
                  </h5>
                </div>
                <div className="row">
                  <h6 className="card-text price loss mb-1">
                    {formatDollarAmount(ticker.quote.latestPrice)}
                  </h6>
                </div>
                <div className="row">
                  <div className="col-7">
                    <span className="card-text loss">
                      <i className="fas fa-long-arrow-alt-down" />{" "}
                      {formatDollarAmount(ticker.quote.change)} Today
                    </span>
                  </div>
                  <div className="col-5">
                    <span className="card-text loss">
                      <i className="fas fa-long-arrow-alt-down" />{" "}
                      {ticker.quote.changePercent}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </button>
        );
      }
    });
  }

  return (
    <div className="container-fluid home">
      <div className="row">
        <Search />
      </div>

      <h5 className="mt-3">
        FOLLOWED TICKERS <i className="fas fa-chart-line" />
      </h5>
      <div className="row row-cols-md-2 pt-2 pb-2">{followedTickers}</div>
    </div>
  );
};

export default Home;
