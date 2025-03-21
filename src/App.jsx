import React, { useEffect, useState } from "react";
import HandshakeSimulation from "./sims/handshakeGame/HandshakeSimulation";
import Simulation from "./sims/simulationOne/Simulation";
import Simulation2 from "./sims/simulationTwo/Simulation";

export const App = () => {
  const sims = [
    {
      name: "Handshake Simulation",
      component: HandshakeSimulation,
    },
    {
      name: "Death Rate Counter in Common Cold Outbreak",
      component: Simulation,
    },
    {
      name: "Unfinished",
      component: Simulation2,
    },
  ];

  const [activeSim, setActiveSim] = useState(undefined);

  const renderChooser = () => (
    <div className="simulation-chooser">
      <h1>Sheba and Chanya's Simulation Playground: We built an agent-based computer model of the spread of a disease and examined the effects of some variables on the infection. </h1>
      <ul>
        {sims.map((sim) => (
          <li key={sim.name}>
            <button onClick={() => setActiveSim(sim)}>{sim.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );

  const renderSim = () => (
    <div className="simulation-container">
      <button className="back-button" onClick={() => setActiveSim(undefined)}>
        Back
      </button>
      <activeSim.component />;
    </div>
  );

  if (activeSim) {
    return renderSim();
  } else {
    return renderChooser();
  }
};

export default App;
