import React, { useCallback } from "react";
import Particles from "react-particles";
import type { Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import * as options from "../../public/particles.json" assert { type: "JSON" };

export function StarsContainer() {
  // this customizes the component tsParticles installation
  const customInit = useCallback(async (engine: Engine) => {
    // this adds the bundle to tsParticles
    await loadFull(engine);
  }, []);

  console.log(options)
  
  return <Particles init={customInit} className="opacity-20" />;
}