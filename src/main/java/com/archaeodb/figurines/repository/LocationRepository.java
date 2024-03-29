package com.archaeodb.figurines.repository;

import com.archaeodb.figurines.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LocationRepository extends JpaRepository<Location, Integer> {
    void deleteLocationByLocationId(Integer locationId);

    List<Location> getLocationsByCountryOrderByCountry(Integer countryId);

}
