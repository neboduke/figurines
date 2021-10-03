package com.archaeodb.figurines.model;


import javax.persistence.*;

@Entity
@Table(name = 'figurine_material')
public class FigurineMaterial {

    @EmbeddedId
    private FigurineMaterialId figurineMaterialId;

    @ManyToOne
    @MapsId("figurineId")
    @JoinColumn(
            name = "figurine_id"
    )
    private Figurine figurine;

    @ManyToOne
    @MapsId("materialId")
    @JoinColumn(
            name = "material_id"
    )
    private Material material;

    public FigurineMaterial() {
    }

    public FigurineMaterial(Figurine figurine, Material material) {
        this.figurine = figurine;
        this.material = material;
    }

    public FigurineMaterial(FigurineMaterialId figurineMaterialId, Figurine figurine, Material material) {
        this.figurineMaterialId = figurineMaterialId;
        this.figurine = figurine;
        this.material = material;
    }

    public FigurineMaterialId getFigurineMaterialId() {
        return figurineMaterialId;
    }

    public void setFigurineMaterialId(FigurineMaterialId figurineMaterialId) {
        this.figurineMaterialId = figurineMaterialId;
    }

    public Figurine getFigurine() {
        return figurine;
    }

    public void setFigurine(Figurine figurine) {
        this.figurine = figurine;
    }

    public Material getMaterial() {
        return material;
    }

    public void setMaterial(Material material) {
        this.material = material;
    }
}
