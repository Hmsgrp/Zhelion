import { Component, OnInit,ChangeDetectorRef,ViewChild  } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators ,NgForm} from '@angular/forms';
import { DashboardServicsService } from '../../../../../../modules/commonServices/dashboard-servics.service';
import { Subscription, Observable } from 'rxjs';
import { RoleModel } from 'src/app/_metronic/partials/content/widgets/models/role.model';
import { UserModel } from 'src/app/_metronic/partials/content/widgets/models/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { testModel } from 'src/app/_metronic/partials/content/widgets/models/test.model';
import { userHospitalMaps } from 'src/app/_metronic/partials/content/widgets/models/userHospitalMaps.model';
import { paymentSplit } from 'src/app/_metronic/partials/content/widgets/models/paymentSplit.model';


@Component({
  selector: 'app-payment-split-up',
  templateUrl: './payment-split-up.component.html',
  styleUrls: ['./payment-split-up.component.scss']
})
export class PaymentSplitUpComponent implements OnInit {

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
  PaymentSplitUp : paymentSplit[] = [];
  testModel :testModel [] =[];
  postSuccessText:string;
  showPostSuccessNotification:boolean;
  errorText:string;
  DoctorReferrals:any;
  filteredHospitalList:any;
  selected: string;
  showEmpty:boolean;
  mappedHospital : [];
  testAmount:number;

  constructor(private fb: FormBuilder , private dashboardServices: DashboardServicsService,private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.buttontext = "Submit";
    this.ErrorOccuredtext = "No errors found";
    this.updateMessage = "";
    this.getTests();
    this.Initializevariables();
  }

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
     this.showEmpty = false;
   }

  refreshData() {
    this.PaymentSplitUp = [];
    this.dashboardServices.getPaymentSplitUp()
      .subscribe(data => {

        for (var val of data) {
          let Payment = new paymentSplit();
          Payment.splitUpID = val.splitUpID;
          Payment.testId = val.testId;
          Payment.testName = this.testModel.filter(x => x.testId == val.testId)[0].testName;
          Payment.doctorPercent = val.doctorPercent;
          Payment.labPercent = val.labPercent;
          Payment.company = val.company;

          this.PaymentSplitUp.push(Payment)
        }
        this.cd.detectChanges();
      },
      HttpErrorResponse =>{
         this.handleError(HttpErrorResponse.message+" Check Api");
      });    
  }

  getTests() {
    this.dashboardServices.getTest()
      .subscribe(data => {
        this.testModel = data;
        this.refreshData();
        this.cd.detectChanges();
      },
      HttpErrorResponse =>{
        this.handleError(HttpErrorResponse.message+" Check Api");
      });    
  }

  onItemSelect(item: any)
  {
    this.testAmount = this.testModel.filter(x => x.testId == item)[0].amount;
  }
  
  edit(paymentSplitUpID:string,TestID:string,D:string,L:number,C:number)
  {
    this.selected = TestID;
    this.MyForm.form.controls.doctorPercent.setValue(D);
    this.MyForm.form.controls.labPercent.setValue(L);
    this.MyForm.form.controls.companyPercent.setValue(C);
    this.HandleEdit(paymentSplitUpID);
  }

  submitForm(){

    if(this.isEdit)
     {
      this.updateData();
     }
     else
     {
       this.postData();
     }
}

postData()
{
  this.dashboardServices.AddPaymentSplitUp(this.MyForm.form,this.selected)
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
  this.dashboardServices.editSplitUp(this.MyForm.form,this.editID,this.selected)
      .subscribe(data => {
        this.handleSuccessforUpdate();
      },
      error => {
        this.handleError(error.message);
      }  
    );

}

delete(testID:string)
{
  this.dashboardServices.deleteSplitUp(testID)
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

  handleSuccessforUpdate()
  {  
    this.updateMessage = "Updated Successfully."
    this.showUpdateNotification = true;
    this.refreshData();
    this.resetData()
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
