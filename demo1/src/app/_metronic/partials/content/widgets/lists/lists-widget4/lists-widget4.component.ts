import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardServicsService } from '../../../../../../modules/commonServices/dashboard-servics.service';
import { Subscription, Observable } from 'rxjs';
import { HospitalModel } from 'src/app/_metronic/partials/content/widgets/models/hospital.model';

@Component({
  selector: 'app-lists-widget4',
  templateUrl: './lists-widget4.component.html',
})
export class ListsWidget4Component implements OnInit {
  hospitalRegistration: FormGroup;
  imageSrc: string;
  isEdit:boolean;
  editID:string;
  updateMessage:string;
  showPostSuccessNotification:boolean;
  showUpdateNotification:boolean;
  buttontext:string;
  hasError:boolean;
  errorText:string;
  postSuccessText:string;
  p:any;
  files:any;
  url:any;

  defaultVal = {
    hospitalName: '',
    hospitalAddress: '',
    contactPerson: '',
    phoneNumber: '',
    file:''  
  };
  hospitals : HospitalModel[] = [];

  private unsubscribe: Subscription[] = [];

  constructor(private fb: FormBuilder , private dashboardServices: DashboardServicsService,private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.initForm();
    this.refreshData();
    this.Initializevariables();
  }

  initForm() {
    this.hospitalRegistration = this.fb.group({
      hospitalName: [
        this.defaultVal.hospitalName,
        Validators.compose([
          Validators.required // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        ]),
      ],
      hospitalAddress: [
        this.defaultVal.hospitalAddress,
        Validators.compose([
          Validators.required
        ]),
      ],
      contactPerson: [
        this.defaultVal.contactPerson,
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(15),
        ]),
      ],
      phoneNumber: [
        this.defaultVal.phoneNumber,
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(15),
        ]),
      ] ,
      file: [
        this.defaultVal.file,
        Validators.compose([
          Validators.required,
        ]),
      ]
    });
  }

  edit(hospitalId:string,hospitalName:string,hospitalAddress:string,contactPerson:string,phoneNumber:string)
  {
    this.HandleEdit(hospitalId);
    this.hospitalRegistration = this.fb.group({
      hospitalName: [
        hospitalName
      ],
      hospitalAddress: [
        hospitalAddress
      ],
      contactPerson: [
        contactPerson
      ],
      phoneNumber: [
        phoneNumber
      ],
      file:[
        this.imageSrc
      ]
    });
  }

  submitData()
  {
     if(this.isEdit)
     {
      this.updateData();
     }
     else
     {
       this.postData();
     }
  }


  //Api calls
  postData()
  {
    this.dashboardServices.AddHospital(this.hospitalRegistration,this.imageSrc)
      .subscribe(data => {
        this.handleSuccessforPost();
      },
      error => {
        this.handleError(error.message);
      }  
    );
  }

  updateData()
  {
    this.dashboardServices.editHospital(this.hospitalRegistration,this.imageSrc,this.editID)
      .subscribe(data => {
        this.handleSuccessforUpdate();
      },
      error => {
        this.handleError(error.message);
      }  
    );
  }

  refreshData() {
    this.dashboardServices.getHospital()
      .subscribe(data => {
        console.log(data);
        this.hospitals = data;
        this.cd.detectChanges();
      },
      HttpErrorResponse =>{
        this.handleError(HttpErrorResponse.message+" Check Api");
      });    
  }

   delete(hospitalID:string)
  {
    this.dashboardServices.deleteHospital(hospitalID)
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
    this.hospitalRegistration.reset();
    this.imageSrc = "";
    this.showPostSuccessNotification = true;
    this.refreshData();
    this.closeAllNotification();
  }

  handleSuccessforUpdate()
  {  
    this.updateMessage = "Updated Successfully."
    this.showUpdateNotification = true;
    this.refreshData();
    this.resetData();
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
    this.hospitalRegistration.reset();
    this.imageSrc = "";
    this.isEdit = false;
    this.buttontext = "Submit";
  }

  onFileChange(event) {
    const reader = new FileReader();
    
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.files = event.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
        this.imageSrc = reader.result as string;
     
        this.hospitalRegistration.patchValue({
          fileSource: reader.result
        });
   
      };
   
    }
    this.cd.detectChanges();
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
