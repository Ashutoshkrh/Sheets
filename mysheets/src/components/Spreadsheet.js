import React, { useState } from "react";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import Toolbar from "./Toolbar";

function Spreadsheet() {
  const initialTableData = Array.from({ length: 50}, () =>
    Array.from({ length: 26 }, () => ({ value: "", selected: false, style: "regular", bgColor: ""}))
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
    let maxSelectedRow = -1;
    let minSelectedCol = Number.MAX_SAFE_INTEGER;
  
    // Collect numeric values from selected cells and determine bounds
    tableData.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell.selected) {
          if (cell.value !== "" && !isNaN(parseFloat(cell.value))) {
            selectedValues.push(parseFloat(cell.value)); // Collect numeric values
          }
          maxSelectedRow = Math.max(maxSelectedRow, rowIndex); // Track the maximum row index
          minSelectedCol = Math.min(minSelectedCol, colIndex); // Track the minimum column index
        }
      });
    });
  
    // If no valid numeric values are found, exit the function
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
        result = selectedValues.length; // Count only valid numeric values
        break;
      default:
        console.error("Unsupported operation:", operation);
    }
  
    if (result !== null && maxSelectedRow !== -1 && minSelectedCol !== Number.MAX_SAFE_INTEGER) {
      // Insert result into the first selected column of the row below the last selected row
      const targetRow = maxSelectedRow + 1;
  
      setTableData((prev) => {
        const updated = [...prev];
        // Ensure the target row exists
        if (!updated[targetRow]) {
          updated[targetRow] = Array.from({ length: 26 }, () => ({
            value: "",
            selected: false,
            style: "regular",
            bgColor: "",
          }));
        }
        // Update the first selected column of the target row
        updated[targetRow][minSelectedCol] = {
          ...updated[targetRow][minSelectedCol],
          value: result.toString(),
        };
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

  const handleRedText = () => {
    setTableData((prev) => {
      return prev.map((row) =>
        row.map((cell) =>
          cell.selected
            ? { ...cell, style: "redText" } // Update style to red for selected cells
            : { ...cell }
        )
      );
    });
  };

  const handleYellowText = () => {
    setTableData((prev) => {
      return prev.map((row) =>
        row.map((cell) =>
          cell.selected
            ? { ...cell, style: "yellowText" } // Update style to yellow for selected cells
            : { ...cell }
        )
      );
    });
  };

  const handleGreenText = () => {
    setTableData((prev) => {
      return prev.map((row) =>
        row.map((cell) =>
          cell.selected
            ? { ...cell, style: "greenText" } // Update style to green for selected cells
            : { ...cell }
        )
      );
    });
  };
  const handleBlueText = () => {
    setTableData((prev) => {
      return prev.map((row) =>
        row.map((cell) =>
          cell.selected
            ? { ...cell, style: "blueText" } // Update style to green for selected cells
            : { ...cell }
        )
      );
    });
  };

  // Background color functions
  const handleRedBg = () => {
    setTableData((prev) => {
      return prev.map((row) =>
        row.map((cell) =>
          cell.selected
            ? { ...cell, style: "backgroundRed" } // Update background to red for selected cells
            : { ...cell }
        )
      );
    });
  };

  const handleYellowBg = () => {
    setTableData((prev) => {
      return prev.map((row) =>
        row.map((cell) =>
          cell.selected
            ? { ...cell, style: "backgroundYellow" } // Update background to yellow for selected cells
            : { ...cell }
        )
      );
    });
  };

  const handleGreenBg = () => {
    setTableData((prev) => {
      return prev.map((row) =>
        row.map((cell) =>
          cell.selected
            ? { ...cell, style: "backgroundGreen" } // Update background to green for selected cells
            : { ...cell }
        )
      );
    });
  };

  // Uppercase function
  const handleUppercase = () => {
    setTableData((prev) => {
      return prev.map((row) =>
        row.map((cell) =>
          cell.selected
            ? { ...cell, style: "uppercase" } // Convert text to uppercase for selected cells
            : { ...cell }
        )
      );
    });
  };

  // Lowercase function
  const handleLowercase = () => {
    setTableData((prev) => {
      return prev.map((row) =>
        row.map((cell) =>
          cell.selected
            ? { ...cell, style: "lowercase" } // Convert text to lowercase for selected cells
            : { ...cell }
        )
      );
    });
  };

  return (
    <>
      <Toolbar
        performToolbarOperation={performToolbarOperation}
        handleBold={handleBold}
        handleItalic={handleItalic}
        handleRedText={handleRedText}
        handleYellowText={handleYellowText}
        handleGreenText={handleGreenText}
        handleBlueText={handleBlueText}
        handleRedBg={handleRedBg}
        handleYellowBg={handleYellowBg}
        handleGreenBg={handleGreenBg}
        handleUppercase={handleUppercase}
        handleLowercase={handleLowercase}
      />
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
