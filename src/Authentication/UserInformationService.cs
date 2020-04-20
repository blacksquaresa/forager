using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace Forager.Authentication
{
  public class UserInformationService : IUserInformationService
  {
    private readonly IHttpContextAccessor httpContextAccessor;

    public UserInformationService(IHttpContextAccessor httpContextAccessor){
      this.httpContextAccessor = httpContextAccessor;
    }

    public string GetUserEmail()
    {
      return httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.Email).Value;
    }

    public string GetUserName()
    {
      return httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.Name).Value;
    }
  }
}
