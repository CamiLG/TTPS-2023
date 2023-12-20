import { Component, OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-app-nav',
  templateUrl: './app-nav.component.html',
  styleUrl: './app-nav.component.css',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, NgIf],
})
export class AppNavComponent implements OnInit{

  userLoginOn:boolean=false;

  constructor(public router: Router) { }

  login() {
    this.router.navigateByUrl('login')
  }

  home() {
    this.router.navigateByUrl('home')
  }

  signin() {
    this.router.navigateByUrl('register')
  }
  logout() {
    this.userLoginOn=false;
    this.router.navigateByUrl('login')
  }
  ngOnInit(): void {
  }
}