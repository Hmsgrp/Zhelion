import { Component, Input ,ChangeDetectorRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardServicsService } from '../../../../../../modules/commonServices/dashboard-servics.service';
import { Subscription, Observable } from 'rxjs';
import { LabModel } from 'src/app/_metronic/partials/content/widgets/models/lab.model';
import { HospitalModel } from 'src/app/_metronic/partials/content/widgets/models/hospital.model';
import { LabMappingResult } from 'src/app/_metronic/partials/content/widgets/models/labMappingResult';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';

@Component({
  selector: 'app-lists-widget8',
  templateUrl: './lists-widget8.component.html',
})
export class ListsWidget8Component {
  spinnerType = SPINNER.cubeGrid;
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
  LabsMappingResult : LabMappingResult[] = [];
  page:any;
  hospitals : HospitalModel[] = [];

  private unsubscribe: Subscription[] = [];

  constructor(private fb: FormBuilder , private dashboardServices: DashboardServicsService,private cd: ChangeDetectorRef,private ngxService: NgxUiLoaderService) { }

  defaultVal = {
    userName: '',
    password: '',
    labName: '',
    labAddress: '',
    contactPerson:'',
    mobileNumber:'',
    landlineNumber:'',
    selectedHospital :null
  };

  ngOnInit(): void {
    this.ngxService.start(); 
    this.initForm();
    this.getHospital();
   // this.refreshData();
    this.Initializevariables();
  }

  initForm() {
    this.LabRegistration = this.fb.group({
      userName: [
        this.defaultVal.userName,
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        ]),
      ],
      password: [
        this.defaultVal.password,
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
        ]),
      ],
      labName: [
        this.defaultVal.labName,
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
        ]),
      ],
      labAddress: [
        this.defaultVal.labAddress,
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
        ]),
      ],
      contactPerson: [
        this.defaultVal.contactPerson,
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
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
      ],
      selectedHospital: [
        this.defaultVal.selectedHospital,
        Validators.compose([
          Validators.required
        ]),
      ]
    });
  }

  getHospital() {
    this.dashboardServices.getHospital()
      .subscribe(data => {
        this.hospitals = data;
        this.refreshData();
        this.cd.detectChanges();
      },
      HttpErrorResponse =>{
        this.handleError(HttpErrorResponse.message+" Check Api");
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
        this.LabsMappingResult = [];
        for (var val of data) {
          let mdl = new LabMappingResult();
           mdl.labName = val.labName;
           mdl.hospitalName =  this.hospitals.filter(x => x.hospitalId == val.hospitalID)[0].hospitalName;
           mdl.labId = val.labId;
          this.LabsMappingResult.push(mdl)
        }
        this.ngxService.stop(); 
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

  getHospitalName(HospitalID:string)
  {
    if(HospitalID)
    {
      return "sdd";
    }
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


