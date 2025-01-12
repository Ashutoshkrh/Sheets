import React from "react";
import TableRow from "./TableRow";

function TableBody() {
  const rows = Array.from({ length: 1000 }, (_, i) => i + 1);

  return (
    <tbody>
      {rows.map((rowNumber) => (
        <TableRow key={rowNumber} rowNumber={rowNumber} />
      ))}
    </tbody>
  );
}

export default TableBody;
