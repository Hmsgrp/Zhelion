import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute } from "@angular/router";
import { CommonServicesService } from '../_services/common-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-refer',
  templateUrl: './refer.component.html',
  styleUrls: ['./refer.component.scss']
})
export class ReferComponent implements OnInit {
  refID: string;
  constructor(private route: ActivatedRoute, private CommonServices: CommonServicesService, private router: Router) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['term1']) {
        (1)
        //this.doSearch(params['term'])
      }
      this.refID = params['term1'].toString();
    });
    localStorage.removeItem("access_token");
    localStorage.removeItem("Menus");
    this.refreshData();
  }

  refreshData() {
    this.CommonServices.GetSignUpLink(this.refID)
      .subscribe(data => {
        if (data.isActive == true) {
          var gotoURL = window.location.origin + "/#/auth" + data.rediectionLink;
          window.location.href = gotoURL;
        }
        else if (data.rediectionLink.includes("patient")) {
          var gotoURL = window.location.origin + "/#/auth/patient/login/" + data.userID;
          window.location.href = gotoURL;
        }
        else {
          var gotoURL = window.location.origin + "/#/auth/doctor/login";
          window.location.href = gotoURL;
        }
      },
        error => {
          //this.handleError(error.message);
        });
  }
}
