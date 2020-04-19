using NUnit.Framework;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using System;
using NSubstitute;
using Forager.Authentication;
using Forager.Data;
using Forager.Utils;

namespace Forager.Controllers
{
  public class UserControllerTests
  {
    #region Get
    [Test]
    public void Get_ReturnsUserInformation()
    {
      var userInfo = Substitute.For<IUserInformationService>();
      userInfo.GetUserEmail().Returns("correct@email.com");
      using var context = DBContextHelpers.PrepareContext();
      var controller = new UserController(userInfo, context);

      var response = controller.Get();

      response.CurrentUser.Should().Be(1);
      response.Families.Should().HaveCount(2);
      response.Users.Should().HaveCount(3);
      response.Invitations.Should().HaveCount(1).And.ContainSingle(i => i.Id == 1);
    }

    [Test]
    public void Get_CreatesNewUser()
    {
      var userInfo = Substitute.For<IUserInformationService>();
      userInfo.GetUserEmail().Returns("newuser@email.com");
      using var context = DBContextHelpers.PrepareContext();
      var controller = new UserController(userInfo, context);
      context.Users.Should().HaveCount(3);

      var response = controller.Get();

      context.Users.Should().HaveCount(4);
    }
    #endregion
  }
}
