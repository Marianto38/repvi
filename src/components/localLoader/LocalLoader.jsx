import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import './localLoader.scss'

const LocalLoader = () => {
  const blue = useRef(null);
  const red = useRef(null);
  const yellow = useRef(null);
  const green = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      [blue.current, yellow.current],
      0.5,
      { y: 18 },
      { y: -18, yoyo: true, repeat: -1 }
    );
    gsap.fromTo(
      [red.current, green.current],
      0.5,
      { y: -18 },
      { y: 18, repeat: -1, yoyo: true }
    );
  }, []);

  return (
    <div className="loader-local">
  <svg viewBox="0 0 150 33.2" width="180" height="150">
      <circle ref={blue} cx="16.1" cy="16.6" r="16.1" fill="#2EC1AC" />
      <circle ref={red} cx="55.2" cy="16.6" r="16.1" fill="#2EC1AC" />
      <circle ref={yellow} cx="94.3" cy="16.6" r="16.1" fill="#2EC1AC" />
      <circle ref={green} cx="133.4" cy="16.6" r="16.1" fill="#2EC1AC" />
    </svg>
    {/* <p>Cargando...</p> */}
    </div>
  
  );
};

export default LocalLoader;