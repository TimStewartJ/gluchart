import React, { useEffect, useRef } from "react";
import "../CSS/Graph.css";

// import { Line } from "react-chartjs-2";
import ChartJS, {
//   Chart as ChartJS,
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
} from "chart.js/auto";

// ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export default function Graph() {
  const ref = useRef();
  // const ctx = document.getElementById('myChart');

  useEffect(() => {
    if (!ref.current) return;
    const data = {
      labels: ["May 12", "May 13", "May 14", "May 15", "May 16", "May 17"],
      datasets: [
        {
          data: [8, 7.8, 6, 8, 7, 5, 6],
        },
      ],
    };
    const options = {};
    const chart = new ChartJS(ref.current, {
      type: "line",
      data,
      options,
    });

    return () => {
        chart.destroy()
      // remove the chart
    };
  }, [ref]);

  return (
    <div className="graph">
      <canvas id="myChart" ref={ref} />
      {/* <Line data={data} option = {options}></Line> */}
    </div>
  );
}
