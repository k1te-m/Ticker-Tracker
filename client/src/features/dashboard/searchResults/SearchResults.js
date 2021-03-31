import React from "react";
import { useSelector } from "react-redux";
import { selectSearch } from "../search/searchSlice";
import TickerChart from "./TickerChart";

const SearchResults = () => {
  const search = useSelector(selectSearch);

  let tickerCard = null;
  let displayNews = null;

  if (search.currentTicker) {
    const {
      symbol,
      companyName,
      latestTime,
      iexRealtimePrice,
      week52High,
      week52Low,
      change,
      changePercent,
      previousClose,
    } = search.currentTicker.quote;

    const { news } = search.currentTicker;

    const size = 5;
    const filteredNews = news.slice(0, size);

    console.log(filteredNews);

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

    tickerCard = (
      <div className="container stock-info my-auto">
        <div className="row">
          <h6>
            {companyName}, ({symbol})
          </h6>
          <span className="time-stamp">{latestTime}</span>
        </div>
        <div className="row row-cols-3 my-auto">
          <h5>${iexRealtimePrice}</h5>
          <span>{changePercent}%</span>
          <span>${change} Today</span>
        </div>
        <div className="row">
          <div className="col">
            <span>52 Week High: ${week52High}</span>
          </div>
          <div className="col">
            <span>52 Week Low: ${week52Low}</span>
          </div>
        </div>
        <div className="row">
          <div className="col-12">Previous Close: ${previousClose}</div>
        </div>
      </div>
    );
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
                <h3>News</h3>
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
