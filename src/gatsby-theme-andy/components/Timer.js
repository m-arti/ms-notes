import React from "react";
import useSound from 'use-sound';
import switchSfx from '../../assets/sounds/switch.mp3';
// sfx is by SoundJay (wolfr.am/VeLxV630)

const Timer = () => {

  const [play] = useSound(switchSfx);

  return (
      <button
        style={{ minWidth:'35px', textAlign: 'center' }}
        onClick={() => {
          play();
        }}
        className="text-2xl font-sans transition duration-500 ease-in-out opacity-80 hover:opacity-100"
        aria-label="..."
        title="..."
      >
        ⧖
      </button>
  );

};

export default Timer;
