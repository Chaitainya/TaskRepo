import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  applicationName: string = "";
  @Input() counterAppCount = 0;
  @Input() alertMessage = "";
  @Input() toggleAlert = false;
  constructor(
    private router: Router
  ) {}

  ngOnChanges() {
    setTimeout(() => {
      this.toggleAlert = false;
    }, 2000)
  }

  ngOnInit(): void {
    this.applicationName = this.router.url === "/vatavaran" ? "WEATHER" : "COUNTER";
  }

  changeApp(application: string): void {
    this.router.navigate([application === "WEATHER" ? "vatavaran" : "counter"]);
  }
}
