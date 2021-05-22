import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthComponent } from './auth.component';
import {TranslationModule} from '../i18n/translation.module';
import { ReferComponent } from './refer/refer.component';
import { DoctorSignupComponent } from './doctor-signup/doctor-signup.component';
import { DoctorLoginComponent } from './doctor-login/doctor-login.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { PatientSignupComponent } from './patient-signup/patient-signup.component';
import { PatientLoginComponent } from './patient-login/patient-login.component';
import { DoctorNextStepComponent } from './doctor-next-step/doctor-next-step.component';
import { ReferPatientComponent } from './refer-patient/refer-patient.component';
import { NgxUiLoaderModule } from  'ngx-ui-loader';


@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    ForgotPasswordComponent,
    LogoutComponent,
    AuthComponent,
    ReferComponent,
    DoctorSignupComponent,
    DoctorLoginComponent,
    ChangePasswordComponent,
    PatientSignupComponent,
    PatientLoginComponent,
    DoctorNextStepComponent,
    ReferPatientComponent
  ],
  imports: [
    CommonModule,
    TranslationModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgSelectModule,
    NgxUiLoaderModule
  ]
})
export class AuthModule {}
