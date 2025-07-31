@Entity
public class User {
    @Id @GeneratedValue
    private Long id;
    private String username;
    private String password;
    
    // Getters & setters
}
