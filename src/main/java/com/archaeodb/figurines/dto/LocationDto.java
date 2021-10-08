package com.archaeodb.figurines.dto;

public class LocationDto {
    private int locationId;
    private String name;
    private String address;
    private String place;
    private String coordinate;
    private String coordinateLng;
    private String coordinateLat;
    private CountryDto country;

    public LocationDto() {
    }

    public LocationDto(int locationId,
                       String name,
                       String address,
                       String place,
                       String coordinate,
                       String coordinateLng,
                       String coordinateLat,
                       CountryDto country) {
        this.locationId = locationId;
        this.name = name;
        this.address = address;
        this.place = place;
        this.coordinate = coordinate;
        this.coordinateLng = coordinateLng;
        this.coordinateLat = coordinateLat;
        this.country = country;
    }

    public int getLocationId() {
        return locationId;
    }

    public void setLocationId(int locationId) {
        this.locationId = locationId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPlace() {
        return place;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public String getCoordinate() {
        return coordinate;
    }

    public void setCoordinate(String coordinate) {
        this.coordinate = coordinate;
    }

    public String getCoordinateLng() {
        return coordinateLng;
    }

    public void setCoordinateLng(String coordinateLng) {
        this.coordinateLng = coordinateLng;
    }

    public String getCoordinateLat() {
        return coordinateLat;
    }

    public void setCoordinateLat(String coordinateLat) {
        this.coordinateLat = coordinateLat;
    }

    public CountryDto getCountry() {
        return country;
    }

    public void setCountry(CountryDto country) {
        this.country = country;
    }
}
