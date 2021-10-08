package com.archaeodb.figurines.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Country {
    @Id
    @GeneratedValue
    private int countryId;
    private String name;
    private String coordinate;
    private String coordinateLng;
    private String coordinateLat;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "country")
    private List<Location> locations = new ArrayList<>();

    public Country() {
    }

    public Country(int countryId,
                   String name,
                   String coordinate,
                   String coordinateLng,
                   String coordinateLat,
                   List<Location> locations) {
        this.countryId = countryId;
        this.name = name;
        this.coordinate = coordinate;
        this.coordinateLng = coordinateLng;
        this.coordinateLat = coordinateLat;
        this.locations = locations;
    }

    public int getCountryId() {
        return countryId;
    }

    public void setCountryId(int countryId) {
        this.countryId = countryId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public List<Location> getLocations() {
        return locations;
    }

    public void setLocations(List<Location> locations) {
        this.locations = locations;
    }
}
