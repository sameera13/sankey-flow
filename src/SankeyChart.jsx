import React from "react";
import Plot from "react-plotly.js";

const SankeyChart = () => {
  /* ────────────────────────────────
     1. Top-level numbers
  ──────────────────────────────── */
  const TOTAL_SESSIONS = 120_000;           // 3 vendors × 40 000 each

  /* ────────────────────────────────
     2. Node definitions
  ──────────────────────────────── */
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
    "#ff6666", "#ffb366", "#f9e264",   // Vendors
    "#5dade2",                         // Create Session
    "#7fb3d5",                         // Validate Address
    "#9db6e4",                         // Create Order
    "#b4a9e9",                         // Get Products
    "#c39bd3",                         // Save Products
    "#d7bde2",                         // Submit Order
    "#9e9e9e", "#9e9e9e", "#9e9e9e"    // Drop nodes (grey)
  ];

  /* ────────────────────────────────
     3. Link definitions
     (values are example counts; change to real data)
  ──────────────────────────────── */
  const source = [
    // Vendors → Create Session
    0, 1, 2,

    // Create Session → Validate Address / drop
    3, 3,

    // Validate Address → Create Order / drop
    4, 4,

    // Create Order → Get Products / drop
    5, 5,

    // Get Products → Save Products
    6,

    // Save Products → Submit Order
    7
  ];

  const target = [
    3, 3, 3,       // Vendors → Create Session

    4, 9,          // Create Session → Validate / drop

    5, 10,         // Validate Address → Create Order / drop

    6, 11,         // Create Order → Get Products / drop

    7,             // Get Products → Save Products

    8              // Save Products → Submit Order
  ];

  /* Absolute session counts for each link   */
  const value = [
    40000, 40000, 40000,   // Vendors → Create Session  (120 000)

    100000, 20000,         // Create Session → Validate / drop

    90000, 10000,          // Validate Address → Create Order / drop

    80000, 10000,          // Create Order → Get Products / drop

    70000,                 // Get Products → Save Products

    65000                  // Save Products → Submit Order
  ];

  /* Grey for any link that ends in a drop node */
  const linkColors = [
    "#ff6666", "#ffb366", "#f9e264",
    "#5dade2", "#9e9e9e",
    "#7fb3d5", "#9e9e9e",
    "#9db6e4", "#9e9e9e",
    "#b4a9e9",
    "#c39bd3"
  ];

  /* customdata → percentage of TOTAL_SESSIONS for each link */
  const customdata = value.map(v => v / TOTAL_SESSIONS);

  /* ────────────────────────────────
     4. Render Plotly Sankey
  ──────────────────────────────── */
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
          link: {
            source,
            target,
            value,
            color: linkColors,
            customdata,
            /* Tooltip with percentage (1 decimal) */
            hovertemplate:
              "%{source.label} → %{target.label}<br>" +
              "Sessions: %{value}<br>" +
              "Share: %{customdata:.1%}<extra></extra>"
          }
        }
      ]}
      layout={{
        title: {
          text: "Session Flow with Stage-Specific Drop-Offs (Counts & Percentages)",
          font: { size: 16 }
        },
        autosize: true,
        margin: { l: 0, r: 0, t: 40, b: 0 }
      }}
      style={{ width: "100%", height: "600px" }}
      useResizeHandler
    />
  );
};

export default SankeyChart;
