import React, { useState, lazy, Suspense } from "react";

const Graph = lazy(() => import("./GraphVisualisation"));

const GraphButton = () => {

  const [graphState, setGraphState] = useState("hidden");

  return (
    <React.Fragment>
      <button
        style={{ minWidth:'30px', textAlign: 'right' }}
        title="Show graph of notes"
        aria-label="Show graph of notes"
        className="text-3xl"
        onClick={() => setGraphState("maximized")}
      >
        ⊞
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
