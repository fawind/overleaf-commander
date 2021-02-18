import {isLocalPage} from '@src/chrome/commands';

declare global {
  interface Window {
    angular: {
      element: (selector: string) => { scope: () => any },
    },
  }
}

export interface OverleafApi {
  getFileTree: () => FileEntry[],
  openFile: (file: FileEntry) => void,
  openGithubSyncModal: () => void,
}

export interface FileEntry {
  id: string,
  name: string,
  selected: boolean,
  type: 'folder' | 'doc' | 'file',
  children?: FileEntry[],
}

interface IdeControllerScope {
  rootFolder: FileEntry,
  $emit: (event: string, elem: any) => void,
}

interface GithubSyncControllerScope {
  openGithubSyncModal: () => void,
}

function withScope<S>(controller: string): () => S {
  return () => window.angular.element(`[ng-controller=${controller}]`).scope();
}

class AngularOverleafApi implements OverleafApi {
  private static IDE_CONTROLLER = 'IdeController';
  private static GITHUB_SYNC_CONTROLLER = 'GithubSyncController';
  private static ENTITY_SELECTED_EVENT = 'entity:selected';

  private withIdeControllerScope = withScope<IdeControllerScope>(AngularOverleafApi.IDE_CONTROLLER);
  private withGithubSyncControllerScope =
      withScope<GithubSyncControllerScope>(AngularOverleafApi.GITHUB_SYNC_CONTROLLER);

  getFileTree(): FileEntry[] {
    const scope = this.withIdeControllerScope();
    if (!scope.rootFolder.children) {
      return [];
    }
    return scope.rootFolder.children;
  }

  openFile(file: FileEntry) {
    this.withIdeControllerScope().$emit(AngularOverleafApi.ENTITY_SELECTED_EVENT, file);
  }

  openGithubSyncModal() {
    this.withGithubSyncControllerScope().openGithubSyncModal();
  }
}

class MockOverleafApi implements OverleafApi {
  getFileTree(): FileEntry[] {
    return [
      {
        id: '1', name: 'folder1', selected: false, type: 'folder', children: [
          {id: '4', name: 'file4', selected: false, type: 'file', children: []},
        ],
      },
      {id: '2', name: 'file2', selected: false, type: 'file', children: []},
      {id: '3', name: 'file3', selected: false, type: 'file', children: []},
    ];
  }

  openFile(file: FileEntry) {
    console.log('Open File:', file);
  }

  openGithubSyncModal() {
    console.log('Open Github Modal');
  }
}

export class OverleafApiProvider {
  private static instance: OverleafApi | null = null;

  static get(): OverleafApi {
    if (this.instance === null) {
      if (isLocalPage()) {
        console.log('Running in local dev mode with mock Overleaf api');
        this.instance = new MockOverleafApi();
      } else {
        this.instance = new AngularOverleafApi();
      }
    }
    return this.instance;
  }
}
