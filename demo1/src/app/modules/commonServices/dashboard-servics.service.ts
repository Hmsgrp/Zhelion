import { Injectable } from '@angular/core';
import { RoleModel } from 'src/app/_metronic/partials/content/widgets/models/role.model';
import { UserModel } from 'src/app/_metronic/partials/content/widgets/models/user.model';
import { HospitalModel } from 'src/app/_metronic/partials/content/widgets/models/hospital.model';
import { LabModel } from 'src/app/_metronic/partials/content/widgets/models/lab.model';
import { testModel } from 'src/app/_metronic/partials/content/widgets/models/test.model';
import { testParameter } from 'src/app/_metronic/partials/content/widgets/models/testParameter.model';
import { Menu } from 'src/app/_metronic/partials/content/widgets/models/menu.model';
import { menuRoleMappingmodel } from 'src/app/_metronic/partials/content/widgets/models/menuRoleMapping.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import{environment} from 'src/environments/environment';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class DashboardServicsService {

  constructor(private http: HttpClient) { }

  //Role Section Start
  AddRole(roleName:string,roleDescription:string) : Observable<any>
  {
    const role = new RoleModel();
    role.roleName = roleName;
    role.roleDescription = roleDescription;
    role.isActive=true;
    role.createdDate=new Date()

    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(role);
    console.log(body)
    return this.http.post(environment.apiUrl + 'api/Roles/AddRole', body,{'headers':headers})
  }

  getRoles(): Observable<RoleModel[]> {
    return this.http.get<RoleModel[]>(environment.apiUrl +'api/Roles/GetRoles')
  }

 deleteRole(id:string) : Observable<any>{
    let endPoints = "api/Roles/DeleteRole/"
    return this.http.delete(environment.apiUrl + endPoints + id);
  }

  EditRole(id:string,roleName:string,roleDescription:string): Observable<any>{
    const role = new RoleModel();
    role.roleId = id;
    role.roleName = roleName;
    role.roleDescription = roleDescription;
    role.isActive=true;
    role.createdDate=new Date()
    const headers = { 'content-type': 'application/json'}  
    const roledata=JSON.stringify(role);
    let endPoints = "api/Roles/UpdateRole"
    return this.http.put(environment.apiUrl + endPoints, roledata,{'headers':headers});
  }

    //Role Section End

    //user section Start
  AddUser(FormGroup:FormGroup) : Observable<any>
  {
    const user = new UserModel();
    user.UserName = FormGroup.controls.userName.value;
    user.Password =  FormGroup.controls.password.value;
    user.RoleId = FormGroup.controls.roleSelection.value;
    user.MobileNumber = FormGroup.controls.mobileNumber.value;
    user.EmailId =  FormGroup.controls.emailID.value;
    user.CreatedDate=new Date()

    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(user);
    let endPoints = "api/User/AddUser"
    return this.http.post(environment.apiUrl + endPoints, body,{'headers':headers})
  }

   getUsers(): Observable<UserModel[]> {
    let endPoints = "api/User/GetUsers"
    return this.http.get<UserModel[]>(environment.apiUrl + endPoints)
  }

  deleteUser(id:string) : Observable<any>{
    let endPoints = "api/User/DeleteUser/"
    return this.http.delete(environment.apiUrl + endPoints + id);
  }

  EditUser(FormGroup:FormGroup,userID:string): Observable<any>{
    console.log(userID);
    const user = new UserModel();
    user.UserID = userID;
    user.UserName = FormGroup.controls.userName.value;
    user.Password =  FormGroup.controls.password.value;
    user.RoleId = FormGroup.controls.roleSelection.value;
    user.MobileNumber = FormGroup.controls.mobileNumber.value;
    user.EmailId =  FormGroup.controls.emailID.value;
    user.CreatedDate=new Date()
    const headers = { 'content-type': 'application/json'}  
    const roledata=JSON.stringify(user);
    let endPoints = "api/User/UpdateUser"
    return this.http.put(environment.apiUrl + endPoints, roledata,{'headers':headers});
  }
  //user section End

    //Hospital section Start
    AddHospital(FormGroup:FormGroup) : Observable<any>
    {
      const hospital = new HospitalModel();
      hospital.HospitalName = FormGroup.controls.hospitalName.value;
      hospital.HospitalAddress =  FormGroup.controls.hospitalAddress.value;
      hospital.ContactPerson = FormGroup.controls.contactPerson.value;
      hospital.PhoneNumber = FormGroup.controls.phoneNumber.value;
  
      const headers = { 'content-type': 'application/json'}  
      const body = JSON.stringify(hospital);
      let endPoints = "api/Hospital/AddHospital"
      return this.http.post(environment.apiUrl + endPoints, body,{'headers':headers})
    }
  
     getHospital(): Observable<HospitalModel[]> {
      let endPoints = "api/Hospital/GetHospitals"
      return this.http.get<HospitalModel[]>(environment.apiUrl + endPoints)
    }

    getAllHospital(): Observable<any> {
      let endPoints = "api/Hospital/GetAllHospitals"
      return this.http.get<any>(environment.apiUrl + endPoints)
    }

    deleteHospital(id:string) : Observable<any>{
      let endPoints = "api/Hospital/DeleteHospital/"
      return this.http.delete(environment.apiUrl + endPoints + id);
    }

    editHospital(FormGroup:FormGroup,editID:string)
    {
      const Hospital = new HospitalModel();
      Hospital.HospitalId = editID;
      Hospital.HospitalName = FormGroup.controls.hospitalName.value;
      Hospital.HospitalAddress =  FormGroup.controls.hospitalAddress.value;
      Hospital.ContactPerson = FormGroup.controls.contactPerson.value;
      Hospital.PhoneNumber = FormGroup.controls.phoneNumber.value;
      const headers = { 'content-type': 'application/json'}  
      const data=JSON.stringify(Hospital);
      let endPoints = "api/Hospital/UpdateHospital"
      return this.http.put(environment.apiUrl + endPoints, data,{'headers':headers});
    }
    //Hospital section End

    //LabSection Start
    AddLab(FormGroup:FormGroup) : Observable<any>
    {
      const lab = new LabModel();
      lab.LabName = FormGroup.controls.labName.value;
      lab.LabAddress =  FormGroup.controls.labAddress.value;
      lab.MobileNumber = FormGroup.controls.mobileNumber.value;
      lab.LandlineNumber = FormGroup.controls.landlineNumber.value;

      const user = new UserModel();
      user.UserName = FormGroup.controls.userName.value;
      user.Password =  FormGroup.controls.password.value;
  
      const headers = { 'content-type': 'application/json'}  
      
      let body = { "userDetails": user, labDetails: lab };
      let endPoints = "api/Lab/AddLab"
      return this.http.post(environment.apiUrl + endPoints, body,{'headers':headers})
    }
  
     getLab(): Observable<LabModel[]> {
      let endPoints = "api/Lab/GetLabs"
      return this.http.get<LabModel[]>(environment.apiUrl + endPoints)
    }

    deleteLab(id:string) : Observable<any>{
      let endPoints = "api/Lab/DeleteLab/"
      return this.http.delete(environment.apiUrl + endPoints + id);
    }

    editLab(FormGroup:FormGroup,editID:string)
    {
      const Hospital = new HospitalModel();
      Hospital.HospitalId = editID;
      Hospital.HospitalName = FormGroup.controls.hospitalName.value;
      Hospital.HospitalAddress =  FormGroup.controls.hospitalAddress.value;
      Hospital.ContactPerson = FormGroup.controls.contactPerson.value;
      Hospital.PhoneNumber = FormGroup.controls.phoneNumber.value;
      const headers = { 'content-type': 'application/json'}  
      const data=JSON.stringify(Hospital);
      let endPoints = "api/Lab/UpdateLab"
      return this.http.put(environment.apiUrl + endPoints, data,{'headers':headers});
    }
    //lab end

     //Test Section Start
     AddTest(FormGroup:FormGroup) : Observable<any>
     {
       const test = new testModel();
       test.testName = FormGroup.controls.testName.value;
       test.testDescription =  FormGroup.controls.testDescription.value;
 
       const headers = { 'content-type': 'application/json'}  
       
       const body = JSON.stringify(test);
       let endPoints = "api/Test/AddTest"
       return this.http.post(environment.apiUrl + endPoints, body,{'headers':headers})
     }
   
     getTest(): Observable<testModel[]> {
       let endPoints = "api/Test/GetTests"
       return this.http.get<testModel[]>(environment.apiUrl + endPoints)
     }
 
     deleteTest(id:string) : Observable<any>{
       let endPoints = "api/Test/DeleteTest/"
       return this.http.delete(environment.apiUrl + endPoints + id);
     }
 
     editTest(FormGroup:FormGroup,editID:string)
     {
       const test = new testModel();
       test.testId = editID;
       test.testName = FormGroup.controls.testName.value;
       test.testDescription =  FormGroup.controls.testDescription.value;

       const headers = { 'content-type': 'application/json'}  
       const data=JSON.stringify(test);
       let endPoints = "api/Test/UpdateTest"
       return this.http.put(environment.apiUrl + endPoints, data,{'headers':headers});
     }
     //test end

     //TestParameter Start
    AddTestParameter(FormGroup:FormGroup,testid:string) : Observable<any>
    {
      const testparameter = new testParameter();
      testparameter.testId = testid;
      testparameter.parameterName = FormGroup.controls.parameterName.value;
      testparameter.rangesFrom =  FormGroup.controls.rangesFrom.value;
      testparameter.rangesTo=FormGroup.controls.rangesTo.value;

      const headers = { 'content-type': 'application/json'}  
      
      const body = JSON.stringify(testparameter);
      let endPoints = "api/TestParameter/AddTestParameter"
      return this.http.post(environment.apiUrl + endPoints, body,{'headers':headers})
    }
  
    getTestParameters(testID:string): Observable<testParameter[]> {
      let endPoints = "api/TestParameter/GetTestParameter/"
      return this.http.get<testParameter[]>(environment.apiUrl + endPoints + testID)
    }

    deleteTestParameter(id:string) : Observable<any>{
      let endPoints = "api/TestParameter/DeleteTestParameter/"
      return this.http.delete(environment.apiUrl + endPoints + id);
    }

    editTestParameter(FormGroup:FormGroup,editID:string)
    {
      const test = new testParameter();
      test.testParameterId = editID;
      test.rangesFrom = FormGroup.controls.rangesFrom.value;
      test.rangesTo =  FormGroup.controls.rangesTo.value;

      const headers = { 'content-type': 'application/json'}  
      const data=JSON.stringify(test);
      let endPoints = "api/TestParameter/UpdateTestParameter"
      return this.http.put(environment.apiUrl + endPoints, data,{'headers':headers});
    }

     //test Parameter End


       //TestParameter Start
    AddDoctorReferral(FormGroup:FormGroup,hospitalIDs:any) : Observable<any>
    {
      const user = new UserModel();
      user.FullName = FormGroup.controls.fullName.value;
      user.UserName = FormGroup.controls.mobileNumber.value.toString();
      user.MobileNumber =  FormGroup.controls.mobileNumber.value;
      user.EmailId = FormGroup.controls.emailID.value;
      user.CreatedDate = new Date();

      const mapped = { hospitalId: hospitalIDs}  
      const headers = { 'content-type': 'application/json'}  

      let body = { "user": user, "userHospitalMaps": mapped };
      
      let endPoints = "api/Doctor/DoctorRefer"
      return this.http.post(environment.apiUrl + endPoints, body,{'headers':headers})
    }

    deleteDoctorReferral(id:string) : Observable<any>{
      let endPoints = "api/Doctor/DeleteDoctor/"
      return this.http.delete(environment.apiUrl + endPoints + id);
    }

    getDoctorReferrals(): Observable<any> {
      let endPoints = "api/Doctor/GetDoctorRefers"
      return this.http.get<any>(environment.apiUrl + endPoints)
    }
  
      //test Parameter End

      //Add Menu
      AddMenu(FormGroup:FormGroup) : Observable<any>
      {
        const MenuModel = new Menu();
        MenuModel.menuName = FormGroup.controls.menuName.value;
        MenuModel.menuLink = FormGroup.controls.menuName.value;
        MenuModel.isSideBar = false;
        MenuModel.isActive = true;

        const headers = { 'content-type': 'application/json'}  
  
        const body = JSON.stringify(MenuModel);
        
        let endPoints = "api/Menu/AddMenu"
        return this.http.post(environment.apiUrl + endPoints, body,{'headers':headers})
      }

      getMenus(): Observable<Menu[]> {
        let endPoints = "api/Menu/GetMenus"
        return this.http.get<Menu[]>(environment.apiUrl + endPoints)
      }

      deleteMenu(id:string) : Observable<any>{
        let endPoints = "api/Menu/DeleteMenu/"
        return this.http.delete(environment.apiUrl + endPoints + id);
      }
    
      //Add Menu End

      //menu mapping start
      AddMenuMapping(FormGroup:FormGroup,menus:any) : Observable<any>
      {
        const menuMapping = new menuRoleMappingmodel();
        menuMapping.roleId = FormGroup.controls.selectRole.value;
        menuMapping.menuId = menus;
  
        const headers = { 'content-type': 'application/json'}  
  
        const body = JSON.stringify(menuMapping);
        
        let endPoints = "api/MenuRoleMap/AddMenuRoleMap"
        return this.http.post(environment.apiUrl + endPoints, body,{'headers':headers})
      }

      getMappedRoles(): Observable<menuRoleMappingmodel[]> {
        let endPoints = "api/MenuRoleMap/GetMenuRoleMaps"
        return this.http.get<menuRoleMappingmodel[]>(environment.apiUrl + endPoints)
      }

      deleteMenuMapping(id:string) : Observable<any>{
        let endPoints = "api/MenuRoleMap/DeleteMenuRoleMap/"
        return this.http.delete(environment.apiUrl + endPoints + id);
      }

      tokenGetterforMEnus() :string{
        return localStorage.getItem("Menus");
      }

      
}

