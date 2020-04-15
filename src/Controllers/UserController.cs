using forager.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace forager.Controllers
{
  [Authorize]
  [ApiController]
  [Route("api/[controller]")]
  public class UserController : ControllerBase
  {
    private readonly IHttpContextAccessor httpContextAccessor;

    public UserController(IHttpContextAccessor httpContextAccessor)
    {
      this.httpContextAccessor = httpContextAccessor;
    }

    [HttpGet]
    public ApiUser Get()
    {
      var name = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.Name).Value;
      var email = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.Email).Value;
      var user = new ApiUser() { Name = name, Email = email };
      return user;
    }
  }
}
