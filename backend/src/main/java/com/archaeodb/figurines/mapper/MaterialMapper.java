package com.archaeodb.figurines.mapper;

import com.archaeodb.figurines.dto.MaterialDto;
import com.archaeodb.figurines.model.Material;
import org.mapstruct.Mapper;

@Mapper
public interface MaterialMapper {
    MaterialDto materialFromDb(Material material);

    Material materialToDb(MaterialDto materialDto);
}
