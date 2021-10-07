package com.archaeodb.figurines.mapper;

import com.archaeodb.figurines.dto.ChronologyDto;
import com.archaeodb.figurines.dto.FigurineDto;
import com.archaeodb.figurines.dto.LiteratureDto;
import com.archaeodb.figurines.dto.MaterialDto;
import com.archaeodb.figurines.model.Chronology;
import com.archaeodb.figurines.model.Figurine;
import com.archaeodb.figurines.model.Literature;
import com.archaeodb.figurines.model.Material;
import org.mapstruct.Mapper;

@Mapper()
public interface FigurineMapper {
    FigurineDto figurineFromDb(Figurine figurine);
    Figurine figurineToDb (FigurineDto figurine);

    ChronologyDto chronologyFromDb (Chronology chronology);
    Chronology chronologyToDb(ChronologyDto chronologyDto);

    MaterialDto materialFromDb(Material material);
    Material materialToDb(MaterialDto materialDto);

    LiteratureDto literatureFromDb(Literature literature);
    Literature literatureToDb(LiteratureDto literatureDto);

}
