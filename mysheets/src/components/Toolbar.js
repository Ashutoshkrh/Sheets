import React, { useState } from "react";

function Toolbar({ performToolbarOperation, handleBold, handleItalic, handleRedText, handleYellowText, handleGreenText, handleBlueText, handleUppercase ,handleLowercase,handleStrikethrough }) {
  const icons = [];

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isTextColorDropdownOpen, setTextColorDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const toggleTextColorDropdown = () => {
    setTextColorDropdownOpen(!isTextColorDropdownOpen);
  };

  const handleOperationClick = (operation) => {
    performToolbarOperation(operation);
    setDropdownOpen(false); // Close the dropdown after selection
  };

  const handleTextColorClick = (color) => {
    if (color === "red") {
      handleRedText();
    } else if (color === "yellow") {
      handleYellowText();
    } else if (color === "green") {
      handleGreenText();
    }else if(color === "blue"){
      handleBlueText();
    }
    setTextColorDropdownOpen(false); // Close the dropdown after selection
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

      <button
        className="w-10 h-6 bg-[#444746]"
        style={{
          mask: `url('/images/lowercase-to-uppercase-icon.svg') no-repeat center`,
          WebkitMask: `url('/images/lowercase-to-uppercase-icon.svg') no-repeat center`,
        }}
        onClick={handleUppercase}
      ></button>

      <button
        className="w-10 h-6 bg-[#444746]"
        style={{
          mask: `url('/images/uppercase-to-lowercase-icon.svg') no-repeat center`,
          WebkitMask: `url('/images/uppercase-to-lowercase-icon.svg') no-repeat center`,
        }}
        onClick={handleLowercase}
      ></button>

        <button
        className="w-10 h-6 bg-[#444746]"
        style={{
          mask: `url('/images/Strikethrough s.svg') no-repeat center`,
          WebkitMask: `url('/images/Strikethrough s.svg') no-repeat center`,
        }}
        onClick={handleStrikethrough}
      ></button>
      {/* Frame 18 Icon with Text Color Dropdown */}
      <div className="relative">
        <button
          onClick={toggleTextColorDropdown}
          className="w-8 h-6 bg-[#444746]"
          style={{
            mask: `url('/images/Frame 18.svg') no-repeat center`,
            WebkitMask: `url('/images/Frame 18.svg') no-repeat center`,
          }}
        ></button>

        {isTextColorDropdownOpen && (
          <div className="absolute top-full left-0 mt-2 w-32 bg-white rounded-lg shadow-lg z-40">
            <button
              onClick={() => handleTextColorClick("red")}
              className="block w-full px-4 py-2 text-left text-red-500 hover:bg-red-300"
            >
              Red
            </button>
            <button
              onClick={() => handleTextColorClick("yellow")}
              className="block w-full px-4 py-2 text-left text-yellow-500 hover:bg-yellow-100"
            >
              Yellow
            </button>
            <button
              onClick={() => handleTextColorClick("green")}
              className="block w-full px-4 py-2 text-left text-green-500 hover:bg-green-100"
            >
              Green
            </button>
            <button
              onClick={() => handleTextColorClick("blue")}
              className="block w-full px-4 py-2 text-left text-blue-500 hover:bg-blue-100"
            >
              Blue
            </button>
          </div>
        )}
      </div>

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
            {["sum", "min", "max", "average", "count"].map((operation) => (
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