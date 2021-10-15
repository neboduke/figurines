package com.archaeodb.figurines.service;

import com.archaeodb.figurines.dto.ChronologyDto;
import com.archaeodb.figurines.dto.FigurineDto;
import com.archaeodb.figurines.dto.MaterialDto;
import com.archaeodb.figurines.mapper.ChronologyMapper;
import com.archaeodb.figurines.mapper.FigurineMapper;
import com.archaeodb.figurines.mapper.LiteratureMapper;
import com.archaeodb.figurines.mapper.MaterialMapper;
import com.archaeodb.figurines.model.Chronology;
import com.archaeodb.figurines.model.Figurine;
import com.archaeodb.figurines.model.Literature;
import com.archaeodb.figurines.model.Material;
import com.archaeodb.figurines.repository.ChronologyRepository;
import com.archaeodb.figurines.repository.FigurineRepository;
import com.archaeodb.figurines.repository.LiteratureRepository;
import com.archaeodb.figurines.repository.MaterialRepository;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@CrossOrigin
public class FigurineService {

    private final FigurineRepository figurineRepository;
    private final ChronologyRepository chronologyRepository;
    private final MaterialRepository materialRepository;
    private final LiteratureRepository literatureRepository;
    private final FigurineMapper figurineMapper = Mappers.getMapper(FigurineMapper.class);
    private final ChronologyMapper chronologyMapper = Mappers.getMapper(ChronologyMapper.class);
    private final MaterialMapper materialMapper = Mappers.getMapper(MaterialMapper.class);
    private final LiteratureMapper literatureMapper = Mappers.getMapper(LiteratureMapper.class);

    public FigurineDto getFigurineById(Integer figurineId) {

        Figurine figurine = figurineRepository.getById(figurineId);
        FigurineDto figurineDto = figurineMapper.figurineFromDb(figurine);
        return figurineDto;
    }

    public List<FigurineDto> getFigurinesByKeyword(String keyword) {
        List<Figurine> figurines = figurineRepository.findFigurinesByKeywordLike("%"+keyword+"%");
        return getFigurineDtos(figurines);
    }

    public List<FigurineDto> getFigurines() {
        List<Figurine> figurines = figurineRepository.findAll();
        return getFigurineDtos(figurines);
    }

    public List<FigurineDto> getFigurinesByChronology(int chronologyId) {
        Chronology chronology = chronologyRepository.getById(chronologyId);
        List<Figurine> figurines = figurineRepository.getFigurinesByChronology(chronology);
        return getFigurineDtos(figurines);

    }

    private List<FigurineDto> getFigurineDtos(List<Figurine> figurines) {
        List<FigurineDto> figurineDtos =
                figurines.stream()
                        .map(f -> figurineMapper.figurineFromDb(f))
                        .collect(Collectors.toList());
        return figurineDtos;
    }

    public List<FigurineDto> getFigurinesByMaterial(int materialId) {
        Material material = materialRepository.getMaterialsByMaterialId(materialId);
        List<Figurine> figurines = figurineRepository.getFigurinesByMaterials(material);
        return getFigurineDtos(figurines);
    }

    public List<FigurineDto> getFigurinesByLiterature(int literatureId) {
        Literature literature = literatureRepository.getLiteratureByLiteratureId(literatureId);
        if(literature != null){
            List<Figurine> figurines = figurineRepository.getFigurinesByLiterature(literature);
            return getFigurineDtos(figurines);
        }
        return new ArrayList<FigurineDto>();

    }

    public List<ChronologyDto> getChronolgies() {

        List<Chronology> chronologies = chronologyRepository.findAll();
        List<ChronologyDto> chronologyDtos =
                chronologies.stream()
                        .map(c -> chronologyMapper.chronologyFromDb(c))
                        .collect(Collectors.toList());

        return chronologyDtos;
    }

    public List<MaterialDto> getMaterials() {

        List<Material> materials = materialRepository.findAll();
        List<MaterialDto> materialDtos =
                materials.stream()
                        .map(m -> materialMapper.materialFromDb(m))
                        .collect(Collectors.toList());
//        can do:
//        materials.stream().map(materialMapper::materialFromDb).collect(Collectors.toList());
        return materialDtos;
    }

    public FigurineDto addFigurine(FigurineDto figurineDto) {
        Figurine figurine = figurineMapper.figurineToDb(figurineDto);
        Figurine newFigurine = figurineRepository.save(figurine);
        FigurineDto newFigurineDto = figurineMapper.figurineFromDb(newFigurine);
        return newFigurineDto;
    }

    public ChronologyDto addChronology(ChronologyDto chronologyDto) {
        Chronology chronology=chronologyMapper.chronologyToDb(chronologyDto);
        Chronology newChronology = chronologyRepository.save(chronology);
        ChronologyDto newChronologyDto = chronologyMapper.chronologyFromDb(newChronology);
        return newChronologyDto;
    }
    public ChronologyDto updateChronology(ChronologyDto chronologyDto) {
        Chronology chronology=chronologyMapper.chronologyToDb(chronologyDto);
        Chronology updatedChronology = chronologyRepository.save(chronology);
        ChronologyDto updatedChronologyDto = chronologyMapper.chronologyFromDb(updatedChronology);
        return updatedChronologyDto;
    }
    public void deleteChronology(Integer chronologyId) {
        chronologyRepository.deleteChronologyByChronologyId(chronologyId);
    }

    @Inject
    public FigurineService(FigurineRepository figurineRepository,
                           ChronologyRepository chronologyRepository,
                           MaterialRepository materialRepository,
                           LiteratureRepository literatureRepository) {
        this.figurineRepository = figurineRepository;
        this.chronologyRepository = chronologyRepository;
        this.materialRepository = materialRepository;
        this.literatureRepository = literatureRepository;
    }



}
