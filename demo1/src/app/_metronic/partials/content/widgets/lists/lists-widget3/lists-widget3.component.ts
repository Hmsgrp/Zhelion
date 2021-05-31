import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardServicsService } from '../../../../../../modules/commonServices/dashboard-servics.service';
import { Subscription, Observable } from 'rxjs';
import { RoleModel } from 'src/app/_metronic/partials/content/widgets/models/role.model';
import { UserModel } from 'src/app/_metronic/partials/content/widgets/models/user.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-lists-widget3',
  templateUrl: './lists-widget3.component.html',
})
export class ListsWidget3Component implements OnInit {
  defaultVal = {
    userName: '',
    password: '',
    mobileNumber: '',
    emailID: '',
    roleSelection:null
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
   // private fields
   private unsubscribe: Subscription[] = [];
  constructor(private fb: FormBuilder , private dashboardServices: DashboardServicsService,private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.initForm();
    this.getRoles();
    this.refreshUsers();
    this.buttontext = "Submit";
    this.ErrorOccuredtext = "No errors found";
    this.updateMessage = "";
  }


  get userformcontrol() {
    return this.UserRegistration.controls;
  }

  initForm() {
    this.UserRegistration = this.fb.group({
      userName: [
        this.defaultVal.userName,
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(15), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        ]),
      ],
      password: [
        this.defaultVal.password,
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(15),
        ]),
      ],
      mobileNumber: [
        this.defaultVal.mobileNumber,
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(15),
        ]),
      ],
      emailID: [
        this.defaultVal.emailID,
        Validators.compose([
          Validators.email,
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(25),
        ]),
      ],
      roleSelection: [
        this.defaultVal.roleSelection,
        Validators.compose([
          Validators.required
        ]),
      ]
    });
  }


  submitUser() {
    if(this.isEdit)
    {
      this.UpdateData();
    }
    else{
      this.PostData();
    }  
  }

  PostData()
  {
    this.dashboardServices.AddUser(this.UserRegistration)
      .subscribe(data => {
        this.refreshUsers();
       this.UserRegistration.reset();
       this.updateMessage = "Role Updated Successfully."
       this.showSuccessNotification=true;
       this.closenewNotification();
      },
      HttpErrorResponse => {
        this.handleError(HttpErrorResponse.error.errorDetails);
      }  
      );
  }

  UpdateData()
  {
    this.dashboardServices.EditUser(this.UserRegistration,this.EditforuserId)
    .subscribe(data => {
      this.refreshUsers();
      this.isEdit = false;
      this.updateMessage = "User Updated Successfully."
      this.showUpdateNotification = true;
      this.buttontext = "Submit";
      this.UserRegistration.reset();
      this.closenUpdNotification(); 
    },
    HttpErrorResponse => {
      this.handleError(HttpErrorResponse.error.errorDetails);
    }  
    );
  }
  
  getRoles() {
    this.dashboardServices.getRoles()
      .subscribe(data => {
        this.roles = data.filter(x => x.roleName.toLowerCase() !='doctor' && x.roleName.toLowerCase() !='patient');
        this.cd.detectChanges();
      });      
  }

  refreshUsers() {
    this.dashboardServices.getUsers()
      .subscribe(data => {
        this.users = data;
        this.cd.detectChanges();
      },
      HttpErrorResponse => {
        this.handleError(HttpErrorResponse.message);
      });      
  }

  editUser(userID:string,userName:string,password:string,mobileNumber:number,roleId:string,emailId:string)
  {
    this.buttontext = "Update";
    this.isEdit=true;
    this.EditforuserId=userID;
    this.UserRegistration = this.fb.group({
      userName: [
        userName   
      ],
      password: [
        password
      ],
      mobileNumber: [
        mobileNumber
      ],
      roleSelection: [
        roleId
      ],
      emailID: [
        emailId
      ],
    });
  }

  deleteUser(UserID : string)
  {
    this.dashboardServices.deleteUser(UserID)
    .subscribe(data => {  
      this.showUpdateNotification = true; 
      this.updateMessage = "User Deleted Successfully."
      this.closenUpdNotification();
      this.refreshUsers();
    },
    HttpErrorResponse => {
      this.handleError(HttpErrorResponse.message);
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
    console.log(error);
    this.ErrorOccuredtext = error;
    this.hasError = true;
    this.cd.detectChanges();
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
