import React from "react";
import { useSelector } from "react-redux";
import { selectSearch } from "../search/searchSlice";
import { Line } from "react-chartjs-2";

const TickerChart = () => {
  const search = useSelector(selectSearch);
  const { currentTicker } = search;

  if (currentTicker) {
    let dates = currentTicker.chart.map((dayData) => {
      return dayData.label;
    });

    let closingPrices = currentTicker.chart.map((dayData) => {
      return dayData.close;
    });

    // Formats date to local time and provides day, month, and year
    const formatDate = (date) => {
      const dateObj = new Date(date);
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const formattedDate = dateObj.toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "2-digit",
        timeZone: tz,
      });
      const formattedTime = formattedDate;
      return formattedTime;
    };

    dates.unshift(formatDate(currentTicker.quote.latestUpdate));

    closingPrices.unshift(currentTicker.quote.latestPrice);

    let state = {
      labels: dates.reverse(),
      datasets: [
        {
          label: "$ Value",
          fill: true,
          lineTension: 0.5,
          backgroundColor: "#79ea86",
          borderColor: "rgba(0,0,0,1)",
          borderWidth: 2,
          data: closingPrices.reverse(),
        },
      ],
    };

    if (closingPrices[0] > closingPrices[closingPrices.length - 1]) {
      state = {
        labels: dates.reverse(),
        datasets: [
          {
            label: "$ Value",
            fill: true,
            lineTension: 0.5,
            backgroundColor: "#79ea86",
            borderColor: "rgba(0,0,0,1)",
            borderWidth: 2,
            data: closingPrices.reverse(),
          },
        ],
      };
    } else if (closingPrices[0] < closingPrices[1]) {
      state = {
        labels: dates.reverse(),
        datasets: [
          {
            label: "$ Value",
            fill: true,
            lineTension: 0.5,
            backgroundColor: "#e75757",
            borderColor: "rgba(0,0,0,1)",
            borderWidth: 2,
            data: closingPrices.reverse(),
          },
        ],
      };
    }

    return (
      <div className="container chart-container mt-3">
        <Line
          data={state}
          width={100}
          height={100}
          options={{
            maintainAspectRatio: false,
            title: {
              display: true,
              text: "10-Day+ Historical Stock Price Values",
              fontSize: 12,
              fontColor: "#FFFFFF",
            },
            legend: {
              display: false,
              position: "right",
              labels: {
                fontColor: "#FFFFFF",
                fontSize: 12,
              },
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    fontColor: "#FFFFFF",
                    fontSize: 10,
                    callback: function (value, index, values) {
                      return "$" + value;
                    },
                  },
                },
              ],
              xAxes: [
                {
                  ticks: {
                    fontColor: "#FFFFFF",
                    fontSize: 10,
                  },
                },
              ],
            },
          }}
        />
      </div>
    );
  } else {
    return <></>;
  }
};

export default TickerChart;
