using Forager.Data;
using System.Linq;

namespace Forager.Models
{
  public class ApiVariant
  {
    public int Id { get; set; }
    public string Brand { get; set; }
    public int Product { get; set; }
    public ApiSource[] Sources { get; set; }
    public decimal Quantity { get; set; }
    public string Container { get; set; }
    public string Description { get; set; } 
    public string ImagePath { get; set; }
    public PackagingType PackagingType { get; set; }

    public static ApiVariant FromVariant(Variant dataVariant)
    {
      var variant = new ApiVariant()
      {
        Id = dataVariant.Id,
        Brand = dataVariant.Brand,
        Product = dataVariant.Product.Id,
        Quantity = dataVariant.Quantity,
        Description = dataVariant.Description,
        Container = dataVariant.Container,
        ImagePath = dataVariant.ImagePath,
        PackagingType = dataVariant.PackagingType
      };

      if (dataVariant.Sources != null)
      {
        variant.Sources = dataVariant.Sources.Select(i => ApiSource.FromSource(i)).ToArray();
      }
      return variant;
    }
  }
}
