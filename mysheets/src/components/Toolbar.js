import React from "react";

function Toolbar() {
  const icons = [
    "Search",
    "Undo",
    "Redo",
    "Print",
    "Format paint",
    "Frame 14",
    "Frame 15",
    "Frame 17",
    "Format bold",
    "Format italic",
    "Strikethrough s",
    "Frame 18",
    "Frame 19",
    "Format align right",
    "Vertical align bottom",
    "Wrap text",
    "More vert",
  ];

  return (
    <div className="flex items-center p-2 space-x-3 bg-[#F0F4F9] rounded-full m-2">
      {icons.map((icon) => {
        if(icon === "Frame 14" || icon === "Frame 15" || icon === "Frame 17"){

            return (<button
              key={icon}
              className="w-20 h-6 bg-[#444746]"
              style={{
                mask: `url('/images/${icon}.svg') no-repeat center`,
                WebkitMask: `url('/images/${icon}.svg') no-repeat center`,
              }}
            ></button>)
        }
        return (<button
          key={icon}
          className="w-8 h-6 bg-[#444746]"
          style={{
            mask: `url('/images/${icon}.svg') no-repeat center`,
            WebkitMask: `url('/images/${icon}.svg') no-repeat center`,
          }}
        ></button>)
})}
    </div>
  );
}

export default Toolbar;
