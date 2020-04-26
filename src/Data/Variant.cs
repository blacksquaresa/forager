using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Forager.Data
{
  public class Variant
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public Product Product { get; set; }
    public ICollection<Source> Sources { get; set; }
    public int Quantity { get; set; }
    public string Units { get; set; }
    public string Description { get; set; } 
    public string ImagePath { get; set; }
    public PackagingType PackagingType { get; set; }
    public User CreatedBy { get; set; }
    public DateTime CreatedOn { get; set; }
  }
}
