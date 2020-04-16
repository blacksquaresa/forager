using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace forager.Data
{
  public class User
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }

    public ICollection<UserFamily> UserFamilies { get; set; }

    [NotMapped]
    public ICollection<Family> Families { 
    get
      {
        return this.UserFamilies?.Select(uf => uf.Family).ToList();
      }
    }
  }
}
