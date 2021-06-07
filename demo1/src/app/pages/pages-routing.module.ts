import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './_layout/layout.component';
import { FormBuilder } from '@angular/forms';
import { ListsWidget1Component } from 'src/app/_metronic/partials/content/widgets/lists/lists-widget1/lists-widget1.component';
import { ListsWidget3Component } from 'src/app/_metronic/partials/content/widgets/lists/lists-widget3/lists-widget3.component';
import { ListsWidget4Component } from 'src/app/_metronic/partials/content/widgets/lists/lists-widget4/lists-widget4.component';
import { ListsWidget8Component } from 'src/app/_metronic/partials/content/widgets/lists/lists-widget8/lists-widget8.component';
import { ListsWidget11Component } from 'src/app/_metronic/partials/content/widgets/lists/lists-widget11/lists-widget11.component';
import { ListsWidget9Component } from 'src/app/_metronic/partials/content/widgets/lists/lists-widget9/lists-widget9.component';
import { ListsWidget10Component } from 'src/app/_metronic/partials/content/widgets/lists/lists-widget10/lists-widget10.component';
import { PrescribeTestComponent } from 'src/app/_metronic/partials/content/widgets/lists/prescribe-test/prescribe-test.component';
import { AuthGuard } from '../modules/auth/_services/auth.guard';
import { PaymentComponent } from 'src/app/_metronic/partials/content/widgets/lists/payment/payment.component';
import { PaymentRedirectComponent } from 'src/app/_metronic/partials/content/widgets/lists/payment-redirect/payment-redirect.component';
import { PaymentSplitUpComponent } from 'src/app/_metronic/partials/content/widgets/lists/payment-split-up/payment-split-up.component';
import { AddResultComponent } from 'src/app/_metronic/partials/content/widgets/lists/add-result/add-result.component';
import { ViewResultComponent } from 'src/app/_metronic/partials/content/widgets/lists/view-result/view-result.component';
import { PrintResultComponent } from 'src/app/_metronic/partials/content/widgets/lists/view-result/print-result/print-result.component';
import { ViewReportforDoctorComponent } from 'src/app/_metronic/partials/content/widgets/lists/view-reportfor-doctor/view-reportfor-doctor.component';
import { ViewReportforPatientComponent } from 'src/app/_metronic/partials/content/widgets/lists/view-reportfor-patient/view-reportfor-patient.component';
import { ActivePatientsComponent } from 'src/app/_metronic/partials/content/widgets/lists/active-patients/active-patients.component';
import { MappingUrlsComponent } from 'src/app/_metronic/partials/content/widgets/lists/mapping-urls/mapping-urls.component';



const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
      //  canActivate: [AuthGuard],
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'user-profile',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../modules/user-profile/user-profile.module').then(
            (m) => m.UserProfileModule
          ),
      },
      {
        path: 'roleManagement',
        canActivate: [AuthGuard],
        data: { roles: ["roleManagement"] },
        component: ListsWidget1Component
      },
      {
        path: 'userManagement',
        canActivate: [AuthGuard],
        data: { roles: ["userManagement"] },
        component: ListsWidget3Component
      },
      {
        path: 'hospitalManagement',
        canActivate: [AuthGuard],
        data: { roles: ["hospitalManagement"] },
        component: ListsWidget4Component
      },
      {
        path: 'labManagement',
        canActivate: [AuthGuard],
        data: { roles: ["labManagement"] },
        component: ListsWidget8Component
      },
      {
        path: 'testManagement',
        canActivate: [AuthGuard],
        data: { roles: ["testManagement"] },
        component: ListsWidget11Component
      },
      {
        path: 'doctorReferral',
        canActivate: [AuthGuard],
        data: { roles: ["doctorReferral"] },
        component: ListsWidget9Component
      },
      {
        path: 'roleMap',
        canActivate: [AuthGuard],
        data: { roles: ["roleMap"] },
        component: ListsWidget10Component
      },
      {
        path: 'prescribeTest',
        canActivate: [AuthGuard],
        data: { roles: ["prescribeTest"] },
        component: PrescribeTestComponent
      },
      {
        path: 'payment/:term1',
        canActivate: [AuthGuard],
        data: { roles: ["payment"] },
        component: PaymentComponent
      },
      {
        path: 'transactionStatus/:term1',
        canActivate: [AuthGuard],
        data: { roles: ["transactionStatus"] },
        component: PaymentRedirectComponent
      },
      {
        path: 'paymentSplitUp',
        canActivate: [AuthGuard],
        data: { roles: ["paymentSplitUp"] },
        component: PaymentSplitUpComponent
      },
      {
        path: 'AddResult',
        canActivate: [AuthGuard],
        data: { roles: ["AddResult"] },
        component: AddResultComponent
      },
      {
        path: 'ViewResult',
        canActivate: [AuthGuard],
        data: { roles: ["ViewResult"] },
        component: ViewResultComponent
      },
      {
        path: 'ViewReport/:term1/:term2',
        canActivate: [AuthGuard],
        data: { roles: ["ViewReport"] },
        component: ViewReportforDoctorComponent
      },
      {
        path: 'ViewReport',
        canActivate: [AuthGuard],
        data: { roles: ["ViewReport"] },
        component: ViewReportforDoctorComponent
      },
      {
        path: 'PatientReport',
        canActivate: [AuthGuard],
        data: { roles: ["PatientReport"] },
        component: ViewReportforPatientComponent
      },
      {
        path: 'PrintResult/:term1',
        canActivate: [AuthGuard],
        data: { roles: ["PrintResult"] },
        component: PrintResultComponent
      },
      {
        path: 'ActivePatients',
        canActivate: [AuthGuard],
        data: { roles: ["ActivePatients"] },
        component: ActivePatientsComponent
      },
      {
        path: 'mappingurls',
        canActivate: [AuthGuard],
        data: { roles: ["mappingurls"] },
        component: MappingUrlsComponent
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
