import * as React from 'react';
import Omnibar from 'omnibar';
import {Command, commandExtension} from '@src/searchExtensions/commandExtension';
import {CommandItem} from '@src/components/CommandItem';
import {configure as configureHotKeys, GlobalHotKeys} from 'react-hotkeys';
import {addKeyHandler, KeyHandlerMap, KeyMap} from '@src/chrome/commands';

type Props = {};

type State = {
  isHidden: boolean,
};

export class CommandBar extends React.Component<Props, State> {

  state: State = {isHidden: true};
  keyMap: KeyMap;
  keyHandler: KeyHandlerMap;

  constructor(props: Props) {
    super(props);
    this.hide = this.hide.bind(this);
    this.toggle = this.toggle.bind(this);
    this.onAction = this.onAction.bind(this);

    const [keyMap, keyHandler] = addKeyHandler(this.hide, this.toggle);
    this.keyMap = keyMap;
    this.keyHandler = keyHandler;
    configureHotKeys({ignoreTags: []});
  }

  hide() {
    this.setState({isHidden: true});
  }

  toggle() {
    this.setState((prevState) => ({isHidden: !prevState.isHidden}));
  }

  onAction(item: Command | any | undefined) {
    if (item) {
      item.action();
      this.hide();
    }
  }

  render() {
    return (
        <GlobalHotKeys keyMap={this.keyMap} handlers={this.keyHandler}>
          <div className={'command-bar'}>
            {!this.state.isHidden ?
                <Omnibar
                    extensions={[commandExtension]}
                    children={CommandItem}
                    onAction={this.onAction}
                    autoFocus={true}
                /> : <div/>
            }
          </div>
        </GlobalHotKeys>
    );
  }
}
