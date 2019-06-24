import { Component, OnInit } from '@angular/core';
import { environment as env } from '@env/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  year = new Date().getFullYear();
  version = 2;
  envName = env.envName;

  constructor() { }

  ngOnInit(): void {
  }
}
