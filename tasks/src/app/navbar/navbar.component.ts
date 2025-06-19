import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from '../toaster/toaster.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  applicationName: string = "";
  @Input() counterAppCount = 0;
  toggleAlert: boolean = false;
  alertMessage: string = ''
  toasterSubscription: Subscription | undefined;
  constructor(
    private router: Router,
    private toasterService: ToasterService
  ) {}

  ngOnInit(): void {
    this.applicationName = this.router.url === "/vatavaran" ? "WEATHER" : "COUNTER";
    let toasterTimeout: any;
    this.toasterSubscription = this.toasterService.getToasterStatus().subscribe((res) => {
      this.toggleAlert = res?.status;
      this.alertMessage = res?.message || '';
      clearTimeout(toasterTimeout);
      if (this.toggleAlert === true) {
        toasterTimeout = setTimeout(() => {
          this.toggleAlert = false;
          this.alertMessage = '';
        }, 2000);
      }
    })
  }

  changeApp(application: string): void {
    this.router.navigate([application === "WEATHER" ? "vatavaran" : "counter"]);
  }

  ngOnDestroy(): void {
    this.toasterSubscription?.unsubscribe();
  }
}
