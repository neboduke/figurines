package com.archaeodb.figurines.mapper;


import com.archaeodb.figurines.dto.CountryDto;
import com.archaeodb.figurines.model.Country;
import org.mapstruct.Mapper;

@Mapper
public interface CountryMapper {
    CountryDto countryFromDb(Country country);
    Country countryToDb(CountryDto countryDto);
}
