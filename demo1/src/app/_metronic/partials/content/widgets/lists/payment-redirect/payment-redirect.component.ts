import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import { DashboardServicsService } from '../../../../../../modules/commonServices/dashboard-servics.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment-redirect',
  templateUrl: './payment-redirect.component.html',
  styleUrls: ['./payment-redirect.component.scss']
})
export class PaymentRedirectComponent implements OnInit {

  constructor(private route: ActivatedRoute , private dashboardServices: DashboardServicsService,private cd: ChangeDetectorRef) { }
  orderId:string;
  bankTxnId:string;
  txnAmount:string;
  txnDate:string;
  resultStatus:string;
  bankName:string;
  cardScheme:string;
  transactionstatus:string;
  responsejson:any;
  patientName:string;
  testName:string;
  noOftest:number;
  OrderID:string;
  hospitalname:string;

  ngOnInit(): void { 
    this.transactionstatus = "inprogress"
    this.route.params.subscribe(params => {
      this.OrderID = params['term1'].toString();
    });
    this.hospitalname = localStorage.getItem("HospitalName").toString();
    this.getPaymentStatus();
  }


  getPaymentStatus() {
    this.dashboardServices.getPaymentStatus(this.OrderID)
      .subscribe(data => {
        console.log(data);
        this.responsejson = JSON.parse(data.paymentHistory.responseJson);
        this.bankTxnId = this.responsejson.body.bankTxnId;
        this.txnAmount = this.responsejson.body.txnAmount;
        this.txnDate = this.responsejson.body.txnDate;
        this.resultStatus = this.responsejson.body.resultInfo.resultStatus
        this.bankName = this.responsejson.body.bankName;
        this.cardScheme = this.responsejson.body.cardScheme;
        this.patientName = data.printReceiptResult.patientName;
        this.testName = data.printReceiptResult.testName;
        this.noOftest = data.printReceiptResult.noOfTest;
        this.OrderID = data.paymentHistory.orderId;

        if(this.resultStatus == "TXN_FAILURE")
        {
          this.transactionstatus = "failed"
        }
        else if(this.resultStatus == "PENDING")
        {
          this.transactionstatus = "pending"
        }
        else
        {
          this.transactionstatus = "success"
        }
        this.cd.detectChanges();
      },
      error => {
       // this.handleError(error.message);
      });    
  }

}
