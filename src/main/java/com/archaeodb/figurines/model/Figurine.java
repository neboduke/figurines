package com.archaeodb.figurines.model;


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
    private String keyword;


    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(
            name = "chronology_id"
    )
//    @JsonBackReference
    private Chronology chronology;

//    @JsonBackReference
    public Chronology getChronology() {
        return chronology;
    }

    @ManyToMany (
            fetch = FetchType.LAZY
    )
    @JoinTable(
            name = "figurine_material",
            joinColumns = @JoinColumn(name = "figurine_id"),
            inverseJoinColumns = @JoinColumn (name ="material_id")
    )
    private List<Material> materials = new ArrayList<>();

    @ManyToMany(
            fetch = FetchType.LAZY
    )
    @JoinTable(
            name = "figurine_literature",
            joinColumns = @JoinColumn(name = "figurine_id"),
            inverseJoinColumns = @JoinColumn(name = "literature_id")
    )
    private List<Literature> literature = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "carrier_id")
    private Carrier carrier;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "location_id")
    private Location location;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exibit_location_id")
    private Location exibitLocation;


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

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    public List<Literature> getLiterature() {
        return literature;
    }

    public void setLiterature(List<Literature> literature) {
        this.literature = literature;
    }

    public List<Material> getMaterials() {
        return materials;
    }

    public void setMaterials(List<Material> materials) {
        this.materials = materials;
    }

    public void setChronology(Chronology chronology) {
        this.chronology = chronology;
    }

    public Carrier getCarrier() {
        return carrier;
    }

    public void setCarrier(Carrier carrier) {
        this.carrier = carrier;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public Location getExibitLocation() {
        return exibitLocation;
    }

    public void setExibitLocation(Location exibitLocation) {
        this.exibitLocation = exibitLocation;
    }

    public Figurine() {}

    public Figurine(String title,
                    String descriptionIconography,
                    String descriptionIconology,
                    String dateAbs,
                    String materialDescription,
                    String exibitNr,
                    String keyword,
                    Chronology chronology,
                    List<Material> materials,
                    List<Literature> literature,
                    Carrier carrier,
                    Location location,
                    Location exibitLocation) {
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
