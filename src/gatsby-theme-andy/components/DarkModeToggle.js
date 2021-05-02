import React from "react";

import nightwind from "nightwind/helper";

const DarkModeToggle = () => {
  return (
    <label
      className="text-2xl"
      aria-label="Activate light/dark mode"
      title="Activate light/dark mode"
    >
      <button
        style={{ minWidth:'40px', textAlign: 'center' }}
        onClick={() => nightwind.toggle()}
      >
        ◑
      </button>
      <div/>
    </label>
  );
};

export default DarkModeToggle;
