import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  isLoggedOut = true;
  isAuthenticated: boolean = false;

  constructor(private _http:HttpClient) { }

  /**
   * Function - Login
   * Use - To Login User into the application
   * @param postData
   * @returns
   */
  login(postData : any){
    return this._http.post(environment.apiUrl + '/auth/signin', postData, {observe : 'response'});
  }


  /**
   * Function - forgetPassword()
   * Use - To recover the password
   * @param postData
   * @returns
   */
  forgetPassword(postData : any){
    return this._http.post(environment.apiUrl + '/forget-password', postData, {observe : 'response'})
  }

  checkLogin(){
    return this._http.get(environment.apiUrl + '/check-login', {observe : 'response'})
  }

  logout() {
    this.isAuthenticated = false;
    this.isLoggedOut = true;
  }

  checkUserAuthentication() {
    this.isLoggedOut = false;
    return this.isAuthenticated = true;
  }

}
