import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthComponent} from './auth.component';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {LogoutComponent} from './logout/logout.component';
import { ReferComponent } from './refer/refer.component';
import { DoctorSignupComponent } from './doctor-signup/doctor-signup.component';
import { DoctorLoginComponent } from './doctor-login/doctor-login.component';
import { PatientSignupComponent } from './patient-signup/patient-signup.component';
import { PatientLoginComponent } from './patient-login/patient-login.component';
import { DoctorNextStepComponent } from './doctor-next-step/doctor-next-step.component';


const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent,
        data: {returnUrl: window.location.pathname}
      },
      {
        path: 'registration',
        component: RegistrationComponent
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent
      },
      {
        path: 'logout',
        component: LogoutComponent
      },
      {
        path: 'refer/:term1/:term2/:term3',
        component: ReferComponent
      },
      {
        path: 'doctor/login',
        component: DoctorLoginComponent
      },
      {
        path: 'doctor/doctorNextStep',
        component: DoctorNextStepComponent
      },
      {
        path: 'signup/doctor/:term1',
        component: DoctorSignupComponent
      },
      {
        path: 'signup/patient/:term1',
        component: PatientSignupComponent
      },
      {
        path: 'patient/login/:term1',
        component: PatientLoginComponent
      },
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: '**', redirectTo: 'login', pathMatch: 'full'},
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AuthRoutingModule {}
