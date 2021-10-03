package com.archaeodb.figurines.dto;

import com.archaeodb.figurines.model.Figurine;

import java.util.List;

public class ChronologyDto {
    private int chronologyId;
    private String name;


    public ChronologyDto() {
    }

    public ChronologyDto(int chronologyId, String name) {
        this.chronologyId = chronologyId;
        this.name = name;

    }

    public int getChronologyId() {
        return chronologyId;
    }

    public void setChronologyId(int chronologyId) {
        this.chronologyId = chronologyId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


}
