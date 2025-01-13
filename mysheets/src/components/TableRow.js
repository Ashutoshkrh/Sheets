import React, { useState } from "react";

/**
 * rowData is an array of objects: { value: string, selected: boolean }
 * We'll adapt your formula logic to work with cellObject.value
 */
function TableRow({
  rowIndex,
  rowData,
  onCellChange,
  onMouseDownCell,
  onMouseOverCell,
}) {
  const [focusedCell, setFocusedCell] = useState(null);

  // Merge your formula logic
  const onCellBlur = (e, rowIndex, colIndex) => {
    const inputValue = e.target.value;

    // Check if the value starts with "="
    if (inputValue.startsWith("=")) {
      const formula = inputValue.slice(1).trim(); // Remove "=" sign

      let result = inputValue; // default is original input if no known formula
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
      // Not a formula => keep input as is
      // Already handled in onChange, so no special action needed
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

  // Helper: sum(1,2,3) => extract [1, 2, 3]
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

      {rowData.map((cellObject, colIndex) => {
        const { value, selected, style } = cellObject;
        

        // If selected => add thicker blue border
        const tdClassName = `  ${
          selected ? "border-blue-300 bg-blue-100 border-2" : "border border-gray-300 min-w-32"
        }`;
        
        // const styleBold = `  ${
        //   selected ? "border-blue-300 bg-blue-100 border-2" : "border border-gray-300 min-w-32"
        // }`;
        const StylesConfig={
          Bold:'font-bold',
          Semibold:'font-semibold',
          Italic: 'italic'
        }
        
        function mystyle(style){
          if(style === "bold") return StylesConfig.Bold;
          else if(style === "semibold") return StylesConfig.Semibold;
          else if(style === 'italic') return StylesConfig.Italic;
        }

        return (
          <td
            key={colIndex}
            className={tdClassName}
            // Mouse events for multi-select
            onMouseDown={() => onMouseDownCell(rowIndex, colIndex)}
            onMouseOver={() => onMouseOverCell(rowIndex, colIndex)}
          >
            <input
            
              type="text"
              className={`w-full h-full focus:outline-none focus:ring-4 focus:ring-blue-500 bg-transparent text-center ${mystyle(style)} ${
                focusedCell &&
                focusedCell.rowIndex === rowIndex &&
                focusedCell.colIndex === colIndex
                ? ""
                : ""
              } 
              `
            }
              style={{ minWidth: "50px" }}
              value={value}
              onChange={(e) => onCellChange(rowIndex, colIndex, e.target.value)}
              onBlur={(e) => onCellBlur(e, rowIndex, colIndex)}
              onFocus={() => setFocusedCell({ rowIndex, colIndex })}
            />
          </td>
        );
      })}
    </tr>
  );
}

export default TableRow;
