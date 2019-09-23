import * as fuzzySort from 'fuzzysort';
import {fileExtensions} from '@src/searchExtensions/fileExtension';
import {githubExtension} from '@src/searchExtensions/githubExtension';
import {OverleafApi, OverleafApiProvider} from '@src/searchExtensions/overleaf';

const RESULT_LIMIT = 10;
export const MATCH_KEY_PROP = 'title';

export interface Command {
  title: string,
  action: () => void,
}

export type CommandCollector = (overleafApi: OverleafApi) => Command[];

const commandCollectors: CommandCollector[] = [
  fileExtensions,
  githubExtension,
];

export const commandExtension: Omnibar.Extension<Command> = (query: string): Command[] => {
  const overleafApi = OverleafApiProvider.get();
  const commands = commandCollectors
      .map(collector => collector(overleafApi))
      .reduce((a, b) => a.concat(b), []);
  const ranked = fuzzySort.go(query, commands, {key: MATCH_KEY_PROP, limit: RESULT_LIMIT});
  return ranked.map(res => res.obj);
};
