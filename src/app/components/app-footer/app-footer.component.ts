import { Component } from '@angular/core';
import { FooterComponent } from '@coreui/angular';
@Component({
  selector: 'app-app-footer',
  templateUrl: './app-footer.component.html',
  styleUrl: './app-footer.component.css'
})
export class AppFooterComponent extends FooterComponent{
  constructor() {
    super();
  }
}
