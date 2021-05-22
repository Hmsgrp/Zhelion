import { Component, OnInit, ChangeDetectorRef ,ViewChild,ElementRef} from '@angular/core';
import { DashboardServicsService } from '../../../../../../modules/commonServices/dashboard-servics.service';
import { ActivatedRoute , Router } from '@angular/router';

@Component({
  selector: 'app-active-patients',
  templateUrl: './active-patients.component.html',
  styleUrls: ['./active-patients.component.scss']
})
export class ActivePatientsComponent implements OnInit {

  results:any;
  p:any;
  searchText:string;

  constructor(private dashboardServices: DashboardServicsService,private cd: ChangeDetectorRef,
    private router: Router,private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    
    this.refreshData();
  }

  refreshData() {
    this.dashboardServices.GetpatientList()
      .subscribe(data => {
        this.results = data;
        console.log(data);
        this.cd.detectChanges();
      },
      HttpErrorResponse =>{
      //  this.handleError(HttpErrorResponse.message+" Check Api");
      }
      )      
  }

  GenerateReport(hospitalID:string,hospital_PID:string)
  {
    let urlprint = "/ViewReport/"+ hospitalID +"/"+ hospital_PID;
    const url = this.router.serializeUrl(
      this.router.createUrlTree([urlprint])
    );
  
    window.open(url, '_blank');
  }

}
