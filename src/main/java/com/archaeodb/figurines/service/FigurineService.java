package com.archaeodb.figurines.service;

import com.archaeodb.figurines.dto.*;
import com.archaeodb.figurines.mapper.*;
import com.archaeodb.figurines.model.*;
import com.archaeodb.figurines.repository.*;
import org.mapstruct.factory.Mappers;
import org.springframework.data.domain.Sort;
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
    private final LocationRepository locationRepository;
    private final CountryRepository countryRepository;
    private final CarrierReporitory carrierReporitory;
    private final ContextRepository contextRepository;
    private final MotifRepository motifRepository;
    private final ImageRepository imageRepository;
    private final FigurineMapper figurineMapper = Mappers.getMapper(FigurineMapper.class);
    private final ChronologyMapper chronologyMapper = Mappers.getMapper(ChronologyMapper.class);
    private final MaterialMapper materialMapper = Mappers.getMapper(MaterialMapper.class);
    private final LiteratureMapper literatureMapper = Mappers.getMapper(LiteratureMapper.class);
    private final LocationMapper locationMapper = Mappers.getMapper(LocationMapper.class);
    private final CountryMapper countryMapper = Mappers.getMapper(CountryMapper.class);

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

    public FigurineDto saveFigurine(FigurineDto figurineDto) {
        Figurine figurine = figurineMapper.figurineToDb(figurineDto);
        Figurine newFigurine = figurineRepository.save(figurine);
        saveImages(figurine.getImages(), newFigurine);
        //FigurineDto newFigurineDto = figurineMapper.figurineFromDb(newFigurine);
        return getFigurineById(newFigurine.getFigurineId());
    }

    private void saveImages(List<Image> images, Figurine figurine) {
        imageRepository.deleteAllByFigurine_FigurineId(figurine.getFigurineId());
        List<Image> newImages = new ArrayList<Image>();
        for(Image i: images){
            i.setFigurine(figurine);
            newImages.add(i);
        }
        imageRepository.saveAllAndFlush(newImages);
    }

    public void deleteFigurine(Integer figurineId) {
        figurineRepository.deleteById(figurineId);
    }




    public ChronologyDto saveChronology(ChronologyDto chronologyDto) {
        Chronology chronology=chronologyMapper.chronologyToDb(chronologyDto);
        Chronology newChronology = chronologyRepository.save(chronology);
        ChronologyDto newChronologyDto = chronologyMapper.chronologyFromDb(newChronology);
        return newChronologyDto;
    }

    public void deleteChronology(Integer chronologyId) {
        chronologyRepository.deleteChronologyByChronologyId(chronologyId);
    }

    @Inject
    public FigurineService(FigurineRepository figurineRepository,
                           ChronologyRepository chronologyRepository,
                           MaterialRepository materialRepository,
                           LiteratureRepository literatureRepository,
                           LocationRepository locationRepository,
                           CountryRepository countryRepository,
                           CarrierReporitory carrierReporitory,
                           ContextRepository contextRepository,
                           MotifRepository motifRepository,
                           ImageRepository imageRepository) {
        this.figurineRepository = figurineRepository;
        this.chronologyRepository = chronologyRepository;
        this.materialRepository = materialRepository;
        this.literatureRepository = literatureRepository;
        this.locationRepository = locationRepository;
        this.countryRepository = countryRepository;
        this.carrierReporitory = carrierReporitory;
        this.contextRepository = contextRepository;
        this.motifRepository = motifRepository;
        this.imageRepository = imageRepository;
    }


    public List<LocationDto> getLocations() {
        List<Location> locations = locationRepository.findAll(Sort.by(Sort.Order.asc("name")));
        List<LocationDto> locationDtos = locations.stream()
                        .map(location -> locationMapper.locationFromDb(location))
                        .collect(Collectors.toList());

        return locationDtos;
    }

    public LocationDto saveLocation(LocationDto locationDto) {
        Location location = locationMapper.locationToDb(locationDto);
        Location newLocation = locationRepository.save(location);
        LocationDto newLocationDto = locationMapper.locationFromDb(newLocation);
        return newLocationDto;
    }

    public void deleteLocation(Integer locationId) {
        locationRepository.deleteLocationByLocationId(locationId );
    }

    public List<LocationDto> getLocationsForCountry(Integer countryId) {
        List<Location> locations = locationRepository.getLocationsByCountryOrderByCountry(countryId);
        List<LocationDto> locationDtos = locations.stream()
                .map(location -> locationMapper.locationFromDb(location))
                .collect(Collectors.toList());
        return locationDtos;
    }

    public List<CountryDto> getCountries() {
        List<Country> countries = countryRepository.findAll(Sort.by(Sort.Order.asc("name")));
        List<CountryDto> countryDtos = countries.stream()
                .map(country -> countryMapper.countryFromDb(country))
                .collect(Collectors.toList());

        return countryDtos;
    }

    public List<LiteratureDto> getLiterature() {
        List<Literature> literature = literatureRepository.findAll(Sort.by(Sort.Order.asc("author")));
        List <LiteratureDto> literatureDto = literature.stream()
                .map(title -> literatureMapper.literatureFromDb(title))
                .collect(Collectors.toList());
        return literatureDto;
    }

    public LiteratureDto getLiterature(Integer literatureId) {
        Literature literature = literatureRepository.findById(literatureId).get();
        LiteratureDto literatureDto = literatureMapper.literatureFromDb(literature);
        return literatureDto;
    }

    public LiteratureDto saveLiterature(LiteratureDto literatureDto){
        Literature literature = literatureMapper.literatureToDb(literatureDto);

//        literature.getParentLiterature().setParentLiterature(new Literature(literatureDto.getParentLiterature().getLiteratureId(),null,null,null,null,);
//        setLiteratureId(literatureDto.getParentLiterature().getLiteratureId());

        Literature newLiterature = literatureRepository.save(literature);
        LiteratureDto newLiteratureDto = literatureMapper.literatureFromDb(newLiterature);
        return literatureDto;
    }

    public void deleteLiterature(Integer literatureId) {
        literatureRepository.deleteById(literatureId);
    }



    public List<CarrierDto> getCarrier() {
        List<Carrier> carrierList = carrierReporitory.findAll(Sort.by(Sort.Order.asc("title")));
        List<CarrierDto> carrierDtos = carrierList.stream()
                .map(carrier -> figurineMapper.carrierFromDb(carrier))
                .collect(Collectors.toList());
        return carrierDtos;
    }

    public CarrierDto getCarrier(Integer carrierId) {
        Carrier carrier = carrierReporitory.getById(carrierId);
        CarrierDto carrierDto =  figurineMapper.carrierFromDb(carrier);

        return carrierDto;
    }

    public List<MotifDto> getMotif() {
        List<Motif> motifList = motifRepository.findAll(Sort.by(Sort.Order.asc("title")));
        List<MotifDto> motifDtos = motifList.stream()
                .map(motif -> figurineMapper.motifFromDb(motif))
                .collect(Collectors.toList());
        return motifDtos;
    }

    public MotifDto getMotif(Integer motifId) {
        Motif motif = motifRepository.getById(motifId);
        MotifDto carrierDto =  figurineMapper.motifFromDb(motif);

        return carrierDto;
    }

    public List<ContextDto> getContext() {
        List<Context> contextList = contextRepository.findAll(Sort.by(Sort.Order.asc("title")));
        List<ContextDto> contextDtos = contextList.stream()
                .map(context -> figurineMapper.contextFromDb(context))
                .collect(Collectors.toList());
        return contextDtos;
    }

    public ContextDto getContext(Integer contextId) {
        Context context = contextRepository.getById(contextId);
        ContextDto contextDto = figurineMapper.contextFromDb(context);

        return contextDto;
    }



}
