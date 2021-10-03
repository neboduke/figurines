package com.archaeodb.figurines.repository;
import com.archaeodb.figurines.model.Chronology;
import com.archaeodb.figurines.model.Figurine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FigurineRepository extends JpaRepository<Figurine, Integer> {

    public List<Figurine> getFigurinesByChronology(Chronology chronology);


}
