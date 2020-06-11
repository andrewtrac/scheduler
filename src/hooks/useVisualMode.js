import React, { useState, useEffect } from 'react'

export default function useVisualMode(initial) {
    const [mode, setMode] = useState(initial);
    const [history, setHistory] = useState([initial]);


    function transition(newMode, replace) {
        replace ? setHistory([initial]) : setHistory([...history, mode])
        return setMode(newMode)
    }

    function back() {
        return ( 
        setMode(history[history.length - 1]), 
        setHistory[history.pop()]
        )
    }
  
    return { 
        mode,
        transition,
        back
    };
  }