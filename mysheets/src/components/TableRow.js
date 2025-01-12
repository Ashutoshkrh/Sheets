import React, { useState } from "react";

function TableRow({ rowIndex, rowData, onCellChange }) {
  const [focusedCell, setFocusedCell] = useState(null);

  const onCellBlur = (e, rowIndex, colIndex) => {
    const inputValue = e.target.value;

    // Check if the value starts with "="
    if (inputValue.startsWith("=")) {
      const formula = inputValue.slice(1).trim(); // Remove the "=" sign
      
      // Only process if the formula is one of the supported types
      let result = inputValue; // Default to the original input if no formula is matched

      if (formula.startsWith("sum")) {
        result = handleSum(formula);
      } else if (formula.startsWith("average")) {
        result = handleAverage(formula);
      } else if (formula.startsWith("max")) {
        result = handleMax(formula);
      } else if (formula.startsWith("min")) {
        result = handleMin(formula);
      } else if (formula.startsWith("count")) {
        result = handleCount(formula);
      }

      // Set the calculated result back to the cell
      onCellChange(rowIndex, colIndex, result);
    } else {
      // If not a formula, just leave the input as is
      console.log("Input value:", inputValue);
    }
  };

  const handleSum = (formula) => {
    const numbers = extractNumbers(formula);
    return numbers.reduce((acc, num) => acc + num, 0);
  };

  const handleAverage = (formula) => {
    const numbers = extractNumbers(formula);
    return numbers.reduce((acc, num) => acc + num, 0) / numbers.length;
  };

  const handleMax = (formula) => {
    const numbers = extractNumbers(formula);
    return Math.max(...numbers);
  };

  const handleMin = (formula) => {
    const numbers = extractNumbers(formula);
    return Math.min(...numbers);
  };

  const handleCount = (formula) => {
    const numbers = extractNumbers(formula);
    return numbers.length;
  };

  // Function to extract numbers from a formula like sum(1,2,3)
  const extractNumbers = (formula) => {
    const numbersString = formula
      .slice(formula.indexOf("(") + 1, formula.indexOf(")"))
      .split(",");
    return numbersString.map((num) => parseFloat(num.trim()));
  };

  return (
    <tr>
      {/* Sticky row number */}
      <td className="border border-gray-300 px-4 text-[#444746] text-center bg-[#F9FBFD] sticky left-0 z-10">
        {rowIndex + 1}
      </td>
      {rowData.map((cellValue, colIndex) => (
        <td key={colIndex} className="border border-gray-300 min-w-32">
          <input
            type="text"
            className={`w-full h-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent ${
              focusedCell && focusedCell.rowIndex === rowIndex && focusedCell.colIndex === colIndex
                ? ""
                : ""
            }`}
            style={{ minWidth: "50px" }}
            value={cellValue}
            onChange={(e) => onCellChange(rowIndex, colIndex, e.target.value)}
            onBlur={(e) => onCellBlur(e, rowIndex, colIndex)}
            onFocus={() => setFocusedCell({ rowIndex, colIndex })}
          />
        </td>
      ))}
    </tr>
  );
}

export default TableRow;
