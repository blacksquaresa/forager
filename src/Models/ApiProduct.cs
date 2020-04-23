using Forager.Data;
using System.Linq;

namespace Forager.Models
{
  public class ApiProduct
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; } 
    public ApiVariant[] Variants { get; set; }

    public static ApiProduct FromProduct(Product dataProduct)
    {
      var product = new ApiProduct()
      {
        Id = dataProduct.Id,
        Name = dataProduct.Name,
        Description = dataProduct.Description
      };

      if (dataProduct.Variants != null)
      {
        product.Variants = dataProduct.Variants.Select(i => ApiVariant.FromVariant(i)).ToArray();
      }
      return product;
    }
  }
}
