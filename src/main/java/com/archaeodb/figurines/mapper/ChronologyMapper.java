package com.archaeodb.figurines.mapper;

import com.archaeodb.figurines.dto.ChronologyDto;
import com.archaeodb.figurines.model.Chronology;
import org.mapstruct.Mapper;

@Mapper
public interface ChronologyMapper {
    ChronologyDto chronologyFromDb (Chronology chronology);
    Chronology chronologyToDb(ChronologyDto chronologyDto);
}
