package com.archaeodb.figurines.repository;

import com.archaeodb.figurines.model.Context;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContextRepository extends JpaRepository<Context, Integer> {

}
