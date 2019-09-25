export type KeyHandlerMap = { [key: string]: (keyEvent?: KeyboardEvent) => void };
export type KeyMap = { [key: string]: string };

// Defined in manifest.json
export const CHROME_TOGGLE_OMNIBAR_COMMAND = 'toggle-omnibar';

// Flag is set when running in local page without chrome extension context
export const isLocalPage = (): boolean => {
  return window.hasOwnProperty('LOCAL_PAGE');
};

export const addKeyHandler = (onHide: () => void, onToggle: () => void): [KeyMap, KeyHandlerMap] => {
  const keyMap: KeyMap = {HIDE: 'Escape'};
  const keyHandler: KeyHandlerMap = {HIDE: onHide};

  // Listen to chrome commands forwarded from content script
  window.addEventListener('message', (event: MessageEvent) => {
    if (event.source !== window) {
      return;
    }
    if (event.data.command && event.data.command === CHROME_TOGGLE_OMNIBAR_COMMAND) {
      onToggle();
    }
  });
  if (isLocalPage()) {
    keyMap.TOGGLE = 'Control+p';
    keyHandler.TOGGLE = onToggle;
  }

  return [keyMap, keyHandler];
};
