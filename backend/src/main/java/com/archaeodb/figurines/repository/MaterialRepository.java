package com.archaeodb.figurines.repository;

import com.archaeodb.figurines.model.Figurine;
import com.archaeodb.figurines.model.Material;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MaterialRepository extends JpaRepository<Material, Integer> {

    public Material getMaterialsByMaterialId(Integer materialId);
}
