package com.archaeodb.figurines.repository;

import com.archaeodb.figurines.model.Literature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LiteratureRepository extends JpaRepository<Literature, Integer> {
    public Literature getLiteratureByLiteratureId(int literatureid);
}
