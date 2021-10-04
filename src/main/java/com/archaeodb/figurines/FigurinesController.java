package com.archaeodb.figurines;

import com.archaeodb.figurines.dto.ChronologyDto;
import com.archaeodb.figurines.dto.FigurineDto;
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

    @GetMapping(value = "/figurine/material/{materialId}")
    public @ResponseBody List<FigurineDto> getFigurinesByMaterial(@PathVariable int materialId){

        return figurineService.getFigurinesByMaterial(materialId);
    }

    @GetMapping(value = "/figurine/chronology/{chronologyId}")
    public @ResponseBody List<FigurineDto> getFigurineByChronology(@PathVariable int chronologyId) {

        return figurineService.getFigurinesByChronology(chronologyId);
    }

    /*CHRONOLOGY*/
    @GetMapping(value = "/chronology")
    public @ResponseBody List<ChronologyDto> getChronologies() {
        return figurineService.getChronolgies();
    }

}
