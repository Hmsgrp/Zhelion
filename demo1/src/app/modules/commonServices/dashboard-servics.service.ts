import { Injectable } from '@angular/core';
import { RoleModel } from 'src/app/_metronic/partials/content/widgets/models/role.model';
import { UserModel } from 'src/app/_metronic/partials/content/widgets/models/user.model';
import { HospitalModel } from 'src/app/_metronic/partials/content/widgets/models/hospital.model';
import { HospitalPatientModel } from 'src/app/_metronic/partials/content/widgets/models/hospitalpatient';
import { LabModel } from 'src/app/_metronic/partials/content/widgets/models/lab.model';
import { testModel } from 'src/app/_metronic/partials/content/widgets/models/test.model';
import { testParameter } from 'src/app/_metronic/partials/content/widgets/models/testParameter.model';
import { Menu } from 'src/app/_metronic/partials/content/widgets/models/menu.model';
import { prescribeTest } from 'src/app/_metronic/partials/content/widgets/models/prescribeTest.model';
import { menuRoleMappingmodel } from 'src/app/_metronic/partials/content/widgets/models/menuRoleMapping.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import{environment} from 'src/environments/environment';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModelPatient } from 'src/app/_metronic/partials/content/widgets/models/usermodelPatient';
import { PaymentDetails } from 'src/app/_metronic/partials/content/widgets/models/PaymentDetails';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { AssignedTest } from 'src/app/_metronic/partials/content/widgets/models/AssignedTest.model';
import { paymentSplit } from 'src/app/_metronic/partials/content/widgets/models/paymentSplit.model';
import { AddResult } from 'src/app/_metronic/partials/content/widgets/models/AddResult.model';
import { resultfilter } from 'src/app/_metronic/partials/content/widgets/models/resultFilter.model';
import { LabMapping } from 'src/app/_metronic/partials/content/widgets/models/labMapping.model';
import { LabMappingResult } from 'src/app/_metronic/partials/content/widgets/models/labMappingResult';


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

  getPatientUsers(id:string): Observable<UserModelPatient> {
    let endPoints = "api/User/GetUser/"
    return this.http.get<UserModelPatient>(environment.apiUrl + endPoints +id)
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
    AddHospital(FormGroup:FormGroup,imagesrc:string) : Observable<any>
    {
      const hospital = new HospitalModel();
      hospital.hospitalName = FormGroup.controls.hospitalName.value;
      hospital.hospitalAddress =  FormGroup.controls.hospitalAddress.value;
      hospital.contactPerson = FormGroup.controls.contactPerson.value;
      hospital.phoneNumber = FormGroup.controls.phoneNumber.value;
      hospital.hospitalLogo = imagesrc;
    
  
      const headers = { 'content-type': 'application/json'}  
      const body = JSON.stringify(hospital);
      let endPoints = "api/Hospital/AddHospital"
      return this.http.post(environment.apiUrl + endPoints, body,{'headers':headers})
    }
  
    getHospital(): Observable<HospitalModel[]> {
      let endPoints = "api/Hospital/GetHospitals"
      return this.http.get<HospitalModel[]>(environment.apiUrl + endPoints)
    }

    getHospitalbyID(id:string): Observable<HospitalPatientModel> {
      let endPoints = "api/Hospital/GetHospital/"
      return this.http.get<HospitalPatientModel>(environment.apiUrl + endPoints +id)
    }

    getAllHospital(): Observable<any> {
      let endPoints = "api/Hospital/GetAllHospitals"
      return this.http.get<any>(environment.apiUrl + endPoints)
    }

    deleteHospital(id:string) : Observable<any>{
      let endPoints = "api/Hospital/DeleteHospital/"
      return this.http.delete(environment.apiUrl + endPoints + id);
    }

    editHospital(FormGroup:FormGroup,imagesrc:string,editID:string)
    {
      const Hospital = new HospitalModel();
      Hospital.hospitalId = editID;
      Hospital.hospitalName = FormGroup.controls.hospitalName.value;
      Hospital.hospitalAddress =  FormGroup.controls.hospitalAddress.value;
      Hospital.contactPerson = FormGroup.controls.contactPerson.value;
      Hospital.phoneNumber = FormGroup.controls.phoneNumber.value;
      Hospital.hospitalLogo = imagesrc;
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

      const lm = new LabMapping();
      lm.HospitalID = FormGroup.controls.selectedHospital.value;
      lm.IsActive = true;
  
      const headers = { 'content-type': 'application/json'}  
      
      let body = { "userDetails": user, labDetails: lab, labMappingDetails : lm};
      let endPoints = "api/Lab/AddLab"
      return this.http.post(environment.apiUrl + endPoints, body,{'headers':headers})
    }
  
     getLab(): Observable<LabMappingResult[]> {
      let endPoints = "api/Lab/GetLabs"
      return this.http.get<LabMappingResult[]>(environment.apiUrl + endPoints)
    }

    deleteLab(id:string) : Observable<any>{
      let endPoints = "api/Lab/DeleteLab/"
      return this.http.delete(environment.apiUrl + endPoints + id);
    }

    editLab(FormGroup:FormGroup,editID:string)
    {
      const Hospital = new HospitalModel();
      Hospital.hospitalId = editID;
      Hospital.hospitalName = FormGroup.controls.hospitalName.value;
      Hospital.hospitalAddress =  FormGroup.controls.hospitalAddress.value;
      Hospital.contactPerson = FormGroup.controls.contactPerson.value;
      Hospital.phoneNumber = FormGroup.controls.phoneNumber.value;
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
       test.amount =  FormGroup.controls.amount.value;
       test.unit = FormGroup.controls.unit.value;
 
       const headers = { 'content-type': 'application/json'}  
       
       const body = JSON.stringify(test);
       let endPoints = "api/Test/AddTest"
       return this.http.post(environment.apiUrl + endPoints, body,{'headers':headers})
     }

     AddNewPrescribe(FormGroup:FormGroup,selectedtestID:string) : Observable<any>
     {
       const test = new prescribeTest();
       test.patientId = FormGroup.controls.patientID.value;
       test.testId = selectedtestID;
       test.doctorId = localStorage.getItem("userID").toString();
       test.hospId = localStorage.getItem("SelectedHospital").toString();
       test.outMobileNo =  FormGroup.controls.mobileNumber.value;
       test.numberOfTest =  FormGroup.controls.TestNumber.value;
 
       const headers = { 'content-type': 'application/json'}  
       
       const body = JSON.stringify(test);
       let endPoints = "api/Doctor/PrescribeTest"
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
       test.amount = FormGroup.controls.amount.value;
       test.testDescription =  FormGroup.controls.testDescription.value;
       test.unit =  FormGroup.controls.unit.value;

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

      //payment gateway

      //Test Section Start
     GoToPayment(Amount:Number,Currency:string,CustomerID:string,OrderID:string) : Observable<any>
     {
      const PD = new PaymentDetails();
       
      PD.Amount = Amount.toString();
      PD.Currency = Currency;
      PD.CustomerId = CustomerID;
      PD.OrderId = OrderID;

      const headers = { 'content-type': 'application/json'}  
       
      const body = JSON.stringify(PD);
      let endPoints = "api/Payment/TestPayment"
      return this.http.post(environment.apiUrl + endPoints, body,{'headers':headers})
     }

    //payment splitup


    AddPaymentSplitUp(FormGroup:FormGroup,selectedTest:string) : Observable<any>
    {
      const ps = new paymentSplit();
      ps.testId = selectedTest;
      ps.doctorPercent = FormGroup.controls.doctorPercent.value;;
      ps.labPercent = FormGroup.controls.labPercent.value;
      ps.company = FormGroup.controls.companyPercent.value;

      const headers = { 'content-type': 'application/json'}  

      const body = JSON.stringify(ps);
      
      let endPoints = "api/PaySplitUp/AddPaySplitUp"
      return this.http.post(environment.apiUrl + endPoints, body,{'headers':headers})
    }

    getPaymentSplitUp(): Observable<paymentSplit[]> {
      let endPoints = "api/PaySplitUp/GetPaySplitUps"
      return this.http.get<paymentSplit[]>(environment.apiUrl + endPoints)
    }

    deleteSplitUp(id:string) : Observable<any>{
      let endPoints = "api/PaySplitUp/DeletePaySplitUp/"
      return this.http.delete(environment.apiUrl + endPoints + id);
    }

    editSplitUp(FormGroup:FormGroup,paymentSplitUpID:string,selectedTest:string)
    {
      const ps = new paymentSplit();
      
      ps.splitUpID = paymentSplitUpID;
      ps.testId = selectedTest;
      ps.doctorPercent = FormGroup.controls.doctorPercent.value;;
      ps.labPercent = FormGroup.controls.labPercent.value;
      ps.company = FormGroup.controls.companyPercent.value;

      const headers = { 'content-type': 'application/json'}  
      const data=JSON.stringify(ps);
      let endPoints = "api/PaySplitUp/UpdatePaySplitUp"
      return this.http.put(environment.apiUrl + endPoints, data,{'headers':headers});
    }

    newGuid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }

    //Patient Assigned Test

    getAssignedTest(patientID:string): Observable<AssignedTest[]> {
      let endPoints = "api/Patient/GetActiveTestByPatientID/"
      return this.http.get<AssignedTest[]>(environment.apiUrl + endPoints + patientID)
    }

    //payment status

    getPaymentStatus(OrderID:string): Observable<any> {
      let endPoints = "api/Payment/PaymentStatus?OrderId="
      return this.http.get<any>(environment.apiUrl + endPoints + OrderID)
    }

    //add result 

    getLatestOrder(patientID:string): Observable<any> {
      let endPoints = "api/Payment/GetLatestOrder?patientID="
      return this.http.get<any>(environment.apiUrl + endPoints + patientID)
    }

    isorderPaymentcompleted(OrderID:string): Observable<any> {
      let endPoints = "api/Test/IsorderPaymentcompleted?orderId="
      return this.http.get<any>(environment.apiUrl + endPoints + OrderID)
    }

    GetAllByPatientID(HPID:string): Observable<any> {
      let hospitalID = localStorage.getItem("HospitalID").toString(); 
      let endPoints = "api/Patient/GetAllOrdersByPatientID?h_Pid="+HPID+"&hospitalId=";
      return this.http.get<any>(environment.apiUrl + endPoints + hospitalID)
    }

    AddResult(Result:any ,FormGroup:FormGroup, cashReceiptNo:string,gender:string,orderID:string): Observable<any> {

      const result = new AddResult();
      result.approverName = localStorage.getItem("UserName").toString();
      result.jsonResult = Result[0].parameterList;
      result.cashReceiptNumber = cashReceiptNo;
      result.userId = localStorage.getItem("userID").toString();
      result.isOfflinePayment = false;
      result.orderId = orderID;
      result.patientName= FormGroup.controls.patientName.value;
      result.age= FormGroup.controls.age.value;
      result.sex= gender;
      result.pathologicalCondition= FormGroup.controls.paCondition.value;
      result.specimenType= FormGroup.controls.specimenType.value;
      result.testMethodUsed= FormGroup.controls.tmu.value;
      result.detailsofspecimenpreparation = FormGroup.controls.dosp.value;
      result.observation= FormGroup.controls.observation.value;
      result.testDoneBy= FormGroup.controls.testdoneby.value;
      result.resultStatus= FormGroup.controls.result.value;
      result.hospitalID = localStorage.getItem("HospitalID").toString();

      const headers = { 'content-type': 'application/json'}  

      //const body = JSON.stringify(result);
      
      let endPoints = "api/Test/AddResult"
      return this.http.post(environment.apiUrl + endPoints, result,{'headers':headers})
    }

    
    ViewAllResults(): Observable<any> {
      let endPoints = "api/Test/GetAllTestResults"
      return this.http.get<any>(environment.apiUrl + endPoints)
    }

    ViewfilteredResults(result:resultfilter): Observable<any> {

      let endPoints = "api/Test/GetFilteredTestResults"
      const headers = { 'content-type': 'application/json'}  
      const body = JSON.stringify(result);

      return this.http.post(environment.apiUrl + endPoints, result,{'headers':headers})
    }

    RetriveDataForReport(ResultID:string): Observable<any> {
      let endPoints = "api/Test/RetriveDataForReport?resultID="
      return this.http.get<any>(environment.apiUrl + endPoints + ResultID);
    }

    GetActiveNotification(userID:string): Observable<any> {
      let endPoints = "api/Doctor/GetActiveNotification/"
      return this.http.get<any>(environment.apiUrl + endPoints + userID);
    }


    CloseNotification(notificationID:string)
    {
      let endPoints = "api/Doctor/CloseNotification/"
      return this.http.get(environment.apiUrl+ endPoints + notificationID);
    }

    GetpatientList(): Observable<any> {
      let endPoints = "api/Hospital/GetpatientList/"
      return this.http.get<any>(environment.apiUrl + endPoints + localStorage.getItem("SelectedHospital").toString())
    }

    RetriveReportforLatestOrder(): Observable<any> {
      let hpid = localStorage.getItem("Hospital_PID").toString();
      let hospitalId =  localStorage.getItem("HospitalID").toString();
      let endPoints = "api/Test/RetriveReportforLatestOrder?HPID="+hpid+"&HospitalId=";
      return this.http.get<any>(environment.apiUrl + endPoints + hospitalId);
    }
}

