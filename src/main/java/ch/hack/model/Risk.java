package ch.hack.model;
import javax.persistence.*;
import java.util.List;

@Entity
public class Risk {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;
    private String description;
    
    @OneToMany
    @JoinColumn(name = "risk_id")
    private List<Question> answers;

    public List<Question> getAnswers() {
        return answers;
    }
    
    public int getId() {
        return id;
    }

	public String getDescription() {
		return description;
	}
}

