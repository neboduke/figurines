package com.archaeodb.figurines.model;


import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class FigurineMaterialId implements Serializable {
    @Column(name = "figurine_id")
    private Integer figurineId;
    @Column(name = "material_id")
    private Integer materialId;

    public FigurineMaterialId() {
    }

    public FigurineMaterialId(Integer figurineId, Integer materialId) {
        this.figurineId = figurineId;
        this.materialId = materialId;
    }

    public Integer getFigurineId() {
        return figurineId;
    }

    public void setFigurineId(Integer figurineId) {
        this.figurineId = figurineId;
    }

    public Integer getMaterialId() {
        return materialId;
    }

    public void setMaterialId(Integer materialId) {
        this.materialId = materialId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        FigurineMaterialId that = (FigurineMaterialId) o;
        return Objects.equals(figurineId, that.figurineId) && Objects.equals(materialId, that.materialId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(figurineId, materialId);
    }
}
