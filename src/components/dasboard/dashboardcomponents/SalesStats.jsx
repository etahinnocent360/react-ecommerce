import React from "react";
import Chart from "react-google-charts";

export const data = [
  [
    { type: "number", label: "x" },
    { type: "number", label: "values" },
    { id: "i0", type: "number", role: "interval" },
    { id: "i1", type: "number", role: "interval" },
    { id: "i2", type: "number", role: "interval" },
    { id: "i2", type: "number", role: "interval" },
    { id: "i2", type: "number", role: "interval" },
    { id: "i2", type: "number", role: "interval" },
  ],
  [1, 100, 90, 110, 85, 96, 104, 120],
  [2, 120, 95, 130, 90, 113, 124, 140],
  [3, 130, 105, 140, 100, 117, 133, 139],
  [4, 90, 85, 95, 85, 88, 92, 95],
  [5, 70, 74, 63, 67, 69, 70, 72],
  [6, 30, 39, 22, 21, 28, 34, 40],
  [7, 80, 77, 83, 70, 77, 85, 90],
  [8, 100, 90, 110, 85, 95, 102, 110],
];
 const options = {
  title: "Line intervals, default",
  curveType: "function",
  lineWidth: 4,
  intervals: { style: "line" },
  legend: "none",
};

 const pieData = [
  ["Task", "Hours per Day"],
  ["Work", 11],
  ["Eat", 2],
  ["Commute", 2],
  ["Watch TV", 2],
  ["Sleep", 7],
];

export const pieOptions = {
  title: "My Daily Activities",
  is3D: true,
};
function SalesStats() {
  return (
    <div className="stats">
      <div className="flex-2">
        <div className="flex-boxes">
          <Chart
            chartType="LineChart"
            width="100%"
            height="300px"
            data={data}
            options={options}
          />
        </div>
        <div className="flex-boxes">
         <Chart
      chartType="PieChart"
      data={pieData}
      options={pieOptions}
      width={"100%"}
      height={"300px"}
    />
        </div>
        <div className="flex-boxes">
          <Chart
            chartType="LineChart"
            width="100%"
            height="300px"
            data={data}
            options={options}
          />
        </div>
        <div className="flex-boxes">
          <Chart
            chartType="LineChart"
            width="100%"
            height="300px"
            data={data}
            options={options}
          />
        </div>
      </div>
    </div>
  );
}

export default SalesStats;
