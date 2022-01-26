package com.archaeodb.figurines.dto.geojson;
import java.util.HashMap;
import java.util.Map;
import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
        "location",
        "place",
        "image",
        "context",
        "chronology",
        "motif",
        "color",
        "object",
        "objectType"

})
public class Properties {
    @JsonProperty("location")
    private String location;
    @JsonProperty("place")
    private String place;
    @JsonProperty("image")
    private String image;
    @JsonProperty("context")
    private String context;
    @JsonProperty("chronology")
    private String chronology;
    @JsonProperty("motif")
    private String motif;
    @JsonProperty("color")
    private String color;
    @JsonProperty("object")
    private String object;
    @JsonProperty("objectType")
    private String objectType;




    @JsonIgnore
    private Map<String, Object> additionalProperties = new HashMap<String, Object>();

    @JsonProperty("location")
    public String getLocation() {
        return location;
    }

    @JsonProperty("location")
    public void setLocation(String location) {
        this.location = location;
    }

    @JsonProperty("place")
    public String getPlace() {
        return place;
    }

    @JsonProperty("place")
    public void setPlace(String place) {
        this.place = place;
    }

    @JsonProperty("image")
    public String getImage() {
        return image;
    }

    @JsonProperty("image")
    public void setImage(String image) {
        this.image = image;
    }

    @JsonProperty("context")
    public String getContext() {
        return context;
    }

    @JsonProperty("context")
    public void setContext(String context) {
        this.context = context;
    }

    @JsonProperty("chronology")
    public String getChronology() {
        return chronology;
    }

    @JsonProperty("chronology")
    public void setChronology(String chronology) {
        this.chronology = chronology;
    }

    @JsonProperty("motif")
    public String getMotif() {
        return motif;
    }

    @JsonProperty("motif")
    public void setMotif(String motif) {
        this.motif = motif;
    }

    @JsonProperty("color")
    public String getColor() {
        return color;
    }

    @JsonProperty("color")
    public void setColor(String color) {
        this.color = color;
    }

    @JsonProperty("object")
    public String getObject() {
        return object;
    }

    @JsonProperty("object")
    public void setObject(String object) {
        this.object = object;
    }

    @JsonProperty("objectType")
    public String getObjectType() {
        return objectType;
    }

    @JsonProperty("objectType")
    public void setObjectType(String objectType) {
        this.objectType = objectType;
    }

    @JsonAnyGetter
    public Map<String, Object> getAdditionalProperties() {
        return this.additionalProperties;
    }

    @JsonAnySetter
    public void setAdditionalProperty(String name, Object value) {
        this.additionalProperties.put(name, value);
    }
}
