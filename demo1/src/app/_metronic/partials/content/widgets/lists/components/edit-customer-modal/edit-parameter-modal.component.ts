import { Component, Input, OnDestroy, OnInit,ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { catchError, finalize, first, tap } from 'rxjs/operators';
import { DashboardServicsService } from 'src/app/modules/commonServices/dashboard-servics.service';
import { testParameter } from 'src/app/_metronic/partials/content/widgets/models/testParameter.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'edit-parameter-modal',
  templateUrl: './edit-parameter-modal.component.html',
  styleUrls: ['./edit-parameter-modal.component.scss'],
  // NOTE: For this example we are only providing current component, but probably
  // NOTE: you will w  ant to provide your main App Module
  providers: [FormBuilder]
})
export class EditParameterModalComponent implements OnInit, OnDestroy {
  @Input() fromParent;
  parameterRegistration: FormGroup;
  isEdit:boolean;
  editID:string;
  updateMessage:string;
  showPostSuccessNotification:boolean;
  showUpdateNotification:boolean;
  buttontext:string;
  hasError:boolean;
  errorText:string;
  postSuccessText:string;
  testParameters : testParameter[] = [];
  testID:string;

  defaultVal = {
    parameterName: '',
    rangesFrom: '',
    rangesTo: ''   
  };

  isLoading$;
  formGroup: FormGroup;
  private subscriptions: Subscription[] = [];
  constructor(
    private fb: FormBuilder, public modal: NgbActiveModal , private dashboardServices: DashboardServicsService,private cd: ChangeDetectorRef,private modalService: NgbModal
    ) { }

  ngOnInit(): void {
    this.initForm();
    this.refreshData();
    this.Initializevariables();
    console.log(this.fromParent);
    this.testID = this.fromParent;
  }

  initForm() {
    this.parameterRegistration = this.fb.group({
      parameterName: [
        this.defaultVal.parameterName,
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        ]),
      ],
      rangesFrom: [
        this.defaultVal.rangesFrom,
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(10),
        ]),
      ],
      rangesTo: [
        this.defaultVal.rangesTo,
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(10),
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
    this.dashboardServices.AddTestParameter(this.parameterRegistration,this.testID)
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
    this.dashboardServices.editTestParameter(this.parameterRegistration,this.editID)
      .subscribe(data => {
        this.handleSuccessforUpdate();
      },
      error => {
        this.handleError(error.message);
      }  
    );
  }


  refreshData() {
    this.dashboardServices.getTestParameters(this.fromParent)
      .subscribe(data => {
        this.testParameters = data;
        this.cd.detectChanges();
      },
      HttpErrorResponse =>{
        this.handleError(HttpErrorResponse.message+" Check Api");
      });    
  }

   delete(testparameterID:string)
  {
    this.dashboardServices.deleteTestParameter(testparameterID)
    .subscribe(data => {
      this.handleDelete();
    },
    error => {
      this.handleError(error.message);
    });
  }

  //Api calls end

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
    this.parameterRegistration.reset();
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
    this.parameterRegistration.reset();
    this.isEdit = false;
    this.buttontext = "Submit";
  }

  closeModal()
  {
    this.modalService.dismissAll();
  }
  

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

}
