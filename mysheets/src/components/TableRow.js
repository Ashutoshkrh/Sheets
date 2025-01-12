import React from "react";

function TableRow({ rowIndex, rowData, onCellChange }) {
  return (
    <tr>
      {/* Sticky row header showing the row number */}
      <td className="border border-gray-300 px-4 text-[#444746] text-center bg-[#F9FBFD] sticky left-0 z-10">
        {rowIndex + 1}
      </td>

      {/* Render each column as an editable cell */}
      {rowData.map((cellValue, colIndex) => (
        <td key={colIndex} className="border border-gray-300 p-2">
          <input
            type="text"
            className="w-full h-full outline-none"
            style={{ backgroundColor: "transparent" }}
            value={cellValue}
            onChange={(e) => onCellChange(rowIndex, colIndex, e.target.value)}
          />
        </td>
      ))}
    </tr>
  );
}

export default TableRow;
