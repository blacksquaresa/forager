using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace forager.Data
{
  public class Family
  {
    public int Id { get; set; }
    public string Name { get; set; }

    public int CreatorId { get; set; }

    public ICollection<UserFamily> UserFamilies { get; set; }

    [NotMapped]
    public ICollection<User> Members
    {
      get
      {
        return this.UserFamilies?.Select(uf => uf.User).ToList();
      }
    }
  }
}
