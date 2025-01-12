import React from "react";

function Toolbar({ performToolbarOperation }) {
  return (
    <div className="flex items-center p-2 space-x-3 bg-[#F0F4F9] rounded-full m-2">
      <button
        onClick={() => performToolbarOperation("sum")}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Sum
      </button>
      <button
        onClick={() => performToolbarOperation("average")}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Average
      </button>
      <button
        onClick={() => performToolbarOperation("min")}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Min
      </button>
      <button
        onClick={() => performToolbarOperation("max")}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Max
      </button>
    </div>
  );
}

export default Toolbar;
