import React from "react";
import TableRow from "./TableRow";

function TableBody({ tableData, onCellChange }) {
  return (
    <tbody>
      {tableData.map((rowData, rowIndex) => (
        <TableRow
          key={rowIndex}
          rowIndex={rowIndex}
          rowData={rowData}
          onCellChange={onCellChange}
        />
      ))}
    </tbody>
  );
}

export default TableBody;
