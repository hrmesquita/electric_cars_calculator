import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/main/app.component';
import { config } from './app/config/app.config.server';

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
