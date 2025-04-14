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
    private String imageUrl;
    private double dimensionX;
    private double dimensionY;
    private double dimensionZ;
    private Integer catalogNumber;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "figurine", cascade = CascadeType.REMOVE)
    private List<Image> images = new ArrayList<>();

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
    @JoinColumn(name = "context_id")
    private Context context;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "location_id")
    private Location location;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exibit_location_id")
    private Location exibitLocation;

    /*@ManyToOne(fetch=FetchType.LAZY)
        @JoinColumn(name = "motif_id")
        private Motif motif;*/
    @ManyToMany(
            fetch = FetchType.LAZY
    )
    @JoinTable(
            name = "figurine_motif",
            joinColumns = @JoinColumn(name = "figurine_id"),
            inverseJoinColumns = @JoinColumn(name = "motif_id")
    )

    private List<Motif> motif = new ArrayList<>();

    public List<Motif> getMotif() {
        return motif;
    }

    public void setMotif(List<Motif> motif) {
        this.motif = motif;
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

    public List<Image> getImages() {
        return images;
    }

    public void setImages(List<Image> images) {
        this.images = images;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Context getContext() {
        return context;
    }

    public void setContext(Context context) {
        this.context = context;
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

    public Integer getCatalogNumber() { return catalogNumber;}

    public void setCatalogNumber(Integer catalogNumber) { this.catalogNumber = catalogNumber;}


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
                    Context context,
                    Location location,
                    Location exibitLocation,
                    List<Image> images,
                    String imageUrl,
                    List<Motif> motif,
                    double dimensionX,
                    double dimensionY,
                    double dimensionZ,
                    Integer catalogNumber) {
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
        this.catalogNumber = catalogNumber;
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
