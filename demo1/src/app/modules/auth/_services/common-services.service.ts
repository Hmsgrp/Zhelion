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
  UpdateUser(FormGroup:FormGroup,userID:string,hospitalIDs:any,roleID:string): Observable<any>{
 
    const user = new UserModel();
    user.UserID = userID;
    user.UserName = FormGroup.controls.mobilenumber.value.toString();
    user.FullName = FormGroup.controls.fullname.value;
    user.Password =  FormGroup.controls.password.value;
    user.MobileNumber = FormGroup.controls.mobilenumber.value;
    user.EmailId =  FormGroup.controls.email.value;
    user.Otp =  (FormGroup.controls.OTPfield.value == "" ? 0 : FormGroup.controls.OTPfield.value);
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


  LoginUser(UserName:string,Password:string)
  {
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
      return response;
  }));

  }

  logout(){
    localStorage.removeItem("access_token");
    localStorage.removeItem("Menus");
    this.router.navigate(["/auth/doctor/login"]);
   }

}
