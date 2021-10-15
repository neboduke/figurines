package com.archaeodb.figurines;

import com.archaeodb.figurines.dto.ChronologyDto;
import com.archaeodb.figurines.dto.FigurineDto;
import com.archaeodb.figurines.dto.MaterialDto;
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
    public @ResponseBody List<FigurineDto> getFigurines() {

        return figurineService.getFigurines();
    }

    @GetMapping(value = "/figurine/id/{id}")
    public @ResponseBody FigurineDto getFigurineById(@PathVariable Integer id) {

        return figurineService.getFigurineById(id);
    }

    @GetMapping(value = "/figurine/keyword/{keyword}")
    public @ResponseBody List<FigurineDto> getFigurinesByKeyword(@PathVariable String keyword) {

        return figurineService.getFigurinesByKeyword(keyword);
    }

    @GetMapping(value = "/figurine/material/{materialid}")
    public @ResponseBody List<FigurineDto> getFigurinesByMaterial(@PathVariable int materialid){

        return figurineService.getFigurinesByMaterial(materialid);
    }

    @GetMapping(value = "/figurine/literature/{literatureid}")
    public @ResponseBody List<FigurineDto> getFigurinesByLiterature(@PathVariable int literatureid){

        return figurineService.getFigurinesByLiterature(literatureid);
    }

    @GetMapping(value = "/figurine/chronology/{chronologyid}")
    public @ResponseBody List<FigurineDto> getFigurinesByChronology(@PathVariable int chronologyid) {

        return figurineService.getFigurinesByChronology(chronologyid);
    }

    @PostMapping(value ="/figurine/add")
    public @ResponseBody FigurineDto addFigurine(@RequestBody FigurineDto figurine){
        FigurineDto newFigurine = figurineService.addFigurine(figurine);
        return newFigurine;
    }

    /*CHRONOLOGY*/
    @GetMapping(value = "/chronology")
    public @ResponseBody List<ChronologyDto> getChronologies() {
        return figurineService.getChronolgies();
    }

//    @DeleteMapping (value = "/chronology/remove")
//    public @ResponseBody ChronologyDto removeChronology(@RequestBody ChronologyDto chronologyDto) {
//        return figurineService.getChronolgies();
//    }

    @PostMapping(value = "/chronology/add")
    public @ResponseBody ChronologyDto addChronology(@RequestBody ChronologyDto chronologyDto){
        ChronologyDto newChronology = figurineService.addChronology(chronologyDto);
        return newChronology;
    }

    @PutMapping(value = "/chronology/edit")
    public @ResponseBody ChronologyDto updateChronology(@RequestBody ChronologyDto chronologyDto){
        ChronologyDto newChronology = figurineService.updateChronology(chronologyDto);
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

    public @ResponseBody List<MaterialDto> getMaterials() {
        return figurineService.getMaterials();
    }

}
