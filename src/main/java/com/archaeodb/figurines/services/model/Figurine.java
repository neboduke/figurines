package com.archaeodb.figurines.services.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Figurine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int figurineId;
    private String title;

    public int getFigurineId() {
        return figurineId;
    }

    public String getTitle() {
        return title;
    }

    public void setFigurineId(int figurineId) {
        this.figurineId = figurineId;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Override
    public String toString() {
        return "figurineId=" + figurineId + ", title=" + title;
    }
}
