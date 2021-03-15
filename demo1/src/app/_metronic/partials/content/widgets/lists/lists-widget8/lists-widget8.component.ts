import { Component, Input ,ChangeDetectorRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardServicsService } from '../../../../../../modules/commonServices/dashboard-servics.service';
import { Subscription, Observable } from 'rxjs';
import { LabModel } from 'src/app/_metronic/partials/content/widgets/models/lab.model';


@Component({
  selector: 'app-lists-widget8',
  templateUrl: './lists-widget8.component.html',
})
export class ListsWidget8Component {
  @Input() cssClass;
  LabRegistration: FormGroup;
  isEdit:boolean;
  editID:string;
  updateMessage:string;
  showPostSuccessNotification:boolean;
  showUpdateNotification:boolean;
  buttontext:string;
  hasError:boolean;
  errorText:string;
  postSuccessText:string;
  Labs : LabModel[] = [];
  page:any;

  private unsubscribe: Subscription[] = [];

  constructor(private fb: FormBuilder , private dashboardServices: DashboardServicsService,private cd: ChangeDetectorRef) { }

  defaultVal = {
    userName: '',
    password: '',
    labName: '',
    labAddress: '',
    contactPerson:'',
    mobileNumber:'',
    landlineNumber:''
  };

  ngOnInit(): void {
    this.initForm();
    this.refreshData();
    this.Initializevariables();
  }

  initForm() {
    this.LabRegistration = this.fb.group({
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
          Validators.maxLength(30),
        ]),
      ],
      labName: [
        this.defaultVal.labName,
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(15),
        ]),
      ],
      labAddress: [
        this.defaultVal.labAddress,
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(15),
        ]),
      ],
      contactPerson: [
        this.defaultVal.contactPerson,
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
      ] ,
      landlineNumber: [
        this.defaultVal.landlineNumber,
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(15),
        ]),
      ]
    });
  }

  submitData()
  {
     if(this.isEdit)
     {
      this.updateData();
     }
     else
     {
       this.postData();
     }
  }

  //Api calls
  postData()
  {
    this.dashboardServices.AddLab(this.LabRegistration)
      .subscribe(data => {
        this.handleSuccessforPost();
      },
      error => {
        this.handleError(error.message);
      }  
    );
  }

  updateData()
  {
    this.dashboardServices.editLab(this.LabRegistration,this.editID)
      .subscribe(data => {
        this.handleSuccessforUpdate();
      },
      HttpErrorResponse =>{
        this.handleError(HttpErrorResponse.message+" Check Api");
      }
    );
  }

  refreshData() {
    this.dashboardServices.getLab()
      .subscribe(data => {
        this.Labs = data;
        this.cd.detectChanges();
      },
      error => {
        this.handleError(error.message);
      });    
  }

   delete(labId:string)
  {
    this.dashboardServices.deleteLab(labId)
    .subscribe(data => {
      this.handleDelete();
    },
    error => {
      this.handleError(error.message);
    });
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
  }

  HandleEdit(id:string)
  {
    this.isEdit = true;
    this.editID = id;
    this.buttontext = "Update";
  }

  closeAllNotification()
  {
    setTimeout(() => {
      this.showUpdateNotification = false;
      this.showPostSuccessNotification = false;
      this.cd.detectChanges();
    }, 3000);
  }

  closeNotification()
  {
    this.showUpdateNotification = false;
    this.showPostSuccessNotification = false;
    this.hasError = false;
  }

  handleError(error:string)
  {
    this.errorText = error;
    this.hasError = true;
    this.cd.detectChanges();
  }

  handleSuccessforPost()
  {
    this.postSuccessText = "Added Successfully";
    this.LabRegistration.reset();
    this.showPostSuccessNotification = true;
    this.refreshData();
    this.closeAllNotification();
  }

  handleSuccessforUpdate()
  {  
    this.updateMessage = "Updated Successfully."
    this.showUpdateNotification = true;
    this.refreshData();
    this.resetData()
    this.closeAllNotification(); 
  }

  handleDelete()
  { 
    this.updateMessage = "Deleted Successfully."
    this.showUpdateNotification = true;
    this.refreshData();
    this.closeAllNotification(); 
  }

  resetData()
  {
    this.LabRegistration.reset();
    this.isEdit = false;
    this.buttontext = "Submit";
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}


