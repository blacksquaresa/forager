using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Forager.Data
{
  public class Variant
  {
    public int Id { get; set; }
    public string Brand { get; set; }
    public Product Product { get; set; }
    public ICollection<Source> Sources { get; set; }
    [Column(TypeName="decimal(18,2)")]
    public decimal Quantity { get; set; }
    public string Container { get; set; }
    public string Description { get; set; } 
    public string ImagePath { get; set; }
    public PackagingType PackagingType { get; set; }
    public User CreatedBy { get; set; }
    public DateTime CreatedOn { get; set; }
  }
}
