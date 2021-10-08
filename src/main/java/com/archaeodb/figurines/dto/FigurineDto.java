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
    private String keyword;
    private ChronologyDto chronology;
    private List<MaterialDto> materials;
    private List<LiteratureDto> literature;
    private CarrierDto carrier;
    private LocationDto location;
    private LocationDto exibitLocation;


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
                       List<LiteratureDto> literature,
                       CarrierDto carrier,
                       LocationDto location,
                       LocationDto exibitLocation) {
        this.figurineId = figurineId;
        this.title = title;
        this.descriptionIconography = descriptionIconography;
        this.descriptionIconology = descriptionIconology;
        this.dateAbs = dateAbs;
        this.materialDescription = materialDescription;
        this.exibitNr = exibitNr;
        this.keyword = keyword;
        this.chronology = chronology;
        this.materials = materials;
        this.literature = literature;
        this.carrier = carrier;
        this.location = location;
        this.exibitLocation = exibitLocation;
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

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    public List<LiteratureDto> getLiterature() {
        return literature;
    }

    public void setLiterature(List<LiteratureDto> literature) {
        this.literature = literature;
    }

    public CarrierDto getCarrier() {
        return carrier;
    }

    public void setCarrier(CarrierDto carrier) {
        this.carrier = carrier;
    }

    public LocationDto getLocation() {
        return location;
    }

    public void setLocation(LocationDto location) {
        this.location = location;
    }

    public LocationDto getExibitLocation() {
        return exibitLocation;
    }

    public void setExibitLocation(LocationDto exibitLocation) {
        this.exibitLocation = exibitLocation;
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
