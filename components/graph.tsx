"use client";

import CytoscapeComponent from "react-cytoscapejs";

export default function Graph({ elements }) {
  return (
    <CytoscapeComponent
      elements={elements}
      style={{ width: "100%", height: "600px" }}
      layout={{ name: "cose" }}
    />
  );
}
