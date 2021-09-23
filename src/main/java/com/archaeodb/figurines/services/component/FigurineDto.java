package com.archaeodb.figurines.services.component;

import org.springframework.stereotype.Component;

@Component
public class FigurineDto {
    private int figurineId;
    private String title;
    private int keywordId;
    private int motifTypeId;
    private int chronologyRelId;
    private int datingAbs;
    private int materialId;
    private int exibitLocationId;
    private String exibitNr;
    private int carrierId;
    private int fundLocationId;
    private String descriptionIconography;
    private String descriptionIconology;
    private String materialDescription;

    public int getFigurineId() {
        return figurineId;
    }

    public void setFigurineId(int figurineId) {
        this.figurineId = figurineId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getKeywordId() {
        return keywordId;
    }

    public void setKeywordId(int keywordId) {
        this.keywordId = keywordId;
    }

    public int getMotifTypeId() {
        return motifTypeId;
    }

    public void setMotifTypeId(int motifTypeId) {
        this.motifTypeId = motifTypeId;
    }

    public int getChronologyRelId() {
        return chronologyRelId;
    }

    public void setChronologyRelId(int chronologyRelId) {
        this.chronologyRelId = chronologyRelId;
    }

    public int getDatingAbs() {
        return datingAbs;
    }

    public void setDatingAbs(int datingAbs) {
        this.datingAbs = datingAbs;
    }

    public int getMaterialId() {
        return materialId;
    }

    public void setMaterialId(int materialId) {
        this.materialId = materialId;
    }

    public int getExibitLocationId() {
        return exibitLocationId;
    }

    public void setExibitLocationId(int exibitLocationId) {
        this.exibitLocationId = exibitLocationId;
    }

    public String getExibitNr() {
        return exibitNr;
    }

    public void setExibitNr(String exibitNr) {
        this.exibitNr = exibitNr;
    }

    public int getCarrierId() {
        return carrierId;
    }

    public void setCarrierId(int carrierId) {
        this.carrierId = carrierId;
    }

    public int getFundLocationId() {
        return fundLocationId;
    }

    public void setFundLocationId(int fundLocationId) {
        this.fundLocationId = fundLocationId;
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

    public String getMaterialDescription() {
        return materialDescription;
    }

    public void setMaterialDescription(String materialDescription) {
        this.materialDescription = materialDescription;
    }

    public String toString() {
        return "figurineId=" + figurineId + ", title=" + title;
    }

}
