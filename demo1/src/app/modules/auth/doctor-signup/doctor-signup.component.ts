import { Component, OnInit, OnDestroy, ChangeDetectorRef ,ViewChild} from '@angular/core';
import { FormGroup, FormBuilder,NgForm,Form } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { ConfirmPasswordValidator } from '../registration/confirm-password.validator';
import { UserModel } from '../_models/user.model';
import { first } from 'rxjs/operators';
import { CommonServicesService } from '../_services/common-services.service';
import { HospitalModel } from 'src/app/_metronic/partials/content/widgets/models/hospital.model';
import {ActivatedRoute} from "@angular/router";
import { DashboardServicsService } from '../../../modules/commonServices/dashboard-servics.service';
import { selectHospital } from '../_models/selectHospital.model';

@Component({
  selector: 'app-doctor-signup',
  templateUrl: './doctor-signup.component.html',
  styleUrls: ['./doctor-signup.component.scss']
})
export class DoctorSignupComponent implements OnInit,OnDestroy {

  hasError: boolean;
  isLoading$: Observable<boolean>;
  hospitals : HospitalModel[] = [];
  selecthospital : selectHospital [] = [];
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
  mappedHospital = [];
  //selected: any;

  selectedItems =[];
  items = [];
  selected =[];
  selected1 =[];

  fullname:string;
  mobileNumber:number;
  emailID:string;
  roleId:string;
  isOTPGeneratedsuccess:boolean;
  
  
  
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

    this.showPasswordFields = false;
    this.showOTPField = false;
    this.isSuccess = false;
    this.showNext = false;
    this.isSignUpwithOTPDisabled =false;
    this.isSignUpwithPasswordDisabled=false;
    this.items = [];
    this.selected =[];
    this.selected1 =[];
    this.getHospitals(); 
    this.refreshData();
    this.disableSignUp =true;
    this.fullname ="";
    this.mobileNumber = null;
    this.emailID ="";
    this.roleId = "";
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

  refreshData() {
    this.CommonServices.GetDoctorDataByUserId(this.refID)
      .subscribe(data => {
        this.DoctorReferrals = data;
        this.roleId= data.user.roleId;
        this.registrationForm.form.controls.fullname.setValue(this.DoctorReferrals.user.fullName);
        this.registrationForm.form.controls.mobilenumber.setValue(this.DoctorReferrals.user.mobileNumber);
        this.registrationForm.form.controls.email.setValue(this.DoctorReferrals.user.emailId);

        for (var userhospital of this.DoctorReferrals.userHospitalMapResults[0].hospitalInfo) {
          this.selectedItems.push(userhospital.hospitalId);  
        }
        this.selected = this.selectedItems;
        
        this.cd.detectChanges();
      },
      HttpErrorResponse =>{
        // this.handleError(HttpErrorResponse.message+" Check Api");
      });    
  }
  
  UpdateData()
  {
    this.mappedHospital = [];
    for (var val of this.selected) {
      this.mappedHospital.push(val)
     }
 
    this.CommonServices.UpdateUser(this.registrationForm.form,
      this.refID, 
      this.mappedHospital,this.roleId,
      this.showPasswordFields,
      this.showOTPField
      )
    .subscribe(data => {
      this.isSuccess = true; 
      this.router.navigate(['/auth/doctor/login']);
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
        this.isOTPGeneratedsuccess= true;
        this.cd.detectChanges();
      },
      HttpErrorResponse =>{
       // this.handleError(HttpErrorResponse.message+" Check Api");
      }); 
  }
  
  getHospitals() {
    this.dashboardServices.getAllHospital()
      .subscribe(data => {
        for (var val of data) {
          let selectAllHospital = new selectHospital();
          selectAllHospital.id = val.hospitalId;
          selectAllHospital.name = val.hospitalName;
          this.items.push(selectAllHospital);
        }
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
