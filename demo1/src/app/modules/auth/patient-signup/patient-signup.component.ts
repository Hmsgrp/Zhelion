import { Component, OnInit, OnDestroy, ChangeDetectorRef ,ViewChild} from '@angular/core';
import { FormGroup, FormBuilder,NgForm,Form } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { ConfirmPasswordValidator } from '../registration/confirm-password.validator';
import { UserModel } from '../_models/user.model';
import { first } from 'rxjs/operators';
import { CommonServicesService } from '../_services/common-services.service';
import { HospitalPatientModel } from 'src/app/_metronic/partials/content/widgets/models/hospitalpatient';
import {ActivatedRoute} from "@angular/router";
import { DashboardServicsService } from '../../../modules/commonServices/dashboard-servics.service';
import { selectHospital } from '../_models/selectHospital.model';
import { UserModelPatient } from 'src/app/_metronic/partials/content/widgets/models/usermodelPatient';


@Component({
  selector: 'app-patient-signup',
  templateUrl: './patient-signup.component.html',
  styleUrls: ['./patient-signup.component.scss']
})
export class PatientSignupComponent implements OnInit {

  hasError: boolean;
  isLoading$: Observable<boolean>;
  hospitals : HospitalPatientModel[] = [];
  selecthospital : selectHospital [] = [];
  patientModel : UserModelPatient;
  refID:string;
  isSuccess:boolean;
  showNext:boolean;
  @ViewChild('registrationForm', {static: false}) registrationForm: NgForm;
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  showPasswordFields:boolean;
  showOTPField:boolean;
  DoctorReferrals:any;
  isSignUpwithOTPDisabled:boolean;
  isSignUpwithPasswordDisabled:boolean;
  disableSignUp:boolean;

  isOTPGeneratedsuccess:boolean;
  users:any;
  hospitalID:string;
  hospitalName:string;
  patientID:string;
  mobilenumber:number;
  userID:string;
  
  
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private CommonServices: CommonServicesService,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private dashboardServices: DashboardServicsService
  ) {
    this.isLoading$ = this.authService.isLoading$;
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.refID = params['term1'].toString();
    });
    this.getPatientbyID();
    this.showPasswordFields = false;
    this.showOTPField = false;
    this.isSuccess = false;
    this.showNext = false;
    this.isSignUpwithOTPDisabled =false;
    this.isSignUpwithPasswordDisabled=false;
    this.disableSignUp =true;
    this.isOTPGeneratedsuccess= false;
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registrationForm.controls;
  }

  submit() {
    this.hasError = false;
    this.UpdateData()
  }

  getPatientbyID() {
    this.dashboardServices.getPatientUsers(this.refID)
      .subscribe(data => {      
        this.patientID = data.hospital_PID;
        this.mobilenumber = data.mobileNumber;
        this.hospitalID = data.hospitalId;
        this.userID = data.userID;
        this.getHospitalbyID();
        this.cd.detectChanges();
      },
      HttpErrorResponse =>{
        // this.handleError(HttpErrorResponse.message+" Check Api");
      });    
  }

  getHospitalbyID() {
    this.dashboardServices.getHospitalbyID(this.hospitalID)
      .subscribe(data => {      
        this.hospitalName = data.hospitalName;
        this.cd.detectChanges();
      },
      HttpErrorResponse =>{
        // this.handleError(HttpErrorResponse.message+" Check Api");
      });    
  }
 
  UpdateData()
  {
 
    this.CommonServices.UpdatePatient(this.registrationForm.form,
      this.refID,
      this.showPasswordFields,
      this.showOTPField
      )
    .subscribe(data => {
      this.isSuccess = true; 
      this.router.navigate(['/auth/patient/login/'+ this.userID]);
      this.registrationForm.form.reset();
      this.cd.detectChanges();
    },
    HttpErrorResponse => {
     // this.handleError(HttpErrorResponse.error.errorDetails);
    }  
    );
  }

  generateOTP()
  {
   // this.registrationForm.form.controls.OTPfield.setValue("5678788");
    this.CommonServices.GenerateOTP(this.refID)
      .subscribe(data => {
        this.isOTPGeneratedsuccess = true;
        this.cd.detectChanges();
      },
      HttpErrorResponse =>{
       // this.handleError(HttpErrorResponse.message+" Check Api");
      }); 
  }

  Next()
  {
    this.showNext = true;
    return false;
  }

  back()
  {
    this.showNext = false;
  }

  agreeclick(val:string)
  {
    if(val == 'true')
    {
      this.disableSignUp = false;
    }
    else
    {
      this.disableSignUp = true;
    }
    this.cd.detectChanges();
  }

  isChangesgwithPasswordToggle(val:string)
  {
    if(val == 'true')
    {
      this.showPasswordFields = true;
      this.isSignUpwithOTPDisabled =true; 
    }
    else
    {
      this.showPasswordFields = false;
      this.isSignUpwithOTPDisabled = false;
    }
    this.cd.detectChanges();
  }

  isChangeOTPToggle(val:string)
  {
    if(val == 'true')
    {
      this.showOTPField = true;
      this.isSignUpwithPasswordDisabled=true;
    }
    else
    {
      this.showOTPField = false;
      this.isSignUpwithPasswordDisabled=false;
    }
    this.cd.detectChanges();
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}