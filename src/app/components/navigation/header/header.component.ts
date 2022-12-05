import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>(); //will create and output to emit

  constructor() {
  }

  ngOnInit(): void {
  }

  onToggleSidenav() {
    this.sidenavToggle.emit(); //emit the action
  }
}
