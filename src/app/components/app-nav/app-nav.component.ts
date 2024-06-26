import {Component, OnInit} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {Router} from '@angular/router';
import {NgIf} from '@angular/common';
import {LoginService} from '../../services/login.service';
import {CollapseDirective, NavbarNavComponent, NavbarTogglerDirective, NavItemComponent} from "@coreui/angular";

@Component({
  selector: 'app-app-nav',
  templateUrl: './app-nav.component.html',
  styleUrl: './app-nav.component.css',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, NgIf, NavbarTogglerDirective, CollapseDirective, NavbarNavComponent, NavItemComponent],
})
export class AppNavComponent implements OnInit {

  userLoginOn: boolean = false;

  constructor(public router: Router, private loginService: LoginService) {
  }

  login() {
    this.router.navigateByUrl('login')
  }

  home() {
    this.router.navigateByUrl('home')
  }

  amigos() {
    this.router.navigateByUrl('amigos')
  }

  gastos() {
    this.router.navigateByUrl('gastos')
  }

  signin() {
    this.router.navigateByUrl('register')
  }

  logout() {
    this.userLoginOn = false;
    this.loginService.logout();
    this.router.navigateByUrl('login')
  }

  ngOnInit(): void {
    this.loginService.currentUser.subscribe({
      next: (userLogged) => {
        this.userLoginOn = userLogged != null;
      }
    })
  }
}
