import { Component, OnInit, ChangeDetectorRef ,ViewChild,ElementRef} from '@angular/core';
import { DashboardServicsService } from '../../../../../../modules/commonServices/dashboard-servics.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PrintResultComponent } from '../view-result/print-result/print-result.component';
import { ActivatedRoute , Router } from '@angular/router';
import { resultfilter } from 'src/app/_metronic/partials/content/widgets/models/resultFilter.model';

@Component({
  selector: 'app-view-result',
  templateUrl: './view-result.component.html',
  styleUrls: ['./view-result.component.scss']
})
export class ViewResultComponent implements OnInit {
  results:any;
  filteredresult:any;
  getindividualReport:any;
  p:any;
  searchText:string;
  orderID:string;
  constructor(private modalService: NgbModal,private dashboardServices: DashboardServicsService,private cd: ChangeDetectorRef, private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.refreshData();
  }

  Search(startDate:Date,endDate:Date)
  {

    this.filteredresult = this.results.filter(
      m => this.getDate(m.createdOn) >= this.getDate(startDate)
	    && this.getDate(m.createdOn) <= this.getDate(endDate)
      );

      this.cd.detectChanges();
  }

  getDate = function (date: any): string{
    const _date = new Date(date);
    return `${_date.getFullYear()}-${_date.getMonth()}-${_date.getDate()}`;      
  };

  refreshData() {
    const result = new resultfilter();
      result.labId = localStorage.getItem("userID").toString();
      result.testId = "";
      result.startDate = "";
      result.endDate = "";
      result.patientID = "";
      result.hospitalName = "";
      result.referredBy =  "";
      result.hospitalID = "";
      result.hPID= "";

    this.dashboardServices.ViewfilteredResults(result)
      .subscribe(data => {
        this.results = data;
        this.filteredresult = this.results;
        console.log(data);
        this.cd.detectChanges();
      },
      HttpErrorResponse =>{
      //  this.handleError(HttpErrorResponse.message+" Check Api");
      }
      )      
  }

  GenerateReport(resultId:string)
  {
    //console.log(1);
    this.getindividualReport = this.results.filter(m => m.resultId == resultId);
    // this.router.navigate(['/PrintResult']);
    let urlprint = "/PrintResult/"+ this.getindividualReport[0].resultId;
    const url = this.router.serializeUrl(
      this.router.createUrlTree([urlprint])
    );
  
    window.open(url, '_blank');
  }

}
