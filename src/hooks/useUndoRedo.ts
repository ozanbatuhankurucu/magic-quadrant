import { useCallback, useReducer } from "react";

interface UndoRedoState<T> {
  past: T[];
  present: T;
  future: T[];
}

type Action<T> =
  | { type: "SET"; payload: T }
  | { type: "UNDO" }
  | { type: "REDO" }
  | { type: "RESET"; payload: T };

function reducer<T>(state: UndoRedoState<T>, action: Action<T>): UndoRedoState<T> {
  switch (action.type) {
    case "SET":
      return {
        past: [...state.past, state.present],
        present: action.payload,
        future: [],
      };
    case "UNDO": {
      if (state.past.length === 0) return state;
      const previous = state.past[state.past.length - 1]!;
      return {
        past: state.past.slice(0, -1),
        present: previous,
        future: [state.present, ...state.future],
      };
    }
    case "REDO": {
      if (state.future.length === 0) return state;
      const next = state.future[0]!;
      return {
        past: [...state.past, state.present],
        present: next,
        future: state.future.slice(1),
      };
    }
    case "RESET":
      return { past: [], present: action.payload, future: [] };
    default:
      return state;
  }
}

export function useUndoRedo<T>(initialPresent: T) {
  const [state, dispatch] = useReducer(reducer<T>, {
    past: [],
    present: initialPresent,
    future: [],
  });

  const set = useCallback((value: T) => dispatch({ type: "SET", payload: value }), []);
  const undo = useCallback(() => dispatch({ type: "UNDO" }), []);
  const redo = useCallback(() => dispatch({ type: "REDO" }), []);
  const reset = useCallback((value: T) => dispatch({ type: "RESET", payload: value }), []);

  return {
    state: state.present,
    set,
    undo,
    redo,
    reset,
    canUndo: state.past.length > 0,
    canRedo: state.future.length > 0,
  };
}
