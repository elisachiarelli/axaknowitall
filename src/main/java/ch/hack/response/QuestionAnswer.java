package ch.hack.response;

public class QuestionAnswer {

    private final int id;
    private final String question;

    public QuestionAnswer(int id, String question) {
        this.id = id;
        this.question = question;
    }

    public int getId() {
        return id;
    }

    public String getQuestion() {
        return question;
    }
}
