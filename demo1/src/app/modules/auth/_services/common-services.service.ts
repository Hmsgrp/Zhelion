import { Injectable } from '@angular/core';
import{environment} from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserModel } from 'src/app/_metronic/partials/content/widgets/models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class CommonServicesService {

  constructor(private http: HttpClient,private router: Router) { }

  GetSignUpLink(refID:string): Observable<any> {
    let endPoints = "api/User/GetSignUpLink/"
    return this.http.get<any>(environment.apiUrl + endPoints + refID)
  }

  //doctor

  GetDoctorDataByUserId(refID:string): Observable<any> {
    let endPoints = "api/Doctor/GetDoctorDataByUserId/"
    return this.http.get<any>(environment.apiUrl + endPoints + refID)
  }

  //user
  UpdateUser(FormGroup:FormGroup,userID:string,hospitalIDs:any,roleID:string,passwordtick:boolean,otptick:boolean): Observable<any>{
 
    const user = new UserModel();
    user.UserID = userID;
    user.UserName = FormGroup.controls.mobilenumber.value.toString();
   
    user.FullName = FormGroup.controls.fullname.value;
    if(passwordtick)
    {
      user.Password =  FormGroup.controls.password.value;
    }
    user.MobileNumber = FormGroup.controls.mobilenumber.value;
    user.EmailId =  FormGroup.controls.email.value;
    // if(otptick)
    // {
    //   user.Otp =  (FormGroup.controls.OTPfield.value == "" ? 0 : FormGroup.controls.OTPfield.value);
    // }
    user.IsActive =  true;
    user.IsRegistered =  true;
    user.RoleId = roleID;
    user.CreatedDate=new Date();

    const mapped = { hospitalId: hospitalIDs}  
    const headers = { 'content-type': 'application/json'}  

    let body = { "user": user, "userHospitalMaps": mapped };
    
    let endPoints = "api/Doctor/DoctorSignup"
    return this.http.put(environment.apiUrl + endPoints, body,{'headers':headers})
  }

  Login(UserName:string,Password:string)
  {
    this.removeCookie();
    const credentials = {
      'username':UserName,
      'password':Password
    }

    return this.http.post(environment.apiUrl+'api/Auth/Login',credentials)
    .pipe(map(response => {
      // store jwt token in local storage to keep user logged in between page refreshes
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken((<any> response).jwtToken);
      localStorage.setItem("access_token",(<any> response).jwtToken);
      localStorage.setItem("Menus",decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/anonymous"]);
      localStorage.setItem("Hospitals",decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/uri"]);
      localStorage.setItem("userID",decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]);
      localStorage.setItem("UserName",decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]);

      return response;
  }));

  }


  LoginUser(UserName:string,Password:string)
  {
    this.removeCookie();
    const credentials = {
      'username':UserName,
      'password':Password
    }

    return this.http.post(environment.apiUrl+'api/Auth/LoginV1',credentials)
    .pipe(map(response => {
      // store jwt token in local storage to keep user logged in between page refreshes
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken((<any> response).jwtToken);
      console.log(decodedToken);
      localStorage.setItem("access_token",(<any> response).jwtToken);
      localStorage.setItem("Menus",decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/anonymous"]);
      localStorage.setItem("Hospitals",decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/uri"]);
      localStorage.setItem("userID",decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]);
      localStorage.setItem("UserName",decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]);

      return response;
  }));

  }
  
UpdatePatient(FormGroup:FormGroup,userID:string,passwordtick:boolean,otptick:boolean): Observable<any>{
 
    const user = new UserModel();
    user.UserID = userID;
    if(passwordtick)
    {
      user.Password =  FormGroup.controls.password.value;
    }
    // if(otptick)
    // {
    //   user.Otp =  (FormGroup.controls.OTPfield.value == "" ? 0 : FormGroup.controls.OTPfield.value);
    // }
 

    const headers = { 'content-type': 'application/json'}  

     const roledata=JSON.stringify(user);
    let endPoints = "api/User/UpdatePatient"
    return this.http.put(environment.apiUrl + endPoints, roledata,{'headers':headers});
  }

  LoginPatient(UserName:string,Password:string)
  {
    this.removeCookie();
    const credentials = {
      'username':UserName,
      'password':Password
    }

    return this.http.post(environment.apiUrl+'api/Auth/LoginV2',credentials)
    .pipe(map(response => {
      // store jwt token in local storage to keep user logged in between page refreshes
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken((<any> response).jwtToken);
      console.log(decodedToken);
      localStorage.setItem("access_token",(<any> response).jwtToken);
      localStorage.setItem("Menus",decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/anonymous"]);
      localStorage.setItem("Hospitals",decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/uri"]);
      localStorage.setItem("userID",decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]);
      localStorage.setItem("UserName","Welcome");

      return response;
  }));

  }

  logout(){
    localStorage.removeItem("Hospitals");
    localStorage.removeItem("access_token");
    localStorage.removeItem("Menus");
    localStorage.removeItem("SelectedHospital");
    localStorage.removeItem("userID");
    localStorage.removeItem("UserName");
    this.router.navigate(["/auth/login"]);
   }

   removeCookie()
   {
    localStorage.removeItem("Hospitals");
    localStorage.removeItem("access_token");
    localStorage.removeItem("Menus");
    localStorage.removeItem("SelectedHospital");
    localStorage.removeItem("userID");
   }
   
   GenerateOTP(userID:string): Observable<any> {
    let endPoints = "api/Auth/GenarateOtp/"
    return this.http.get<any>(environment.apiUrl + endPoints + userID)
  }

}
