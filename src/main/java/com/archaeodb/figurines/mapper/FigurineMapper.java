package com.archaeodb.figurines.mapper;

import com.archaeodb.figurines.dto.*;
import com.archaeodb.figurines.model.*;
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

    CarrierDto carrierFromDb(Carrier carrier);
    Carrier carrierToDb(CarrierDto carrierDto);

    LocationDto locationFromDb(Location location);
    Location locationToDb(LocationDto locationDto);

    MotifDto motifFromDb(Motif motif);
    Motif motifToDb(MotifDto motifDto);

}
