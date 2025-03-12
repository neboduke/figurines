package com.archaeodb.figurines.mapper;

import com.archaeodb.figurines.dto.LocationDto;
import com.archaeodb.figurines.model.Location;
import org.mapstruct.Mapper;

@Mapper
public interface LocationMapper {
    LocationDto locationFromDb (Location location);
    Location locationToDb (LocationDto locationDto);

    //Country?

}
