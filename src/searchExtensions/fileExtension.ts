import {Command, CommandCollector} from '@src/searchExtensions/commandExtension';
import {FileEntry, OverleafApi} from '@src/searchExtensions/overleaf';

export const fileExtensions: CommandCollector = (overleafApi: OverleafApi): Command[] => {
  const onAction = (file: FileEntry) => () => overleafApi.openFile(file);
  const fileCommands: Command[] = [];
  overleafApi.getFileTree().forEach(child => collectChildren(child, fileCommands, onAction));
  return fileCommands;
};

const collectChildren = (file: FileEntry, results: Command[], onAction: (file: FileEntry) => () => void, path = '') => {
  if (!file.children || file.children.length === 0) {
    results.push({title: `${path}${file.name}`, action: onAction(file)});
  } else {
    file.children.forEach(child => collectChildren(child, results, onAction, `${path}${file.name}/`));
  }
};
