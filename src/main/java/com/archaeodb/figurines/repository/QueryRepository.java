package com.archaeodb.figurines.repository;

import com.archaeodb.figurines.model.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QueryRepository extends JpaRepository<Query,Integer> {

    void deleteQueryByQueryId(Integer queryId);

    Query getQueryByQueryName(String querynName);

}
