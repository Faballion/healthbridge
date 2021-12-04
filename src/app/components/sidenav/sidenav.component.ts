import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  @Output() toggleEvent = new EventEmitter<boolean>();
  
  constructor() { }

  ngOnInit(): void {
  }

  toggleSideNav() {
    this.toggleEvent.emit();
  }


}
