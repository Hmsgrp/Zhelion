import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lab-next-step',
  templateUrl: './lab-next-step.component.html',
  styleUrls: ['./lab-next-step.component.scss']
})
export class LabNextStepComponent implements OnInit {
  errorSelected:boolean;
  hospitals:any;
  selected:string;
  constructor( private router: Router) { }

  ngOnInit(): void {
    this.getHospitals();
  }

  getHospitals()
 {
   this.hospitals = JSON.parse(localStorage.getItem("Hospitals"));
 }

 submithospital()
 {
  if(!this.selected)
  {
    this.errorSelected = true;
    return false;
  }
  localStorage.setItem("SelectedHospital",(this.selected));
  this.router.navigate(["/dashboard"]);
 }
}
