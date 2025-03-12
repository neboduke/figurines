package com.archaeodb.figurines.dto;

public class LiteratureDto {
    private int literatureId;
    private String title;
    private String isin;
    private String citation;
    //private LiteratureDto parentLiteratureId;
    private Integer parentId;
    private String author;

    public LiteratureDto() {
    }

    public LiteratureDto(int literatureId,
                         String title,
                         String isin,
                         String citation,
                         Integer parentId,
                         String author) {
        this.literatureId = literatureId;
        this.title = title;
        this.isin = isin;
        this.citation = citation;
        //this.parentLiterature = parentLiterature;
        this.parentId = parentId;
        this.author = author;
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


   /* public LiteratureDto getParentLiterature() {
        return parentLiterature;
    }

    public void setParentLiterature(LiteratureDto parentLiterature) {
        this.parentLiterature = parentLiterature;
    }*/

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public Integer getParentId() {
        return parentId;
    }

    public void setParentId(Integer parentId) {
        this.parentId = parentId;
    }

}
