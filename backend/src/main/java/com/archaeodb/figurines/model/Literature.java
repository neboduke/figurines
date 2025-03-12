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
    private Integer parentId;
    private String author;

    @ManyToMany(
            fetch = FetchType.LAZY,
            mappedBy = "literature"
    )
    List<Figurine> figurines = new ArrayList<>();


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parentId",updatable = false,insertable = false)
    private Literature parentLiterature;


    public Literature() {
    }

    public Literature(int literatureId,
                      String title,
                      String isin,
                      String citation,
                      Integer parentId,
                      String author) {
        this.literatureId = literatureId;
        this.title = title;
        this.isin = isin;
        this.citation = citation;
        this.parentId = parentId;
        this.author = author;
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

    public Integer getParentId() {
        return parentId;
    }

    public void setParentId(Integer parentId) {
        this.parentId = parentId;
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
    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }
}
