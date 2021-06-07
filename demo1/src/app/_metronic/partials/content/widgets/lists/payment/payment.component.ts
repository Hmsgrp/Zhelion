import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import { testModel } from 'src/app/_metronic/partials/content/widgets/models/test.model';
import { AssignedTest } from 'src/app/_metronic/partials/content/widgets/models/AssignedTest.model';
import { DashboardServicsService } from '../../../../../../modules/commonServices/dashboard-servics.service';
import{environment} from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { variable } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  selected:string;
  tests : testModel[] = [];
  AssignedTest : AssignedTest[] = [];
  token:string;
  Currency:string;
  CustomerID:string;
  OrderID:string;
  showLoader:boolean;
  PatientHID:string;
  PageStatus:string;
  totalAmount:number;
  testName:string;
  disablePayment:boolean;
  Nooftests:number;
  amountforOnetest:number;
  showpendingTest:boolean;
  errorSelected:boolean;
  hospitalname:string;

  constructor(private route: ActivatedRoute , private router: Router,private dashboardServices: DashboardServicsService,private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.PageStatus = params['term1'].toString();
    });
    this.PatientHID = localStorage.getItem("Hospital_PID").toString();
    this.getAssignedTest();
    this.refreshData();
    this.Currency ="INR";
    this.CustomerID = localStorage.getItem("userID").toString(); 
    this.showLoader=false;
    this.disablePayment = false;
    this.showpendingTest= false;
    this.errorSelected = false;
    this.hospitalname = localStorage.getItem("HospitalName").toString();
  }

  // getTests() {
  //   this.dashboardServices.getTest()
  //     .subscribe(data => {
  //       if(data.length == 1)
  //       {
  //         this.selected = data[0].testId.toString();
  //       }
  //       this.tests = data;
  //       this.cd.detectChanges();
  //     },
  //     error => {
  //       //this.handleError(error.message);
  //     });      
  // }

  refreshData() {
    this.dashboardServices.getTest()
      .subscribe(data => {
        this.tests = data;
        this.cd.detectChanges();
      },
      error => {
       // this.handleError(error.message);
      });    
  }

  getAssignedTest() {
    this.dashboardServices.getAssignedTest(this.PatientHID)
      .subscribe(data => {
        if(data.length > 0)
        {
          if(data.length == 1)
          {
            this.showpendingTest= false;
          }
          else
          {
            this.showpendingTest= true;
          }
         
           this.AssignedTest = data;
           this.selected = data[0].testId.toString();
           this.totalAmount = data[0].totalAmount;
           this.testName =  data[0].testName;
           this.OrderID =   data[0].orderId;
           this.Nooftests = data[0].noOfTestSugested;
           this.amountforOnetest = data[0].amountforOneTest
        }
        else{
          this.disablePayment = true;
          this.totalAmount = 0;
           this.testName =  "No Test Found";
           this.OrderID =   "0";
           this.router.navigate(["/dashboard"]);
         // if(this.PageStatus.toLowerCase() == "transaction")
        //  {
        //    this.router.navigate([""]);
        //  }  
        }
        this.cd.detectChanges();
      },
      error => {
       // this.handleError(error.message);
      });    
  }

  Payment()
  {
   this.showLoader = true;
   this.cd.detectChanges();
   this.dashboardServices.GoToPayment(this.totalAmount , this.Currency, this.CustomerID, this.OrderID)
      .subscribe(data => {
        var json = JSON.parse(data.response);
        this.token = json.body.txnToken;
        this.OrderID = data.orderID;
        this.submitData(this.token);
      },
      error => {
      }  
    );
  }

  submitData(token:string)
  {
    const my_form: any = document.createElement('form');
    my_form.name = 'paytm_form';
    my_form.method = 'post';
    var url = environment.paytmUrl;
    var QueryString1 = "mid="+environment.mid;
    var QueryString2 = "&orderId="+this.OrderID;
    my_form.action = url + QueryString1 + QueryString2;

    
    let paytm = {mid : environment.mid , orderId : this.OrderID , txnToken : token}
    const myParams = Object.keys(paytm);
    for (let i = 0; i < myParams.length; i++) {
      const key = myParams[i];
      let my_tb: any = document.createElement('input');
      my_tb.type = 'hidden';
      my_tb.name = key;
      my_tb.value = paytm[key];
      my_form.appendChild(my_tb);
    };

    document.body.appendChild(my_form);
    my_form.submit();
  }

  change(selectedtestId:any)
  {
    if(selectedtestId !=null)
    {
      this.errorSelected = false;
      this.disablePayment = false;
      let testid = selectedtestId;
      var selectedtest = this.AssignedTest.filter(x => x.testId == testid);
      this.totalAmount = selectedtest[0].totalAmount;
      this.testName =  selectedtest[0].testName;
      this.OrderID =    selectedtest[0].orderId;
      this.Nooftests =  selectedtest[0].noOfTestSugested;
      this.amountforOnetest =  selectedtest[0].amountforOneTest
    }
    else
    {
      this.errorSelected = true;
      this.disablePayment = true;
      this.amountforOnetest = 0;
      this.Nooftests = 0;
      this.totalAmount = 0;
      this.testName =  "";
      this.OrderID =   "0";
    }
  }


  // submitData(token:string)
  // {
  //   const my_form: any = document.createElement('form');
  //   my_form.name = 'paytm_form';
  //   my_form.method = 'post';
    
  //   my_form.action = 'https://securegw-stage.paytm.in/theia/api/v1/showPaymentPage?mid=VnuRWW38945630279333&orderId=dasdasd7891';

    
  //   let paytm = {mid : "VnuRWW38945630279333" , orderId : "dasdasd7891" , txnToken : token}
  //   const myParams = Object.keys(paytm);
  //   for (let i = 0; i < myParams.length; i++) {
  //     const key = myParams[i];
  //     let my_tb: any = document.createElement('input');
  //     my_tb.type = 'hidden';
  //     my_tb.name = key;
  //     my_tb.value = paytm[key];
  //     my_form.appendChild(my_tb);
  //   };

  //   document.body.appendChild(my_form);
  //   my_form.submit();
  // }




}
