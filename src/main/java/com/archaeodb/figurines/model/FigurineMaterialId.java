package com.archaeodb.figurines.model;


import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class FigurineMaterialId implements Serializable {
    @Column(name = "figurine_id")
    private int figurineId;
    @Column(name = "material_id")
    private int materialId;

    public FigurineMaterialId() {
    }

    public FigurineMaterialId(int figurineId, int materialId) {
        this.figurineId = figurineId;
        this.materialId = materialId;
    }

    public int getFigurineId() {
        return figurineId;
    }

    public void setFigurineId(int figurineId) {
        this.figurineId = figurineId;
    }

    public int getMaterialId() {
        return materialId;
    }

    public void setMaterialId(int materialId) {
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
