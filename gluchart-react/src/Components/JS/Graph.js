import React, { useEffect, useRef } from "react";
import "../CSS/Graph.css";
import ChartJS from "chart.js/auto";

export default function Graph() {
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) return;
    const data = {
      labels: ["-30", "-25", "-20", "-15", "-10", "-5", "0", "5", "10", "15", "20", "25", "30"],
      datasets: [
        {
          data: [8, 7.8, 6, 8, 7, 5, 6, null],
          borderColor: "black",
        },
        {
            data: [null, null, null, null, null, null, 6, 8, 7, 6, 7, 5, 6.6],
            borderColor: "green",
        }
      ],
    };
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: {
          top: 40,
          bottom: 10,
          left: 10,
          right: 40,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: "minutes",
            padding: {
                top: 10,
              },
            font: {
              size: 12, weight: 600
            },
          },
        },
        y: {
          display: true,
          title: {
            display: true,
            text: "mg/DL",
            padding: {
                bottom: 20,
              },
            font: {
              size: 12, weight: 600
            },
          },
        },
      },
    };
    const chart = new ChartJS(ref.current, {
      type: "line",
      data,
      options,
    });

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <div className="graph">
      <canvas ref={ref} style={{ width: "100%", height: "300px" }} />
    </div>
  );
}
