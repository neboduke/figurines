package com.archaeodb.figurines.model;

import javax.persistence.*;

@Entity
public class Image {
    @Id
    @GeneratedValue
    private Integer imageId;
    private String imagePath;
    private String imageTitle;
    private String imageBase64;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "figurine_id")
    private Figurine figurine;

    public Image(){}

    public Image(Integer imageId,
                 String imagePath,
                 String imageTitle,
                 String imageBase64,
                 Figurine figurine) {
        this.imageId = imageId;
        this.imagePath = imagePath;
        this.imageTitle = imageTitle;
        this.imageBase64 = imageBase64;
        this.figurine = figurine;
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

    public Figurine getFigurine() {
        return figurine;
    }

    public void setFigurine(Figurine figurine) {
        this.figurine = figurine;
    }
}
