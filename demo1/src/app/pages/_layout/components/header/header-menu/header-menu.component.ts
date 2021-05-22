import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { LayoutService } from '../../../../../_metronic/core';

function getCurrentURL(location) {
  return location.split(/[?#]/)[0];
}

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss'],
})
export class HeaderMenuComponent implements OnInit {
  ulCSSClasses: string;
  rootArrowEnabled: boolean;
  location: Location;
  headerMenuDesktopToggle: string;
  hospitals:any;
  Selectedhospital:string;
  selectedDevice:string;
  SelectedhospitalName:string;

  constructor(private layout: LayoutService, private loc: Location) {
    this.location = this.loc;
  }

  ngOnInit(): void {
    this.ulCSSClasses = this.layout.getStringCSSClasses('header_menu_nav');
    this.rootArrowEnabled = this.layout.getProp('header.menu.self.rootArrow');
    this.headerMenuDesktopToggle = this.layout.getProp(
      'header.menu.desktop.toggle'
    );
    this.getSelectedHospitals();
  }

  getMenuItemActive(url) {
    return this.checkIsActive(url) ? 'menu-item-active' : '';
  }

  checkIsActive(url) {
    const location = this.location.path();
    const current = getCurrentURL(location);
    if (!current || !url) {
      return false;
    }

    if (current === url) {
      return true;
    }

    if (current.indexOf(url) > -1) {
      return true;
    }

    return false;
  }

   getSelectedHospitals()
   {
     this.Selectedhospital= localStorage.getItem("SelectedHospital");
     if(localStorage.getItem("Hospitals") && localStorage.getItem("Hospitals") !="undefined")
     {   
      this.hospitals = JSON.parse(localStorage.getItem("Hospitals"));
      this.SelectedhospitalName= this.hospitals.filter(p => p.HospitalId == this.Selectedhospital)[0].HospitalName;
     }
  
     if(!this.SelectedhospitalName)
     {
      this.SelectedhospitalName = localStorage.getItem("HospitalName");
     }
   }

}
