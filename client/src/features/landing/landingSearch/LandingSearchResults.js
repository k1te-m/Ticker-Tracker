import React from "react";
import { useSelector } from "react-redux";
import Loading from "../../loading/Loading";
import { selectSearch } from "../../dashboard/search/searchSlice";
import { formatDollarAmount, formatDate } from "../../../utils/helpers";

const LandingSearchResults = () => {
  const search = useSelector(selectSearch);

  let tickerCard = null;

  if (search.landingTicker) {
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
    } = search.landingTicker.quote;

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
        </div>
      );
    }
  }

  if (search.isLoading) {
    return (
      <div className="container-fluid land-load">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else {
    return (
      <div className="container-fluid land-results mt-1">
        <div className="row">
          <div className="col-12">{tickerCard}</div>
        </div>
      </div>
    );
  }
};

export default LandingSearchResults;
