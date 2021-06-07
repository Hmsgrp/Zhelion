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
  spinnerType = SPINNER.wanderingCubes;
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
  @ViewChild('formRef', {static: false}) formRef: NgForm;
  orderResult:any;
  orderResulttoarr:[];
  patientId:string;
  testName:string;
  selectedgender:string;
  selectedSpecimen:string;
  allOrders:any
  testUnit : string;
  labPatients:any;
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
  selectedPatient:string;
  PatientName:string;
  age:string;
  sex:string;
  disablefields:boolean;

  constructor(private dashboardServices: DashboardServicsService,private fb: FormBuilder,private cd: ChangeDetectorRef,private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {

    //this.getHospital();
    this.getPatientsforLabReport();
    this.initForm();
    this.ispaid = true;
    this.showform = false;
    this.cashReceiptNo = "";
    this.showOrders = false;
    this.disablefields = false;
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

  getPatientsforLabReport()
  {
    this.ngxService.start(); 
    this.dashboardServices.GetPatientsforLabEntry()
      .subscribe(data => {
        this.labPatients = data;
        this.ngxService.stop(); 
        this.cd.detectChanges();
      },
      HttpErrorResponse =>{
        //this.handleError(HttpErrorResponse.message+" Check Api");
      }
      )
  }

  submitOrderID()
  {
    this.ngxService.start(); 
    this.getAllOrder();   
  }

  getAllOrder()
  {
      this.dashboardServices.GetAllByPatientID(this.selectedPatient)
      .subscribe(data => {
        this.ngxService.stop(); 
        this.showOrders = true;
        this.OrderResults = data;
        console.log(this.OrderResults);
        if(this.OrderResults[0].result)
        {
          this.disablefields = true;
          this.PatientName = this.OrderResults[0].result.patientName;
          this.age = this.OrderResults[0].result.age;
          this.sex = this.OrderResults[0].result.sex;
        }
        this.testUnit = data[0].testUnit;
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
      this.dashboardServices.AddResult(this.OrderResults.filter(x=>x.orderId == this.selectedOrder) ,this.formRef.form ,this.cashReceiptNo,this.selectedgender,this.selectedOrder,this.selectedSpecimen,this.selectedResult)
      .subscribe(data => {
        this.NoOfResultAdded = this.NoOfResultAdded + 1;
        this.handleSuccessforPost();
        this.showform  = false;
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
        this.setformValue();
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
      this.setformValue();
    }
    else
    {
      this.handleError("Please enter cashReceiptNo");
    }
  }

  setformValue()
  {
    setTimeout(() => {
      this.formRef.controls.patientName.setValue(this.PatientName); 
      this.formRef.controls.age.setValue(this.age);
      this.selectedgender = this.sex;
      this.cd.detectChanges();
    }, 1000);
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
    this.showOrders = false;
    this.selectedOrder = "";
    this.selectedPatient = "";
    this.formRef.form.reset();
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

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
}
