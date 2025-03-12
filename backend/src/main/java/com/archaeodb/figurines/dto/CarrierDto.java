package com.archaeodb.figurines.dto;

public class CarrierDto {
    private int carrierId;
    private String title;

    public CarrierDto() {
    }

    public CarrierDto(int carrierId, String title) {
        this.carrierId = carrierId;
        this.title = title;
    }

    public int getCarrierId() {
        return carrierId;
    }

    public void setCarrierId(int carrierId) {
        this.carrierId = carrierId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
