using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Forager.Data
{
  public class ListItem
  {
    public int Id { get; set; }
    public ShoppingList List { get; set; }
    public ICollection<Variant> Variants { get; set; }
    public int Quantity { get; set; }
    public int ProductId { get; set; }
    public Product Product { get; set; }
    public User CreatedBy { get; set; }
    public DateTime CreatedOn { get; set; }
  }
}
