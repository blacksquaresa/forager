using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.FileProviders;

namespace forager.Authentication
{
  public static partial class StartupExtensions
  {
    public static void AuthenticateSPAFiles(this IApplicationBuilder branch, IWebHostEnvironment env)
    {
      branch.Use(async (context, next) =>
      {
        if (!context.Request.Path.StartsWithSegments("/api") && !context.Request.Path.StartsWithSegments("/static"))
        {
          if (!context.User.Identity.IsAuthenticated)
          {
            await context.ChallengeAsync(new AuthenticationProperties()
            {
              RedirectUri = context.Request.PathBase + context.Request.Path + context.Request.QueryString
            });
            return;
          }
        }

        await next();
      });
    }
  }
}
