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
    public static User GetCurrentUser(this ForagerContext context, string email)
    {
      var existingUser = context
        .Users
        .Include(u => u.UserFamilies)
        .ThenInclude(uf => uf.Family)
        .SingleOrDefault(u => u.Email == email);
      return existingUser;
    }

    public static User GetCurrentUser(this ForagerContext context, IHttpContextAccessor httpContextAccessor)
    {
      var email = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.Email).Value;
      return context.GetCurrentUser(email);
    }

    public static IEnumerable<Invitation> GetInvitationsForUser(this ForagerContext context, User user)
    {
      var invitations = context
        .Invitations
        .Where(i => i.Status == InvitationStatus.Invited)
        .Where(i => i.Email == user.Email)
        .Include(u => u.Source)
        .Include(u => u.Family)
        .ToList();
      return invitations;
    }

    public static Family AcceptInvitation(this ForagerContext context, int invitationId)
    {
      var invitation = context.Invitations
        .Include(i => i.Family)
        .ThenInclude(u => u.UserFamilies)
        .ThenInclude(uf => uf.User)
        .SingleOrDefault(f => f.Id == invitationId);
      invitation.Status = InvitationStatus.Accepted;
      invitation.ResolvedOn = DateTime.Now;
      return invitation.Family;
    }

    public static void RejectInvitation(this ForagerContext context, int invitationId)
    {
      var invitation = context.Invitations.Include(i => i.Family).SingleOrDefault(f => f.Id == invitationId);
      invitation.Status = InvitationStatus.Rejected;
      invitation.ResolvedOn = DateTime.Now;
    }

    public static void LinkUserToFamily(this ForagerContext context, User user, Family family)
    {
      var userFamily = new UserFamily()
      {
        User = user,
        Family = family
      };
      context.UserFamilies.Add(userFamily);
    }
  }
}
