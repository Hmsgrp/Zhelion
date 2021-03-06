import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LayoutService } from '../../../../../core';
import { UserModel } from '../../../../../../modules/auth/_models/user.model';
import { AuthService } from '../../../../../../modules/auth/_services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-dropdown-inner',
  templateUrl: './user-dropdown-inner.component.html',
  styleUrls: ['./user-dropdown-inner.component.scss'],
})
export class UserDropdownInnerComponent implements OnInit {
  extrasUserDropdownStyle: 'light' | 'dark' = 'light';
  user$: Observable<UserModel>;
  userName:string;

  constructor(private layout: LayoutService, private auth: AuthService,private router: Router) {}

  ngOnInit(): void {
    this.extrasUserDropdownStyle = this.layout.getProp(
      'extras.user.dropdown.style'
    );
    this.user$ = this.auth.currentUserSubject.asObservable();
    this.getUserName();
  }

  getUserName()
 {
   this.userName= localStorage.getItem("UserName");
 }

  logout() {
    localStorage.removeItem("access_token");
    this.router.navigate(["/auth/login"]);
  }
}
