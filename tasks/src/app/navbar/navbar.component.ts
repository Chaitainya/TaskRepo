import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from '../toaster/toaster.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  applicationName: string = "";
  @Input() counterAppCount = 0;
  toggleAlert = false;
  constructor(
    private router: Router,
    private toasterService: ToasterService
  ) {}

  ngOnInit(): void {
    this.applicationName = this.router.url === "/vatavaran" ? "WEATHER" : "COUNTER";
    let toasterTimeout: any;
    this.toasterService.getToasterStatus().subscribe((status) => {
      this.toggleAlert = status;
      clearTimeout(toasterTimeout);
      if (this.toggleAlert = true) {
        toasterTimeout = setTimeout(() => this.toggleAlert = false, 2000);
      }
    })
  }

  changeApp(application: string): void {
    this.router.navigate([application === "WEATHER" ? "vatavaran" : "counter"]);
  }
}
