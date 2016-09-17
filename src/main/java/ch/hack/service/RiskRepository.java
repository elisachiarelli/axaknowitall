package ch.hack.service;

import ch.hack.model.Question;
import ch.hack.model.Risk;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.Repository;

import java.util.Collection;

public interface RiskRepository extends CrudRepository<Risk, Integer> {
}