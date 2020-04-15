using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace forager.Data
{
  public static class ForagerContextExtensions
  {
    public static User GetCurrentUser(this ForagerContext context, string email){
      var existingUser = context.Users.Include(u => u.Families).SingleOrDefault(u => u.Email == email);
      return existingUser;
    }
    public static User GetCurrentUser(this ForagerContext context, IHttpContextAccessor httpContextAccessor)
    {
      var email = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.Email).Value;
      return context.GetCurrentUser(email);
    }
  }
}
