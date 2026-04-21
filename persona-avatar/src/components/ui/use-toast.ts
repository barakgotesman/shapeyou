import * as React from "react";
import type { ToastProps } from "./toast";

type ToastInput = Pick<ToastProps, "variant" | "className"> & {
  title?: React.ReactNode;
  description?: React.ReactNode;
};

type ToastState = ToastInput & { id: string; open: boolean };

type Action =
  | { type: "ADD"; toast: ToastState }
  | { type: "DISMISS"; id: string }
  | { type: "REMOVE"; id: string };

let count = 0;
const listeners: Array<(state: ToastState[]) => void> = [];
let memoryState: ToastState[] = [];

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((l) => l(memoryState));
}

function reducer(state: ToastState[], action: Action): ToastState[] {
  switch (action.type) {
    case "ADD":    return [action.toast, ...state].slice(0, 3);
    case "DISMISS": return state.map((t) => t.id === action.id ? { ...t, open: false } : t);
    case "REMOVE": return state.filter((t) => t.id !== action.id);
  }
}

export function toast(props: ToastInput) {
  const id = String(++count);
  dispatch({ type: "ADD", toast: { ...props, id, open: true } });
  setTimeout(() => dispatch({ type: "DISMISS", id }), 4000);
  setTimeout(() => dispatch({ type: "REMOVE", id }), 4400);
}

export function useToast() {
  const [toasts, setToasts] = React.useState<ToastState[]>(memoryState);
  React.useEffect(() => {
    listeners.push(setToasts);
    return () => { listeners.splice(listeners.indexOf(setToasts), 1); };
  }, []);
  return { toasts, toast, dismiss: (id: string) => dispatch({ type: "DISMISS", id }) };
}
