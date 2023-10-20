import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const PerformanceChart = ({ performanceData }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    // Destroy the previous chart instance if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Create a new chart instance
    const newChartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels: Object.keys(performanceData),
        datasets: [
          {
            barThickness: 3,
            label: "# of Hits",
            data: Object.values(performanceData),
            backgroundColor: [
              "Aqua",
              "Blue",
              "Green",
              "Orange",
              "Purple",
              "Red",
              "Yellow",
            ],
          },
        ],
      },
      options: {
        indexAxis: "y",
        scales: {
          y: {
            title: {
              display: true,
              text: "Hits", // Y-axis label
              color: "white", // Text color
            },
            ticks: {
              color: "white", // X-axis label text color
            },
          },
          x: {
            beginAtZero: true,
            // barPercentage: 1, // Adjust the width of the bars (space between bars)
            // categoryPercentage: 1,
            ticks: {
              color: "white", // X-axis label text color
            },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: "white", // Legend text color
            },
          },
        },
      },
    });

    // Store the new chart instance in the ref
    chartInstanceRef.current = newChartInstance;

    // Cleanup function to destroy the chart when the component unmounts
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [performanceData]);

  return (
    <div className="performance-chart">
      {" "}
      {/* Set the desired height here */}
      <h2>Performance</h2>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default PerformanceChart;
