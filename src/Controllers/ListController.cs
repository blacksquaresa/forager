using Forager.Authentication;
using Forager.Data;
using Forager.Exceptions;
using Forager.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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
      var existingList = context.Lists.SingleOrDefault(l => l.Id == id);
      if (existingList == null)
      {
        throw new ForagerApiException(ForagerApiExceptionCode.ListNotFound);
      }

      var list = ApiList.FromList(existingList);
      return list;
    }

    public class ListApiPutRequest{
      public string name { get; set; }
      public int familyId { get; set; }
    }
    [HttpPut]
    public ApiList Put([FromBody]ListApiPutRequest listData)
    {
      if(string.IsNullOrWhiteSpace(listData.name)){
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
  }
}
