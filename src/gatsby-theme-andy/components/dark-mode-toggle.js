import React from "react";

import nightwind from "nightwind/helper";

const DarkModeToggle = () => {

  return (
    <label
      className="text-2xl"
      aria-label="Activate light/dark mode"
      title="Activate light/dark mode"
    >
      <button className="" style={{ minWidth:'50px', opacity:'0.85' }} onClick={() => nightwind.toggle()}>◑</button>
      <div/>
    </label>
  );
};

export default DarkModeToggle;
