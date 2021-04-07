import React from "react";
import { useSelector } from "react-redux";
import { selectSearch } from "../search/searchSlice";
import TickerChart from "./TickerChart";
import WatchButton from "./WatchButton";

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

    const size = 5;
    const filteredNews = news.slice(0, size);

    const formatDollarAmount = (number) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(number);
    };

    // Formats date to local time and provides day, month, and year
    const formatDate = (date) => {
      const dateObj = new Date(date);
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const formattedDate = dateObj.toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: tz,
      });
      const formattedTime = formattedDate;
      return formattedTime;
    };

    displayNews = filteredNews.map((news) => (
      <div className="row">
        <li>
          <a href={news.url} target="_blank" rel="noreferrer">
            <div>
              <span>{news.headline}</span>
            </div>
          </a>
        </li>
      </div>
    ));

    if (change >= 0) {
      tickerCard = (
        <div className="container stock-info my-auto">
          <div className="row">
            <div className="col-12">
              <h6>
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
          <div className="row">
            <WatchButton />
          </div>
        </div>
      );
    } else if (change < 0) {
      tickerCard = (
        <div className="container stock-info my-auto">
          <div className="row">
            <div className="col-12">
              <h6>
                {companyName}, ({symbol})
              </h6>
            </div>
          </div>
          <div className="row">
            <WatchButton />
          </div>
          <div className="row">
            <h5 className="latest-price loss">
              {formatDollarAmount(latestPrice)}
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
        </div>
      );
    }
  }

  return (
    <div className="container-fluid pt-2">
      <div className="row">
        <div className="col-12">{tickerCard}</div>
      </div>
      <div className="row pt-2 chart ">
        <TickerChart />
      </div>
      <div className="row">
        <div className="col-12">
          <div className="container pt-2 news">
            {search.currentTicker && (
              <div className="row">
                <h3>NEWS</h3>
              </div>
            )}
            <ul>{displayNews}</ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
