import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const Graph = ({ coordenadas }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    if (chartRef.current.chart) {
      chartRef.current.chart.destroy();
    }

    chartRef.current.chart = new Chart(ctx, {
      type: "scatter",
      data: {
        datasets: [
          {
            label: "Semilla",
            data: [
              { x: -1.33, y: 0.42 },
              { x: 1.32, y: 0.133 },
              { x: 1.245, y: -0.14 },
              { x: -1.06, y: -0.5 },
              { x: -1.33, y: 0.42 },
            ],
            backgroundColor: "rgba(75, 192, 192, 0.4)",
            borderColor: "rgba(75, 192, 192, 1)",
            showLine: true,
            fill: true,
          },
          {
            label: "Punto incial",
            data: [{ x: coordenadas[0], y: coordenadas[1] }],
            backgroundColor: "rgba(255, 127, 80, 1))",
            borderColor: " rgba(255, 127, 80, 1)",
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: "linear",
            position: "bottom",
          },
          y: {
            type: "linear",
            position: "left",
          },
        },
        title: {
          display: true,
          text: "Chart.js Scatter Chart",
        },
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "S E M I L L A S",
          },
        },
      },
    });
  }, [coordenadas]);

  return <canvas ref={chartRef} />;
};

export default Graph;
