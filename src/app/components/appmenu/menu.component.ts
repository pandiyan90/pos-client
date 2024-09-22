import { Component, DoCheck, OnInit, effect } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { menu } from '../../model/user.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent implements OnInit, DoCheck {
  constructor(
    private service: UserService,
    private router: Router,
  ) {
    effect(() => {
      this.menulist = this.service._menulist();
    });
  }

  menulist!: menu[];
  Loginuser = '';
  showmenu = false;

  ngOnInit(): void {
    const userrole = localStorage.getItem('userrole') as string;
    this.service.Loadmenubyrole(userrole).subscribe((item) => {
      this.menulist = item;
    });
  }

  ngDoCheck(): void {
    this.Loginuser = localStorage.getItem('username') as string;
    this.Setaccess();
  }

  Setaccess() {
    const userrole = localStorage.getItem('userrole');
    const currentUrl = this.router.url;
    if (
      currentUrl === '/register' ||
      currentUrl === '/login' ||
      currentUrl === '/resetpassword' ||
      currentUrl === '/forgetpassword'
    ) {
      this.showmenu = false;
    } else {
      this.showmenu = true;
    }
  }
}
