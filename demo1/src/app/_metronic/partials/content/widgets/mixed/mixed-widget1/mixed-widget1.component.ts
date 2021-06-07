import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { LayoutService } from '../../../../../core';
import { DashboardServicsService } from '../../../../../..//modules/commonServices/dashboard-servics.service';

@Component({
  selector: 'app-mixed-widget1',
  templateUrl: './mixed-widget1.component.html',
  outputs :['ChildEvent']
})
export class MixedWidget1Component implements OnInit {
  menus :string;

  constructor(private layout: LayoutService,private dashboardServices: DashboardServicsService) {
   
  }

  ngOnInit(): void {
    this.getmenus();
  }

  @Output() sendActiveTab : EventEmitter <number> = new EventEmitter<number>();
  public setActiveTab(tabid: number) {
    this.sendActiveTab.emit(tabid);
  }

  
  showmenus(menuname:string)
  {
    if (this.menus.toLowerCase().search(menuname.toLowerCase()) == -1 ) { 
      return false;
    } else { 
      return true
    } 
  }


  getmenus()
  {
    this.menus= this.dashboardServices.tokenGetterforMEnus()
  }
 
}
