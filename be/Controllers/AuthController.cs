using BE_SOCIALNETWORK.Database.Model;
using BE_SOCIALNETWORK.Payload.Request;
using BE_SOCIALNETWORK.Services.Interface;
using Microsoft.AspNetCore.Mvc;

namespace BE_SOCIALNETWORK.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IUserService userService;
    private readonly IS3Service s3Service;
    private readonly ILogger<User> _logger;

    public AuthController(ILogger<User> logger, IUserService userService, IS3Service s3Service)
    {
        _logger = logger;
        this.userService = userService;
        this.s3Service = s3Service;
    }

    [HttpPost]
    [Route("sign_up")]
    [Consumes("application/json")]
    public async Task<IActionResult> SignUp(SignUpRequest body) 
    { 
        if(string.IsNullOrEmpty(body.Username) || string.IsNullOrEmpty(body.Password) 
            || string.IsNullOrEmpty(body.FullName) || string.IsNullOrEmpty(body.Email))
        {
            return BadRequest(new { status = "error", data = "Please enter complete information" });
        }
        bool find = await userService.FindByUsernameOrEmail(body.Username, body.Email);
        if (find)
        {
            return BadRequest(new {status="error", data= "Username or email exists" });
        }
        string rs = await userService.SignUp(body.Username, body.Password, body.Email, body.FullName);
        return Ok(new { status = "success", data= new { username =rs } });
    }

    [HttpPost]
    [Route("sign_in")]
    [Consumes("application/json")]
    public async Task<IActionResult> SignIn( SignInRequest body)
    {
        if (string.IsNullOrEmpty(body.Username) || string.IsNullOrEmpty(body.Password) )
        {
            return BadRequest(new {  data = "Please enter complete information" });
        }
        var checkEmail = await userService.FindByUsername(body.Username);
        if(!checkEmail)
        {
            return BadRequest(new {  message = "Username does not exist" });
        }
        var rs = await userService.SignIn(body.Username, body.Password);
        if (rs == null)
        {
            return BadRequest(new {message = "Incorrect password" });
        }
        return Ok(rs);
    }

    [HttpPost]
    [Route("/image/{key}")]
    public IActionResult GetImageByKey(string key)
    {
        return Ok(s3Service.GetFileByKeyAsync(key.Replace("%2F", "/")));
    }

    [HttpPost]
    [Route("/image/remove/{key}")]
    public IActionResult RemoveImageByKey(string key)
    {
        return Ok(s3Service.RemoveFile(new List<string> { key.Replace("%2F", "/") }));
    }

}
