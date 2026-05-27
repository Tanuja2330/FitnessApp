@RestController
@RequestMapping("/api/activities")
public class ActivityController {

    @Autowired private ActivityRepository activityRepo;
    @Autowired private UserService userService;

    @GetMapping
    public List<Activity> getActivities(Authentication auth) {
        User user = userService.findByUsername(auth.getName());
        return activityRepo.findByUserId(user.getId());
    }

    @PostMapping
    public Activity addActivity(@RequestBody Activity activity, Authentication auth) {
        User user = userService.findByUsername(auth.getName());
        activity.setUser(user);
        return activityRepo.save(activity);
    }
}
