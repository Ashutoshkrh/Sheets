import React, { useState } from "react";
import TableHead from "./TableHead";
import TableBody from "./TableBody";

function Spreadsheet() {
  // 100 rows × 26 columns, all empty
  const initialTableData = Array.from({ length: 100 }, () =>
    Array.from({ length: 26 }, () => "")
  );

  const [tableData, setTableData] = useState(initialTableData);

  // Called on every keystroke in any cell
  const handleCellChange = (rowIndex, colIndex, newValue) => {
    // console.log(
    //   `Cell [row ${rowIndex + 1}, col ${String.fromCharCode(65 + colIndex)}] changed to "${newValue}"`
    // ); 
    setTableData((prevData) => {
      const updatedData = [...prevData];
      updatedData[rowIndex] = [...updatedData[rowIndex]];
      updatedData[rowIndex][colIndex] = newValue;
    
      return updatedData;
    });
  };

  return (
    <div className="w-full overflow-auto shadow-lg mt-4 bg-white h-[calc(100vh-136px)]">
      <table className="table-auto border-collapse border border-gray-300 w-full">
        <TableHead />
        <TableBody tableData={tableData} onCellChange={handleCellChange} />
      </table>
    </div>
  );
}

export default Spreadsheet;
