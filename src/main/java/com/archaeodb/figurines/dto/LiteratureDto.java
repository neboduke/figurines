package com.archaeodb.figurines.dto;

public class LiteratureDto {
    private int literatureId;
    private String title;
    private String isin;
    private String citation;
    private int included_in;
    private LiteratureDto parentLiterature;

    public LiteratureDto() {
    }

    public LiteratureDto(int literatureId,
                         String title,
                         String isin,
                         String citation,
                         int included_in,
                         LiteratureDto parentLiterature) {
        this.literatureId = literatureId;
        this.title = title;
        this.isin = isin;
        this.citation = citation;
        this.included_in = included_in;
        this.parentLiterature = parentLiterature;
    }

    public int getLiteratureId() {
        return literatureId;
    }

    public void setLiteratureId(int literatureId) {
        this.literatureId = literatureId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getIsin() {
        return isin;
    }

    public void setIsin(String isin) {
        this.isin = isin;
    }

    public String getCitation() {
        return citation;
    }

    public void setCitation(String citation) {
        this.citation = citation;
    }

    public int getIncluded_in() {
        return included_in;
    }

    public void setIncluded_in(int included_in) {
        this.included_in = included_in;
    }

    public LiteratureDto getParentLiterature() {
        return parentLiterature;
    }

    public void setParentLiterature(LiteratureDto parentLiterature) {
        this.parentLiterature = parentLiterature;
    }
}
