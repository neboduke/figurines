package com.archaeodb.figurines.mapper;

import com.archaeodb.figurines.services.component.FigurineDto;
import com.archaeodb.figurines.services.model.Figurine;
import org.mapstruct.Mapper;

@Mapper
public interface FigurineMapper {
    FigurineDto fromDb(Figurine figurine);
    Figurine toDb (FigurineDto figurine);
}
