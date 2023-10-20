import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const StorageInfo = ({ storage }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    // Destroy the previous chart instance if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Create a new pie chart instance
    const newChartInstance = new Chart(ctx, {
      type: "pie",
      data: {
        labels: [
          `Available Storage (${storage.available}GB)`,
          `System Storage (${storage.system}GB)`,
          `Used Storage (${storage.used}GB)`,
        ],
        datasets: [
          {
            data: [storage.available, storage.system, storage.used],
            backgroundColor: ["#4CAF50", "#2196F3", "#FFC107"],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "top",
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
  }, [storage]);

  return (
    <div className="storage-info">
      <h2>Storage Information</h2>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default StorageInfo;
