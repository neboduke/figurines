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
import javax.persistence.EntityManager;
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
    private final QueryRepository queryRepository;
    private final FigurineMapper figurineMapper = Mappers.getMapper(FigurineMapper.class);
    private final ChronologyMapper chronologyMapper = Mappers.getMapper(ChronologyMapper.class);
    private final MaterialMapper materialMapper = Mappers.getMapper(MaterialMapper.class);
    private final LiteratureMapper literatureMapper = Mappers.getMapper(LiteratureMapper.class);
    private final LocationMapper locationMapper = Mappers.getMapper(LocationMapper.class);
    private final CountryMapper countryMapper = Mappers.getMapper(CountryMapper.class);
    private final QueryMapper queryMapper = Mappers.getMapper(QueryMapper.class);


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
                           ImageRepository imageRepository,
                           QueryRepository queryRepository) {
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
        this.queryRepository = queryRepository;
    }

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

    public List<QueryDto> getQueries() {
        List<Query> queries = queryRepository.findAll(Sort.by(Sort.Order.asc("queryName")));
        List<QueryDto> queryDtos = queries.stream()
                .map(query -> queryMapper.queryFromDb(query))
                .collect(Collectors.toList());

        return queryDtos;
    }

    public QueryDto saveQuery(QueryDto queryDto) {
        Query query = queryMapper.queryToDb(queryDto);
        Query newQuery = queryRepository.save(query);
        QueryDto newQueryDto = queryMapper.queryFromDb(newQuery);
        return newQueryDto;
    }

    public void deleteQuery(Integer queryId) {
        queryRepository.deleteQueryByQueryId(queryId);
    }

    public QueryDto getQueryByName(String queryName) {

        Query query = queryRepository.getQueryByQueryName(queryName);
        QueryDto queryDto = queryMapper.queryFromDb(query);
        return queryDto;
    }


    public String getFigurinesForQuery(String queryName) {

        Query queryResult = queryRepository.getQueryByQueryName(queryName);

        String rootSql = "select * from figurine f " +
                " inner join chronology c " +
                " on c.chronology_id = f.chronology_id" +
                " inner join motif m" +
                " on m.motif_id = f.motif_id" +
                " inner join context x" +
                " on x.context_id = f.context_id"+
                " inner join carrier r" +
                " on r.carrier_id = f.carrier_id" ;

        String searchSql = "";
        if(!queryResult.getSearch().isEmpty()){
            searchSql = getSearchSql(queryResult.getSearch(), queryResult.getOperator());
        }
        String chronologySql = "";
        if(!queryResult.getChronology().isEmpty()){
            chronologySql = getFilterSql(queryResult.getChronology(), "chronology_id");
        }
        String motifSql = "";
        if(!queryResult.getMotif().isEmpty()){
            motifSql = getFilterSql(queryResult.getMotif(), "motif_id");
        }
        String contextSql = "";
        if(!queryResult.getContext().isEmpty()){
            contextSql = getFilterSql(queryResult.getContext(), "context_id");
        }

        if(!searchSql.isEmpty() || !chronologySql.isEmpty() || !motifSql.isEmpty() || !contextSql.isEmpty()){
            rootSql = rootSql + " where ";
        }
        rootSql = rootSql + searchSql;

        if(!searchSql.isEmpty() && !chronologySql.isEmpty()){
            rootSql = rootSql + " AND " + chronologySql;
        }else{
            rootSql = rootSql + chronologySql;
        }

        if(!chronologySql.isEmpty() && !motifSql.isEmpty()){
            rootSql = rootSql + " AND " + motifSql;
        }else{
            rootSql = rootSql + motifSql;
        }

        if(!motifSql.isEmpty() && !contextSql.isEmpty()){
            rootSql = rootSql + " AND " + contextSql;
        }else{
            rootSql = rootSql + contextSql;
        }

        String queryResultx = "{\n" +
                "  \"type\": \"FeatureCollection\",\n" +
                "  \"features\": [\n" +
                "    {\n" +
                "      \"type\": \"Feature\",\n" +
                "      \"properties\": {\n" +
                "\t\t\"name\": \"Krieger aus Oberhofen\",\n" +
                "        \"location\": \"Acker\",\n" +
                "        \"place\": \"Oberhofen\",\n" +
                "        \"image\": \"circle\",\n" +
                "        \"context\": \"Unbekannt\",\n" +
                "        \"chronology\": \"LT C\",\n" +
                "        \"motif\": \"Krieger\",\n" +
                "\t\t\"color\": \"red\"\n" +
                "      },\n" +
                "      \"geometry\": {\n" +
                "        \"type\": \"Point\",\n" +
                "        \"coordinates\": [\n" +
                "          11.100096702575685,\n" +
                "          47.30292321322043\n" +
                "        ]\n" +
                "      }\n" +
                "    },\n" +
                "\t{\n" +
                "      \"type\": \"Feature\",\n" +
                "      \"properties\": {\n" +
                "\t\t\"name\": \"Krieger aus Leisach\",\n" +
                "        \"location\": \"Frauenbichl\",\n" +
                "        \"place\": \"Leisach\",\n" +
                "        \"image\": \"circle\",\n" +
                "        \"context\": \"Heiligtum\",\n" +
                "        \"chronology\": \"LT D\",\n" +
                "        \"motif\": \"Krieger\",\n" +
                "\t\t\"carrier\":\"Figur\",\n" +
                "\t\t\"color\": \"blue\"\n" +
                "      },\n" +
                "      \"geometry\": {\n" +
                "        \"type\": \"Point\",\n" +
                "        \"coordinates\": [\n" +
                "          12.753148,\n" +
                "          46.820653\n" +
                "        ]\n" +
                "      }\n" +
                "    },\n" +
                "\t{\n" +
                "      \"type\": \"Feature\",\n" +
                "      \"properties\": {\n" +
                "\t\t\"name\": \"Mars von Guttenberg\",\n" +
                "        \"location\": \"Guttenberg\",\n" +
                "        \"place\": \"Liechtenstein\",\n" +
                "        \"image\": \"circle\",\n" +
                "        \"context\": \"Heiligtum\",\n" +
                "        \"chronology\": \"LT C\",\n" +
                "        \"motif\": \"Krieger\",\n" +
                "\t\t\"carrier\":\"Figur\",\n" +
                "\t\t\"color\": \"red\"\n" +
                "      },\n" +
                "      \"geometry\": {\n" +
                "        \"type\": \"Point\",\n" +
                "        \"coordinates\": [\n" +
                "          9.500179505979437,\n" +
                "          47.065313576250446\n" +
                "        ]\n" +
                "      }\n" +
                "    },\n" +
                "\t{\n" +
                "      \"type\": \"Feature\",\n" +
                "      \"properties\":{ \n" +
                "\t\t\"name\": \"Mars von Guttenberg\",\n" +
                "        \"location\": \"Guttenberg\",\n" +
                "        \"place\": \"Liechtenstein\",\n" +
                "        \"image\": \"circle\",\n" +
                "        \"context\": \"Heiligtum\",\n" +
                "        \"chronology\": \"LT C\",\n" +
                "        \"motif\": \"Krieger\",\n" +
                "\t\t\"carrier\":\"Figur\",\n" +
                "\t\t\"color\": \"blue\"\n" +
                "      },\n" +
                "      \"geometry\": {\n" +
                "        \"type\": \"Point\",\n" +
                "        \"coordinates\": [\n" +
                "          9.500179505979437,\n" +
                "          47.065313576250446\n" +
                "        ]\n" +
                "      }\n" +
                "    },\n" +
                "\t{\n" +
                "      \"type\": \"Feature\",\n" +
                "      \"properties\":{ \n" +
                "\t\t\"name\": \"Krieger (Herkules)\",\n" +
                "        \"location\": \"Unbekannt\",\n" +
                "        \"place\": \"Tirol\",\n" +
                "        \"image\": \"circle\",\n" +
                "        \"context\": \"Unbekannt\",\n" +
                "        \"chronology\": \"LT C\",\n" +
                "        \"motif\": \"Krieger\",\n" +
                "\t\t\"carrier\":\"Figur\",\n" +
                "\t\t\"color\": \"black\"\n" +
                "      },\n" +
                "      \"geometry\": {\n" +
                "        \"type\": \"Point\",\n" +
                "        \"coordinates\": [\n" +
                "          11.49169921875,\n" +
                "          46.98025235521883\n" +
                "        ]\n" +
                "      }\n" +
                "\t},\n" +
                "\t{\n" +
                "      \"type\": \"Feature\",\n" +
                "      \"properties\":{ \n" +
                "\t\t\"name\": \"Krieger (Herkules)\",\n" +
                "        \"location\": \"Unbekannt\",\n" +
                "        \"place\": \"Tirol\",\n" +
                "        \"image\": \"circle\",\n" +
                "        \"context\": \"Unbekannt\",\n" +
                "        \"chronology\": \"LT D\",\n" +
                "        \"motif\": \"Krieger\",\n" +
                "\t\t\"carrier\":\"Figur\",\n" +
                "\t\t\"color\": \"black\"\n" +
                "      },\n" +
                "      \"geometry\": {\n" +
                "        \"type\": \"Point\",\n" +
                "        \"coordinates\": [\n" +
                "          11.49169921875,\n" +
                "          46.98025235521883\n" +
                "        ]\n" +
                "      }\n" +
                "    },\n" +
                "\t{\n" +
                "      \"type\": \"Feature\",\n" +
                "      \"properties\":{ \n" +
                "\t\t\"name\": \"Krieger\",\n" +
                "        \"location\": \"Lagole\",\n" +
                "        \"place\": \" Calalzo di Cadore\",\n" +
                "        \"image\": \"circle\",\n" +
                "        \"context\": \"Heiligtum\",\n" +
                "        \"chronology\": \"LT D\",\n" +
                "        \"motif\": \"Krieger\",\n" +
                "\t\t\"carrier\":\"Figur\",\n" +
                "\t\t\"color\": \"blue\"\n" +
                "      },\n" +
                "      \"geometry\": {\n" +
                "        \"type\": \"Point\",\n" +
                "        \"coordinates\": [\n" +
                "          12.386051415960539,\n" +
                "          46.43702879658559\n" +
                "        ]\n" +
                "      }\n" +
                "    },\n" +
                "\t{\n" +
                "      \"type\": \"Feature\",\n" +
                "      \"properties\":{ \n" +
                "\t\t\"name\": \"Krieger (Herkules)\",\n" +
                "        \"location\": \"Sanzeno\",\n" +
                "        \"place\": \"Sanzeno\",\n" +
                "        \"image\": \"cross\",\n" +
                "        \"context\": \"Unbekannt\",\n" +
                "        \"chronology\": \"LT D\",\n" +
                "        \"motif\": \"Krieger\",\n" +
                "\t\t\"carrier\":\"Figur\",\n" +
                "\t\t\"color\": \"black\"\n" +
                "      },\n" +
                "      \"geometry\": {\n" +
                "        \"type\": \"Point\",\n" +
                "        \"coordinates\": [\n" +
                "          11.080070,\n" +
                "          46.369172\n" +
                "        ]\n" +
                "      }\n" +
                "    },\n" +
                "\t{\n" +
                "      \"type\": \"Feature\",\n" +
                "      \"properties\":{ \n" +
                "\t\t\"name\": \"Krieger (Herkules)\",\n" +
                "        \"location\": \"Perjen\",\n" +
                "        \"place\": \"Landeck\",\n" +
                "        \"image\": \"cross\",\n" +
                "        \"context\": \"Unbekannt\",\n" +
                "        \"chronology\": \"LT D\",\n" +
                "        \"motif\": \"Krieger\",\n" +
                "\t\t\"carrier\":\"Figur\",\n" +
                "\t\t\"color\": \"black\"\n" +
                "      },\n" +
                "      \"geometry\": {\n" +
                "        \"type\": \"Point\",\n" +
                "        \"coordinates\": [\n" +
                "          10.57406186926528,\n" +
                "          46.369172\n" +
                "        ]\n" +
                "      }\n" +
                "    }\n" +
                "  ]\n" +
                "}";
        return rootSql;
    }

    private String getSearchSql(String search, String operator){
        String sql = "(";

        String[] searches = search.split(" ");
        for(int i=0; i < searches.length ; i++){
            if(i > 0){
                sql = sql + " " + operator + " (";
            }else{
                sql = sql + " (";
            }
            sql = sql + "f.title like '%"+searches[i]+"%'" +
                    " or f.material_description like '%"+searches[i]+"%'" +
                    " or f.description_iconography like '%"+searches[i]+"%'" +
                    " or f.description_iconology like '%"+searches[i]+"%'" +
                    " or f.keyword like '%"+searches[i]+"%'" ;
            sql = sql + ")";
        }
        sql = sql + ")";

        return sql;
    }
    private String getFilterSql(String search, String filterId){
        String sql = "(";

        String[] searches = search.split(",");
        for(int i=0; i < searches.length ; i++){
            if(i > 0){
                sql = sql + " OR ";
            }
            sql = sql + " f." + filterId + " = "+searches[i] ;
        }
        sql = sql + ")";

        return sql;
    }

}
