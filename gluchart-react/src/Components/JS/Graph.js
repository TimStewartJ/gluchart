import React, { useEffect, useRef } from "react";
import "../CSS/Graph.css";
import ChartJS from "chart.js/auto";

export default function Graph() {
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) return;
    const data = {
      labels: ["30mins", "25mins", "20mins", "15mins", "10mins", "5mins"],
      datasets: [
        {
          data: [8, 7.8, 6, 8, 7, 5, 6],
        },
      ],
    };
    const options = {
      responsive: true,
      maintainAspectRatio: false,
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