import React from "react";
import Plot from "react-plotly.js";

const SankeyChart = () => {
  const labels = [
    "Vendor A", "Vendor B", "Vendor C",
    "Create Session",
    "Validate Address",
    "Create Order",
    "Get Products",
    "Save Products",
    "Submit Order",
    "Dropped @ Create Session",
    "Dropped @ Validate Address",
    "Dropped @ Create Order"
  ];

  const nodeColors = [
    "#ff6666", "#ffb366", "#f9e264", 
    "#5dade2",                       
    "#7fb3d5",                       
    "#9db6e4",                       
    "#b4a9e9",                       
    "#c39bd3",                       
    "#d7bde2",                       
    "#9e9e9e", "#9e9e9e", "#9e9e9e" 
  ];


  const links = {
    source: [
      // Vendors → Create Session
      0, 1, 2,

      // Create Session → Validate Address or drop
      3, 3,

      // Validate Address → Create Order or drop
      4, 4,

      // Create Order → Get Products or drop
      5, 5,

      // Get Products → Save Products only (no drop here)
      6,

      // Save Products → Submit Order only (no drop here)
      7,
    ],
    target: [
      3, 3, 3,       // Vendors → Create Session

      4, 9,          // Create Session → Validate Address / drop

      5, 10,         // Validate Address → Create Order / drop

      6, 11,         // Create Order → Get Products / drop

      7,             // Get Products → Save Products

      8              // Save Products → Submit Order
    ],
    value: [
      40000, 40000, 40000,  // Vendors → Create Session total 120k

      100000, 20000,        // Create Session → Validate / drop

      90000, 10000,         // Validate Address → Create Order / drop

      80000, 10000,         // Create Order → Get Products / drop

      70000,                // Get Products → Save Products (no drop)

      65000                 // Save Products → Submit Order (no drop)
    ],
    color: [
      "#ff6666", "#ffb366", "#f9e264",

      "#5dade2", "#9e9e9e",

      "#7fb3d5", "#9e9e9e",

      "#9db6e4", "#9e9e9e",

      "#b4a9e9",

      "#c39bd3"
    ]
  };

  return (
    <Plot
      data={[
        {
          type: "sankey",
          orientation: "h",
          node: {
            pad: 15,
            thickness: 20,
            line: { color: "black", width: 0.5 },
            label: labels,
            color: nodeColors
          },
          link: links
        }
      ]}
      layout={{
        title: { text: "Session Flow with Drops at Selected Stages", font: { size: 16 } },
        autosize: true,
        margin: { l: 0, r: 0, t: 40, b: 0 }
      }}
      style={{ width: "100%", height: "600px" }}
      useResizeHandler
    />
  );
};

export default SankeyChart;
