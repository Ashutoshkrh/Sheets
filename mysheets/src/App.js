import React from "react";
import Header from "./components/Header";

import Spreadsheet from "./components/Spreadsheet";

function App() {
  return (
    <div className="overflow-clip h-screen w-screen bg-white">
      <Header />
     
      <Spreadsheet />
    </div>
  );
}

export default App;
