import React from "react";
import TableRow from "./TableRow";

function TableBody({
  tableData,
  onCellChange,
  onMouseDownCell,
  onMouseOverCell,
}) {
  return (
    <tbody>
      {tableData.map((rowData, rowIndex) => (
        <TableRow
          key={rowIndex}
          rowIndex={rowIndex}
          rowData={rowData}
          onCellChange={onCellChange}
          onMouseDownCell={onMouseDownCell}
          onMouseOverCell={onMouseOverCell}
        />
      ))}
    </tbody>
  );
}

export default TableBody;