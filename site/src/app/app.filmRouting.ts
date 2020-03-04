import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './login/logout.component';
import { RegisterComponent } from './register/register.component';
import { shareReplay } from 'rxjs/operators';
import { PackagesComponent } from './packages/packages.component';
import { ReceptionPackageComponent } from './receptionPackages/receptionPackages.component';

const routes: Routes = [
  { path: 'api/packages', component: PackagesComponent },
  { path: 'api/packages/create', component: ReceptionPackageComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: [],
  providers: []
})
export class AppFilmRoutingModule { }
