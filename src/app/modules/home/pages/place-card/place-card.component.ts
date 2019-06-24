import { Component, OnInit, Input } from '@angular/core';

import { Place } from '@app/core';

@Component({
  selector: 'app-place-card',
  templateUrl: './place-card.component.html',
  styleUrls: ['./place-card.component.scss']
})
export class PlaceCardComponent implements OnInit {
  @Input() place: Place;
  flipped = false;

  constructor() {}

  ngOnInit() {}
}
