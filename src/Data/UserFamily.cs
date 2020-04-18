using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Forager.Data
{
  public class UserFamily
  {
    public int UserId { get; set; }
    public int FamilyId { get; set; }
    public User User { get; set; }
    public Family Family { get; set; }

  }
}
