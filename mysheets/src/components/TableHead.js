import React from "react";

function TableHead({ cols = 26 }) {
  const columns = Array.from({ length: cols }, (_, i) => String.fromCharCode(65 + i));

  return (
    <thead className="bg-[#F9FBFD] sticky top-0 z-20">
      <tr>
        {/* Empty top-left corner cell */}
        <th className="border-gray-300 px-4 py-2 pt-0 sticky left-0 border-2 bg-[#F9FBFD]"></th>
        {columns.map((col) => (
          <th
            key={col}
            className="border border-gray-300 px-4 py-2 text-xs font-normal text-[#444746] bg-[#F9FBFD]"
          >
            {col}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHead;