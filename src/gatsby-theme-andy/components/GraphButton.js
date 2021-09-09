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
        style={{ fontSize: '2.1rem', minWidth:'35px', textAlign: 'center', marginRight:'5px', lineHeight: '20px' }}
        title="Show graph of notes"
        aria-label="Show graph of notes"
        className="transition duration-500 ease-in-out opacity-80 hover:opacity-100"
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
