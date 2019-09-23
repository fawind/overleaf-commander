import {Command, CommandCollector} from '@src/searchExtensions/commandExtension';
import {OverleafApi} from '@src/searchExtensions/overleaf';

export const githubExtension: CommandCollector = (overleafApi: OverleafApi): Command[] => {
  return [{
    title: 'Sync to Github',
    action: () => overleafApi.openGithubSyncModal(),
  }];
};
