using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Forager.Data
{
  public class Product
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public ICollection<FamilyProducts> FamilyProducts { get; set; }
    public ICollection<Variant> Variants { get; set; } = new List<Variant>();
    public User CreatedBy { get; set; }
    public DateTime CreatedOn { get; set; }
  }
}
