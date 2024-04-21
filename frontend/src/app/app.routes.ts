import { Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from './register/signup.component';
import { WorkspaceComponent } from './workspace/workspace.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component:RegisterComponent },
    { path: 'workspace', component: WorkspaceComponent },
];
