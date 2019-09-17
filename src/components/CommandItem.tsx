import * as React from 'react';
import {Command} from '@src/searchExtensions/commandExtension';

export interface Props {
  item: Command;
  isSelected?: boolean;
  isHighlighted?: boolean;
}

const ITEM_STYLE: React.CSSProperties = {
  borderBottomWidth: 1,
  borderColor: '#ddd',
  borderLeftWidth: 1,
  borderRightWidth: 1,
  borderStyle: 'solid',
  borderTopWidth: 0,
  boxSizing: 'border-box',
  color: '#000',
  display: 'block',
  fontSize: 24,
  height: 50,
  lineHeight: '50 px',
  paddingLeft: 15,
  paddingRight: 15,
  textDecoration: 'none',
};

export const CommandItem: Omnibar.ResultRenderer<Command> = (props: Props): JSX.Element => {
  const styles = {...ITEM_STYLE};
  if (props.isSelected) {
    styles.backgroundColor = '#eee';
  }
  if (props.isHighlighted) {
    styles.backgroundColor = '#ddd';
  }
  return (
      <div style={styles}>
        {props.item.title}
      </div>
  );
};
