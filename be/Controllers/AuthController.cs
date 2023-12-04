using BE_SOCIALNETWORK.Database.Model;
using BE_SOCIALNETWORK.Helper;
using BE_SOCIALNETWORK.Payload.Request;
using BE_SOCIALNETWORK.Services.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace BE_SOCIALNETWORK.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IUserService userService;
    private readonly IS3Service s3Service;
    private readonly MailUtils mailUtils;
    private readonly ILogger<User> _logger;

    public AuthController(ILogger<User> logger, IUserService userService, IS3Service s3Service, MailUtils mailUtils)
    {
        _logger = logger;
        this.userService = userService;
        this.s3Service = s3Service;
        this.mailUtils = mailUtils;
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
        if(body.Password.Length < 8)
            return BadRequest(new { status = "error", data = "Password must have more than 8 characters" });

        bool find = (await userService.FindByUsernameOrEmail(body.Username, body.Email)) != null;
        if (find)
        {
            return BadRequest(new {status="error", data= "Username or email exists" });
        }
        string rs = await userService.SignUp(body.Username, body.Password, body.Email, body.FullName, body.VericationPath);
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
        if(checkEmail == null)
        {
            return BadRequest(new {  message = "Username does not exist" });
        }
        if(checkEmail.Status == 0)
            return BadRequest(new { message = "Please check your email and activate your account" });

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

    [HttpGet]
    [Route("very_account/{token}")]
    public async Task<IActionResult> VeryAccount(string token)
    {
        var rs = await userService.VeriAccount(token);
        if (rs)
            return Ok(true);
        else
            return NotFound();
    }

    [HttpPost]
    [Route("forgot_password")]
    public async Task<IActionResult> ForgotPassword(string userOrEmail)
    {
        var rs = await userService.FindByUsernameOrEmail(userOrEmail, userOrEmail);
        if (rs == null)
            return BadRequest(new { message = "User does not exist" });
        Random generator = new Random();
        String r = generator.Next(0, 1000000).ToString("D6");
        int timeOut = 10;
        mailUtils.SendMailGoogleSmtp("socical@gmail.com", rs.Email, "Quên mật khẩu", $"Mã OTP của bạn là: {r}\nMã OTP có trong thời gian {timeOut} phút").Wait();
        HttpContext.Session.SetString("OTP_RESET_PASSWORD", r);
        HttpContext.Session.SetString("EMAIL_RESET_PASSWORD", rs.Email);
        return Ok(new { status = "success", data = userOrEmail });

    }

    [HttpPost]
    [Route("very_forgot_password")]
    [Consumes("application/json")]
    public async Task<IActionResult> VeryForgotPassword(VeryForgotPassword data)
    {
        var otpCheck = HttpContext.Session.GetString("OTP_RESET_PASSWORD");
        var emailCheck = HttpContext.Session.GetString("EMAIL_RESET_PASSWORD");
        
        if(otpCheck == null || !otpCheck.Equals(data.Otp))
        {
            return BadRequest(new { message = "OTP code is incorrect" });
        }
        if(data.Password.Length < 8)
            return BadRequest(new { message = "Password must have more than 8 characters" });

        if (await userService.UpdatePassword(emailCheck, data.Password))
            return Ok(new { status = "success"});
        else
            return BadRequest(new { message = "Error during authentication, please try again" });

    }

}
