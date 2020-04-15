using forager.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace forager.Models
{
  public class ApiFamily
  {
    public int Id { get; set; }
    public string Name { get; set; }

    public static ApiFamily FromFamily(Family dataFamily)
    {
      var family = new ApiFamily() { Id = dataFamily.Id, Name = dataFamily.Name };
      return family;
    }
  }
}
