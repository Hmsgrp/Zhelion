import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { UserModel } from '../../../_models/user.model';
import { UsersModel } from '../../../_models/users.model';
import { AuthModel } from '../../../_models/auth.model';
import { UsersTable } from '../../../../../_fake/fake-db/users.table';
import { environment } from '../../../../../../environments/environment';

const API_USERS_URL = `${environment.apiUrl}/users`;

@Injectable({
  providedIn: 'root',
})
export class AuthHTTPService {
  constructor(private http: HttpClient) { }


  GetjwttokenfromLogn(username: string, password: string) : Observable<any>
      {
        const user = new UsersModel();
        user.username = username;
        user.password = password;
        const headers = { 'content-type': 'application/json'}  
  
        const body = JSON.stringify(user);
        
        let endPoints = "api/Auth/Login"
        return this.http.post(environment.apiUrl + endPoints, body,{'headers':headers})
      }

  // public methods
  login(username: string, password: string): Observable<any> {
    const notFoundError = new Error('Not Found');
    if (!username || !password) {
      return of(notFoundError);
    }

    return this.GetjwttokenfromLogn(username,password).pipe(
      map((result: any) => {
        if (result.length <= 0) {
          return notFoundError;
        }

        return result.jwtToken;
      })
    );
  }

  createUser(user: UserModel): Observable<any> {
    user.roles = [2]; // Manager
    user.accessToken = 'access-token-' + Math.random();
    user.refreshToken = 'access-token-' + Math.random();
    user.expiresIn = new Date(Date.now() + 100 * 24 * 60 * 60 * 1000);
    user.pic = './assets/media/users/default.jpg';

    return this.http.post<UserModel>(API_USERS_URL, user);
  }

  forgotPassword(email: string): Observable<boolean> {
    return this.getAllUsers().pipe(
      map((result: UserModel[]) => {
        const user = result.find(
          (u) => u.email.toLowerCase() === email.toLowerCase()
        );
        return user !== undefined;
      })
    );
  }

  getUserByToken(token: string): Observable<UserModel> {
    const user = UsersTable.users.find((u) => {
      return u.accessToken === token;
    });

    if (!user) {
      return of(undefined);
    }

    return of(user);
  }

  getAllUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(API_USERS_URL);
  }
}
