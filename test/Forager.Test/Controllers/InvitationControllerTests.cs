using NUnit.Framework;
using FluentAssertions;
using Forager.Utils;
using System.Linq;
using Forager.Data;

namespace Forager.Controllers
{
  public class InvitationControllerTests
  {
    #region Accept
    [Test]
    public void Accept_AddsUserToFamily()
    {
      using var context = DBContextHelpers.PrepareContext();
      var controller = new InvitationController(context);
      context.Families.Single(f => f.Id == 2).Members.Should().NotContain(u => u.Id == 2);

      var response = controller.Accept(2);

      context.Families.Single(f => f.Id == 2).Members.Should().ContainSingle(u => u.Id == 2);
      context.Invitations.Single(i => i.Id == 2).Status.Should().Be(InvitationStatus.Accepted);
      response.Id.Should().Be(2);
      response.Members.Should().Contain(2);
    }
    #endregion

    #region Reject
    [Test]
    public void Reject_UpdatesInvitation()
    {
      using var context = DBContextHelpers.PrepareContext();
      var controller = new InvitationController(context);

      var response = controller.Reject(2);

      context.Families.Single(f => f.Id == 2).Members.Should().NotContain(u => u.Id == 2);
      context.Invitations.Single(i => i.Id == 2).Status.Should().Be(InvitationStatus.Rejected);
    }
    #endregion
  }
}
