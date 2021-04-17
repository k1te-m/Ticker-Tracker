import React from "react";
import { useSelector } from "react-redux";
import Loading from "../../loading/Loading";
import { selectSearch } from "../search/searchSlice";
import TickerChart from "./TickerChart";
import WatchButton from "./WatchButton";
import { formatDollarAmount, formatDate } from "../../../utils/helpers";

const SearchResults = () => {
  const search = useSelector(selectSearch);

  let tickerCard = null;
  let displayNews = null;

  if (search.currentTicker) {
    const {
      symbol,
      companyName,
      latestUpdate,
      latestPrice,
      week52High,
      week52Low,
      change,
      changePercent,
      previousClose,
    } = search.currentTicker.quote;

    const { news } = search.currentTicker;

    // Map over the currentTicker news and render a li for each item
    displayNews = news.map((news) => (
      <li key={news.url}>
        <span className="fa-li">
          <i className="fas fa-newspaper" />
        </span>
        <a href={news.url} target="_blank" rel="noreferrer">
          <div>
            <span>{news.headline}</span>
          </div>
        </a>
      </li>
    ));

    // Conditional render for positive or negative day over day $ value change
    if (change >= 0) {
      tickerCard = (
        <div className="container stock-info my-auto">
          <div className="row">
            <div className="col-12">
              <h6 className="mt-1 company-name">
                {companyName}, ({symbol})
              </h6>
            </div>
          </div>

          <div className="row">
            <h5 className="latest-price gain">
              {formatDollarAmount(latestPrice)}{" "}
              <span className="time-stamp">({formatDate(latestUpdate)})</span>
            </h5>
          </div>
          <div className="row mb-2">
            <div className="col-12 prev-close">
              Previous Close: {formatDollarAmount(previousClose)}
            </div>
          </div>

          <div className="row mb-1">
            <div className="col-6 dollar-change gain">
              <i className="fas fa-long-arrow-alt-up" />{" "}
              {formatDollarAmount(change)} Today
            </div>
            <div className="col-6 percent-change gain">
              <i className="fas fa-long-arrow-alt-up" /> {changePercent}%
            </div>
          </div>
          <div className="row week pb-2">
            <div className="col">
              <span className="high">
                52 Week High: {formatDollarAmount(week52High)}
              </span>
            </div>
            <div className="col">
              <span className="low">
                52 Week Low: {formatDollarAmount(week52Low)}
              </span>
            </div>
          </div>
          <div className="row mb-1">
            <WatchButton />
          </div>
        </div>
      );
    } else if (change < 0) {
      tickerCard = (
        <div className="container stock-info my-auto">
          <div className="row">
            <div className="col-12">
              <h6 className="mt-1 company-name">
                {companyName}, ({symbol})
              </h6>
            </div>
          </div>

          <div className="row">
            <h5 className="latest-price loss">
              {formatDollarAmount(latestPrice)}{" "}
              <span className="time-stamp">({formatDate(latestUpdate)})</span>
            </h5>
          </div>
          <div className="row mb-2">
            <div className="col-12 prev-close">
              Previous Close: {formatDollarAmount(previousClose)}
            </div>
          </div>
          <div className="row mb-1">
            <div className="col-6 dollar-change loss">
              <i className="fas fa-long-arrow-alt-down" />{" "}
              {formatDollarAmount(change)} Today
            </div>
            <div className="col-6 percent-change loss">
              <i className="fas fa-long-arrow-alt-down" /> {changePercent}%
            </div>
          </div>
          <div className="row week pb-2">
            <div className="col">
              <span className="high">
                52-Week High: {formatDollarAmount(week52High)}
              </span>
            </div>
            <div className="col">
              <span className="low">
                52-Week Low: {formatDollarAmount(week52Low)}
              </span>
            </div>
          </div>
          <div className="row mb-1">
            <WatchButton />
          </div>
        </div>
      );
    }
  }
  // While loading, return the loading component
  if (search.isLoading) {
    return (
      <div className="container">
        <div className="row mt-5">
          <Loading />
        </div>
      </div>
    );
  } else {
    return (
      <div className="container-fluid mt-3 pt-2">
        <div className="row">
          <div className="col-12">{tickerCard}</div>
        </div>
        <div className="row pt-2 chart ">
          <TickerChart />
        </div>
        <div className="row">
          <div className="col-12">
            <div className="container pt-4 news">
              {search.currentTicker && (
                <div className="row">
                  <h3>NEWS</h3>
                </div>
              )}
              <ul className="fa-ul">{displayNews}</ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default SearchResults;
