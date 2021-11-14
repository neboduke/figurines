package com.archaeodb.figurines.dto;

public class MotifDto {
    private Integer motifId;
    private String title;

    public MotifDto(){}

    public MotifDto(Integer motifId, String title) {
        this.motifId = motifId;
        this.title = title;
    }

    public Integer getMotifId() {
        return motifId;
    }

    public void setMotifId(Integer motifId) {
        this.motifId = motifId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
