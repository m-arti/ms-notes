import React from "react";
import nightwind from "nightwind/helper";
import useSound from 'use-sound';
import switchSfx from '../../assets/sounds/switch.mp3';
// sfx is by SoundJay (wolfr.am/VeLxV630)

const DarkModeToggle = () => {

  const [play] = useSound(switchSfx);

  return (
      <button
        style={{ lineHeight: '20px' }}
        onClick={() => {
          nightwind.toggle();
          play();
        }}
        className="h-8 w-8 overflow-hidden text-center text-xl transition duration-500 ease-in-out opacity-80 hover:opacity-100"
        aria-label="Activate light/dark mode"
        title="Activate light/dark mode"
      >
        ●
      </button>
  );

};

export default DarkModeToggle;
