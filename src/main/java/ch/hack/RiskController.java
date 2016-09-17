package ch.hack;

import ch.hack.model.Risk;
import ch.hack.request.UserAnswer;
import ch.hack.response.AnswerCheckResult;
import ch.hack.response.QuestionAnswer;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.Collections;

@RestController
public class RiskController {

    @RequestMapping(value = "/checkAnswers/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    Collection<AnswerCheckResult> checkAnswers(@PathVariable int id, @RequestBody Collection<UserAnswer> answers) {
        return Collections.singletonList(new AnswerCheckResult(1, true));
    }

    @RequestMapping(value = "/questions/{risk}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Collection<QuestionAnswer> getQuestionAnswers(@PathVariable Risk risk) {
        return Collections.singleton(new QuestionAnswer(1, "No issues"));
    }
}
