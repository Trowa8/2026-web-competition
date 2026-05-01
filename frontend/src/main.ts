import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import '@fortawesome/fontawesome-free/js/all.js';

import { App } from './app/app';

bootstrapApplication(App, appConfig).catch(err => console.error(err));