"use client";
import { useSyncExternalStore } from "react";
const subscribe = (listener: () => void) => {
  window.addEventListener("popstate", listener);
  return () => window.removeEventListener("popstate", listener);
};
export function useQueryString() {
  return useSyncExternalStore(
    subscribe,
    () => window.location.search,
    () => "",
  );
}
