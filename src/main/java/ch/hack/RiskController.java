package ch.hack;

import ch.hack.model.Question;
import ch.hack.model.Risk;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.Collections;

@RestController
public class RiskController {

    @RequestMapping(value = "/questions/{risk}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Collection<Question> getQuestionAnswers(@PathVariable Risk risk) {
        return risk == null ? Collections.emptyList() : risk.getAnswers();
    }

}
