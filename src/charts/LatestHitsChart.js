import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const LatestHitsChart = ({ latestHits }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null); // Store the chart instance in a ref

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    // Destroy the previous chart instance
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Create a new chart instance
    const newChartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels: latestHits.months,
        datasets: [
          {
            label: "Featured",
            data: latestHits.featured,
            borderColor: "rgba(255, 99, 132, 1)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            pointRadius: 0,
          },
          {
            label: "Latest",
            data: latestHits.latest,
            borderColor: "rgba(54, 162, 235, 1)",
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            pointRadius: 0,
          },
          {
            label: "Popular",
            data: latestHits.popular,
            borderColor: "rgba(255, 206, 86, 1)",
            backgroundColor: "rgba(255, 206, 86, 0.2)",
            pointRadius: 0,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: false,
            min: 10,
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
            ticks: {
              color: "white", // X-axis label text color
            },
          },
        },
        elements: {
          line: {
            tension: 0.4, // Control line tension for smooth lines
          },
        },
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

    // Cleanup function to destroy the chart when the component unmounts or when the effect runs again
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [latestHits]); // Re-run the effect when latestHits prop changes

  return (
    <div>
      <h2>Latest Hits</h2>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default LatestHitsChart;
