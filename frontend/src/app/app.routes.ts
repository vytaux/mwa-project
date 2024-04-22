import { Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from './register/register.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { AuthService } from './auth.service';

export const routes: Routes = [
  { path: '', component: WorkspaceComponent, canActivate: [AuthService], pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'w/:workspaceId', component: WorkspaceComponent, canActivate: [AuthService] },
];