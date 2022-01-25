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
    private ContextDto context;
    private LocationDto location;
    private LocationDto exibitLocation;
    private List<ImageDto> images;
    private String imageUrl;
    private MotifDto motif;
    private double dimensionX;
    private double dimensionY;
    private double dimensionZ;


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
                       ContextDto context, LocationDto location,
                       LocationDto exibitLocation,
                       List<ImageDto> images,
                       String imageUrl,
                       MotifDto motif,
                       double dimensionX,
                       double dimensionY,
                       double dimensionZ) {
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
        this.context = context;
        this.location = location;
        this.exibitLocation = exibitLocation;
        this.images = images;
        this.imageUrl = imageUrl;
        this.motif = motif;
        this.dimensionX = dimensionX;
        this.dimensionY = dimensionY;
        this.dimensionZ = dimensionZ;
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

    public ContextDto getContext() {
        return context;
    }

    public void setContext(ContextDto context) {
        this.context = context;
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

    public List<ImageDto> getImages() {
        return images;
    }

    public void setImages(List<ImageDto> images) {
        this.images = images;
    }


    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public MotifDto getMotif() {
        return motif;
    }

    public void setMotif(MotifDto motif) {
        this.motif = motif;
    }
    public double getDimensionX() {
        return dimensionX;
    }

    public void setDimensionX(double dimensionX) {
        this.dimensionX = dimensionX;
    }

    public double getDimensionY() {
        return dimensionY;
    }

    public void setDimensionY(double dimensionY) {
        this.dimensionY = dimensionY;
    }

    public double getDimensionZ() {
        return dimensionZ;
    }

    public void setDimensionZ(double dimensionZ) {
        this.dimensionZ = dimensionZ;
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
