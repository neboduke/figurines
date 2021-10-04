package com.archaeodb.figurines.repository;

import com.archaeodb.figurines.model.Figurine;
import com.archaeodb.figurines.model.Material;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MaterialRepository extends JpaRepository<Material, Integer> {
}
