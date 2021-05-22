import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardServicsService } from '../../../../../../modules/commonServices/dashboard-servics.service';
import { Subscription, Observable } from 'rxjs';
import { RoleModel } from 'src/app/_metronic/partials/content/widgets/models/role.model';
import { UserModel } from 'src/app/_metronic/partials/content/widgets/models/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { testModel } from 'src/app/_metronic/partials/content/widgets/models/test.model';
import { CommonModule } from '@angular/common';  

@Component({
  selector: 'app-prescribe-test',
  templateUrl: './prescribe-test.component.html',
  styleUrls: ['./prescribe-test.component.scss']
})
export class PrescribeTestComponent implements OnInit {

  defaultVal = {
    patientID: '',
    mobileNumber: '',
    roleSelection:[""],
    TestNumber : ''
  };
  UserRegistration: FormGroup;
  roles : RoleModel[] = [];
  users : UserModel[] = [];
  buttontext:string;
  isEdit:boolean;
  EditforuserId:string;
  showSuccessNotification:boolean;
  showUpdateNotification:boolean;
  hasError:boolean;
  ErrorOccuredtext:string;
  updateMessage:string;
  p:any;
  tests : testModel[] = [];
  selected:string;
  errorSelected :boolean;
  showPostSuccessNotification:boolean;
  postSuccessText:string;
   // private fields
   private unsubscribe: Subscription[] = [];
  constructor(private fb: FormBuilder , private dashboardServices: DashboardServicsService,private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getTests();
    this.initForm();  
    this.buttontext = "Submit";
    this.ErrorOccuredtext = "No errors found";
    this.updateMessage = "";
    this.showSuccessNotification = false;
    this.showPostSuccessNotification=false;
    this.postSuccessText="";
  }


  get userformcontrol() {
    return this.UserRegistration.controls;
  }

  initForm() {
    this.UserRegistration = this.fb.group({
      mobileNumber: [
        this.defaultVal.mobileNumber,
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(15),
        ]),
      ],
      patientID: [
        this.defaultVal.patientID,
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(30),
        ]),
      ],
      TestNumber: [
        this.defaultVal.TestNumber,
        Validators.compose([
          Validators.required
        ]),
      ]
    });
  }


  submitUser() {
    
    if(!this.selected)
    {
      this.errorSelected = true;
      return false;
    }

      this.PostData();
  }

  PostData()
  {
    this.dashboardServices.AddNewPrescribe(this.UserRegistration,this.selected)
      .subscribe(data => {
        this.handleSuccessforPost();
      },
      HttpErrorResponse => {
        this.handleError(HttpErrorResponse.error.errorDetails);
      }  
      );
  }

  
  getTests() {
    this.dashboardServices.getTest()
      .subscribe(data => {
        if(data.length == 1)
        {
          this.selected = data[0].testId.toString();
        }
        this.tests = data;
        this.cd.detectChanges();
      },
      error => {
        this.handleError(error.message);
      });      
  }


  resetData()
  {
    this.UserRegistration.reset();
    this.isEdit = false;
    this.buttontext = "Submit";
  }

  closenewNotification()
  {
    this.closeNotification();
    setTimeout(() => {
      this.showPostSuccessNotification = false;
      this.showSuccessNotification = false;
      this.cd.detectChanges();
    }, 3000);
  }

 

  closenUpdNotification()
  {
    setTimeout(() => {
      this.showUpdateNotification = false;
      this.cd.detectChanges();
    }, 3000);
  }

  closeNotification()
  {
      this.showSuccessNotification = false;
      this.showUpdateNotification = false;
      this.hasError = false;
  }

  closeErrorNotification()
  {
    setTimeout(() => {
      this.hasError = false;
      this.cd.detectChanges();
    }, 3000); 
  }

  handleError(error:string)
  {
    this.ErrorOccuredtext = error;
    this.hasError = true;
    this.cd.detectChanges();
  }

  handleSuccessforPost(){
    this.postSuccessText = "Added Successfully";
    this.selected = "";
    this.UserRegistration.reset();
    this.showPostSuccessNotification = true;
    this.closenewNotification();
    this.cd.detectChanges();
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
