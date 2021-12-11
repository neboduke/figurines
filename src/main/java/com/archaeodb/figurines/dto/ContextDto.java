package com.archaeodb.figurines.dto;

public class ContextDto {
        private Integer contextId;
    private String title;

    public ContextDto(){}

    public ContextDto(Integer contextId, String title){
        this.contextId = contextId;
        this.title = title;
    }

    public Integer getContextId() {
        return contextId;
    }

    public void setContextId(Integer contextId) {
        this.contextId = contextId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }


}
