using Forager.Data;
using Forager.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace Forager.Controllers
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
    public UserApiGetResponse Get()
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

      var invitations = context.GetInvitationsForUser(existingUser);

      var response = UserApiGetResponse.FromUser(existingUser, invitations);
      return response;
    }
  }

  public class UserApiGetResponse
  {
    public int CurrentUser { get; set; }
    public ApiUser[] Users { get; set; }
    public ApiFamily[] Families { get; set; }
    public ApiInvitation[] Invitations { get; set; }

    public static UserApiGetResponse FromUser(User user, IEnumerable<Invitation> invitations = null)
    {
      var response = new UserApiGetResponse()
      {
        CurrentUser = user.Id
      };

      response.Families = user.Families.Select(f => ApiFamily.FromFamily(f)).ToArray();

      response.Users = user.Families.SelectMany(f => f.Members.Select(u => ApiUser.FromUser(u)).ToList()).ToArray();

      response.Invitations = invitations != null ? invitations.Select(i => ApiInvitation.FromInvitation(i)).ToArray() : new ApiInvitation[] { };

      return response;
    }
  }
}
