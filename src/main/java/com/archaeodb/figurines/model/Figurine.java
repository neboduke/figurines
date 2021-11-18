package com.archaeodb.figurines.model;


import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Figurine {
    @Id
    @GeneratedValue()
    private Integer figurineId;
    private String title;
    private String descriptionIconography;
    private String descriptionIconology;
    private String dateAbs;
    private String materialDescription;
    private String exibitNr;
    private String keyword;
    private String image;
    private String image2;
    private String image3;
    private String imageUrl;



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

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name = "motif_id")
    private Motif motif;

    public Motif getMotif() {
        return motif;
    }


    public Integer getFigurineId() {
        return figurineId;
    }

    public void setFigurineId(Integer figurineId) {
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

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getImage2() {
        return image2;
    }

    public void setImage2(String image2) {
        this.image2 = image2;
    }

    public String getImage3() {
        return image3;
    }

    public void setImage3(String image3) {
        this.image3 = image3;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }


    public void setMotif(Motif motif) {
        this.motif = motif;
    }

    public Figurine() {}

    public Figurine(String title,
                    String descriptionIconography,
                    String descriptionIconology,
                    String dateAbs,
                    String materialDescription,
                    String exibitNr,
                    String keyword,
                    String image2, String image3, Chronology chronology,
                    List<Material> materials,
                    List<Literature> literature,
                    Carrier carrier,
                    Location location,
                    Location exibitLocation,
                    String image,
                    String imageUrl,
                    Motif motif) {
        this.title = title;
        this.descriptionIconography = descriptionIconography;
        this.descriptionIconology = descriptionIconology;
        this.dateAbs = dateAbs;
        this.materialDescription = materialDescription;
        this.exibitNr = exibitNr;
        this.keyword = keyword;
        this.image2 = image2;
        this.image3 = image3;
        this.chronology = chronology;
        this.materials = materials;
        this.literature = literature;
        this.carrier = carrier;
        this.location = location;
        this.exibitLocation = exibitLocation;
        this.image = image;
        this.imageUrl = imageUrl;
        this.motif = motif;
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
