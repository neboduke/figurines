package com.archaeodb.figurines.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Motif {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer motifId;
    private String title;


    @ManyToMany(
            fetch = FetchType.LAZY,
            mappedBy = "motif"
    )
    List<Figurine> figurines = new ArrayList<>();

    public Motif(){}

    public Motif(Integer motifId, String title) {
        this.motifId = motifId;
        this.title = title;
    }

    public Integer getMotifId() {
        return motifId;
    }

    public void setMotifId(Integer motifId) {
        this.motifId = motifId;
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
