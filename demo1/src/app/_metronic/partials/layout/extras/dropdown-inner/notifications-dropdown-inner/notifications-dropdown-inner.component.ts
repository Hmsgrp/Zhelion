import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { LayoutService } from '../../../../../core';
import { DashboardServicsService } from '../../../../../../modules/commonServices/dashboard-servics.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications-dropdown-inner',
  templateUrl: './notifications-dropdown-inner.component.html',
  styleUrls: ['./notifications-dropdown-inner.component.scss'],
})
export class NotificationsDropdownInnerComponent implements OnInit {
  notifications:any;
  totalcount:number;
  userID:string;
  extrasNotificationsDropdownStyle: 'light' | 'dark' = 'dark';
  activeTabId:
    | 'topbar_notifications_notifications'
    | 'topbar_notifications_events'
    | 'topbar_notifications_logs' = 'topbar_notifications_events';
  constructor(private dashboardServices: DashboardServicsService,private layout: LayoutService,private cd: ChangeDetectorRef,  private router: Router) {}

  ngOnInit(): void {
    this.extrasNotificationsDropdownStyle = this.layout.getProp(
      'extras.notifications.dropdown.style'
    );
    this.userID = localStorage.getItem("userID").toString();
    this.refreshData();
  }

  setActiveTabId(tabId) {
    this.activeTabId = tabId;
  }

  getActiveCSSClasses(tabId) {
    if (tabId !== this.activeTabId) {
      return '';
    }
    return 'active show';
  }

  refreshData() {
    this.dashboardServices.GetActiveNotification(this.userID)
      .subscribe(data => {
        this.notifications = data;
        this.totalcount = this.notifications.length;
        this.cd.detectChanges();
      },
      HttpErrorResponse =>{
      //  this.handleError(HttpErrorResponse.message+" Check Api");
      }
      )      
  }

  openNotification(resultID:string,notificationID:string,orderID:string)
  {
     this.dashboardServices.CloseNotification(notificationID)
      .subscribe(data => {
        this.refreshData();
      },
      HttpErrorResponse =>{
      //  this.handleError(HttpErrorResponse.message+" Check Api");
      })  
      this.router.navigate(['/PrintResult/'+ resultID]);
  }
   
}
