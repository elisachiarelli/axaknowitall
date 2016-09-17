package ch.hack;

import ch.hack.model.Question;
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
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toList;

@RestController
public class RiskController {

    @RequestMapping(value = "/checkAnswers/{risk}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    Collection<AnswerCheckResult> checkAnswers(@PathVariable Risk risk, @RequestBody Collection<UserAnswer> answers) {
        Map<Integer, Boolean> answersById =
                answers.stream().collect(Collectors.toMap(UserAnswer::getId, UserAnswer::isSelected));
        return getQuestions(risk).stream()
                .map(a -> new AnswerCheckResult(a.getId(), Objects.equals(a.isCorrect(), answersById.get(a.getId()))))
                .collect(toList());
    }

    @RequestMapping(value = "/questions/{risk}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Collection<QuestionAnswer> getQuestionAnswers(@PathVariable Risk risk) {
        return getQuestions(risk).stream()
                .map(q -> new QuestionAnswer(q.getId(), q.getQuestion()))
                .collect(toList());
    }

    private Collection<Question> getQuestions(@PathVariable Risk risk) {
        return risk == null ? Collections.emptyList() : risk.getAnswers();
    }
}
