import { Component, Input, OnDestroy, OnInit,ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { catchError, finalize, first, tap } from 'rxjs/operators';
import { DashboardServicsService } from 'src/app/modules/commonServices/dashboard-servics.service';
import { Menu } from 'src/app/_metronic/partials/content/widgets/models/menu.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'add-menus-modal',
  templateUrl: './add-menus-modal.component.html',
  styleUrls: ['./add-menus-modal.component.scss'],
  // NOTE: For this example we are only providing current component, but probably
  // NOTE: you will w  ant to provide your main App Module
  providers: [FormBuilder]
})
export class AddmenusModalComponent implements OnInit, OnDestroy {
  @Input() fromParent;
  MenuRegistration: FormGroup;
  isEdit:boolean;
  editID:string;
  updateMessage:string;
  showPostSuccessNotification:boolean;
  showUpdateNotification:boolean;
  buttontext:string;
  hasError:boolean;
  errorText:string;
  postSuccessText:string;
  Menu : Menu[] = [];
  testID:string;

  defaultVal = {
    menuName: '',
  };

  isLoading$;
  formGroup: FormGroup;
  private subscriptions: Subscription[] = [];
  constructor(
    private fb: FormBuilder, public modal: NgbActiveModal , private dashboardServices: DashboardServicsService,private cd: ChangeDetectorRef,private modalService: NgbModal
    ) { }

  ngOnInit(): void {
    this.initForm();
    this.refreshData();
    this.Initializevariables();
    this.testID = this.fromParent;
  }

  initForm() {
    this.MenuRegistration = this.fb.group({
      menuName: [
        this.defaultVal.menuName,
        Validators.compose([
          Validators.required
        ]),
      ]
    });
  }


  submitData()
  {
       this.postData();
  }

  //Api calls
  postData()
  {
    this.dashboardServices.AddMenu(this.MenuRegistration)
      .subscribe(data => {
        this.handleSuccessforPost();
      },
      error => {
        this.handleError(error.message);
      }  
    );
  }


  refreshData() {
    this.dashboardServices.getMenus()
      .subscribe(data => {
        this.Menu = data;
        console.log(data);
        this.cd.detectChanges();
      },
      HttpErrorResponse =>{
        this.handleError(HttpErrorResponse.message+" Check Api");
      });    
  }

   delete(menuid:string)
  {
    console.log(menuid);
    this.dashboardServices.deleteMenu(menuid)
    .subscribe(data => {
      this.handleDelete();
    },
    error => {
      this.handleError(error.message);
    });
  }

  //Api calls end

  //common methods
  Initializevariables()
  {
    this.isEdit=false;
    this.editID = "";
    this.updateMessage = "";
    this.showUpdateNotification = false;
    this.buttontext="Submit";
    this.hasError = false;
    this.errorText = "";
    this.showPostSuccessNotification=false;
    this.postSuccessText="";
  }

  HandleEdit(id:string)
  {
    this.isEdit = true;
    this.editID = id;
    this.buttontext = "Update";
  }

  closeAllNotification()
  {
    setTimeout(() => {
      this.showUpdateNotification = false;
      this.showPostSuccessNotification = false;
      this.cd.detectChanges();
    }, 3000);
  }

  closeNotification()
  {
    this.showUpdateNotification = false;
    this.showPostSuccessNotification = false;
    this.hasError = false;
  }

  handleError(error:string)
  {
    this.errorText = error;
    this.hasError = true;
    this.cd.detectChanges();
  }

  handleSuccessforPost()
  {
    this.postSuccessText = "Added Successfully";
    this.MenuRegistration.reset();
    this.showPostSuccessNotification = true;
    this.refreshData();
    this.closeAllNotification();
  }

  handleSuccessforUpdate()
  {  
    this.updateMessage = "Updated Successfully."
    this.showUpdateNotification = true;
    this.refreshData();
    this.resetData()
    this.closeAllNotification(); 
  }

  handleDelete()
  { 
    this.updateMessage = "Deleted Successfully."
    this.showUpdateNotification = true;
    this.refreshData();
    this.closeAllNotification(); 
  }

  resetData()
  {
    this.MenuRegistration.reset();
    this.isEdit = false;
    this.buttontext = "Submit";
  }

  closeModal()
  {
    this.modalService.dismissAll();
  }
  

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

}
