package com.archaeodb.figurines.repository;

import com.archaeodb.figurines.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends JpaRepository<Image, Integer > {
    public void deleteAllByFigurine_FigurineId(Integer id);
}
