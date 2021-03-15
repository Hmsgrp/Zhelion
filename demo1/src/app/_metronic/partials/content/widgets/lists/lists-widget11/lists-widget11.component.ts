import { Component, Input, OnInit,ChangeDetectorRef ,EventEmitter, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardServicsService } from '../../../../../../modules/commonServices/dashboard-servics.service';
import { EditParameterModalComponent } from '../components/edit-customer-modal/edit-parameter-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, Observable } from 'rxjs';
import { testModel } from 'src/app/_metronic/partials/content/widgets/models/test.model';


@Component({
  selector: 'app-lists-widget11',
  templateUrl: './lists-widget11.component.html',
})
export class ListsWidget11Component implements OnInit {
  @Input() cssClass: '';
  TestRegistration: FormGroup;
  isEdit:boolean;
  editID:string;
  updateMessage:string;
  showPostSuccessNotification:boolean;
  showUpdateNotification:boolean;
  buttontext:string;
  hasError:boolean;
  errorText:string;
  postSuccessText:string;
  tests : testModel[] = [];
  p:any;
  private unsubscribe: Subscription[] = [];

  constructor(private modalService: NgbModal,private fb: FormBuilder , private dashboardServices: DashboardServicsService,private cd: ChangeDetectorRef) { }

  defaultVal = {
    testName: '',
    testDescription: ''
  };

  ngOnInit(): void { 
    this.initForm();
    this.refreshData();
    this.Initializevariables();
  }

  initForm() {
    this.TestRegistration = this.fb.group({
      testName: [
        this.defaultVal.testName,
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(15), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        ]),
      ],
      testDescription: [
        this.defaultVal.testDescription,
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30),
        ]),
      ] 
    });
  }

  edit(ID:string,testName:string,testDescription:string)
  {
    this.HandleEdit(ID);
    this.TestRegistration = this.fb.group({
      testName: [
        testName
      ],
      testDescription: [
        testDescription
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
    this.dashboardServices.AddTest(this.TestRegistration)
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
    this.dashboardServices.editTest(this.TestRegistration,this.editID)
      .subscribe(data => {
        this.handleSuccessforUpdate();
      },
      HttpErrorResponse =>{
        this.handleError(HttpErrorResponse.message+" Check Api");
      }
    );
  }

  refreshData() {
    this.dashboardServices.getTest()
      .subscribe(data => {
        this.tests = data;
        this.cd.detectChanges();
      },
      error => {
        this.handleError(error.message);
      });    
  }

   delete(ID:string)
  {
    this.dashboardServices.deleteTest(ID)
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
     this.TestRegistration.reset();
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
     this.TestRegistration.reset();
     this.isEdit = false;
     this.buttontext = "Submit";
   }
  editProfileForm: FormGroup;
  openModel(id:string)
  {
    const modalRef = this.modalService.open(EditParameterModalComponent,
    {
      scrollable: true,
      //windowClass: 'myCustomModalClass',
       keyboard: false,
       backdrop: 'static'
    });

    let testid = id;
    // let data = {
    //   prop1: id
    // }
    //we can pass array in this fromParent
    modalRef.componentInstance.fromParent = testid;
 
  }

   ngOnDestroy() {
     this.unsubscribe.forEach((sb) => sb.unsubscribe());
   }

}
