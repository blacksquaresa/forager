using NUnit.Framework;
using FluentAssertions;
using NSubstitute;
using Forager.Authentication;
using Forager.Utils;
using Forager.Data;
using System;
using System.Linq;
using Forager.Exceptions;

namespace Forager.Controllers
{
  public class FamilyControllerTests
  {
    #region Get
    [Test]
    public void Get_ReturnsFamily()
    {
      using var context = DBContextHelpers.PrepareContext();
      var controller = CreateController(context);

      var response = controller.Get(1);

      response.Id.Should().Be(1);
      response.Members.Should().HaveCount(3);
    }

    [Test]
    public void Get_FamilyNotFound_ThrowsException()
    {
      using var context = DBContextHelpers.PrepareContext();
      var controller = CreateController(context);

      Action act = () => { controller.Get(5); };

      act.Should().Throw<ForagerApiException>().Which.Code.Should().Be(ForagerApiExceptionCode.FamilyNotFound);
    }
    #endregion

    #region Put
    [Test]
    public void Put_CreatesNewFamily()
    {
      using var context = DBContextHelpers.PrepareContext();
      var controller = CreateController(context);
      context.Families.Should().NotContain(f => f.Name == "new family");

      var response = controller.Put("new family");

      context.Families.Should().ContainSingle(f => f.Name == "new family");
      response.Name.Should().Be("new family");
      response.Members.Should().HaveCount(1);
      response.Creator.Should().Be(1);
    }

    [Test]
    public void Put_TrimsNamey()
    {
      using var context = DBContextHelpers.PrepareContext();
      var controller = CreateController(context);
      context.Families.Should().NotContain(f => f.Name == "new family");

      var response = controller.Put("   new family  ");

      context.Families.Should().ContainSingle(f => f.Name == "new family");
      response.Name.Should().Be("new family");
      response.Members.Should().HaveCount(1);
      response.Creator.Should().Be(1);
    }

    [Test]
    public void Put_NullName_ThrowsException()
    {
      using var context = DBContextHelpers.PrepareContext();
      var controller = CreateController(context);
      context.Families.Should().NotContain(f => f.Name == "new family");

      Action act = () => { controller.Put(null); };

      act.Should().Throw<ForagerApiException>().Which.Code.Should().Be(ForagerApiExceptionCode.InvalidNameProvided);
    }

    [Test]
    public void Put_InvalidName_ThrowsException()
    {
      using var context = DBContextHelpers.PrepareContext();
      var controller = CreateController(context);
      context.Families.Should().NotContain(f => f.Name == "new family");

      Action act = () => { controller.Put("  "); };

      act.Should().Throw<ForagerApiException>().Which.Code.Should().Be(ForagerApiExceptionCode.InvalidNameProvided);
    }
    #endregion

    #region Post
    [Test]
    public void Post_UpdatesFamilyName()
    {
      using var context = DBContextHelpers.PrepareContext();
      var controller = CreateController(context);
      context.Families.Single(f => f.Id == 1).Name.Should().BeNull();

      var response = controller.Post(1, "my family");

      context.Families.Single(f => f.Id == 1).Name.Should().Be("my family");
      response.Name.Should().Be("my family");
      response.Id.Should().Be(1);
    }

    [Test]
    public void Post_TrimsName()
    {
      using var context = DBContextHelpers.PrepareContext();
      var controller = CreateController(context);
      context.Families.Single(f => f.Id == 1).Name.Should().BeNull();

      var response = controller.Post(1, "   my family   ");

      context.Families.Single(f => f.Id == 1).Name.Should().Be("my family");
      response.Name.Should().Be("my family");
      response.Id.Should().Be(1);
    }

    [Test]
    public void Post_NullName_ThrowsException()
    {
      using var context = DBContextHelpers.PrepareContext();
      var controller = CreateController(context);

      Action act = () => { controller.Post(1, null); };

      act.Should().Throw<ForagerApiException>().Which.Code.Should().Be(ForagerApiExceptionCode.InvalidNameProvided);
    }

    [Test]
    public void Post_InvalidName_ThrowsException()
    {
      using var context = DBContextHelpers.PrepareContext();
      var controller = CreateController(context);

      Action act = () => { controller.Post(1, "  "); };

      act.Should().Throw<ForagerApiException>().Which.Code.Should().Be(ForagerApiExceptionCode.InvalidNameProvided);
    }

    [Test]
    public void Post_FamilyNotFound_ThrowsException()
    {
      using var context = DBContextHelpers.PrepareContext();
      var controller = CreateController(context);

      Action act = () => { controller.Post(5, "my family"); };

      act.Should().Throw<ForagerApiException>().Which.Code.Should().Be(ForagerApiExceptionCode.FamilyNotFound);
    }
    #endregion

    #region InviteNewMember
    [Test]
    public void InviteNewMember_CreatesNewInvitation()
    {
      using var context = DBContextHelpers.PrepareContext();
      var controller = CreateController(context);
      context.Invitations.Should().NotContain(i => i.Email == "new.member@email.com");

      var response = controller.InviteNewMember(1, "new.member@email.com");

      var invitation = context.Invitations.Single(i => i.Email == "new.member@email.com" && i.Family.Id == 1);
      invitation.Should().NotBeNull();
      invitation.Source.Id.Should().Be(1);
      invitation.Status.Should().Be(InvitationStatus.Invited);
      response.Should().Be(true);
    }

    [Test]
    public void InviteNewMember_StoresTrimmedEmail()
    {
      using var context = DBContextHelpers.PrepareContext();
      var controller = CreateController(context);
      context.Invitations.Should().NotContain(i => i.Email == "new.member@email.com");

      var response = controller.InviteNewMember(1, "  new.member@email.com   ");

      var invitation = context.Invitations.Single(i => i.Email == "new.member@email.com" && i.Family.Id == 1);
      invitation.Should().NotBeNull();
      invitation.Source.Id.Should().Be(1);
    }

    [Test]
    public void InviteNewMember_NullEmail_ThrowsException()
    {
      using var context = DBContextHelpers.PrepareContext();
      var controller = CreateController(context);

      Action act = () => { controller.InviteNewMember(1, null); };

      act.Should().Throw<ForagerApiException>().Which.Code.Should().Be(ForagerApiExceptionCode.InvalidEmailProvided);
    }

    [Test]
    public void InviteNewMember_EmptyEmail_ThrowsException()
    {
      using var context = DBContextHelpers.PrepareContext();
      var controller = CreateController(context);

      Action act = () => { controller.InviteNewMember(1, "  "); };

      act.Should().Throw<ForagerApiException>().Which.Code.Should().Be(ForagerApiExceptionCode.InvalidEmailProvided);
    }

    [Test]
    public void InviteNewMember_InvalidEmail_ThrowsException()
    {
      using var context = DBContextHelpers.PrepareContext();
      var controller = CreateController(context);

      Action act = () => { controller.InviteNewMember(1, "not an email address"); };

      act.Should().Throw<ForagerApiException>().Which.Code.Should().Be(ForagerApiExceptionCode.InvalidEmailProvided);
    }

    [Test]
    public void InviteNewMember_FamilyNotFound_ThrowsException()
    {
      using var context = DBContextHelpers.PrepareContext();
      var controller = CreateController(context);

      Action act = () => { controller.InviteNewMember(5, "new.member@email.com"); };

      act.Should().Throw<ForagerApiException>().Which.Code.Should().Be(ForagerApiExceptionCode.FamilyNotFound);
    }
    #endregion

    #region Create Controller Helper
    private FamilyController CreateController(ForagerContext context, string currentUserEmail = "correct@email.com")
    {
      var userInfo = Substitute.For<IUserInformationService>();
      userInfo.GetUserEmail().Returns(currentUserEmail);
      var controller = new FamilyController(userInfo, context);
      return controller;
    }
    #endregion
  }
}
