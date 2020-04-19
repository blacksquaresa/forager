using Forager.Data;
using Microsoft.EntityFrameworkCore;
using System;

namespace Forager.Utils
{
  public static class DBContextHelpers
  {
    #region Preparation Methods
    public static ForagerContext PrepareContext()
    {
      var user1 = new User { Id = 1, Email = "correct@email.com" };
      var user2 = new User { Id = 2, Email = "wrong@email.com" };
      var user3 = new User { Id = 3, Email = "also.wrong@email.com" };
      var family1 = new Family { Id = 1, CreatorId = 1 };
      var family2 = new Family { Id = 2, CreatorId = 3 };
      var uf1 = new UserFamily { Family = family1, FamilyId = 1, User = user1, UserId = 1 };
      var uf2 = new UserFamily { Family = family2, FamilyId = 2, User = user1, UserId = 1 };
      var uf3 = new UserFamily { Family = family1, FamilyId = 1, User = user2, UserId = 2 };
      var uf4 = new UserFamily { Family = family1, FamilyId = 1, User = user3, UserId = 3 };
      var uf5 = new UserFamily { Family = family2, FamilyId = 2, User = user3, UserId = 3 };
      var inv1 = new Invitation { Id = 1, Email = "correct@email.com", Family = family1, Source = user2 };
      var inv2 = new Invitation { Id = 2, Email = "wrong@email.com", Family = family2, Source = user1 };
      var inv3 = new Invitation { Id = 3, Email = "correct@email.com", Family = family2, Source = user2, Status = InvitationStatus.Accepted };
      var inv4 = new Invitation { Id = 4, Email = "does.not.exist@email.com", Family = family1, Source = user1 };
      var options = new DbContextOptionsBuilder<ForagerContext>().UseInMemoryDatabase(Guid.NewGuid().ToString()).Options;
      var context = new ForagerContext(options);
      context.Users.AddRange(user1, user2, user3);
      context.Families.AddRange(family1, family2);
      context.UserFamilies.AddRange(uf1, uf2, uf3, uf4, uf5);
      context.Invitations.AddRange(inv1, inv2, inv3, inv4);
      context.SaveChanges();
      return context;
    }
    #endregion
  }
}
