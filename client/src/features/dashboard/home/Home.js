import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../loading/Loading";
import Search from "../search/Search";
import {
  selectSearch,
  getFollowedData,
  setSearch,
  SORT_GAINERS,
  SORT_ALPHA,
  SORT_LOSERS,
} from "../search/searchSlice";
import { formatDollarAmount } from "../../../utils/helpers";

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
  let sortButtons;

  if (search.userFollowedData) {
    const handleClick = (e, ticker) => {
      e.preventDefault();
      dispatch(setSearch(ticker));
    };

    const handleSort = (e, sort) => {
      e.preventDefault();
      switch (sort) {
        case "gainers":
          dispatch(SORT_GAINERS());
          break;
        case "losers":
          dispatch(SORT_LOSERS());
          break;
        case "alpha":
          dispatch(SORT_ALPHA());
          break;
        default:
          break;
      }
    };

    sortButtons = (
      <>
        <button
          onClick={(e) => handleSort(e, "alpha")}
          className="button btn sort-btn m-1"
        >
          <i className="fas fa-sort-alpha-down secondary" /> ALPHA.
        </button>

        <button
          onClick={(e) => handleSort(e, "gainers")}
          className="button btn sort-btn m-1"
        >
          <i className="fas fa-long-arrow-alt-up gain" /> GAINERS
        </button>

        <button
          onClick={(e) => handleSort(e, "losers")}
          className="button btn sort-btn m-1"
        >
          <i className="fas fa-long-arrow-alt-down loss" /> LOSERS
        </button>
      </>
    );

    followedTickers = search.userFollowedData.map((ticker) => {
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
                  <h5 className="card-title company-name">
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
                    <span className="card-text gain change">
                      <i className="fas fa-long-arrow-alt-up" />{" "}
                      {formatDollarAmount(ticker.quote.change)} Today
                    </span>
                  </div>
                  <div className="col-5">
                    <span className="card-text gain change">
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
                  <h5 className="card-title company-name">
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
                      <i className="fas fa-long-arrow-alt-down change" />{" "}
                      {formatDollarAmount(ticker.quote.change)} Today
                    </span>
                  </div>
                  <div className="col-5">
                    <span className="card-text loss change">
                      <i className="fas fa-long-arrow-alt-down" />{" "}
                      {ticker.quote.changePercent}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </button>
        );
      } else {
        return null;
      }
    });
  }

  if (search.isLoading) {
    return (
      <div className="container-fluid home">
        <div className="row">
          <Search />
        </div>

        <h5 className="mt-3">
          FOLLOWED TICKERS <i className="fas fa-chart-line" />
        </h5>

        <div className="row">
          <span className="secondary ul pb-2 sort">Click to Sort</span>
        </div>
        <div className="row row-cols-3 pb-2 justify-content-center">
          {sortButtons}
        </div>
        <span className="secondary">(Tap for more info)</span>
        <div className="row load pt-2 pb-2 justify-content-center">
          <Loading />
        </div>
      </div>
    );
  } else {
    return (
      <div className="container-fluid home">
        <div className="row">
          <Search />
        </div>

        <h5 className="mt-3">
          FOLLOWED TICKERS <i className="fas fa-chart-line" />
        </h5>

        <div className="row">
          <span className="secondary ul pb-2">Click to Sort</span>
        </div>
        <div className="row row-cols-3 pb-2 justify-content-center">
          {sortButtons}
        </div>
        <span className="secondary">(Tap for more info)</span>
        <div className="row row-cols-md-2 pt-2 pb-2 followed-tickers">
          {followedTickers}
        </div>
      </div>
    );
  }
};

export default Home;
