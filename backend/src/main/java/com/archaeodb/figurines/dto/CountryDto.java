package com.archaeodb.figurines.dto;

public class CountryDto {
    private int countryId;
    private String name;
    private String coordinate;
    private String coordinateLng;
    private String coordinateLat;

    public CountryDto() {
    }

    public CountryDto(int countryId,
                      String name,
                      String coordinate,
                      String coordinateLng,
                      String coordinateLat) {
        this.countryId = countryId;
        this.name = name;
        this.coordinate = coordinate;
        this.coordinateLng = coordinateLng;
        this.coordinateLat = coordinateLat;
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
}
