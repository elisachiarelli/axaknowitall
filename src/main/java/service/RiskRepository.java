package service;
/**
 * Created by Dima on 9/17/2016.
 */

import model.Risk;
import sample.data.jpa.domain.City;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.Repository;

interface RiskRepository extends Repository<Risk, Long> {

    Page<Risk> findAll(Pageable pageable);
    Page<Risk> findAllForOneImage(int imageID, Pageable pageable);
}