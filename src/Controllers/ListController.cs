using Forager.Authentication;
using Forager.Data;
using Forager.Exceptions;
using Forager.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace Forager.Controllers
{
  [Authorize]
  [ApiController]
  [Route("api/[controller]")]
  public class ListController : ControllerBase
  {
    private readonly IUserInformationService userInformation;
    private readonly ForagerContext context;

    public ListController(IUserInformationService userInformation, ForagerContext context)
    {
      this.userInformation = userInformation;
      this.context = context;
    }

    [HttpGet]
    [Route("{id}")]
    public ApiList Get(int id)
    {
      var existingList = context.Lists
                                .Include(list => list.Family)
                                .Include(list => list.Items)
                                .ThenInclude(li => li.Product)
                                .SingleOrDefault(l => l.Id == id);
      if (existingList == null)
      {
        throw new ForagerApiException(ForagerApiExceptionCode.ListNotFound);
      }

      var list = ApiList.FromList(existingList);
      return list;
    }

    public class ListApiPutRequest
    {
      public string name { get; set; }
      public int familyId { get; set; }
    }
    [HttpPut]
    public ApiList Put([FromBody]ListApiPutRequest listData)
    {
      if (string.IsNullOrWhiteSpace(listData.name))
      {
        throw new ForagerApiException(ForagerApiExceptionCode.InvalidNameProvided);
      }

      var currentUserEmail = userInformation.GetUserEmail();
      var currentUser = context.GetUserByEmail(currentUserEmail);
      var currentFamily = currentUser.Families.SingleOrDefault(f => f.Id == listData.familyId);
      if (currentFamily == null)
      {
        throw new ForagerApiException(ForagerApiExceptionCode.FamilyNotFound);
      }

      var dataList = new ShoppingList() { Name = listData.name.Trim(), Family = currentFamily };
      context.Lists.Add(dataList);
      context.SaveChanges();
      var list = ApiList.FromList(dataList);
      return list;
    }

    [HttpPost]
    [Route("{id}")]
    public ApiList Post(int id, [FromBody]string name)
    {
      if (string.IsNullOrWhiteSpace(name))
      {
        throw new ForagerApiException(ForagerApiExceptionCode.InvalidNameProvided);
      }

      var existingList = context.Lists.SingleOrDefault(f => f.Id == id);
      if (existingList == null)
      {
        throw new ForagerApiException(ForagerApiExceptionCode.ListNotFound);
      }

      existingList.Name = name.Trim();
      context.SaveChanges();
      var list = ApiList.FromList(existingList);
      return list;
    }

    [HttpPost]
    [Route("{id}/items")]
    public ApiListItem[] PostItems(int id, [FromBody]int[][] itemMap)
    {
      var existingList = context.Lists.Include(list => list.Items).ThenInclude(item => item.Product).SingleOrDefault(f => f.Id == id);
      if (existingList == null)
      {
        throw new ForagerApiException(ForagerApiExceptionCode.ListNotFound);
      }

      var currentUserEmail = userInformation.GetUserEmail();
      var currentUser = context.GetUserByEmail(currentUserEmail);
      var newItems = new List<ListItem>();
      var existingItems = existingList.Items ?? new List<ListItem>();
      foreach (int[] entry in itemMap)
      {
        if (!existingItems.Any(i => i.Product.Id == entry[0]))
        {
          var newItem = new ListItem
          {
            ProductId = entry[0],
            Quantity = entry[1],
            List = existingList,
            CreatedBy = currentUser,
            CreatedOn = DateTime.Now
          };
          newItems.Add(newItem);
        }
      }

      existingList.Items = existingItems.Concat(newItems).ToList();
      context.SaveChanges();
      var newApiItems = existingList
                          .Items                            
                          .Where(item => newItems.Any(i => i.Id == item.Id))
                          .Select(item => ApiListItem.FromItem(item))
                          .ToArray();
      return newApiItems;
    }
  }
}
