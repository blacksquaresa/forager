using Forager.Authentication;
using Forager.Data;
using Forager.Exceptions;
using Forager.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace Forager.Controllers
{
  [Authorize]
  [ApiController]
  [Route("api/[controller]")]
  public class ProductController : ControllerBase
  {
    private readonly IUserInformationService userInformation;
    private readonly ForagerContext context;

    public ProductController(IUserInformationService userInformation, ForagerContext context)
    {
      this.userInformation = userInformation;
      this.context = context;
    }

    [HttpGet]
    [Route("{id}")]
    public ApiProduct Get(int id)
    {
      var existingProduct = context.Products.SingleOrDefault(p => p.Id == id);
      if (existingProduct == null)
      {
        throw new ForagerApiException(ForagerApiExceptionCode.ListNotFound);
      }

      var product = ApiProduct.FromProduct(existingProduct);
      return product;
    }

    [HttpGet]
    public ApiProduct[] GetAll(int p = 0, int s = 0)
    {
      var currentUserEmail = userInformation.GetUserEmail();
      var currentUser = context.GetUserByEmail(currentUserEmail);
      var familiesToInclude = currentUser.Families.Select(f => f.Id).Concat(new[] { ForagerContext.UniversalFamilyId }).ToArray();
      var numberToTake = p == 0 ? context.Products.Count() : p;
      var products = context.Families
        .Include(p => p.FamilyProducts)
        .Where(f => familiesToInclude.Contains(f.Id))
        .SelectMany(f => f.FamilyProducts)
        .Select(fp => fp.Product)
        .OrderBy(p => p.Id)
        .Distinct()
        .OrderBy(p => p.Name)
        .Skip(s)
        .Take(numberToTake)
        .Select(p => ApiProduct.FromProduct(p))
        .ToArray();
      return products;
    }

    public class ProductApiPutRequest
    {
      public string name { get; set; }
      public string Description { get; set; }

    }
    [HttpPut]
    public ApiProduct Put([FromBody]ProductApiPutRequest productData)
    {
      if (string.IsNullOrWhiteSpace(productData.name))
      {
        throw new ForagerApiException(ForagerApiExceptionCode.InvalidNameProvided);
      }

      var currentUserEmail = userInformation.GetUserEmail();
      var currentUser = context.GetUserByEmail(currentUserEmail);
      var dataProduct = new Product()
      {
        Name = productData.name.Trim(),
        Description = productData.Description?.Trim(),
        CreatedBy = currentUser,
        CreatedOn = DateTime.Now
      };
      dataProduct.FamilyProducts = currentUser.Families.Select(f => new FamilyProducts { Family = f, Product = dataProduct }).ToArray();

      context.Products.Add(dataProduct);
      context.SaveChanges();

      var product = ApiProduct.FromProduct(dataProduct);
      return product;
    }

    [HttpPost]
    [Route("{id}")]
    public ApiProduct Post(int id, [FromBody]ProductApiPutRequest productData)
    {
      if (string.IsNullOrWhiteSpace(productData.name))
      {
        throw new ForagerApiException(ForagerApiExceptionCode.InvalidNameProvided);
      }

      var existingProduct = context.Products.SingleOrDefault(f => f.Id == id);
      if (existingProduct == null)
      {
        throw new ForagerApiException(ForagerApiExceptionCode.ProductNotFound);
      }

      existingProduct.Name = productData.name.Trim();
      existingProduct.Description = productData.Description?.Trim();
      context.SaveChanges();

      var product = ApiProduct.FromProduct(existingProduct);
      return product;
    }
  }
}
