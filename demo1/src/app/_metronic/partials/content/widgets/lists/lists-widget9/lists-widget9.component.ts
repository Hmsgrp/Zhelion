import { Component, OnInit,ChangeDetectorRef,ViewChild  } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators ,NgForm} from '@angular/forms';
import { DashboardServicsService } from '../../../../../../modules/commonServices/dashboard-servics.service';
import { Subscription, Observable } from 'rxjs';
import { RoleModel } from 'src/app/_metronic/partials/content/widgets/models/role.model';
import { UserModel } from 'src/app/_metronic/partials/content/widgets/models/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { HospitalModel } from 'src/app/_metronic/partials/content/widgets/models/hospital.model';
import { userHospitalMaps } from 'src/app/_metronic/partials/content/widgets/models/userHospitalMaps.model';

@Component({
  selector: 'app-lists-widget9',
  templateUrl: './lists-widget9.component.html'
})

export class ListsWidget9Component implements OnInit {
  defaultVal = {
    userName: '',
    password: '',
    mobileNumber: '',
    emailID: '',
    roleSelection:[""]
  };
  registerForm: FormGroup;
  roles : RoleModel[] = [];
  users : UserModel[] = [];
  buttontext:string;
  isEdit:boolean;
  editID:string;
  showSuccessNotification:boolean;
  showUpdateNotification:boolean;
  hasError:boolean;
  ErrorOccuredtext:string;
  updateMessage:string;
  p:any;
  @ViewChild('myForm', {static: false}) MyForm: NgForm;
  hospitals : HospitalModel[] = [];
  userHospitalMaps: Array<userHospitalMaps> = [];
  // selected = [  ];
  postSuccessText:string;
  showPostSuccessNotification:boolean;
  errorText:string;
  DoctorReferrals:any;
  filteredHospitalList:any;
  selected: [];
  showEmpty:boolean;
  mappedHospital : [];

   // private fields
   private unsubscribe: Subscription[] = [];
  constructor(private fb: FormBuilder , private dashboardServices: DashboardServicsService,private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.buttontext = "Submit";
    this.ErrorOccuredtext = "No errors found";
    this.updateMessage = "";
    this.getHospital();
    this.refreshData();
    this.Initializevariables();
  }

   //common methods
   Initializevariables()
   {
     this.isEdit=false;
     this.editID = "";
     this.updateMessage = "";
     this.showUpdateNotification = false;
     this.buttontext="Submit";
     this.hasError = false;
     this.errorText = "";
     this.showPostSuccessNotification=false;
     this.postSuccessText="";
     this.showEmpty = true;
     this.mappedHospital = [];
   }

  refreshData() {
    this.dashboardServices.getDoctorReferrals()
      .subscribe(data => {
        this.DoctorReferrals = data;
        console.log(data);
        if(this.DoctorReferrals.length > 0)
        {
          this.showEmpty = false;
        }
        else
        {
          this.showEmpty = true;
        }
        
        this.cd.detectChanges();
      },
      HttpErrorResponse =>{
         this.handleError(HttpErrorResponse.message+" Check Api");
      });    
  }

  getHospital() {
    this.dashboardServices.getHospital()
      .subscribe(data => {
        this.hospitals = data;
        this.cd.detectChanges();
      },
      HttpErrorResponse =>{
        this.handleError(HttpErrorResponse.message+" Check Api");
      });    
  }

  
  edit(userid:string,userName:string,emailId:string,mobileNumber:number)
  {
    this.HandleEdit(userid);
    this.MyForm.form.controls.fullName.setValue(userName);
    this.MyForm.form.controls.mobileNumber.setValue(mobileNumber);
    this.MyForm.form.controls.emailID.setValue(emailId);

    for (var val of this.selected) {
      let userHospitalMap = new userHospitalMaps();
      userHospitalMap.hospitalId = val;
      this.userHospitalMaps.push(userHospitalMap)
    }

    this.selected = this.DoctorReferrals.filter(x => x.user.userID == userid)[0]["UserHospitalMapResult"];
  }

  getSelectedValue(){
    console.log(this.selected);
  }

  get userformcontrol() {
    return this.registerForm.controls;
  }

  submitForm(){
    this.mappedHospital = [];
    for (var val of this.selected) {
     this.mappedHospital.push(val)
    }

    this.dashboardServices.AddDoctorReferral(this.MyForm.form,this.mappedHospital)
    .subscribe(data => {
      this.handleSuccessforPost();
    
    },
    error => {
      this.handleError(error.message);
    }  
  );
 
}

delete(userId:string)
{
  this.dashboardServices.deleteDoctorReferral(userId)
  .subscribe(data => {
    this.handleDelete();
  },
  error => {
    this.handleError(error.message);
  });
}

HandleEdit(id:string)
{
  this.isEdit = true;
  this.editID = id;
  this.buttontext = "Update";
}

closeNotification()
{
  this.showUpdateNotification = false;
  this.showPostSuccessNotification = false;
  this.hasError = false;
}

closeAllNotification()
{
  setTimeout(() => {
    this.showUpdateNotification = false;
    this.showPostSuccessNotification = false;
    this.cd.detectChanges();
  }, 3000);
}

 handleDelete()
  { 
    this.updateMessage = "Deleted Successfully."
    this.showUpdateNotification = true;
    this.refreshData();
    this.closeAllNotification(); 
  }

  handleSuccessforPost()
  {
    this.postSuccessText = "Added Successfully";
    this.MyForm.form.reset();
    this.showPostSuccessNotification = true;
    this.refreshData();
    this.closeAllNotification();
  }

  handleError(error:string)
  {
    this.errorText = error;
    this.hasError = true;
    this.cd.detectChanges();
  }

  resetData()
  {
    this.MyForm.form.reset();
    this.isEdit = false;
    this.buttontext = "Submit";
  }

}
