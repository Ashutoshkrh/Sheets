import React from "react";
import TableHead from "./TableHead";
import TableBody from "./TableBody";

function Spreadsheet() {
  return (
    <div className="w-full overflow-auto shadow-lg mt-4 bg-white h-[calc(100%-136px)]">
      <table className="table-auto border-collapse border border-gray-300 w-full">
        <TableHead />
        <TableBody />
      </table>
    </div>
  );
}

export default Spreadsheet;
