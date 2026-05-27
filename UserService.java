@Service
public class UserService implements UserDetailsService {
    @Autowired private UserRepository userRepo;

    public User save(User user) {
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        return userRepo.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String username) {
        User user = userRepo.findByUsername(username).orElseThrow();
        return new org.springframework.security.core.userdetails.User(
            user.getUsername(), user.getPassword(), new ArrayList<>());
    }

    public User findByUsername(String username) {
        return userRepo.findByUsername(username).orElseThrow();
    }
}
