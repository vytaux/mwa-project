import { Routes } from '@angular/router';
import { AuthService } from './auth.service';

const loadHomepageComponent = () => import('./homepage/homepage.component').then(c => c.HomepageComponent);
const loadWorkspaceComponent = () => import('./workspace/workspace.component').then(c => c.WorkspaceComponent);
const loadLoginComponent = () => import('./login/login.component').then(c => c.LoginComponent);
const loadRegisterComponent = () => import('./register/register.component').then(c => c.RegisterComponent);
const loadNotFoundComponent = () => import('./not-found/not-found.component').then(c => c.NotFoundComponent);

export const routes: Routes = [
  { path: '', loadComponent: loadHomepageComponent, canMatch: [AuthService], pathMatch: 'full' },
  { path: '', loadComponent: loadWorkspaceComponent, canActivate: [AuthService], pathMatch: 'full' },
  { path: 'w/:workspaceId', loadComponent: loadWorkspaceComponent, canActivate: [AuthService] },
  { path: 'login', loadComponent: loadLoginComponent },
  { path: 'register', loadComponent: loadRegisterComponent },
  { path: '**', loadComponent: loadNotFoundComponent }
];