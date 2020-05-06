using Forager.Data;
using System.Linq;

namespace Forager.Models
{
  public class ApiList
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public int Family { get; set; }
    public ApiListItem[] Items { get; set; }

    public static ApiList FromList(ShoppingList dataList)
    {
      var list = new ApiList()
      {
        Id = dataList.Id,
        Name = dataList.Name,
        Family = dataList.Family.Id
      };

      if(dataList.Items != null){
        list.Items = dataList.Items.Select(i => ApiListItem.FromItem(i)).ToArray();
      }
      return list;
    }
  }
}
