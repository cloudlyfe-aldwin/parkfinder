
export class Location {
  lat: number;
  lng: number;

  public constructor(init?: Partial<Location>) {
    Object.assign(this, init);
  }
}

export class Place {
  location: Location;
  icon: string;
  id: string;
  name: string;
  place_id: string;
  rating: number;
  phone: string;

  public constructor(init?: Partial<Place>) {
    Object.assign(this, init);
  }
}
