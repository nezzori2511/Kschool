import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';



import { BrowserModule } from '@angular/platform-browser';
import { RouterModule ,Routes} from '@angular/router';
import { AdminLayoutComponent } from './admin/layouts/admin-layout/admin-layout.component';
import { ClientLayoutComponent } from './client/client-layout/client-layout.component';
import { LoginadminComponent } from './loginadmin/loginadmin.component';

const routes: Routes =[
  {
    path: '',
    redirectTo: 'admin/dashboard',
    pathMatch: 'full',
  }, {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      
      loadChildren: () => import('app/admin/layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
    }]
  },
  {
    path: '',
    component: ClientLayoutComponent,
    children: [{
      path: '',
      
      loadChildren: () => import('app/client/client-layout/client-layout.module').then(m => m.ClientLayoutModule)
    }]
  },
  { path: 'admin-login',        component: LoginadminComponent },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
     
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
