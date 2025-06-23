import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { UserCreateComponent } from './pages/user-create/user-create.component';
import { DashboardViewComponent } from './pages/dashboard-view/dashboard-view.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'create-user', component: UserCreateComponent },
  { path: 'dashboard-view', component: DashboardViewComponent }
];


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
};

