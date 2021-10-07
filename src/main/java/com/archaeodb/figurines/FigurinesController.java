package com.archaeodb.figurines;

import com.archaeodb.figurines.dto.ChronologyDto;
import com.archaeodb.figurines.dto.FigurineDto;
import com.archaeodb.figurines.dto.MaterialDto;
import com.archaeodb.figurines.model.Chronology;
import com.archaeodb.figurines.service.FigurineService;
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

    /*CHRONOLOGY*/
    @GetMapping(value = "/chronology")
    public @ResponseBody List<ChronologyDto> getChronologies() {
        return figurineService.getChronolgies();
    }

    /*MATERIAL*/
    @GetMapping(value = "/material")
    public @ResponseBody List<MaterialDto> getMaterials() {
        return figurineService.getMaterials();
    }

}
