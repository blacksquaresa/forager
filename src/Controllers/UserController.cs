using forager.Data;
using forager.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Security.Claims;

namespace forager.Controllers
{
  [Authorize]
  [ApiController]
  [Route("api/[controller]")]
  public class UserController : ControllerBase
  {
    private readonly IHttpContextAccessor httpContextAccessor;
    private readonly ForagerContext context;

    public UserController(IHttpContextAccessor httpContextAccessor, ForagerContext context)
    {
      this.httpContextAccessor = httpContextAccessor;
      this.context = context;
    }

    [HttpGet]
    public ApiUser Get()
    {
      var email = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.Email).Value;

      var existingUser = context.GetCurrentUser(email);
      if (existingUser == null)
      {
        var name = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.Name).Value;
        existingUser = new User { Name = name, Email = email };
        context.Users.Add(existingUser);
        context.SaveChanges();
      }

      var user = ApiUser.FromUser(existingUser);
      return user;
    }
  }
}
