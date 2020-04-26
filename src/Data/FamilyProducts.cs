
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Forager.Data
{
  public class FamilyProducts
  {
    public int FamilyId { get; set; }
    public int ProductId { get; set; }
    public Family Family { get; set; }
    public Product Product { get; set; }

  }
}
