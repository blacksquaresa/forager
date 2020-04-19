using NUnit.Framework;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System;
using Forager.Exceptions;
using Forager.Utils;

namespace Forager.Data
{
  public class ForagerContextExtensionsTests
  {
    #region GetUserByEmail
    [Test]
    public void GetUserByEmail_ReturnsUserByEmail()
    {
      using var context = DBContextHelpers.PrepareContext();
      var currentUser = context.GetUserByEmail("correct@email.com");

      currentUser.Id.Should().Be(1);
      currentUser.Families.Count.Should().Be(2);
    }

    [Test]
    public void GetUserByEmail_ReturnsNullForNullEmail()
    {
      using var context = DBContextHelpers.PrepareContext();
      var currentUser = context.GetUserByEmail(null);

      currentUser.Should().BeNull();
    }

    [Test]
    public void GetUserByEmail_ReturnsNullForNotFound()
    {
      using var context = DBContextHelpers.PrepareContext();
      var currentUser = context.GetUserByEmail("not.the@email.com");

      currentUser.Should().BeNull();
    }
    #endregion

    #region GetInvitationsForUser
    [Test]
    public void GetInvitationsForUser_ReturnsCorrectList()
    {
      using var context = DBContextHelpers.PrepareContext();
      var currentUser = context.GetUserByEmail("correct@email.com");

      var invitations = context.GetInvitationsForUser(currentUser);

      invitations.Should().HaveCount(1);
      var invitation = invitations.First(i => true);
      invitation.Id.Should().Be(1);
      invitation.Source.Id.Should().Be(2);
      invitation.Family.Id.Should().Be(1);
    }

    [Test]
    public void GetInvitationsForUser_ReturnsEmptyList_WhenNoInvitationsAreFound()
    {
      using var context = DBContextHelpers.PrepareContext();
      var currentUser = new User { Email = "not.the@email.com" };

      var invitations = context.GetInvitationsForUser(currentUser);

      invitations.Should().HaveCount(0);
    }

    [Test]
    public void GetInvitationsForUser_ReturnsEmptyList_WhenNullUser()
    {
      using var context = DBContextHelpers.PrepareContext();

      var invitations = context.GetInvitationsForUser(null);

      invitations.Should().HaveCount(0);
    }
    #endregion

    #region AcceptInvitation
    [Test]
    public void AcceptInvitation_AddsUserToFamily()
    {
      using var context = DBContextHelpers.PrepareContext();

      var family = context.AcceptInvitation(2);
      context.SaveChanges();

      var invitation = context.Invitations.Single(i => i.Id == 2);
      invitation.Status.Should().Be(InvitationStatus.Accepted);
      invitation.ResolvedOn.Should().NotBeNull();

      family.Id.Should().Be(2);
      family.Members.Should().ContainSingle(m => m.Id == 2);
    }

    [Test]
    public void AcceptInvitation_WithInvalidId_ShouldThrowError()
    {
      using var context = DBContextHelpers.PrepareContext();

      Action act = () =>
      {
        var family = context.AcceptInvitation(5);
        context.SaveChanges();
      };

      act.Should().Throw<ForagerApiException>().Where(e => e.Code == ForagerApiExceptionCode.InvitationNotFound);
    }

    [Test]
    public void AcceptInvitation_WithAcceptedId_ShouldThrowError()
    {
      using var context = DBContextHelpers.PrepareContext();

      Action act = () =>
      {
        var family = context.AcceptInvitation(3);
        context.SaveChanges();
      };

      act.Should().Throw<ForagerApiException>().Where(e => e.Code == ForagerApiExceptionCode.InvitationNotFound);
    }

    [Test]
    public void AcceptInvitation_WithInvalidUser_ShouldThrowError()
    {
      using var context = DBContextHelpers.PrepareContext();

      Action act = () =>
      {
        var family = context.AcceptInvitation(4);
        context.SaveChanges();
      };

      act.Should().Throw<ForagerApiException>().Where(e => e.Code == ForagerApiExceptionCode.UserNotFound);
    }
    #endregion

    #region RejectInvitation
    [Test]
    public void RejectInvitation_SetsStatusToRejected()
    {
      using var context = DBContextHelpers.PrepareContext();

      context.RejectInvitation(2);
      context.SaveChanges();

      var invitation = context.Invitations.Single(i => i.Id == 2);
      invitation.Status.Should().Be(InvitationStatus.Rejected);
      invitation.ResolvedOn.Should().NotBeNull();
    }

    [Test]
    public void RejectInvitation_WithInvalidId_ShouldThrowError()
    {
      using var context = DBContextHelpers.PrepareContext();

      Action act = () =>
      {
        context.RejectInvitation(5);
        context.SaveChanges();
      };

      act.Should().Throw<ForagerApiException>().Where(e => e.Code == ForagerApiExceptionCode.InvitationNotFound);
    }

    [Test]
    public void RejectInvitation_WithAcceptedId_ShouldThrowError()
    {
      using var context = DBContextHelpers.PrepareContext();

      Action act = () =>
      {
        context.RejectInvitation(3);
        context.SaveChanges();
      };

      act.Should().Throw<ForagerApiException>().Where(e => e.Code == ForagerApiExceptionCode.InvitationNotFound);
    }
    #endregion

    #region LinkUserToFamily
    [Test]
    public void LinkUserToFamily_LinksUserToFamily()
    {
      using var context = DBContextHelpers.PrepareContext();
      var user = context.Users.Single(u => u.Id == 2);
      var family = context.Families.Single(f => f.Id == 2);

      family.Members.Should().NotContain(m => m.Id == 2);
      user.Families.Should().NotContain(f => f.Id == 2);

      context.LinkUserToFamily(user, family);
      context.SaveChanges();

      family.Members.Should().ContainSingle(m => m.Id == 2);
      user.Families.Should().ContainSingle(f => f.Id == 2);
    }

    [Test]
    public void LinkUserToFamily_WithInvalidUser_ShouldThrowError()
    {
      using var context = DBContextHelpers.PrepareContext();

      Action act = () =>
      {
        context.LinkUserToFamily(null, default);
        context.SaveChanges();
      };

      act.Should().Throw<ForagerApiException>().Where(e => e.Code == ForagerApiExceptionCode.UserNotFound);
    }

    [Test]
    public void LinkUserToFamily_WithInvalidFamily_ShouldThrowError()
    {
      using var context = DBContextHelpers.PrepareContext();
      var user = context.Users.Single(u => u.Id == 2);

      Action act = () =>
      {
        context.LinkUserToFamily(user, null);
        context.SaveChanges();
      };

      act.Should().Throw<ForagerApiException>().Where(e => e.Code == ForagerApiExceptionCode.FamilyNotFound);
    }
    #endregion
  }
}
