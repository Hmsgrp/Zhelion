import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../../core';

@Component({
  selector: 'app-dashboard1',
  templateUrl: './dashboard1.component.html',
})
export class Dashboard1Component implements OnInit {
  activetabs: string[] = [];
  constructor() {
    this.activetabs.push("DashBoard");
  }

  ngOnInit(): void {

  }

  sendActiveTab(data) {
    this.getActiveTabCSSClass(data)
  }

  getActiveTabCSSClass(data: number) {
    this.activetabs = [];
    if (data == 0) {
      this.activetabs.push("DashBoard");
    }
    else if (data == 1) {
      this.activetabs.push("RoleManagement");
    }
    else if (data == 2) {
      this.activetabs.push("UserManagement");
    }
    else if (data == 3) {
      this.activetabs.push("HospitalManagement");
    }
    else if (data == 4) {
      this.activetabs.push("LabManagement");
    }
    else if (data == 5) {
      this.activetabs.push("TestManagement");
    }
    else if (data == 6) {
      this.activetabs.push("DoctorReferral");
    }
    else if (data == 7) {
      this.activetabs.push("RoleMap");
    }
    else if (data == 8) {
      this.activetabs.push("PrescribeTest");
    }
    else if (data == 9) {
      this.activetabs.push("Payment");
    }
    else if (data == 10) {
      this.activetabs.push("PaymentSplitUp");
    }
    else if (data == 11) {
      this.activetabs.push("addresult");
    }
    else if (data == 12) {
      this.activetabs.push("viewresult");
    }
    else if (data == 13) {
      this.activetabs.push("viewreportdoctor");
    }
    else if (data == 14) {
      this.activetabs.push("patientreport");
    }
    else if (data == 15) {
      this.activetabs.push("activepatients");
    }
  }

  checkInput(input) {
    return this.activetabs.includes(input)
  }


  showmenus(roleName: string) {
    if (localStorage.getItem("Menus")) {
      if (localStorage.getItem("RoleName").toLowerCase().search(roleName.toLowerCase()) == -1) {
        return false;
      } else {
        return true;
      }
    }
    else {
      return false;
    }
  }
}


