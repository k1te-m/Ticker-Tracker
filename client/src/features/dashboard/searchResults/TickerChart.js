import React from "react";
import { useSelector } from "react-redux";
import { selectSearch } from "../search/searchSlice";
import { Line } from "react-chartjs-2";

const TickerChart = () => {
  const search = useSelector(selectSearch);
  const { currentTicker } = search;

  if (currentTicker != null) {
    const dates = currentTicker.chart.map((dayData) => {
      return dayData.label;
    });

    const closingPrices = currentTicker.chart.map((dayData) => {
      return dayData.close;
    });

    const state = {
      labels: dates.reverse(),
      datasets: [
        {
          label: "Close",
          fill: true,
          lineTension: 0.5,
          backgroundColor: "rgba(75,181,67,.5)",
          borderColor: "rgba(0,0,0,1)",
          borderWidth: 2,
          data: closingPrices.reverse(),
        },
      ],
    };

    return (
      <div className="container chart-container">
        <Line
          data={state}
          width={100}
          height={100}
          options={{
            maintainAspectRatio: false,
            title: {
              display: true,
              text: "10-Day Historical Stock Price Values",
              fontSize: 12,
              fontColor: "black",
            },
            legend: {
              display: false,
              position: "right",
              labels: {
                fontColor: "black",
                fontSize: 12,
              },
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    fontColor: "black",
                    fontSize: 8,
                    callback: function (value, index, values) {
                      return "$" + value;
                    },
                  },
                },
              ],
              xAxes: [
                {
                  ticks: {
                    fontColor: "black",
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
