import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {CommandBar} from '@src/components/CommandBar';

import 'main.css';

const APP_ROOT_ID = 'overleaf-commander';

const App: React.ReactElement<any> = (<CommandBar/>);

const appRoot = document.createElement('div');
appRoot.id = APP_ROOT_ID;
document.body.appendChild(appRoot);
ReactDOM.render(App, appRoot);
console.log('Commander injected');
