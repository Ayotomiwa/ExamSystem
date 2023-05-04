

@RestController
@Reguestmapping("/")
public class HomeController{

  public homeGreeting(){
    Return Response.Entity.ok("Welcome to the Back-End of LSBU-EX-TIMER wink wink");
  }

}
