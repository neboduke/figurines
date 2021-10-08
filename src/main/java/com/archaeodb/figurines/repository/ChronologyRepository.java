package com.archaeodb.figurines.repository;

import com.archaeodb.figurines.model.Chronology;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChronologyRepository extends JpaRepository<Chronology,Integer> {

    public Optional<Chronology> getChronologyByChronologyId(Integer id);
}
