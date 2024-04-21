import { Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from './signup/signup.component';
import { WorkspaceComponent } from './workspace/workspace.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component:SignupComponent },
    { path: 'workspace', component: WorkspaceComponent },
];
