package com.archaeodb.figurines.repository;

import com.archaeodb.figurines.model.Carrier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarrierReporitory extends JpaRepository<Carrier, Integer> {
}
