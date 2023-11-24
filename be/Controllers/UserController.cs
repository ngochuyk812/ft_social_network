using BE_SOCIALNETWORK.Database;
using BE_SOCIALNETWORK.Database.Model;
using BE_SOCIALNETWORK.Payload.Request;
using BE_SOCIALNETWORK.Repositories.Contracts;
using BE_SOCIALNETWORK.Repositories.IRespositories;
using BE_SOCIALNETWORK.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BE_SOCIALNETWORK.Controllers;

[ApiController]
[Route("api/user")]
public class UserController : ControllerBase
{
    private readonly IMediaPostService mediaPostService;
    private readonly ILogger<User> _logger;
    private readonly IUserService userService;

    public UserController(ILogger<User> logger, IMediaPostService mediaPostService, IUserService userService)
    {
        _logger = logger;
        this.mediaPostService = mediaPostService;
        this.userService = userService; 
    }
    [Authorize]
    [HttpGet]
    [Route("{idUser}/media")]
    public async Task<IActionResult> GetMediaByUser(int idUser)
    {
        var rs = await mediaPostService.GetMediaByUser(idUser);
        return Ok(rs);
    }
    [Authorize]
    [HttpGet]
    [Route("search/{query}")]
    public async Task<IActionResult> Search(string query)
    {
        var rs = await userService.SearchUserByQuery(query);
        return Ok(rs);
    }

    [Authorize]
    [HttpGet]
    [Route("{id}")]
    public async Task<IActionResult> DetailUser(int id)
    {
        var rs = await userService.GetUserById(id);
        if(rs == null)
        {
            return BadRequest("User not found");
        }
        return Ok(rs);
    }

    [Authorize]
    [HttpPost]
    [Route("update")]
    public async Task<IActionResult> UpdateProfile([FromForm] UpdateUserRequest request)
    {
        var rs = await userService.UpdateUser(request);
        if (rs == null)
        {
            return BadRequest("User not found");
        }
        return Ok(rs);
    }
}
