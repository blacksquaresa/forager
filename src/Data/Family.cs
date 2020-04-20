using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace Forager.Data
{
  public class Family
  {
    public int Id { get; set; }
    public string Name { get; set; }

    public int CreatorId { get; set; }

    public ICollection<UserFamily> UserFamilies { get; set; }

    public ICollection<ShoppingList> Lists { get; set; }

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
