package com.archaeodb.figurines.dto;

import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class FigurineDto {
    private int figurineId;
    private String title;
    private String descriptionIconography;
    private String descriptionIconology;
    private String dateAbs;
    private String materialDescription;
    private String exibitNr;
    private String keywords;
    private ChronologyDto chronology;
    private List<MaterialDto> materials;
    private List<LiteratureDto> literature;


    public FigurineDto() {
    }

    public FigurineDto(int figurineId,
                       String title,
                       String descriptionIconography,
                       String descriptionIconology,
                       String dateAbs,
                       String materialDescription,
                       String exibitNr,
                       String keyword,
                       ChronologyDto chronology,
                       List<MaterialDto> materials,
                       List<LiteratureDto> literature) {
        this.figurineId = figurineId;
        this.title = title;
        this.descriptionIconography = descriptionIconography;
        this.descriptionIconology = descriptionIconology;
        this.dateAbs = dateAbs;
        this.materialDescription = materialDescription;
        this.exibitNr = exibitNr;
        this.keywords = keyword;
        this.chronology = chronology;
        this.materials = materials;
        this.literature = literature;
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

    public ChronologyDto getChronology() {
        return chronology;
    }

    public void setChronology(ChronologyDto chronology) {
        this.chronology = chronology;
    }

    public List<MaterialDto> getMaterials() {
        return materials;
    }

    public void setMaterials(List<MaterialDto> materials) {
        this.materials = materials;
    }

    public String getKeywords() {
        return keywords;
    }

    public void setKeywords(String keywords) {
        this.keywords = keywords;
    }

    public List<LiteratureDto> getLiterature() {
        return literature;
    }

    public void setLiterature(List<LiteratureDto> literature) {
        this.literature = literature;
    }

    @Override
    public String toString() {
        return "FigurineDto{" +
                "figurineId=" + figurineId +
                ", title='" + title + '\'' +
                ", descriptionIconography='" + descriptionIconography + '\'' +
                ", descriptionIconology='" + descriptionIconology + '\'' +
                ", dateAbs='" + dateAbs + '\'' +
                ", materialDescription='" + materialDescription + '\'' +
                ", exibitNr='" + exibitNr + '\'' +
                ", chronology=" + chronology +
                '}';
    }
}
