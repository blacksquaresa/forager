using Forager.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace Forager.Data
{
  public static class ForagerContextExtensions
  {
    public static User GetUserByEmail(this ForagerContext context, string email)
    {
      var existingUser = context
        .Users
        .Include(u => u.UserFamilies)
        .ThenInclude(uf => uf.Family)
        .ThenInclude(f => f.Lists)
        .SingleOrDefault(u => u.Email == email);
      return existingUser;
    }

    public static IEnumerable<Invitation> GetInvitationsForUser(this ForagerContext context, User user)
    {
      if(user == null){
        return new Invitation[] { };
      }
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
        .Where(i => i.Status == InvitationStatus.Invited)
        .Include(i => i.Family)
        .ThenInclude(u => u.UserFamilies)
        .ThenInclude(uf => uf.User)
        .SingleOrDefault(f => f.Id == invitationId);

      if(invitation == null){
        throw new ForagerApiException(ForagerApiExceptionCode.InvitationNotFound);
      }

      var user = context.GetUserByEmail(invitation.Email);
      if (user == null)
      {
        throw new ForagerApiException(ForagerApiExceptionCode.UserNotFound);
      }

      context.LinkUserToFamily(user, invitation.Family);
      invitation.Status = InvitationStatus.Accepted;
      invitation.ResolvedOn = DateTime.Now;
      return invitation.Family;
    }

    public static void RejectInvitation(this ForagerContext context, int invitationId)
    {
      var invitation = context.Invitations
        .Where(i => i.Status == InvitationStatus.Invited)
        .Include(i => i.Family)
        .SingleOrDefault(f => f.Id == invitationId);

      if (invitation == null)
      {
        throw new ForagerApiException(ForagerApiExceptionCode.InvitationNotFound);
      }

      invitation.Status = InvitationStatus.Rejected;
      invitation.ResolvedOn = DateTime.Now;
    }

    public static void LinkUserToFamily(this ForagerContext context, User user, Family family)
    {
      if (user == null)
      {
        throw new ForagerApiException(ForagerApiExceptionCode.UserNotFound);
      }

      if (family == null)
      {
        throw new ForagerApiException(ForagerApiExceptionCode.FamilyNotFound);
      }

      var userFamily = new UserFamily()
      {
        User = user,
        Family = family
      };
      context.UserFamilies.Add(userFamily);
    }
  }
}
