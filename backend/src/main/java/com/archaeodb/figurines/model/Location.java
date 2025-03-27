package com.archaeodb.figurines.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int locationId;
    private String name;
    private String address;
    private String place;
    private String coordinate;
    private String coordinateLng;
    private String coordinateLat;
    private int locationType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "country_id")
    private Country country;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "location")
    private List<Figurine> figurines = new ArrayList<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "exibitLocation")
    private List<Figurine> figurinesExibit = new ArrayList<>();

    public Location() {
    }

    public Location(int locationId,
                    String name,
                    String address,
                    String place,
                    String coordinate,
                    String coordinateLng,
                    String coordinateLat,
                    int locationType, Country country) {
        this.locationId = locationId;
        this.name = name;
        this.address = address;
        this.place = place;
        this.coordinate = coordinate;
        this.coordinateLng = coordinateLng;
        this.coordinateLat = coordinateLat;
        this.locationType = locationType;
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

    public Country getCountry() {
        return country;
    }

    public void setCountry(Country country) {
        this.country = country;
    }

    public List<Figurine> getFigurines() {
        return figurines;
    }

    public void setFigurines(List<Figurine> figurines) {
        this.figurines = figurines;
    }

    public List<Figurine> getFigurinesExibit() {
        return figurinesExibit;
    }

    public void setFigurinesExibit(List<Figurine> figurinesExibit) {
        this.figurinesExibit = figurinesExibit;
    }

    public int getLocationType() {
        return locationType;
    }

    public void setLocationType(int locationType) {
        this.locationType = locationType;
    }
}
