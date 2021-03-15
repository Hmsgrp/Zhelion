import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './_layout/layout.component';
import { FormBuilder } from '@angular/forms';
import { ListsWidget1Component } from 'src/app/_metronic/partials/content/widgets/lists/lists-widget1/lists-widget1.component';
import { ListsWidget3Component } from 'src/app/_metronic/partials/content/widgets/lists/lists-widget3/lists-widget3.component';
import { ListsWidget4Component } from 'src/app/_metronic/partials/content/widgets/lists/lists-widget4/lists-widget4.component';
import { ListsWidget8Component } from 'src/app/_metronic/partials/content/widgets/lists/lists-widget8/lists-widget8.component';
import { ListsWidget11Component } from 'src/app/_metronic/partials/content/widgets/lists/lists-widget11/lists-widget11.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'builder',
        loadChildren: () =>
          import('./builder/builder.module').then((m) => m.BuilderModule),
      },
      {
        path: 'ecommerce',
        loadChildren: () =>
          import('../modules/e-commerce/e-commerce.module').then(
            (m) => m.ECommerceModule
          ),
      },
      {
        path: 'user-management',
        loadChildren: () =>
          import('../modules/user-management/user-management.module').then(
            (m) => m.UserManagementModule
          ),
      },
      {
        path: 'user-profile',
        loadChildren: () =>
          import('../modules/user-profile/user-profile.module').then(
            (m) => m.UserProfileModule
          ),
      },
      {
        path: 'ngbootstrap',
        loadChildren: () =>
          import('../modules/ngbootstrap/ngbootstrap.module').then(
            (m) => m.NgbootstrapModule
          ),
      },
      {
        path: 'wizards',
        loadChildren: () =>
          import('../modules/wizards/wizards.module').then(
            (m) => m.WizardsModule
          ),
      },
      {
        path: 'material',
        loadChildren: () =>
          import('../modules/material/material.module').then(
            (m) => m.MaterialModule
          ),
      },
      {
        path: 'roleManagement',
        component: ListsWidget1Component
      },
      {
        path: 'userManagement',
        component: ListsWidget3Component
      },
      {
        path: 'hospitalManagement',
        component: ListsWidget4Component
      },
      {
        path: 'labManagement',
        component: ListsWidget8Component
      },
      {
        path: 'testManagement',
        component: ListsWidget11Component
      },
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'error/404',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[FormBuilder]
})
export class PagesRoutingModule { }
