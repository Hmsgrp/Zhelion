import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthComponent} from './auth.component';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {LogoutComponent} from './logout/logout.component';
import { ReferComponent } from './refer/refer.component';
import { ReferPatientComponent } from './refer-patient/refer-patient.component';
import { DoctorSignupComponent } from './doctor-signup/doctor-signup.component';
import { DoctorLoginComponent } from './doctor-login/doctor-login.component';
import { PatientSignupComponent } from './patient-signup/patient-signup.component';
import { PatientLoginComponent } from './patient-login/patient-login.component';
import { DoctorNextStepComponent } from './doctor-next-step/doctor-next-step.component';
import { LabLoginComponent } from './lab-login/lab-login.component';
import { LabNextStepComponent } from './lab-next-step/lab-next-step.component';


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
        path: 'sg/dc/:term1',
        component: ReferComponent
      },
      {
        path: 'sg/pt/:term1',
        component: ReferPatientComponent
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
      {
        path: 'lab/login',
        component:LabLoginComponent
      },
      {
        path: 'lab/labNextStep',
        component:LabNextStepComponent
      },
      {
        path: 'doctor/login',
        component: DoctorLoginComponent
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
