import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { DashboardServicsService } from '../../../../../../modules/commonServices/dashboard-servics.service';
import{environment} from 'src/environments/environment';

@Component({
  selector: 'app-mapping-urls',
  templateUrl: './mapping-urls.component.html',
  styleUrls: ['./mapping-urls.component.scss']
})
export class MappingUrlsComponent implements OnInit {

  constructor(private dashboardServices: DashboardServicsService,private cd: ChangeDetectorRef) { }
  mappingurls:any;
  weburl:string;
  ngOnInit(): void {
    this.weburl = environment.mylocalhosturl;
    this.refreshData();
  }

  refreshData() {
    this.dashboardServices.GetAllMappingURL()
      .subscribe(data => {
        this.mappingurls = this.sortData(data);
        console.log(data);
        this.cd.detectChanges();
      },
      HttpErrorResponse =>{
      
      });    
  }

   sortData(data:any) {
    return data.sort((a, b) => {
      return <any>new Date(b.createdDateTime) - <any>new Date(a.createdDateTime);
    });
  }
}

