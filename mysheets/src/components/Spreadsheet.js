import React, { useState } from "react";
import TableHead from "./TableHead";
import TableBody from "./TableBody";

function Spreadsheet() {
  // For DEMO, let's do 10 rows × 5 columns:
  // Each cell is { value: "", selected: false }
  const initialTableData = Array.from({ length: 50 }, () =>
    Array.from({ length: 26 }, () => ({ value: "", selected: false }))
  );

  const [tableData, setTableData] = useState(initialTableData);

  // Track selection state
  const [isSelecting, setIsSelecting] = useState(false);
  const [startCell, setStartCell] = useState(null); // for rectangular selection

  /* ---------------------------
      1) Cell Value Changes
  ----------------------------*/
  const handleCellChange = (rowIndex, colIndex, newValue) => {
    setTableData((prev) => {
      const updated = [...prev];
      updated[rowIndex] = [...updated[rowIndex]];
      updated[rowIndex][colIndex] = {
        ...updated[rowIndex][colIndex],
        value: newValue,
      };
      return updated;
    });

    console.log(
      `Cell [row ${rowIndex + 1}, col ${String.fromCharCode(
        65 + colIndex
      )}] changed to "${newValue}"`
    );
  };

  /* --------------------------------------
      2) Mouse Down: Start Selection
  ---------------------------------------*/
  const handleMouseDownCell = (rowIndex, colIndex) => {
    setIsSelecting(true);
    setStartCell({ row: rowIndex, col: colIndex });
    // Immediately highlight this one cell
    setTableData((prev) =>
      selectRectangle(prev, rowIndex, colIndex, rowIndex, colIndex)
    );
  };

  /* --------------------------------------
      3) Mouse Over: Drag Selection
  ---------------------------------------*/
  const handleMouseOverCell = (rowIndex, colIndex) => {
    if (!isSelecting || !startCell) return;
    setTableData((prev) =>
      selectRectangle(prev, startCell.row, startCell.col, rowIndex, colIndex)
    );
  };

  /* -----------------------------------
      4) Mouse Up: End Selection
  ------------------------------------*/
  const handleMouseUp = () => {
    setIsSelecting(false);
    setStartCell(null);
  };

  /* -----------------------------------
      5) Helper: Select Rectangle
  ------------------------------------*/
  const selectRectangle = (
    prevData,
    startRow,
    startCol,
    endRow,
    endCol
  ) => {
    const newData = prevData.map((row) => [...row]);
    const minRow = Math.min(startRow, endRow);
    const maxRow = Math.max(startRow, endRow);
    const minCol = Math.min(startCol, endCol);
    const maxCol = Math.max(startCol, endCol);

    for (let r = 0; r < newData.length; r++) {
      for (let c = 0; c < newData[r].length; c++) {
        if (r >= minRow && r <= maxRow && c >= minCol && c <= maxCol) {
          // within rectangle
          newData[r][c] = { ...newData[r][c], selected: true };
        } else {
          // outside rectangle
          newData[r][c] = { ...newData[r][c], selected: false };
        }
      }
    }
    return newData;
  };

  return (
    <div
      className="w-full overflow-auto shadow-lg mt-4 bg-white h-[calc(100%-136px)]"
      onMouseUp={handleMouseUp}
    >
      <table className="table-auto border-collapse border border-gray-300 w-full">
        <TableHead />
        <TableBody
          tableData={tableData}
          onCellChange={handleCellChange}
          onMouseDownCell={handleMouseDownCell}
          onMouseOverCell={handleMouseOverCell}
        />
      </table>
    </div>
  );
}

export default Spreadsheet;
