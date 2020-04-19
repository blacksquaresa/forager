using NUnit.Framework;
using FluentAssertions;
using NSubstitute;
using Forager.Authentication;
using Forager.Utils;
using Forager.Data;

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
    #endregion

    #region Create Controller Helper
    private FamilyController CreateController(ForagerContext context)
    {
      var userInfo = Substitute.For<IUserInformationService>();
      userInfo.GetUserEmail().Returns("correct@email.com");
      var controller = new FamilyController(userInfo, context);
      return controller;
    }
    #endregion
  }
}
