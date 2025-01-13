import React, { useState } from "react";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import Toolbar from "./Toolbar";

function Spreadsheet() {
  const initialTableData = Array.from({ length: 50}, () =>
    Array.from({ length: 26 }, () => ({ value: "", selected: false, style: "regular"}))
  );

  const [tableData, setTableData] = useState(initialTableData);
  const [isSelecting, setIsSelecting] = useState(false);
  const [startCell, setStartCell] = useState(null);

  // Update the value of a specific cell
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
  };

  // Mouse-down: Start selection
  const handleMouseDownCell = (rowIndex, colIndex) => {
    setIsSelecting(true);
    setStartCell({ row: rowIndex, col: colIndex });
    setTableData((prev) =>
      selectRectangle(prev, rowIndex, colIndex, rowIndex, colIndex)
    );
  };

  // Mouse-over: Drag selection
  const handleMouseOverCell = (rowIndex, colIndex) => {
    if (!isSelecting || !startCell) return;
    setTableData((prev) =>
      selectRectangle(prev, startCell.row, startCell.col, rowIndex, colIndex)
    );
  };

  // Mouse-up: End selection
  const handleMouseUp = () => {
    setIsSelecting(false);
    setStartCell(null);
  };

  // Helper: Select rectangle of cells
  const selectRectangle = (prevData, startRow, startCol, endRow, endCol) => {
    const newData = prevData.map((row) => [...row]);
    const minRow = Math.min(startRow, endRow);
    const maxRow = Math.max(startRow, endRow);
    const minCol = Math.min(startCol, endCol);
    const maxCol = Math.max(startCol, endCol);

    for (let r = 0; r < newData.length; r++) {
      for (let c = 0; c < newData[r].length; c++) {
        if (r >= minRow && r <= maxRow && c >= minCol && c <= maxCol) {
          newData[r][c] = { ...newData[r][c], selected: true };
        } else {
          newData[r][c] = { ...newData[r][c], selected: false };
        }
      }
    }
    return newData;
  };

  // Toolbar operation: Calculate sum, average, etc., and insert the result
  const performToolbarOperation = (operation) => {
    const selectedValues = [];
    let targetRow = null;
    let targetCol = null;

    tableData.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell.selected) {
          selectedValues.push(parseFloat(cell.value) || 0); // Ignore non-numeric values
          targetRow = rowIndex;
          targetCol = colIndex;
        }
      });
    });

    if (selectedValues.length === 0) return;

    let result = null;
    switch (operation) {
      case "sum":
        result = selectedValues.reduce((a, b) => a + b, 0);
        break;
      case "average":
        result = selectedValues.reduce((a, b) => a + b, 0) / selectedValues.length;
        break;
      case "min":
        result = Math.min(...selectedValues);
        break;
      case "max":
        result = Math.max(...selectedValues);
        break;
        case "count":
        // Count only the cells with numeric values
        result = selectedValues.filter(value => !isNaN(value) && value !== "").length;
        break;
      default:
        console.error("Unsupported operation:", operation);
    }

    if (result !== null && targetRow !== null && targetCol !== null) {
      // Insert result into the cell to the right of the bottom-right corner of the selection
      const nextRow = targetRow;
      const nextCol = targetCol + 1;

      setTableData((prev) => {
        const updated = [...prev];
        if (updated[nextRow] && updated[nextRow][nextCol]) {
          updated[nextRow][nextCol] = {
            ...updated[nextRow][nextCol],
            value: result.toString(),
          };
        }
        return updated;
      });
    }
  };

  const handleBold = () => {
    setTableData((prev) => {
      return prev.map((row) =>
        row.map((cell) =>
          cell.selected
            ? { ...cell, style: "bold" } // Update style to bold for selected cells
            : { ...cell }
        )
      );
    });
  };
  const handleItalic = () => {
    setTableData((prev) => {
      return prev.map((row) =>
        row.map((cell) =>
          cell.selected
            ? { ...cell, style: "italic" } // Update style to italic for selected cells
            : { ...cell }
        )
      );
    });
  };
  
  return (
    <>
    <Toolbar performToolbarOperation={performToolbarOperation} handleBold={handleBold} handleItalic = {handleItalic}/>
        <div
          className="w-full overflow-auto shadow-lg mt-4 bg-white h-[calc(100%-136px)]"
          onMouseUp={handleMouseUp}
        >
          {/* Toolbar with operations */}
          
    
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
    </>
      );
    }
export default Spreadsheet;
