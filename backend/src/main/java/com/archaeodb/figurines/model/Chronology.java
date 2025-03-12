package com.archaeodb.figurines.model;


import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Chronology {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int chronologyId;
    private String name;
    @Column(name="year_from")
    private Integer yearFrom;
    @Column(name="year_to")
    private Integer yearTo;


    @OneToMany(
            mappedBy = "chronology",
            fetch = FetchType.LAZY
    )
//    @JsonManagedReference
    private final List<Figurine> figurines = new ArrayList<>();

    public int getChronologyId() {
        return chronologyId;
    }

    public void setChronologyId(int chronologyId) {
        this.chronologyId = chronologyId;
    }

    public List<Figurine> getFigurines() {
        return figurines;
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

    public Chronology() {
    }

    public Chronology(String name) {
        this.name = name;
    }

    public Chronology(String name, Integer yearFrom, Integer yearTo) {
        this.name = name;
        this.yearFrom = yearFrom;
        this.yearTo = yearTo;
    }

    @Override
    public String toString() {
        return "Chronology{" +
                "chronologyId=" + chronologyId +
                ", name='" + name + '\'' +
                '}';
    }
}
