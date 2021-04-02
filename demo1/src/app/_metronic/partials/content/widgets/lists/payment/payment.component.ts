import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import { testModel } from 'src/app/_metronic/partials/content/widgets/models/test.model';
import { DashboardServicsService } from '../../../../../../modules/commonServices/dashboard-servics.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  selected:string;
  tests : testModel[] = [];
  constructor(private dashboardServices: DashboardServicsService,private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.refreshData();
  }

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


}
