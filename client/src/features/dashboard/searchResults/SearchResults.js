import React from "react";
import { useSelector } from "react-redux";
import { selectSearch } from "../search/searchSlice";

const SearchResults = () => {
  const search = useSelector(selectSearch);

  //   const {
  //     symbol,
  //     companyName,
  //     latestTime,
  //     iexRealtimePrice,
  //     week52High,
  //     week52Low,
  //     change,
  //     changePercent,
  //     previousClose,
  //   } = search.currentTicker;

  let tickerCard = null;

  //   if (search.currentTicker) {
  //     tickerCard = (
  //       <div className="container stock-info">
  //         <div className="row">
  //           <h6>
  //             {companyName}, ({symbol})
  //           </h6>
  //           <span className="time-stamp">{latestTime}</span>
  //         </div>
  //         <div className="row row-cols-3 my-auto">
  //           <h5>${iexRealtimePrice}</h5>
  //           <span>{changePercent}</span>
  //           <span>{change} Today</span>
  //         </div>
  //       </div>
  //     );
  //   }
  return (
    <div className="container-fluid pt-2">
      <div className="row">
        <div className="col-12">{tickerCard}</div>
      </div>
    </div>
  );
};

export default SearchResults;
