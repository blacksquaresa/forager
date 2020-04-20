using Forager.Authentication;
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
    private readonly IUserInformationService userInformation;
    private readonly ForagerContext context;

    public UserController(IUserInformationService userInformation, ForagerContext context)
    {
      this.userInformation = userInformation;
      this.context = context;
    }

    [HttpGet]
    public UserApiGetResponse Get()
    {
      var email = userInformation.GetUserEmail();
      var existingUser = context.GetUserByEmail(email);
      if (existingUser == null)
      {
        var name = userInformation.GetUserName();
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
    public ApiList[] Lists { get; set; }

    public static UserApiGetResponse FromUser(User user, IEnumerable<Invitation> invitations = null)
    {
      var response = new UserApiGetResponse()
      {
        CurrentUser = user.Id
      };

      response.Families = user.Families?.Select(f => ApiFamily.FromFamily(f)).ToArray() ?? new ApiFamily[] { };

      response.Users = user.Families
        ?.SelectMany(f => f.Members)
        .Distinct()
        .Select(u => ApiUser.FromUser(u))
        .ToArray()
         ?? new ApiUser[] { };

      response.Invitations = invitations != null
         ? invitations.Select(i => ApiInvitation.FromInvitation(i)).ToArray()
         : new ApiInvitation[] { };

      response.Lists = user.Families
        ?.SelectMany(f => f.Lists ?? new ShoppingList[] { })
        .Distinct()
        .Select(l => ApiList.FromList(l))
        .ToArray()
         ?? new ApiList[] { };

      return response;
    }
  }
}
