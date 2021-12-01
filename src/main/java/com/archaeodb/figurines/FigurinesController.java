package com.archaeodb.figurines;

import com.archaeodb.figurines.dto.*;
import com.archaeodb.figurines.model.Chronology;
import com.archaeodb.figurines.service.FigurineService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.util.List;

@RestController
public class FigurinesController {
    @Inject
    private FigurineService figurineService ;

    /*FIGURINE*/
    @GetMapping(value = "/figurine")
    @ResponseBody
    public List<FigurineDto> getFigurines() {

        return figurineService.getFigurines();
    }

    @GetMapping(value = "/figurine/id/{figurineId}")
    @ResponseBody
    public FigurineDto getFigurineById(@PathVariable Integer figurineId) {

        return figurineService.getFigurineById(figurineId);
    }

    @GetMapping(value = "/figurine/keyword/{keyword}")
    @ResponseBody
    public  List<FigurineDto> getFigurinesByKeyword(@PathVariable String keyword) {

        return figurineService.getFigurinesByKeyword(keyword);
    }

    @GetMapping(value = "/figurine/material/{materialid}")
    @ResponseBody
    public List<FigurineDto> getFigurinesByMaterial(@PathVariable int materialid){

        return figurineService.getFigurinesByMaterial(materialid);
    }

    @GetMapping(value = "/figurine/literature/{literatureid}")
    @ResponseBody
    public  List<FigurineDto> getFigurinesByLiterature(@PathVariable int literatureid){

        return figurineService.getFigurinesByLiterature(literatureid);
    }

    @GetMapping(value = "/figurine/chronology/{chronologyid}")
    @ResponseBody
    public List<FigurineDto> getFigurinesByChronology(@PathVariable int chronologyid) {

        return figurineService.getFigurinesByChronology(chronologyid);
    }

    @PostMapping(value ="/figurine/add")
    @ResponseBody
    public FigurineDto addFigurine(@RequestBody FigurineDto figurineDto){
        FigurineDto newFigurine = figurineService.saveFigurine(figurineDto);
        return newFigurine;
    }

    @PutMapping(value = "/figurine/edit")
    @ResponseBody
    @Transactional
    public FigurineDto updateFigurine(@RequestBody FigurineDto figurineDto){
        FigurineDto newFigurine = figurineService.saveFigurine(figurineDto);
        return newFigurine;
    }

    @DeleteMapping(value = "/figurine/remove/{figurineId}")
    @Transactional
    public ResponseEntity<?> deleteFigurine(@PathVariable Integer figurineId){
        figurineService.deleteFigurine(figurineId);
        return new ResponseEntity<>(HttpStatus.OK);
    }



    /*CHRONOLOGY*/
    @GetMapping(value = "/chronology")
    @ResponseBody
    public  List<ChronologyDto> getChronologies() {
        return figurineService.getChronolgies();
    }

//    @DeleteMapping (value = "/chronology/remove")
//    public @ResponseBody ChronologyDto removeChronology(@RequestBody ChronologyDto chronologyDto) {
//        return figurineService.getChronolgies();
//    }

    @PostMapping(value = "/chronology/add")
    @ResponseBody
    public  ChronologyDto addChronology(@RequestBody ChronologyDto chronologyDto){
        ChronologyDto newChronology = figurineService.saveChronology(chronologyDto);
        return newChronology;
    }

    @PutMapping(value = "/chronology/edit")
    @ResponseBody
    public ChronologyDto updateChronology(@RequestBody ChronologyDto chronologyDto){
        ChronologyDto newChronology = figurineService.saveChronology(chronologyDto);
        return newChronology;
    }
    @DeleteMapping(value = "/chronology/remove/{chronologyId}")
    @Transactional
    public ResponseEntity<?> deleteChronology(@PathVariable int chronologyId){
         figurineService.deleteChronology(chronologyId);
         return new ResponseEntity<>(HttpStatus.OK);
    }

    /*MATERIAL*/
    @GetMapping(value = "/material")
    @ResponseBody
    public  List<MaterialDto> getMaterials() {
        return figurineService.getMaterials();
    }

    /*LOCATION*/
    @GetMapping(value = "/locations")
    @ResponseBody
    public List<LocationDto> getLocations(){
        return figurineService.getLocations();
    }

    @GetMapping(value = "/locations/country/{countryId}")
    @ResponseBody
    public List<LocationDto> getLocationsForCountry(@PathVariable int countryId){
        return figurineService.getLocationsForCountry(countryId);
    }

    @PostMapping(value = "/location/add")
    @ResponseBody
    public  LocationDto addLocation(@RequestBody LocationDto locationDto){
        LocationDto newLocation = figurineService.saveLocation(locationDto);
        return newLocation;
    }

    @PutMapping(value = "/location/edit")
    @ResponseBody
    public LocationDto updateLocation(@RequestBody LocationDto locationDto){
        LocationDto newLocation = figurineService.saveLocation(locationDto);
        return newLocation;
    }
    @DeleteMapping(value = "/location/remove/{locationId}")
    @Transactional
    public ResponseEntity<?> deleteLocation(@PathVariable int locationId){
        figurineService.deleteLocation(locationId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /*COUNTRY*/
    @GetMapping(value = "/country")
    @ResponseBody
    public List<CountryDto> getCountries(){
        return figurineService.getCountries();
    }

    /*LITERATURE*/
    @GetMapping(value = "/literature")
    @ResponseBody
    public List<LiteratureDto> getLiterature(){
        return figurineService.getLiterature();
    }

    @GetMapping(value = "/literature/{literatureId}")
    @ResponseBody
    public LiteratureDto getLiterature(@PathVariable int literatureId){
        return figurineService.getLiterature(literatureId);
    }

    @PostMapping(value = "/literature/add")
    @ResponseBody
    public  LiteratureDto addLiterature(@RequestBody LiteratureDto literatureDto){
        LiteratureDto newLiterature = figurineService.saveLiterature(literatureDto);
        return newLiterature;
    }

    @PutMapping(value = "/literature/edit")
    @ResponseBody
    public LiteratureDto updateLiterature(@RequestBody LiteratureDto literatureDto){
        LiteratureDto newLiterature = figurineService.saveLiterature(literatureDto);
        return newLiterature;
    }

    @DeleteMapping(value = "/literature/remove/{literatureId}")
    @Transactional
    public ResponseEntity<?> deleteLiterature(@PathVariable int literatureId){
        figurineService.deleteLiterature(literatureId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /*CARRIER*/
    @GetMapping(value = "/carrier")
    @ResponseBody
    public List<CarrierDto> getCarrier (){
        return figurineService.getCarrier();
    }

    /*MOTIF*/
    @GetMapping(value = "/motif")
    @ResponseBody
    public List<MotifDto> getMotif (){
        return figurineService.getMotif();
    }
    
    

}
