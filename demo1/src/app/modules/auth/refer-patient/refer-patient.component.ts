import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { CommonServicesService } from '../_services/common-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-refer-patient',
  templateUrl: './refer-patient.component.html',
  styleUrls: ['./refer-patient.component.scss']
})
export class ReferPatientComponent implements OnInit {
  refID:string;
  constructor(private route: ActivatedRoute ,private CommonServices: CommonServicesService,private router : Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['term1']) { (1)
        //this.doSearch(params['term'])
      }
      this.refID = params['term3'].toString();
    });
    localStorage.removeItem("access_token");
    localStorage.removeItem("Menus");
    this.refreshData();
  }

  refreshData() {
    console.log(1);
    this.CommonServices.GetUserMappingDetails(this.refID)
      .subscribe(data => {
        localStorage.setItem("Hospital_PID",data.hospital_PID);
        if(data.isRegistered == true && data.isPaid == true)
        {
          this.LoginPatienttoDashboard(data.userName,data.password)
        }
        else if(data.isRegistered == false && data.mappingURLActive == true)
        {
          var gotoURL= window.location.origin + "/#/auth" + data.redirectionLink;
          window.location.href = gotoURL;
        }
        else if(data.isRegistered == true && data.mappingURLActive == false)
        {
          this.LoginPatient(data.userName,data.password)
        }
        else
        {
          var gotoURL= window.location.origin + "/#/auth/patient/login/" + data.userID ;
          window.location.href = gotoURL;
        }
      },
      error => {
        //this.handleError(error.message);
      });    
  }

  LoginPatient(username:string,password:string)
  {
    this.CommonServices.LoginPatient(username , password)
    .subscribe(
               data => {
                 this.router.navigate(["/payment/transaction"]);
               },
               error => {
               });
  }

  LoginPatienttoDashboard(username:string,password:string)
  {
    this.CommonServices.LoginPatient(username , password)
    .subscribe(
               data => {
                 this.router.navigate(["/dashboard"]);
               },
               error => {
               });
  }
}

