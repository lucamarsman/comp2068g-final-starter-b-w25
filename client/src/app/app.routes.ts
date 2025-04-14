import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { SubscribeComponent } from './components/subscribe/subscribe.component';
import { DestinationsComponent } from './components/destinations/destinations.component';

export const routes: Routes = [
    { path: 'destinations', component: DestinationsComponent },
    { path: 'subscribe', component: SubscribeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent }
];
