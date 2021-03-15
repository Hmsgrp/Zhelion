import { Component, OnInit, ChangeDetectorRef,ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators,NgForm } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { DashboardServicsService } from '../../../../../../modules/commonServices/dashboard-servics.service';
import { RoleModel } from 'src/app/_metronic/partials/content/widgets/models/role.model';
import { Menu } from 'src/app/_metronic/partials/content/widgets/models/menu.model';
import { menuRoleMappingmodel } from 'src/app/_metronic/partials/content/widgets/models/menuRoleMapping.model';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddmenusModalComponent } from '../components/add-menus-modal/add-menus-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-lists-widget10',
  templateUrl: './lists-widget10.component.html',
})

export class ListsWidget10Component implements OnInit {
  defaultVal = {
    roleName: '',
    roleDescription: '',
  };

  selected = [  ];
  roles : RoleModel[] = [];
  menu  : Menu[] = [];
  menuRoleMappingmodel  : menuRoleMappingmodel[] = [];
  hasError: boolean;
  showSuccessNotification: boolean;
  showUpdateNotification:boolean;
  isEdit:boolean;
  submitBtntext:string;
  ErrorOccuredtext:string;
  updateMessage:string;
  postSuccessText:string;
  showPostSuccessNotification:boolean;
  errorText:string;
  DoctorReferrals:any;
  menuRolearr: Array<menuRoleMappingmodel> = [];
  
  // private fields
  private unsubscribe: Subscription[] = [];

  constructor(private modalService: NgbModal,private fb: FormBuilder,private cd: ChangeDetectorRef, private dashboardServices: DashboardServicsService,) {}

  
  ngOnInit(): void {
    this.refreshRoles();
    this.refreshData();
    this.refreshMapping();
  }

  refreshRoles() {
    this.dashboardServices.getRoles()
      .subscribe(data => {
        this.roles = data;
        this.cd.detectChanges();
      },
      HttpErrorResponse =>{
        this.handleError(HttpErrorResponse.message+" Check Api");
      }
      )      
  }

  refreshData() {
    this.dashboardServices.getMenus()
      .subscribe(data => {
        this.menu = data;
        this.cd.detectChanges();
      },
      HttpErrorResponse =>{
        this.handleError(HttpErrorResponse.message+" Check Api");
      });    
  }

  refreshMapping() {
    this.dashboardServices.getMappedRoles()
      .subscribe(data => {
        this.menuRoleMappingmodel = data;
        this.cd.detectChanges();
      },
      HttpErrorResponse =>{
        this.handleError(HttpErrorResponse.message+" Check Api");
      });    
  }



  openModel()
  {
    const modalRef = this.modalService.open(AddmenusModalComponent,
    {
      scrollable: true,
      //windowClass: 'myCustomModalClass',
       keyboard: false,
       backdrop: 'static'
    });

  }
   
  getSelectedValue(){
    console.log(this.selected);
  }

  @ViewChild('roleMap', {static: false}) MyForm: NgForm;
  
 
  submitForm(){
    this.MyForm.form.markAllAsTouched();

    for (var val of this.selected) {
      let menuRoleMapping = new menuRoleMappingmodel();
      menuRoleMapping.roleId = val;
      this.menuRolearr.push(menuRoleMapping)
    }
    
    this.dashboardServices.AddMenuMapping(this.MyForm.form,this.menuRolearr)
    .subscribe(data => {
      this.handleSuccessforPost();
    
    },
    error => {
      this.handleError(error.message);
    }  
  );
  }

  closeNotification()
{
  this.showUpdateNotification = false;
  this.showPostSuccessNotification = false;
  this.hasError = false;
}

closeAllNotification()
{
  setTimeout(() => {
    this.showUpdateNotification = false;
    this.showPostSuccessNotification = false;
    this.cd.detectChanges();
  }, 3000);
}


  handleSuccessforPost()
  {
    this.postSuccessText = "Added Successfully";
    this.MyForm.form.reset();
    this.showPostSuccessNotification = true;
    this.refreshData();
    this.closeAllNotification();
  }

  handleError(error:string)
  {
    this.errorText = error;
    this.hasError = true;
    this.cd.detectChanges();
  }

}
