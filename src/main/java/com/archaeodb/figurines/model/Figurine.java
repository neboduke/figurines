package com.archaeodb.figurines.model;


import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Figurine {
    @Id
    @GeneratedValue()
    private int figurineId;
    private String title;
    private String descriptionIconography;
    private String descriptionIconology;
    private String dateAbs;
    private String materialDescription;
    private String exibitNr;


    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(
            name = "chronology_id"
    )
//    @JsonBackReference
    private Chronology chronology;

    @JsonBackReference
    public Chronology getChronology() {
        return chronology;
    }

    @OneToMany (
            mappedBy = "figurine",
            fetch = FetchType.LAZY)
    private List<FigurineMaterial> figurineMaterialList = new ArrayList<>();



    public List<FigurineMaterial> getFigurineMaterialList() {
        return figurineMaterialList;
    }

    public void setFigurineMaterialList(List<FigurineMaterial> figurineMaterialList) {
        this.figurineMaterialList = figurineMaterialList;
    }

    public void setChronology(Chronology chronology) {
        this.chronology = chronology;
    }

    public int getFigurineId() {
        return figurineId;
    }

    public void setFigurineId(int figurineId) {
        this.figurineId = figurineId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescriptionIconography() {
        return descriptionIconography;
    }

    public void setDescriptionIconography(String descriptionIconography) {
        this.descriptionIconography = descriptionIconography;
    }

    public String getDescriptionIconology() {
        return descriptionIconology;
    }

    public void setDescriptionIconology(String descriptionIconology) {
        this.descriptionIconology = descriptionIconology;
    }

    public String getDateAbs() {
        return dateAbs;
    }

    public void setDateAbs(String dateAbs) {
        this.dateAbs = dateAbs;
    }

    public String getMaterialDescription() {
        return materialDescription;
    }

    public void setMaterialDescription(String materialDescription) {
        this.materialDescription = materialDescription;
    }

    public String getExibitNr() {
        return exibitNr;
    }

    public void setExibitNr(String exibitNr) {
        this.exibitNr = exibitNr;
    }

    public Figurine() {}

    public Figurine(String title, String descriptionIconography, String descriptionIconology, String dateAbs, String materialDescription, String exibitNr, Chronology chronology) {
        this.title = title;
        this.descriptionIconography = descriptionIconography;
        this.descriptionIconology = descriptionIconology;
        this.dateAbs = dateAbs;
        this.materialDescription = materialDescription;
        this.exibitNr = exibitNr;
        this.chronology = chronology;
    }

    @Override
    public String toString() {
        return "Figurine{" +
                "figurineId=" + figurineId +
                ", title='" + title + '\'' +
                ", descriptionIconography='" + descriptionIconography + '\'' +
                ", descriptionIconology='" + descriptionIconology + '\'' +
                ", dateAbs='" + dateAbs + '\'' +
                ", materialDesription='" + materialDescription + '\'' +
                ", exibitNr='" + exibitNr + '\'' +
                ", chronology=" + chronology +
                '}';
    }
}
