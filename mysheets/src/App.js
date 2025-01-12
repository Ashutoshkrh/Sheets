import React from "react";
import Header from "./components/Header";
import Toolbar from "./components/Toolbar";
import Spreadsheet from "./components/Spreadsheet";

function App() {
  return (
    <div className="overflow-clip h-screen w-screen bg-white">
      <Header />
      <Toolbar />
      <Spreadsheet />
    </div>
  );
}

export default App;
