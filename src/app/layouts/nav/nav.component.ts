import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { environment } from '@env/environment';
import { ThemeService } from '@app/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  @Output() changeTheme: EventEmitter<boolean> = new EventEmitter<boolean>();

  version = environment.version;
  isDarkTheme: Observable<boolean>;

  navItems = [];

  constructor(private themeService: ThemeService) { }

  ngOnInit() {
    this.isDarkTheme = this.themeService.isDarkTheme;
  }

  toggleDarkTheme(checked: boolean) {
    this.changeTheme.emit(checked);
  }
}
