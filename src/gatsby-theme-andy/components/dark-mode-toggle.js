/* based on @mathieudutour's repo: wolfr.am/UvTRCBke */

import React from "react";

import nightwind from "nightwind/helper";

import "./dark-mode-toggle.css";

const DarkModeToggle = () => {

  return (
    <label
      className="dark-mode-toggle"
      aria-label="Activate light/dark mode"
      title="Activate light/dark mode"
    >
      <input type="checkbox" defaultChecked={false} onClick={() => nightwind.toggle()} />
      <div/>
    </label>
  );
};

export default DarkModeToggle;

// <label
//   className="dark-mode-toggle"
// >
//   <button className="dark-mode-toggle" onClick={() => nightwind.toggle()}></button>
//   <div/>
// </label>
