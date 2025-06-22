import { Routes } from '@angular/router';
import { DashboardViewComponent } from './pages/dashboard-view/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { UserCreateComponent } from './pages/user-create/user-create.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardViewComponent },
  { path: 'user-create', component: UserCreateComponent },
];
