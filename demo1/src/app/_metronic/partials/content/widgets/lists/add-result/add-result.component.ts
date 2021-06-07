import { Component, OnInit, ChangeDetectorRef,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { DashboardServicsService } from '../../../../../../modules/commonServices/dashboard-servics.service';
import { HospitalModel } from 'src/app/_metronic/partials/content/widgets/models/hospital.model';
import { Gender } from 'src/app/_metronic/partials/content/widgets/models/Gender.model';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';

@Component({
  selector: 'app-add-result',
  templateUrl: './add-result.component.html',
  styleUrls: ['./add-result.component.scss']
})
export class AddResultComponent implements OnInit {
  spinnerType = SPINNER.squareLoader;
  ResultForm: FormGroup;
  hasError: boolean;
  OrderResults:any;
  NoOfResultAdded : number;
  TotalNumberOfResult :number;
  ispaid :boolean;
  ErrorOccuredtext : string;
  showSuccessNotification:boolean;
  showUpdateNotification:boolean;
  postSuccessText:string;
  cashReceiptNo:string;
  showform:boolean;
  hospitals : HospitalModel[] = [];
  //selected:string;
  selectedOrder:string;
  showOrders:boolean;
  @ViewChild('myForm1', {static: false}) MyForm1: NgForm;
  @ViewChild('formRef', {static: false}) MyForm: NgForm;
  orderResult:any;
  patientId:string;
  testName:string;
  selectedgender:string;
  selectedSpecimen:string;
  allOrders:any
  testUnit : string;
  GenderVal : Gender[] = [{
    Id: 'Male',
    Name: 'Male'
  },
  {
    Id: 'Female',
    Name: 'FeMale'
  }];

  SpecimanType : Gender[] = [{
    Id: 'Blood',
    Name: 'Blood'
  },
  {
    Id: 'Saliva',
    Name: 'Saliva'
  }];

  Result : Gender[] = [{
    Id: 'Significant',
    Name: 'Significant'
  },
  {
    Id: 'InSignificant',
    Name: 'InSignificant'
  }];
  selectedResult:string;

  constructor(private dashboardServices: DashboardServicsService,private fb: FormBuilder,private cd: ChangeDetectorRef,private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {

    //this.getHospital();
    this.initForm();
    this.ispaid = true;
    this.showform = false;
    this.cashReceiptNo = "";
    this.showOrders = false;
  }

  defaultVal = {
    patientID: '',
  };

  get f() {
    return this.ResultForm.controls;
  }

  initForm() {
    this.ResultForm = this.fb.group({
      patientID: [
        this.defaultVal.patientID,
        Validators.compose([
          Validators.required
        ]),
      ]
    });
  }

  // getHospital() {
  //   this.dashboardServices.getHospital()
  //     .subscribe(data => {
  //       this.hospitals = data;
      
  //       this.cd.detectChanges();
  //     },
  //     HttpErrorResponse =>{
  //       this.handleError(HttpErrorResponse.message+" Check Api");
  //     });    
  // }

  submitOrderID()
  {
    this.ngxService.start(); 
    this.getAllOrder();   
  }

  getAllOrder()
  {
      this.dashboardServices.GetAllByPatientID(this.MyForm1.form.controls.patientID.value)
      .subscribe(data => {
        this.ngxService.stop(); 
        this.showOrders = true;
        this.OrderResults = data;
        this.testUnit = data[0].testUnit;
        console.log(data);
        this.cd.detectChanges();
      },
      HttpErrorResponse =>{
        //this.handleError(HttpErrorResponse.message+" Check Api");
      }
      )
  }

  add()
  {
    if(this.NoOfResultAdded < this.TotalNumberOfResult){
      this.dashboardServices.AddResult(this.OrderResults ,this.MyForm.form ,this.cashReceiptNo,this.selectedgender,this.selectedOrder,this.selectedSpecimen,this.selectedResult)
      .subscribe(data => {
        this.NoOfResultAdded = this.NoOfResultAdded + 1;
        this.handleSuccessforPost();
        this.cd.detectChanges();
      },
      HttpErrorResponse =>{
        //this.handleError(HttpErrorResponse.message+" Check Api");
      });    
    }
    else{
      this.handleError("Maximum no of Test Reached");
    }
  }

 change($event): void {
    let filterorderResult = this.OrderResults.filter(x=>x.orderId == $event);
    this.orderResult = filterorderResult[0];
    this.NoOfResultAdded = this.orderResult.noOfResultAdded;
    this.TotalNumberOfResult= this.orderResult.totalNumberOfResult;

    this.patientId =  this.orderResult.patientId;
    this.testName =  this.orderResult .testName;
    
    if(!(this.NoOfResultAdded < this.TotalNumberOfResult)){
      this.handleError("Test Results are already added");
    }
    else
    {
      this.ispaid =   this.orderResult.isPaid;
      if(this.ispaid)
      {
        this.showform  = true;
      }
      else
      {
        this.showform  = false;
      }
    }
    this.cd.detectChanges();
  }

  ValidateCashReceipt(receiptNo:string)
  {
    if(receiptNo && receiptNo !="")
    {
      this.cashReceiptNo = receiptNo;
      this.ispaid = true;
      this.showform = true;
    }
    else
    {
      this.handleError("Please enter cashReceiptNo");
    }
  }

  closeNotification()
  {
      this.showSuccessNotification = false;
      this.showUpdateNotification = false;
      this.hasError = false;
  }

  handleError(error:string)
  {
    this.ErrorOccuredtext = error;
    this.hasError = true;
    this.closeAllErrors()
    this.cd.detectChanges();
  }

  closeAllErrors()
  {
    setTimeout(() => {
      this.hasError = false;
      this.cd.detectChanges();
    }, 3000);
  }

  handleSuccessforPost()
  {
    this.postSuccessText = "Added Successfully";
    this.selectedgender = "";
    //this.selected = "";
    this.MyForm.form.reset();
    this.showSuccessNotification = true;
    this.closeAllNotification();
  }

  closeAllNotification()
  {
    setTimeout(() => {
      this.showUpdateNotification = false;
      this.showSuccessNotification = false;
      this.cd.detectChanges();
    }, 3000);
  }
}
