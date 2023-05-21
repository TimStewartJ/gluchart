import React, { useEffect, useRef } from "react";
import "../CSS/Graph.css";
import ChartJS from "chart.js/auto";

export default function Graph({ results })
{
  const ref = useRef();
  const chartRef = useRef(null);


  useEffect(() =>
  {
    const predGraphData = []
    for (let i = 0; i < results.curr.length - 1; i++)
    {
      predGraphData.push(null)
    }
    results.pred.forEach(element =>
    {
      predGraphData.push(element)
    });

    const initialGraphData = {
      labels: ["-30", "-25", "-20", "-15", "-10", "-5", "0", "5", "10", "15", "20", "25", "30"],
      datasets: [
        {
          data: results.curr,
          borderColor: "black",
        },
        {
          data: predGraphData,
          borderColor: "green",
        },
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
              size: 12,
              weight: 600,
            },
          },
        },
        y: {
          display: true,
          title: {
            display: true,
            text: "mg/dL",
            padding: {
              bottom: 20,
            },
            font: {
              size: 12,
              weight: 600,
            },
          },
        },
      },
    };

    if (!chartRef.current)
    {
      // Create the chart if it doesn't exist
      chartRef.current = new ChartJS(ref.current, {
        type: "line",
        data: initialGraphData,
        options,
      });
    } else
    {
      // Update the chart data and options if it exists
      chartRef.current.data = initialGraphData;
      chartRef.current.options = options;
      chartRef.current.update();
    }

    return () =>
    {
      if (chartRef.current)
      {
        // Destroy the chart instance on component cleanup
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [results]);

  return (
    <div className="graph">
      <canvas ref={ref} style={{ width: "100%", height: "300px" }} />
    </div>
  );
}
