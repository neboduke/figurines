package com.archaeodb.figurines.model;

import javax.persistence.*;

@Entity
@Table(name = "query")
public class Query {
    @Id
    @Column(name = "query_id", nullable = false)
    @GeneratedValue //(strategy = GenerationType.IDENTITY)
    private Integer queryId;

    @Column(name = "query_name", length = 500)
    private String queryName;

    @Column(name = "search", length = 1500)
    private String search;

    @Column(name = "operator", length = 5)
    private String operator;

    @Column(name = "chronology")
    private String chronology;

    @Column(name = "motif")
    private String motif;

    @Column(name = "context")
    private String context;

    public String getContext() {
        return context;
    }

    public void setContext(String context) {
        this.context = context;
    }

    public String getMotif() {
        return motif;
    }

    public void setMotif(String motif) {
        this.motif = motif;
    }

    public String getChronology() {
        return chronology;
    }

    public void setChronology(String chronology) {
        this.chronology = chronology;
    }

    public String getOperator() {
        return operator;
    }

    public void setOperator(String operator) {
        this.operator = operator;
    }

    public String getSearch() {
        return search;
    }

    public void setSearch(String search) {
        this.search = search;
    }

    public String getQueryName() {
        return queryName;
    }

    public void setQueryName(String queryName) {
        this.queryName = queryName;
    }

    public Integer getId() {
        return queryId;
    }

    public void setId(Integer queryId) {
        this.queryId = queryId;
    }
}