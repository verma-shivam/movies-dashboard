import React from "react";

const Pill = ({ title, bgColor = "#b1b0b09e", color = "white" }) => {
  return (
    <>
      <span
        className="px-3 py-1 rounded-3 text-uppercase"
        style={{
          color: color,
          backgroundColor: bgColor,
          fontSize: "12px",
          fontWeight: "bold",
          letterSpacing: "1.4px",
        }}
      >
        {title}
      </span>
    </>
  );
};

export default Pill;
