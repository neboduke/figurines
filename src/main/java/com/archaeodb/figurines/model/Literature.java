package com.archaeodb.figurines.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Literature {
    @Id
    @GeneratedValue
    private int literatureId;
    private String title;
    private String isin;
    private String citation;
    private int parent_id;
    @ManyToMany(
            fetch = FetchType.LAZY,
            mappedBy = "literature"
    )
    List<Figurine> figurines = new ArrayList<>();


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id",updatable = false,insertable = false)
    private Literature parentLiterature;


    public Literature() {
    }

    public Literature(int literatureId,
                      String title,
                      String isin,
                      String citation,
                      int parent_id) {
        this.literatureId = literatureId;
        this.title = title;
        this.isin = isin;
        this.citation = citation;
        this.parent_id = parent_id;
    }

    public int getLiteratureId() {
        return literatureId;
    }

    public void setLiteratureId(int literatureId) {
        this.literatureId = literatureId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getIsin() {
        return isin;
    }

    public void setIsin(String isin) {
        this.isin = isin;
    }

    public String getCitation() {
        return citation;
    }

    public void setCitation(String citation) {
        this.citation = citation;
    }

    public int getParent_id() {
        return parent_id;
    }

    public void setParent_id(int parent_id) {
        this.parent_id = parent_id;
    }

    public List<Figurine> getFigurines() {
        return figurines;
    }

    public void setFigurines(List<Figurine> figurines) {
        this.figurines = figurines;
    }

    public Literature getParentLiterature() {
        return parentLiterature;
    }

    public void setParentLiterature(Literature parentLiterature) {
        this.parentLiterature = parentLiterature;
    }
}
