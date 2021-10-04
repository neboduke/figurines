package com.archaeodb.figurines.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Material {
    @Id
    @GeneratedValue()
    private int materialId;
    private String title;

    @OneToMany(
            mappedBy = "material",
            fetch = FetchType.LAZY)
    private List<FigurineMaterial> figurineMaterialList = new ArrayList<>();

    public Material() {
    }
    public Material(String title) {
        this.title = title;
    }

    public int getMaterialId() {
        return materialId;
    }

    public void setMaterialId(int materialId) {
        this.materialId = materialId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
