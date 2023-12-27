import { KeyboardEventHandler, useEffect, useRef } from 'react';

// Borrowed with love from https://github.com/jacobbuck/react-use-keypress

// Fixing inconsistencies from older browsers
// https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
const aliases = new Map([
  ['Win', 'Meta'],
  ['Scroll', 'ScrollLock'],
  ['Spacebar', ' '],
  ['Down', 'ArrowDown'],
  ['Left', 'ArrowLeft'],
  ['Right', 'ArrowRight'],
  ['Up', 'ArrowUp'],
  ['Del', 'Delete'],
  ['Crsel', 'CrSel'],
  ['Exsel', 'ExSel'],
  ['Apps', 'ContextMenu'],
  ['Esc', 'Escape'],
  ['Decimal', '.'],
  ['Multiply', '*'],
  ['Add', '+'],
  ['Subtract', '-'],
  ['Divide', '/'],
]);

const shimKeyboardEvent = (event: { key: string }) => {
  if (aliases.has(event.key)) {
    const key = aliases.get(event.key);

    Object.defineProperty(event, 'key', {
      configurable: true,
      enumerable: true,
      get() {
        return key;
      },
    });
  }
};

export const useKeypress = (keys: string | string[], handler: (event: KeyboardEvent) => void) => {
  const eventListenerRef = useRef<KeyboardEventHandler>();

  useEffect(() => {
    eventListenerRef.current = (event: any) => {
      shimKeyboardEvent(event);
      if (Array.isArray(keys) ? keys.includes(event.key) : keys === event.key) {
        handler?.(event);
      }
    };
  }, [keys, handler]);

  useEffect(() => {
    const eventListener = (event: any) => {
      eventListenerRef.current?.(event);
    };
    window.addEventListener('keydown', eventListener);
    return () => {
      window.removeEventListener('keydown', eventListener);
    };
  }, []);
};
