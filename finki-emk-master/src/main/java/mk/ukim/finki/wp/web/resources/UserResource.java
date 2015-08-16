package mk.ukim.finki.wp.web.resources;

import mk.ukim.finki.wp.model.StatusMessage;
import mk.ukim.finki.wp.model.User;
import mk.ukim.finki.wp.model.User.Role;
import mk.ukim.finki.wp.security.TokenTransfer;
import mk.ukim.finki.wp.security.TokenUtils;
import mk.ukim.finki.wp.security.UserTransfer;
import mk.ukim.finki.wp.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.UUID;

@RestController
@RequestMapping("/data/rest")
public class UserResource {

  private static final int TOKEN_DURATION = 30 * 24 * 60 * 60; // 30 days

  @Autowired
  private UserDetailsService userService;

  @Autowired
  @Qualifier("authenticationManager")
  private AuthenticationManager authManager;

  @Autowired
  private UserService service;

  /**
   * Authenticates a user and creates an authentication token.
   *
   * @param username The name of the user.
   * @param password The password of the user.
   * @return A transfer containing the authentication token.
   */
  @RequestMapping(value = "/user/authenticate", method = RequestMethod.POST, produces = "application/json")
  @ResponseBody
  public TokenTransfer authenticate(
    @RequestParam("username") String username,
    @RequestParam("password") String password,
    @RequestParam("rememberMe") boolean rememberMe,
    HttpServletRequest request, HttpServletResponse response) {

    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
      username, password);
    Authentication authentication = this.authManager
      .authenticate(authenticationToken);
    SecurityContextHolder.getContext().setAuthentication(authentication);

		/*
     * Reload user as password of authentication principal will be null
		 * after authorization and password is needed for token generation
		 */
    UserDetails userDetails = this.userService.loadUserByUsername(username);
    Cookie cookie = new Cookie("token", TokenUtils.createToken(userDetails));
    if (rememberMe) {
      cookie.setMaxAge(TOKEN_DURATION);
    }
    cookie.setPath(request.getContextPath());
    response.addCookie(cookie);
    return new TokenTransfer(TokenUtils.createToken(userDetails));
  }


  @RequestMapping(value = "/token", method = RequestMethod.GET, produces = "application/json")
  @ResponseBody
  public void authenticate(HttpServletRequest request, HttpServletResponse response) {
    Cookie[] cookies = request.getCookies();
    for (Cookie c : cookies) {
      if (c.getName().equals("temp_token")) {
        c.setMaxAge(TOKEN_DURATION);
        c.setPath(request.getContextPath());
        response.addCookie(c);
        System.out.println("Found cookie");
        return;
      }
    }
    Cookie cookie = new Cookie("temp_token", UUID.randomUUID().toString());
    cookie.setMaxAge(TOKEN_DURATION);
    cookie.setPath(request.getContextPath());
    response.addCookie(cookie);
  }

  @RequestMapping(value = "/user", method = RequestMethod.GET, produces = "application/json")
  @ResponseBody
  public UserTransfer getUser(HttpServletRequest request, HttpServletResponse response) throws IOException {
    Authentication authentication = SecurityContextHolder.getContext()
      .getAuthentication();
    Object principal = authentication.getPrincipal();
    if (principal instanceof String
      && ((String) principal).equals("anonymousUser")) {
      response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
    }
    if (principal instanceof UserDetails) {

      UserDetails userDetails = (UserDetails) principal;
      User user = service.findByUsername(userDetails.getUsername());
      return new UserTransfer(user.getUsername(), user.getRole().toString());
    }
    return null;
  }
  
  //POST
  @RequestMapping(value= "/users/username", method = RequestMethod.POST, produces = "application/json")
  @ResponseBody
  public User getUser(@RequestParam("username") String username){
	  User user = service.findByUsername(username);
	  return user;
  }
  
  
  @RequestMapping(value= "/users/save", method = RequestMethod.POST, produces = "application/json")
  @ResponseBody
  public User saveUser(@RequestParam("username") String username,@RequestParam("fistname") String fistname, @RequestParam("lastname") String lastname, @RequestParam("email") String email, @RequestParam("imgUrl") String imgUrl){
	  User user = service.findByUsername(username);
	  	user.setImgUrl(imgUrl);
	  	user.setFistName(fistname);
	  	user.setEmail(email);
	  	user.setLastName(lastname);
	   service.save(user);
	  
	  return user;
  }
  
  @RequestMapping(value= "/users/create", method = RequestMethod.POST, produces = "application/json")
  @ResponseBody
  public StatusMessage createUser(@RequestParam("username") String username, @RequestParam("password") String password,
		  @RequestParam("fistName") String fistName,@RequestParam("lastName") String lastName,
		  @RequestParam("email") String email, @RequestParam("imgUrl") String imgUrl){
	  StatusMessage sMsg = new StatusMessage();
	  
	  if(username.trim() != "" && password.trim() != "" && fistName.trim() != "" && email.trim() != ""){
		  
		  User identicalUser = service.findByUsername(username);
		  if(identicalUser != null){
			  sMsg.setMessage("Username already exists !");
			  sMsg.setSuccess("error");
		  }
		  else{
			  if(imgUrl == null){
				  imgUrl = "seller.png";
			  }
			  User user = new User();
			  user.setFistName(fistName);
			  user.setLastName(lastName);
			  user.setEmail(email);
			  user.setUsername(username);
			  user.setPassword(password);
			  user.setRole(Role.ROLE_USERS);
			  user.setImgUrl(imgUrl);
			  sMsg.setMessage("Successfuly created new account !");
			  sMsg.setSuccess("success");
			  service.save(user);
		  }
	  }
	  else{
		  sMsg.setMessage("All fileds are required !");
		  sMsg.setSuccess("error");
	  }

	  return sMsg;
  }
  //GET
 /* @RequestMapping(value= "/users/{username}", method = RequestMethod.GET, produces = "application/json")
  @ResponseBody
  public User getUser(@PathVariable("username") String username){
	  User user = service.findByUsername(username);
	  return user;
  }*/
  

}
