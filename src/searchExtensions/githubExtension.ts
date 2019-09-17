import {Command, CommandCollector} from '@src/searchExtensions/commandExtension';
import {withScope} from '@src/searchExtensions/angular';

interface GithubSyncControllerScope {
  openGithubSyncModal: () => void,
}

export const githubExtension: CommandCollector = (): Command[] => {
  const githubScope = withScope<GithubSyncControllerScope>('GithubSyncController');
  return [{
    title: 'Sync to Github',
    _matchKey: 'github sync',
    action: () => githubScope.openGithubSyncModal(),
  }];
};
