import React, { useState } from "react";

function Toolbar({ performToolbarOperation, handleBold, handleItalic}) {
  const icons = [
    "Search",
    "Undo",
    "Redo",
    "Print",
    "Format paint",
    "Frame 14",
    "Frame 15",
    "Frame 17",
    "Strikethrough s",
    "Frame 18",
    "Frame 19",
    "Format align right",
    "Vertical align bottom",
    "Wrap text",
    "More vert",
  ];

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleOperationClick = (operation) => {
    performToolbarOperation(operation);
    setDropdownOpen(false); // Close the dropdown after selection
  };

  return (
    <div className="flex items-center p-2 space-x-3 bg-[#F0F4F9] rounded-full m-2">
      {icons.map((icon) => (
        <button
          key={icon}
          className="w-8 h-6 bg-[#444746]"
          style={{
            mask: `url('/images/${icon}.svg') no-repeat center`,
            WebkitMask: `url('/images/${icon}.svg') no-repeat center`,
          }}
        ></button>
      ))}

          <button
          className="w-8 h-6 bg-[#444746]"
          style={{
            mask: `url('/images/Format bold.svg') no-repeat center`,
            WebkitMask: `url('/images/Format bold.svg') no-repeat center`,
          }}
          onClick={handleBold}
        ></button>
        <button
          className="w-8 h-6 bg-[#444746]"
          style={{
            mask: `url('/images/Format italic.svg') no-repeat center`,
            WebkitMask: `url('/images/Format italic.svg') no-repeat center`,
          }}
          onClick={handleItalic}
        ></button>

      {/* Sigma Icon with Dropdown */}
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="w-8 h-10 bg-[#444746]"
          style={{
            mask: `url('/images/Sigma.svg') no-repeat center`,
            WebkitMask: `url('/images/Sigma.svg') no-repeat center`,
          }}
        ></button>

        {isDropdownOpen && (
          <div className="absolute top-full left-0 mt-2 w-32 bg-white rounded-lg shadow-lg z-40">
            {["sum", "min", "max", "average","count"].map((operation) => (
              <button
                key={operation}
                onClick={() => handleOperationClick(operation)}
                className="block w-full px-4 py-2 text-left text-sm hover:bg-blue-100"
              >
                {operation.charAt(0).toUpperCase() + operation.slice(1)}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Toolbar;
