import * as fuzzySort from 'fuzzysort';
import {fileExtensions} from '@src/searchExtensions/fileExtension';
import {githubExtension} from '@src/searchExtensions/githubExtension';
import {OverleafApi, OverleafApiProvider} from '@src/searchExtensions/overleaf';

const RESULT_LIMIT = 10;
const MATCH_KEY_PROP = 'title';
const HIGHLIGHT_OPEN = '<span class="match">';
const HIGHLIGHT_CLOSE = '</span>';

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
  return ranked.map(result => {
    const highlighted = fuzzySort.highlight(result, HIGHLIGHT_OPEN, HIGHLIGHT_CLOSE) || result.obj.title;
    return {...result.obj, title: highlighted};
  });
};
