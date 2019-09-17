import * as ReactDOM from 'react-dom';
import {App} from '@src/App';
import 'main.css';

const APP_ROOT_ID = 'overleaf-commander';

const appRoot = document.createElement('div');
appRoot.id = APP_ROOT_ID;
document.body.appendChild(appRoot);
ReactDOM.render(App, appRoot);
