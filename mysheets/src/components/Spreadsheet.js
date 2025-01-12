import React, { useState } from "react";
import TableHead from "./TableHead";
import TableBody from "./TableBody";

function Spreadsheet() {
  // Create the initial table data: 1000 rows × 26 columns, all empty strings
  const initialTableData = Array.from({ length: 1000 }, () =>
    Array.from({ length: 26 }, () => "")
  );

  const [tableData, setTableData] = useState(initialTableData);

  // Handle cell value changes
  const handleCellChange = (rowIndex, colIndex, newValue) => {
    setTableData((prevData) => {
      // Copy the previous data to avoid direct mutation
      const updatedData = [...prevData];
      updatedData[rowIndex] = [...updatedData[rowIndex]];
      updatedData[rowIndex][colIndex] = newValue;
      return updatedData;
    });

    // Log to console whenever the user types in a cell
    console.log(`Changed cell [${rowIndex + 1}, ${String.fromCharCode(65 + colIndex)}] to: "${newValue}"`);
  };

  return (
    <div className="w-full overflow-auto shadow-lg mt-4 bg-white h-[calc(100%-136px)]">
      <table className="table-auto border-collapse border border-gray-300 w-full">
        <TableHead />
        <TableBody tableData={tableData} onCellChange={handleCellChange} />
      </table>
    </div>
  );
}

export default Spreadsheet;
