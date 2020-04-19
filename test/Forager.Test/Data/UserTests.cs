using NSubstitute;
using NUnit.Framework;
using FluentAssertions;
using System.Collections.Generic;

namespace Forager.Data
{
  public class UserTests
  {
    [Test]
    public void MembersSelectFromUserFamilies()
    {
      var family1 = new Family();
      var family2 = new Family();
      var user = new User()
      {
        UserFamilies = new List<UserFamily> {
          new UserFamily { Family = family1 },
          new UserFamily { Family = family2 }
        }
      };

      var families = user.Families;

      families.Should().HaveCount(2);
      families.Should().Contain(family1);
      families.Should().Contain(family2);
    }
  }
}
