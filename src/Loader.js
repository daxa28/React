import React from "react";

const Loader = () => (
  <div style={{ display: "flex", justifyContent: "center", margin: ".5rem", minHeight:"410px" }}>
    <div className="lds-dual-ring" />
  </div>
);

export default Loader;
