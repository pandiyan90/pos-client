import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import {
  loginresp,
  menu,
  menupermission,
  menus,
  registerconfirm,
  resetpassword,
  roles,
  updatepassword,
  updateuser,
  usercred,
  userregister,
  users,
} from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  apiUrl = environment.apiUrl;

  _registerresp = signal<registerconfirm>({
    userid: 0,
    username: '',
    otptext: '',
  });

  _username = signal('');

  _menulist = signal<menu[]>([]);

  Userregisteration(_data: userregister) {
    return this.http.post(this.apiUrl + 'User/userregisteration', _data);
  }

  Confirmregisteration(_data: registerconfirm) {
    return this.http.post(this.apiUrl + 'User/confirmregisteration', _data);
  }

  Proceedlogin(_data: usercred) {
    return this.http.post<loginresp>(
      this.apiUrl + 'Authorize/GenerateToken',
      _data,
    );
  }

  Loadmenubyrole(role: string) {
    return this.http.get<menu[]>(
      this.apiUrl + 'UserRole/GetAllMenusbyrole?userrole=' + role,
    );
  }

  Resetpassword(_data: resetpassword) {
    return this.http.post(this.apiUrl + 'User/resetpassword', _data);
  }

  Forgetpassword(username: string) {
    return this.http.get(
      this.apiUrl + 'User/forgetpassword?username=' + username,
    );
  }

  Updatepassword(_data: updatepassword) {
    return this.http.post(this.apiUrl + 'User/updatepassword', _data);
  }

  Getmenupermission(role: string, menuname: string) {
    return this.http.get<menupermission>(
      this.apiUrl +
        'UserRole/GetMenupermissionbyrole?userrole=' +
        role +
        '&menucode=' +
        menuname,
    );
  }

  Getallusers() {
    return this.http.get<users[]>(this.apiUrl + 'User/GetAll');
  }

  GetUserbycode(code: string) {
    return this.http.get<users>(this.apiUrl + 'User/GetBycode?code=' + code);
  }

  Getallroles() {
    return this.http.get<roles[]>(this.apiUrl + 'UserRole/GetAllRoles');
  }

  Updaterole(_data: updateuser) {
    return this.http.post(this.apiUrl + 'User/updaterole', _data);
  }
  Updatestatus(_data: updateuser) {
    return this.http.post(this.apiUrl + 'User/updatestatus', _data);
  }

  Getallmenus() {
    return this.http.get<menus[]>(this.apiUrl + 'UserRole/GetAllMenus');
  }

  Assignrolepermission(_data: menupermission[]) {
    return this.http.post(this.apiUrl + 'UserRole/assignrolepermission', _data);
  }
}
