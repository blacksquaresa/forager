using System;
using System.Collections.Generic;

namespace Forager.Data
{
  public class ShoppingList
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public Family Family { get; set; }
    public ICollection<ListItem> Items { get; set; }
    public User CreatedBy { get; set; }
    public DateTime CreatedOn { get; set; }
  }
}
