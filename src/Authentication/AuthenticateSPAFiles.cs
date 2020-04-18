using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Forager.Authentication
{
  public static partial class StartupExtensions
  {
    public static void AuthenticateSPAFiles(this IApplicationBuilder branch)
    {
      branch.Use((context, next) => AuthenticateSPAFilesInternal(context.Request, context.User, context.ChallengeAsync, next));
    }

    internal static async Task AuthenticateSPAFilesInternal(HttpRequest request,
                                                            ClaimsPrincipal user,
                                                            Func<AuthenticationProperties, Task> challenge,
                                                            Func<Task> next)
    {
      if (!request.Path.StartsWithSegments("/api") && !request.Path.StartsWithSegments("/static"))
      {
        if (!user.Identity.IsAuthenticated)
        {
          await challenge(new AuthenticationProperties()
          {
            RedirectUri = request.PathBase + request.Path + request.QueryString
          });
          return;
        }
      }

      await next();
    }
  }
}
