import { useState } from 'react';

export default function useVisualMode(initialMode) {
  const [history, setHistory] = useState([initialMode]);

  //Set new mode and add to history
  const transition = function(newMode, replace = false) {
    //If replace is truthy, remove last element in history and add newMode. Otherwise, just add newMode
    if (replace) {
      setHistory((prev) => [...prev.slice(0, prev.length - 1), newMode]);
    } else {
      setHistory((prev) => [...prev, newMode]);
    }
  };

  //Go back to previous mode
  const back = function() {
    if (history.length > 1) {
      setHistory((prev) => [...prev.slice(0, prev.length - 1)]);
    }
  };

  return {
    mode: history[history.length - 1],
    transition,
    back
  };
};

