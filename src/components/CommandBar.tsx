import * as React from 'react';
import {ReactElement, useState} from 'react';
import Omnibar from 'omnibar';
import {Command, commandExtension} from '@src/searchExtensions/commandExtension';
import {CommandItem} from '@src/components/CommandItem';
import {configure as configureHotKeys, GlobalHotKeys} from 'react-hotkeys';

const KEY_MAP = {
  TOGGLE: 'Control+Alt+p',
  HIDE: 'Escape',
};

export const CommandBar: React.FunctionComponent<{}> = (): ReactElement => {
  const [isHidden, setHidden] = useState<boolean>(true);
  const KEY_HANDLERS = {
    TOGGLE: () => setHidden(currState => !currState),
    HIDE: () => setHidden(true),
  };
  const onAction = (item: Command | any | undefined) => {
    if (!item) {
      return;
    }
    item.action();
    setHidden(true);
  };
  configureHotKeys({ignoreTags: []});

  return (
      <GlobalHotKeys keyMap={KEY_MAP} handlers={KEY_HANDLERS}>
        <div className={'command-bar'}>
          {!isHidden ?
              <Omnibar
                  extensions={[commandExtension]}
                  children={CommandItem}
                  onAction={onAction}
                  autoFocus={true}
              /> : <div/>
          }
        </div>
      </GlobalHotKeys>
  );
};
