package com.archaeodb.figurines.repository;
import com.archaeodb.figurines.model.Chronology;
import com.archaeodb.figurines.model.Figurine;
import com.archaeodb.figurines.model.Literature;
import com.archaeodb.figurines.model.Material;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FigurineRepository extends JpaRepository<Figurine, Integer> {

    public List<Figurine> getFigurinesByChronology(Chronology chronology);
    public List<Figurine> getFigurinesByMaterials(Material material);
    public List<Figurine> findFigurinesByKeywordLike(String keyword);
    public List<Figurine> getFigurinesByLiterature(Literature literature);

}
