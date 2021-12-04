import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'health-bridge-assessment';

  isSideNavOpened = false;

  toggleSideNav(open: boolean) {
    this.isSideNavOpened = open;
  }

}
