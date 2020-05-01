using Forager.Authentication;
using Forager.Data;
using Forager.Exceptions;
using Forager.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Globalization;
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
      var existingProduct = context.Products.Include(p => p.Variants).SingleOrDefault(p => p.Id == id);
      if (existingProduct == null)
      {
        throw new ForagerApiException(ForagerApiExceptionCode.ListNotFound);
      }

      var product = ApiProduct.FromProduct(existingProduct);
      return product;
    }

    [HttpGet]
    public ApiProduct[] GetAll(int p = 0, int s = 0){
      return PostAll(p, s);
    }
    [HttpPost]
    public ApiProduct[] PostAll(int p = 0, int s = 0, [FromBody]int[] ignores = null)
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
        .Where(p => ignores == null || !ignores.Contains(p.Id))
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
      public string Name { get; set; }
      public string Description { get; set; }
      public string Units { get; set; }

    }
    [HttpPut]
    public ApiProduct Put([FromBody]ProductApiPutRequest productData)
    {
      if (string.IsNullOrWhiteSpace(productData.Name))
      {
        throw new ForagerApiException(ForagerApiExceptionCode.InvalidNameProvided);
      }

      var currentUserEmail = userInformation.GetUserEmail();
      var currentUser = context.GetUserByEmail(currentUserEmail);
      var dataProduct = new Product()
      {
        Name = productData.Name.Trim(),
        Description = productData.Description?.Trim(),
        Units = productData.Units?.Trim(),
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
      if (string.IsNullOrWhiteSpace(productData.Name))
      {
        throw new ForagerApiException(ForagerApiExceptionCode.InvalidNameProvided);
      }

      var existingProduct = context.Products.Include(p => p.Variants).SingleOrDefault(f => f.Id == id);
      if (existingProduct == null)
      {
        throw new ForagerApiException(ForagerApiExceptionCode.ProductNotFound);
      }

      existingProduct.Name = productData.Name.Trim();
      existingProduct.Description = productData.Description?.Trim();
      existingProduct.Units = productData.Units?.Trim();
      context.SaveChanges();

      var product = ApiProduct.FromProduct(existingProduct);
      return product;
    }


    public class ProductApiPutVariantRequest
    {
      public string Brand { get; set; }
      public string Container { get; set; }
      public string Description { get; set; }
      public string Quantity { get; set; }

    }
    [HttpPut]
    [Route("{productId}/variant")]
    public ApiVariant PutVariant(int productId, [FromBody]ProductApiPutVariantRequest variantData)
    {
      if (!decimal.TryParse(variantData.Quantity, NumberStyles.AllowDecimalPoint, CultureInfo.InvariantCulture.NumberFormat, out var quantity))
      {
        throw new ForagerApiException(ForagerApiExceptionCode.InvalidNumberFormat);
      }

      var existingProduct = context.Products.Find(productId);
      if (existingProduct == null)
      {
        throw new ForagerApiException(ForagerApiExceptionCode.ProductNotFound);
      }

      var currentUserEmail = userInformation.GetUserEmail();
      var currentUser = context.GetUserByEmail(currentUserEmail);
      var dataVariant = new Variant()
      {
        Brand = variantData.Brand.Trim(),
        Description = variantData.Description?.Trim(),
        Quantity = quantity,
        Container = variantData.Container?.Trim(),
        CreatedBy = currentUser,
        CreatedOn = DateTime.Now
      };

      existingProduct.Variants.Add(dataVariant);

      context.SaveChanges();

      var variant = ApiVariant.FromVariant(dataVariant);
      return variant;
    }


    [HttpPost]
    [Route("{productId}/variant/{variantId}")]
    public ApiVariant PostVariant(int productId, int variantId, [FromBody]ProductApiPutVariantRequest variantData)
    {
      if (!decimal.TryParse(variantData.Quantity, NumberStyles.AllowDecimalPoint, CultureInfo.InvariantCulture.NumberFormat, out var quantity))
      {
        throw new ForagerApiException(ForagerApiExceptionCode.InvalidNumberFormat);
      }

      var existingProduct = context.Products.Include(p => p.Variants).SingleOrDefault(f => f.Id == productId);
      if (existingProduct == null)
      {
        throw new ForagerApiException(ForagerApiExceptionCode.ProductNotFound);
      }

      var existingVariant = existingProduct.Variants.SingleOrDefault(v => v.Id == variantId);
      if (existingVariant == null)
      {
        throw new ForagerApiException(ForagerApiExceptionCode.VariantNotFound);
      }

      var currentUserEmail = userInformation.GetUserEmail();
      var currentUser = context.GetUserByEmail(currentUserEmail);

      existingVariant.Brand = variantData.Brand.Trim();
      existingVariant.Description = variantData.Description?.Trim();
      existingVariant.Quantity = quantity;
      existingVariant.Container = variantData.Container?.Trim();

      context.SaveChanges();

      var variant = ApiVariant.FromVariant(existingVariant);
      return variant;
    }
  }
}
