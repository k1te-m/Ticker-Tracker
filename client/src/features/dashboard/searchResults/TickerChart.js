import React from "react";
import { useSelector } from "react-redux";
import { selectSearch } from "../search/searchSlice";
import { Line } from "react-chartjs-2";
import { formatDate } from "../../../utils/helpers";

const TickerChart = () => {
  const search = useSelector(selectSearch);
  const { currentTicker } = search;

  // today variable to be used to determine if current day is a weekend
  const today = new Date();

  // If currentTicker is truthy, pull dates and closing prices available from historical data
  if (currentTicker) {
    let dates = currentTicker.chart.map((dayData) => {
      return dayData.label;
    });

    let closingPrices = currentTicker.chart.map((dayData) => {
      return dayData.close;
    });
    // If it is not a weekend, add the current day date and price to the dates/closingPrices arrays
    if (today.getDay() !== 6 || 0) {
      dates.unshift(formatDate(currentTicker.quote.latestUpdate));
      closingPrices.unshift(currentTicker.quote.latestPrice);
    }
    // reverse order of both arrays for chronological order
    dates.reverse();
    closingPrices.reverse();

    // Initial state/datasets of the chart
    let state = {
      labels: dates,
      datasets: [
        {
          label: "$ Value",
          fill: true,
          lineTension: 0.5,
          backgroundColor: "#79ea86",
          borderColor: "rgba(0,0,0,1)",
          borderWidth: 2,
          data: closingPrices,
        },
      ],
    };
    // Conditional render of chart color based on latest closing price vs the first
    if (closingPrices[closingPrices.length - 1] > closingPrices[0]) {
      state = {
        labels: dates,
        datasets: [
          {
            label: "$ Value",
            fill: true,
            lineTension: 0.5,
            backgroundColor: "#79ea86",
            borderColor: "rgba(0,0,0,1)",
            borderWidth: 2,
            data: closingPrices,
          },
        ],
      };
    } else if (closingPrices[closingPrices.length - 1] < closingPrices[0]) {
      state = {
        labels: dates,
        datasets: [
          {
            label: "$ Value",
            fill: true,
            lineTension: 0.5,
            backgroundColor: "#e75757",
            borderColor: "rgba(0,0,0,1)",
            borderWidth: 2,
            data: closingPrices,
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
