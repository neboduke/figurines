package com.archaeodb.figurines.service;

import com.archaeodb.figurines.dto.ChronologyDto;
import com.archaeodb.figurines.dto.FigurineDto;
import com.archaeodb.figurines.mapper.ChronologyMapper;
import com.archaeodb.figurines.mapper.FigurineMapper;
import com.archaeodb.figurines.mapper.MaterialMapper;
import com.archaeodb.figurines.model.Chronology;
import com.archaeodb.figurines.model.Figurine;
import com.archaeodb.figurines.model.Material;
import com.archaeodb.figurines.repository.ChronologyRepository;
import com.archaeodb.figurines.repository.FigurineRepository;
import com.archaeodb.figurines.repository.MaterialRepository;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FigurineService {

    private final FigurineRepository figurineRepository;
    private final ChronologyRepository chronologyRepository;
    private final MaterialRepository materialRepository;
    private final FigurineMapper figurineMapper = Mappers.getMapper(FigurineMapper.class);
    private final ChronologyMapper chronologyMapper = Mappers.getMapper(ChronologyMapper.class);
    private final MaterialMapper materialMapper= Mappers.getMapper(MaterialMapper.class);

    public FigurineDto getFigurineById(Integer figurineId) {

        Figurine figurine = figurineRepository.getById(figurineId);
        FigurineDto figurineDto = figurineMapper.figurineFromDb(figurine);
        return figurineDto;
    }

//    public Figurine getFigurineById(Integer figurineId){
//        return figurineRepository.getById(figurineId);
//    }

    public List<FigurineDto> getFigurines() {
        List<Figurine> figurines=figurineRepository.findAll();
        return getFigurineDtos(figurines);
    }

    public List<FigurineDto> getFigurinesByChronology(int chronologyId) {
        Chronology chronology = chronologyRepository.getById(chronologyId);
        List<Figurine> figurines = figurineRepository.getFigurinesByChronology(chronology);
        return getFigurineDtos(figurines);

    }

    private List<FigurineDto> getFigurineDtos(List<Figurine> figurines){
        List<FigurineDto> figurineDtos=
                figurines.stream()
                        .map(f -> figurineMapper.figurineFromDb(f))
                        .collect(Collectors.toList());
        return figurineDtos;
    }

    public List<FigurineDto> getFigurinesByMaterial( int materialId) {
        Material material = materialRepository.getMaterialsByMaterialId(materialId);
        List<Figurine> figurines = figurineRepository.getFigurinesByMaterials(material);
        return getFigurineDtos(figurines);
    }

    public List<ChronologyDto> getChronolgies() {

        List<Chronology> chronologies = chronologyRepository.findAll();
        List<ChronologyDto> chronologyDtos =
                chronologies.stream()
                        .map(c -> chronologyMapper.chronologyFromDb(c))
                        .collect(Collectors.toList());

        return chronologyDtos;
    }

    @Inject
    public FigurineService(FigurineRepository figurineRepository, ChronologyRepository chronologyRepository, MaterialRepository materialRepository) {
        this.figurineRepository = figurineRepository;
        this.chronologyRepository = chronologyRepository;
        this.materialRepository = materialRepository;
    }
}
