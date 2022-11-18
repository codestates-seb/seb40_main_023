import React from "react";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TooltipItem,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
);

const LineChart = () => {
  const data = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        label: "",
        data: [200, 300, 350, 700, 1200, 3500, 5000],
        fill: true,
        borderWidth: 1,
        backgroundColor: "#F29E87",
        borderColor: "#FF7246",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointRadius: 1,
        pointHitRadius: 10,
      },
      {
        label: "",
        data: [500, 1050, 2000, 3500, 5000, 7500, 9000],
        fill: false,
        borderWidth: 1,
        backgroundColor: "transparent",
        borderColor: "#95DA02",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointRadius: 1,
        pointHitRadius: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scaleShowLabels: false,
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          color: "#fefefe",
        },
        ticks: {
          display: false,
        },
      },
      y: {
        grid: {
          color: "#eeeeee",
        },
        ticks: {
          display: false,
          beginAtZero: false,
          stepSize: 1000,
        },
        min: 0,
        max: 10000,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
