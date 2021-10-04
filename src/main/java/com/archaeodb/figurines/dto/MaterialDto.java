package com.archaeodb.figurines.dto;

public class MaterialDto {

    private int materialId;
    private String title;

    public MaterialDto() {
    }

    public MaterialDto(String title) {
        this.title = title;
    }

    public MaterialDto(int materialId, String title) {
        this.materialId = materialId;
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
