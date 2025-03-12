package com.archaeodb.figurines.repository;

import com.archaeodb.figurines.model.Motif;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MotifRepository extends JpaRepository<Motif, Integer> {
}
