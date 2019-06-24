import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Subject, Observable, interval } from 'rxjs';
import { distinctUntilChanged, map, throttle } from 'rxjs/operators';

import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { Place, Location } from '@app/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public searchInput: FormControl;

  @ViewChild('search', { static: false })
  public searchElement: ElementRef;

  public mapElement: google.maps.Map;

  public places: Place[];
  private placesSubject: Subject<google.maps.places.PlaceResult[]>;
  public lat = 36.8502966;
  public lng = -76.277563;
  public zoom = 10;

  public isLoading = false;
  public selectedPlace: string;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    this.placesSubject = new Subject<google.maps.places.PlaceResult[]>();
    this.placesSubject.asObservable().pipe(
      map(x => x.map(y => new Place({
        id: y.id,
        name: y.name,
        location: new Location({
          lat: y.geometry.viewport.getCenter().lat(),
          lng: y.geometry.viewport.getCenter().lng()
        }),
        rating: y.rating,
        phone: y.international_phone_number,
        icon: y.icon
      })
      ))
    ).subscribe(x => this.ngZone.run(() =>
      this.places = x.sort((y, z) => y.name > z.name ? 1 : -1)));

    // create search FormControl
    this.searchInput = new FormControl();

    this.setCurrentPosition();

    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(
        this.searchElement.nativeElement, {
          types: ['address']
        });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // set latitude, longitude and zoom
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }

  public mapReady(gMap: google.maps.Map) {
    this.mapElement = gMap;
  }

  public updateMap() {
    if (this.isLoading) return;
    this.isLoading = true;
    const latLng = this.mapElement.getCenter();
    this.lat = latLng.lat();
    this.lng = latLng.lng();

    const parks = new google.maps.places.PlacesService(this.mapElement);

    parks.nearbySearch({
      location: new google.maps.LatLng(this.lat, this.lng),
      radius: 50000,
      type: 'park'
    }, (results, status, page) => {
      if (status !== google.maps.places.PlacesServiceStatus.OK) {
        this.isLoading = false;
        return;
      }

      this.isLoading = false;
      this.placesSubject.next(results);
    });
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

}
