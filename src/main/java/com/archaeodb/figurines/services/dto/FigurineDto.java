package com.archaeodb.figurines.services.dto;

public class FigurineDto {
    private int figurineId;
    private String title;

    public int getFigurineId() {
        return figurineId;
    }
    public String getTitle() {
        return title;
    }
    public void setFigurineId(int v) {
        this.figurineId = figurineId;
    }
    public void setTitle(String title) {
        this.title = title;
    }

}
