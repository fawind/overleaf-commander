import * as fuzzySort from 'fuzzysort';
import {fileExtensions} from '@src/searchExtensions/fileExtension';

export const MATCH_KEY_PROP = '_matchKey';

export interface Command {
  title: string,
  _matchKey: string,
  action: () => void,
}

export type CommandCollector = () => Command[];

const collector: CommandCollector[] = [
  fileExtensions,
];

export const commandExtension: Omnibar.Extension<Command> = (query: string): Command[] => {
  const commands = collector
  .map(coll => coll())
  .reduce((a, b) => a.concat(b), []);
  const ranked = fuzzySort.go(query, commands, {key: MATCH_KEY_PROP});
  return ranked.map(res => res.obj);
};
