import { Country } from "./country";

export class Location {
    locationId: number | undefined;
    name: string | undefined;
    address: string | undefined;
    place: string | undefined;
    country: Country | undefined;
    coordinate: string | undefined;
    coordinateLat: string | undefined;
    coordinateLng: string | undefined;
}
