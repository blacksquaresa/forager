using Forager.Data;
using System.Linq;

namespace Forager.Models
{
  public class ApiListItem
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public int List { get; set; }
    public int[] Variants { get; set; }
    public int Quantity { get; set; }
    public string Units { get; set; }

    public static ApiListItem FromItem(ListItem dataItem)
    {
      var item = new ApiListItem()
      {
        Id = dataItem.Id,
        Name = dataItem.Product.Name,
        List = dataItem.List.Id,
        Quantity = dataItem.Quantity,
        Units = dataItem.Product.Units
      };

      if (dataItem.Variants != null)
      {
        item.Variants = dataItem.Variants.Select(i => i.Id).ToArray();
      }
      return item;
    }
  }
}
