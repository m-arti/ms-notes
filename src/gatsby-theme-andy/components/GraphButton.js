import React, { useState, lazy, Suspense } from "react";
import useSound from 'use-sound';
import flipSfx from '../../assets/sounds/flip.mp3';
// sfx is by SoundJay (wolfr.am/VeNui6iE)

const Graph = lazy(() => import("./GraphVisualisation"));

const GraphButton = () => {

  const [play] = useSound(flipSfx);

  const [graphState, setGraphState] = useState("hidden");

  return (
    <React.Fragment>
      <button
        style={{ fontSize: '1.75rem', paddingBottom: '5px', textAlign: 'center', lineHeight: '20px' }}
        title="Show graph of notes"
        aria-label="Show graph of notes"
        class="h-8 w-8 pb-1.5 overflow-hidden text-center font-thin transition duration-500 ease-in-out opacity-50 hover:opacity-100"
        onClick={() => {
          setGraphState("maximized");
          if (graphState !== "maximized") play();
        }}
      >
        ⁘
      </button>
      {typeof window !== "undefined" ? (
        <Suspense fallback={null}>
          <Graph graphState={graphState} setGraphState={setGraphState} />
        </Suspense>
      ) : null}
    </React.Fragment>
  );

};

export default GraphButton;
