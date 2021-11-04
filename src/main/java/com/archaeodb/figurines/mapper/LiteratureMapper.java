package com.archaeodb.figurines.mapper;

import com.archaeodb.figurines.dto.LiteratureDto;
import com.archaeodb.figurines.model.Literature;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface LiteratureMapper {

    LiteratureDto literatureFromDb(Literature literature);

    Literature literatureToDb(LiteratureDto literatureDto);

}
