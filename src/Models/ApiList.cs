using Forager.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Forager.Models
{
  public class ApiList
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public int Family { get; set; }

    public static ApiList FromList(ShoppingList dataList)
    {
      var list = new ApiList()
      {
        Id = dataList.Id,
        Name = dataList.Name,
        Family = dataList.Family.Id
      };
      return list;
    }
  }
}
