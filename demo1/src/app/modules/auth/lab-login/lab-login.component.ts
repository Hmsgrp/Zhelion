import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { UserModel } from '../_models/user.model';
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonServicesService } from '../_services/common-services.service';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';

@Component({
  selector: 'app-lab-login',
  templateUrl: './lab-login.component.html',
  styleUrls: ['./lab-login.component.scss']
})
export class LabLoginComponent implements OnInit {
  spinnerType = SPINNER.wanderingCubes;
  defaultAuth = {
    username: '',
    password: '',
  };
  // defaultAuth: any = {
  //   username: 'admin',
  //   password: 'demo',
  // };
  loginForm: FormGroup;
  hasError: boolean;
  returnUrl: string;
  isLoading$: Observable<boolean>;
  
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  
  showPasswordFields:boolean;
  showOTPField:boolean;
  isSignUpwithOTPDisabled:boolean;
  isSignUpwithPasswordDisabled:boolean;
  FieldError:boolean;
  
  constructor(
   private fb: FormBuilder,
   private authService: AuthService,
   private route: ActivatedRoute,
   private router: Router,
   private CommonServices: CommonServicesService,
   private cd: ChangeDetectorRef,
   private ngxService: NgxUiLoaderService
  ) {
   this.isLoading$ = this.authService.isLoading$;
   // redirect to home if already logged in
   if (this.authService.currentUserValue) {
     this.router.navigate(['/']);
   }
  }
  
  ngOnInit(): void {
   this.initForm();
   this.FieldError=false;
  
   this.showPasswordFields = false;
   this.showOTPField = true;
  
   localStorage.removeItem("access_token");
   localStorage.removeItem("Menus");
   // get return url from route parameters or default to '/'
   this.returnUrl =
       this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
   }
  
  // convenience getter for easy access to form fields
  get f() {
   return this.loginForm.controls;
  }
  
  initForm() {
   this.loginForm = this.fb.group({
     username: [
       this.defaultAuth.username,
       Validators.compose([
         Validators.required
       ]),
     ],
     password: [
       this.defaultAuth.password,
       Validators.compose([
         
       ]),
     ],
     OTP: [
      '',
      Validators.compose([
        
      ]),
    ],
    sgwithPassword: [false, Validators.compose([])],
   });
  }
  
  getOTP()
  {
    this.loginForm.controls.OTP.setValue("5678788");
  }
  
  submit(){
    this.hasError = false;
   if(this.f.password.value =="" && this.f.OTP.value =="")
   {
    this.FieldError=true;
   }
   else{
    this.ngxService.start(); 
    this.CommonServices.LoginLab(this.f.username.value, this.f.password.value)
     .subscribe(
                data => {
                  this.ngxService.stop(); 
                  this.hasError = false;
                  this.router.navigate(["/auth/lab/labNextStep"]);
                },
                error => {
                  this.ngxService.stop(); 
                  this.hasError = true;
                });
   }
  }
  
  ngOnDestroy() {
   this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
  
  }
