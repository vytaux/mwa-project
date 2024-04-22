import { Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from './register/register.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'w/:workspaceId', component: WorkspaceComponent, canActivate: [() => inject(AuthService).isLoggedIn()] },
  { path: '', component: WorkspaceComponent, canActivate: [() => inject(AuthService).isLoggedIn()] }
];