package com.archaeodb.figurines.dto;

import com.archaeodb.figurines.model.Figurine;

import java.util.List;

public class ChronologyDto {
    private int chronologyId;
    private String name;
    private Integer yearFrom;
    private Integer yearTo;


    public ChronologyDto() {
    }

    public ChronologyDto(int chronologyId, String name) {
        this.chronologyId = chronologyId;
        this.name = name;

    }
    public ChronologyDto(int chronologyId, String name, Integer yearFrom, Integer yearTo) {
        this.chronologyId = chronologyId;
        this.name = name;
        this.yearFrom = yearFrom;
        this.yearTo = yearTo;

    }

    public int getChronologyId() {
        return chronologyId;
    }

    public void setChronologyId(int chronologyId) {
        this.chronologyId = chronologyId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getYearFrom() {
        return yearFrom;
    }

    public void setYearFrom(Integer yearFrom) {
        this.yearFrom = yearFrom;
    }

    public Integer getYearTo() {
        return yearTo;
    }

    public void setYearTo(Integer yearTo) {
        this.yearTo = yearTo;
    }
}
