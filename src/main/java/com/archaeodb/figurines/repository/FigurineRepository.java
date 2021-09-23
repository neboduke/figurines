package com.archaeodb.figurines.repository;
import org.springframework.data.repository.CrudRepository;
import com.archaeodb.figurines.services.model.Figurine;

public interface FigurineRepository extends CrudRepository<Figurine, Integer> {


}
