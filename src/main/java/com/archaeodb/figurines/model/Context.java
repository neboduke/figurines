package com.archaeodb.figurines.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Context  {
    @Id
    @GeneratedValue
    private Integer contextId;
    private String title;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "context")
    private List<Figurine> figurines = new ArrayList<>();

    public Context(){}

    public Context(Integer contextId, String title){
        this.contextId = contextId;
        this.title = title;
    }

    public Integer getContextId() {
        return contextId;
    }

    public void setContextId(Integer contextId) {
        this.contextId = contextId;
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
