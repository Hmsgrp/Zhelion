import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { DashboardServicsService } from '../../../../../../modules/commonServices/dashboard-servics.service';
import { RoleModel } from 'src/app/_metronic/partials/content/widgets/models/role.model';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'app-lists-widget1',
  templateUrl: './lists-widget1.component.html',
})
export class ListsWidget1Component implements OnInit,OnDestroy {
  defaultVal = {
    roleName: '',
    roleDescription: '',
  };
  p:any;

  roles : RoleModel[] = [];

  hasError: boolean;
  showSuccessNotification: boolean;
  showUpdateNotification:boolean;
  RoleRegistration: FormGroup;
  isEdit:boolean;
  RoleIDforEdit:string;
  submitBtntext:string;
  ErrorOccuredtext:string;
  updateMessage:string;
  // private fields
  private unsubscribe: Subscription[] = [];

  constructor(private fb: FormBuilder,private cd: ChangeDetectorRef, private dashboardServices: DashboardServicsService,) {}

  
  ngOnInit(): void {
    this.submitBtntext="Submit";
    this.ErrorOccuredtext = "No errors found";
    this.showUpdateNotification = false;
    this.updateMessage="";
    this.refreshRoles();
    this.initForm();
  }

  get f() {
    return this.RoleRegistration.controls;
  }

  initForm() {
    this.RoleRegistration = this.fb.group({
      roleName: [
        this.defaultVal.roleName,
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(15), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        ]),
      ],
      roleDescription: [
        this.defaultVal.roleDescription,
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ]),
      ],
    });
  }

  refreshRoles() {
    this.dashboardServices.getRoles()
      .subscribe(data => {
        this.roles = data;
        this.cd.detectChanges();
      },
      HttpErrorResponse =>{
        this.handleError(HttpErrorResponse.message+" Check Api");
      }
      )      
  }

  handleError(error:string)
  {
    this.hasError = true;
    this.ErrorOccuredtext = error;
    this.cd.detectChanges();
  }

  submitRole() {
    if(this.isEdit)
    {
      this.UpdateData();
    }
    else
    {
      this.PostData();
    }
  }

  PostData()
  {
    this.dashboardServices.AddRole(this.f.roleName.value,this.f.roleDescription.value)
    .subscribe(data => {
      this.refreshRoles();
      this.showSuccessNotification = true;
      this.closenewNotification();
      this.cd.detectChanges();
      this.RoleRegistration.reset();
    },
    error => {
      this.hasError = true;
      this.ErrorOccuredtext=error;
    }  
    );
  }

  UpdateData()
  {
    this.dashboardServices.EditRole(this.RoleIDforEdit,this.f.roleName.value,this.f.roleDescription.value)
    .subscribe(data => {
      this.submitBtntext="Submit";  
      this.isEdit = false;
      this.showUpdateNotification = true;
      this.updateMessage="Role Updated Successfully."
      this.RoleRegistration.reset();
      this.closenUpdNotification(); 
      this.refreshRoles();
    },
    error => {
      this.hasError = true;
      this.closeErrorNotification();
      this.ErrorOccuredtext=error.message;
    });
  }

  closenUpdNotification()
  {
    setTimeout(() => {
      this.showUpdateNotification = false;
      this.cd.detectChanges();
    }, 3000);
  }

  closenewNotification()
  {
    setTimeout(() => {
      this.showSuccessNotification = false;
      this.cd.detectChanges();
    }, 3000);
  }

  closeErrorNotification()
  {
    setTimeout(() => {
      this.hasError = false;
      this.cd.detectChanges();
    }, 3000);
  }

  closeNotification()
  {
      this.showSuccessNotification = false;
      this.showUpdateNotification = false;
      this.hasError = false;
  }

  editRole(roleId: string,roleName:string,roleDescription:string)
  {
    this.initForm();
    this.submitBtntext="Update";
    this.isEdit = true;
    this.RoleIDforEdit = roleId;
    this.RoleRegistration = this.fb.group({
      roleName: [
        roleName   
      ],
      roleDescription: [
        roleDescription
      ],
    });
  }

  deleteRole(id: string)
  {
    this.dashboardServices.deleteRole(id)
    .subscribe(data => {  
      this.showUpdateNotification = true; 
      this.updateMessage="Role Deleted Successfully."
      this.closenUpdNotification();
      this.refreshRoles();
    } ,
    HttpErrorResponse => {
      this.handleError(HttpErrorResponse.error.errorDetails);
    });
  }

 

  resetData()
  {
    this.RoleRegistration.reset();
    this.isEdit = false;
    this.submitBtntext="Submit";
  }

   ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}
