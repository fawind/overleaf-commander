import {Command, CommandCollector} from '@src/searchExtensions/commandExtension';
import {withScope} from '@src/searchExtensions/angular';

interface FileItem {
  id: string,
  name: string,
  selected: boolean,
  type: 'folder' | 'doc' | 'file',
  children?: FileItem[],
}

interface IdeControllerScope {
  rootFolder: FileItem
}

interface FileTreeEntityScope {
  $emit: (event: string, elem: any) => void,
}

export const fileExtensions: CommandCollector = (): Command[] => {
  const ideScope = withScope<IdeControllerScope>('IdeController');
  const fileTreeEntityScope = withScope<FileTreeEntityScope>('FileTreeEntityController');
  const onAction = (file: FileItem) => () => fileTreeEntityScope.$emit('entity:selected', file);
  if (!ideScope.rootFolder.children) {
    return [];
  }
  const fileCommands: Command[] = [];
  ideScope.rootFolder.children.forEach(child => collectChildren(child, fileCommands, onAction));
  return fileCommands;
};

const collectChildren = (file: FileItem, results: Command[], onAction: (file: FileItem) => () => void, path = '') => {
  if (!file.children) {
    const fileName = `${path}${file.name}`;
    results.push({
      title: fileName,
      _matchKey: fileName,
      action: onAction(file),
    });
  } else {
    file.children.forEach(child => collectChildren(child, results, onAction, `${path}${file.name}/`));
  }
};
