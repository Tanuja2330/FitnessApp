@Entity
public class Activity {
    @Id @GeneratedValue
    private Long id;
    private String type;
    private int duration;
    private int calories;
    private LocalDate date = LocalDate.now();

    @ManyToOne
    private User user;
    
    // Getters & setters
}
