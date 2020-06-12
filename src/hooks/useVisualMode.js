import React, { useState, useEffect } from 'react'

export default function useVisualMode(initial) {
    const [history, setHistory] = useState([initial]);

    function transition(newMode, replace) {
        replace ? setHistory((history) => [newMode, ...history.slice(1)]) : setHistory(history => [newMode, ...history])
    }

    function back() {
        setHistory((history) => 
        history.length > 1 ? history.slice(1) : history
        )
    }
  
    return { 
        mode: history[0],
        transition,
        back
    };
  }


