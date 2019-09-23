import * as React from 'react';
import {ReactElement, useState} from 'react';
import Omnibar from 'omnibar';
import {Command, commandExtension} from '@src/searchExtensions/commandExtension';
import {CommandItem} from '@src/components/CommandItem';
import {configure as configureHotKeys, GlobalHotKeys} from 'react-hotkeys';
import {getKeyHandler} from '@src/chrome/commands';

export const CommandBar: React.FunctionComponent<{}> = (): ReactElement => {
  const [isHidden, setHidden] = useState<boolean>(true);
  const onHide = () => setHidden(true);
  const onToggle = () => setHidden(currIsHidden => !currIsHidden);
  const onAction = (item: Command | any | undefined) => {
    if (item) {
      item.action();
      setHidden(true);
    }
  };
  const [keyMap, keyHandler] = getKeyHandler(onHide, onToggle);
  configureHotKeys({ignoreTags: []});

  return (
      <GlobalHotKeys keyMap={keyMap} handlers={keyHandler}>
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
