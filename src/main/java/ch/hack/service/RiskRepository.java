package ch.hack.service;

import ch.hack.model.Risk;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.Repository;

public interface RiskRepository extends CrudRepository<Risk, Integer> {
}