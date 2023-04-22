import { useState } from 'react';

export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  //Set new mode and add to history
  const transition = function(newMode, replace = false) {
    if (replace) {
      console.log('History BEFORE Replace', history)
      setHistory((prev) => [...prev.slice(0, prev.length - 1), newMode]);
      console.log('History AFTER Replace', history);
    } else {
      setHistory((prev) => [...prev, newMode]);
      console.log('History WITHOUT Replace', history)
    }
  };

  //Go back to previous mode
  const back = function() {
    if (history.length > 1) {
      setHistory((prev) => [...prev.slice(0, prev.length - 1)]);
    }
  };


  //   if (replace) {
  //     setMode(newMode);
  //   } else {
  //     setMode(newMode);
  //     setHistory([...history, newMode]);
  //   }
  // };

  // //Go back to previous mode
  // const back = function() {
  //   if (history.length > 1) {
  //     history.pop();
  //     setMode(history[history.length - 1]);
  //     setHistory([...history]);
  //   }

  return {
    mode: history[history.length - 1],
    transition,
    back
  };
};
