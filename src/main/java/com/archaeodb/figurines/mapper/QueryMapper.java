package com.archaeodb.figurines.mapper;

import com.archaeodb.figurines.dto.QueryDto;
import com.archaeodb.figurines.model.Query;
import org.mapstruct.Mapper;

@Mapper()
public interface QueryMapper {
    QueryDto queryFromDb(Query query);
    Query queryToDb(QueryDto queryDto);
}
