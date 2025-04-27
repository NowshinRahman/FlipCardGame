import React from "react";

function FlipCardGrid() {
  const categories = [
    "Settings",
    "Person A",
    "Person B",
    "Tone",
    "Professional Word",
    "Twist",
    "Props",
  ];

  return (
    <div className="grid grid-cols-3 gap-4 p-4 max-w-4xl">
      {categories.map((cat, index) => (
        <div key={index} className="bg-blue-200 h-32 w-40 rounded shadow flex items-center justify-center text-center font-bold">
          {cat}
        </div>
      ))}
    </div>
  );
}

export default FlipCardGrid;
