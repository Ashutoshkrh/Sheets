import React from "react";

function Header() {
  return (
    <nav className="bg-[#F9FBFD] w-full sticky top-0">
      <div className="flex items-center justify-between p-2">
        <div className="flex items-center">
          <img src="/images/logo.png" alt="icon" />
          <div className="ml-2">
            <h1 className="text-2xl text-[#444746] px-2">Untitled spreadsheet</h1>
            <div className="flex space-x-2 mt-1 text-lg">
              {["File", "Edit", "View", "Insert", "Format", "Data", "Tools", "Extensions", "Help"].map(
                (item) => (
                  <button key={item} className="hover:bg-[#E8EBEE] px-2 rounded-md">
                    {item}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
        <div className="flex space-x-4">
          {/* Add more buttons/icons if needed */}
        </div>
      </div>
    </nav>
  );
}

export default Header;
