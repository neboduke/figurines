package com.archaeodb.figurines.model;


import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Chronology {
    @Id
    @GeneratedValue()
    private int chronologyId;
    private String name;

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

    public Chronology() {
    }

    public Chronology(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Chronology{" +
                "chronologyId=" + chronologyId +
                ", name='" + name + '\'' +
                '}';
    }
}
