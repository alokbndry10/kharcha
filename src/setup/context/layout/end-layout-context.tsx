import { useRef } from 'react';

export type EndLayout = null | Element;

export function useEndLayoutRef() {
  const endLayoutRef = useRef<EndLayout>(null);

  return endLayoutRef;
}
