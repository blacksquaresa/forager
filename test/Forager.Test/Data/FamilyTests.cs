using NSubstitute;
using NUnit.Framework;
using FluentAssertions;
using System.Collections.Generic;

namespace Forager.Data
{
  public class FamilyTests
  {
    [Test]
    public void MembersSelectFromUserFamilies()
    {
      var user1 = new User();
      var user2 = new User();
      var family = new Family()
      {
        UserFamilies = new List<UserFamily> {
          new UserFamily { User = user1 },
          new UserFamily { User = user2 }
        }
      };

      var members = family.Members;

      members.Should().HaveCount(2);
      members.Should().Contain(user1);
      members.Should().Contain(user2);
    }
  }
}
