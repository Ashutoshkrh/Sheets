import React from "react";

function TableRow({ rowNumber }) {
  const columns = Array.from({ length: 26 });

  return (
    <tr>
      {/* Sticky row header */}
      <td className="border border-gray-300 px-4 text-[#444746] text-center bg-[#F9FBFD] sticky left-0 z-10">
        {rowNumber}
      </td>
      {/* Render 26 columns */}
      {columns.map((_, colIndex) => (
        <td
          key={`${rowNumber}-${colIndex}`}
          className="border border-gray-300 px-16"
        ></td>
      ))}
    </tr>
  );
}

export default TableRow;
