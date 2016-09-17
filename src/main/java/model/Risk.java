package model;
import javax.persistence.*;

@Entity
public class Risk {

    @Id
    @Column(name="id")
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;
    private String description;
    private Answer answers[];

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Answer[] getAnswers() {
        return answers;
    }

    public void setAnswers(Answer[] answers) {
        this.answers = answers;
    }

    public int getId() {
        return id;

    }

    public void setId(int id) {
        this.id = id;
    }
}

