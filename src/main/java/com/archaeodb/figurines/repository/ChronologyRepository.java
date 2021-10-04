package com.archaeodb.figurines.repository;

import com.archaeodb.figurines.model.Chronology;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChronologyRepository extends JpaRepository<Chronology,Integer> {

    public Chronology getChronologyByChronologyId(Integer id);
}
