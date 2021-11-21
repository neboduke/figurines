package com.archaeodb.figurines.dto;

import com.archaeodb.figurines.model.Figurine;

public class ImageDto {
    private Integer imageId;
    private String imagePath;
    private String imageTitle;
    private String imageBase64;

    public ImageDto(){}

    public ImageDto(Integer imageId,
                 String imagePath,
                 String imageTitle,
                 String imageBase64e) {
        this.imageId = imageId;
        this.imagePath = imagePath;
        this.imageTitle = imageTitle;
        this.imageBase64 = imageBase64;
    }

    public Integer getImageId() {
        return imageId;
    }

    public void setImageId(Integer imageId) {
        this.imageId = imageId;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public String getImageTitle() {
        return imageTitle;
    }

    public void setImageTitle(String imageTitle) {
        this.imageTitle = imageTitle;
    }

    public String getImageBase64() {
        return imageBase64;
    }

    public void setImageBase64(String imageBase64) {
        this.imageBase64 = imageBase64;
    }

}
