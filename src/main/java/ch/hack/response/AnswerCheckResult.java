package ch.hack.response;

public class AnswerCheckResult {
    final int id;
    final boolean correct;

    public AnswerCheckResult(int id, boolean correct) {
        this.id = id;
        this.correct = correct;
    }

    public int getId() {
        return id;
    }

    public boolean isCorrect() {
        return correct;
    }
}
