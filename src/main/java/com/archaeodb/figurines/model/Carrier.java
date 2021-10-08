package com.archaeodb.figurines.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Carrier {
    @Id
    @GeneratedValue
    private int carrierId;
    private String title;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "carrier")
    private List<Figurine> figurines = new ArrayList<>();

    public Carrier() {
    }

    public Carrier(int carrierId, String title) {
        this.carrierId = carrierId;
        this.title = title;
    }

    public int getCarrierId() {
        return carrierId;
    }

    public void setCarrierId(int carrierId) {
        this.carrierId = carrierId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<Figurine> getFigurines() {
        return figurines;
    }

    public void setFigurines(List<Figurine> figurines) {
        this.figurines = figurines;
    }
}
