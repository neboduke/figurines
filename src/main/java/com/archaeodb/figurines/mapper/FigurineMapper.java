package com.archaeodb.figurines.mapper;

import com.archaeodb.figurines.dto.ChronologyDto;
import com.archaeodb.figurines.dto.FigurineDto;
import com.archaeodb.figurines.dto.MaterialDto;
import com.archaeodb.figurines.model.Chronology;
import com.archaeodb.figurines.model.Figurine;
import com.archaeodb.figurines.model.Material;
import org.mapstruct.Mapper;

@Mapper()
public interface FigurineMapper {
    ChronologyDto chronologyFromDb (Chronology chronology);
    Chronology chronologyToDb(ChronologyDto chronologyDto);

    FigurineDto figurineFromDb(Figurine figurine);
    Figurine figurineToDb (FigurineDto figurine);

    MaterialDto materialFromDb(Material material);
    Material materialToDb(MaterialDto materialDto);

}
