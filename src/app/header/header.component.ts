import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  subtitle = 'Making your life easier';
  title = 'Discovering the World';
  constructor() {}

  ngOnInit(): void {}
}
