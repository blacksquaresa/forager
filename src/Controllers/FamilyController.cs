using Forager.Authentication;
using Forager.Data;
using Forager.Exceptions;
using Forager.Models;
using Forager.Services;
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
  public class FamilyController : ControllerBase
  {
    private readonly IUserInformationService userInformation;
    private readonly ForagerContext context;

    public FamilyController(IUserInformationService userInformation, ForagerContext context)
    {
      this.userInformation = userInformation;
      this.context = context;
    }

    [HttpGet]
    [Route("{id}")]
    public ApiFamily Get(int id)
    {
      var existingFamily = context.Families.Include(f => f.CreatedBy).SingleOrDefault(f => f.Id == id);
      if (existingFamily == null)
      {
        throw new ForagerApiException(ForagerApiExceptionCode.FamilyNotFound);
      }

      var family = ApiFamily.FromFamily(existingFamily);
      return family;
    }

    [HttpPut]
    public ApiFamily Put([FromBody]string name)
    {
      if(string.IsNullOrWhiteSpace(name)){
        throw new ForagerApiException(ForagerApiExceptionCode.InvalidNameProvided);
      }

      var currentUserEmail = userInformation.GetUserEmail();
      var currentUser = context.GetUserByEmail(currentUserEmail);
      var dataFamily = new Family() { Name = name.Trim(), CreatedBy = currentUser, CreatedOn = DateTime.Now };
      context.Families.Add(dataFamily);
      context.LinkUserToFamily(currentUser, dataFamily);
      context.SaveChanges();
      var family = ApiFamily.FromFamily(dataFamily);
      return family;
    }

    [HttpPost]
    [Route("{id}")]
    public ApiFamily Post(int id, [FromBody]string name)
    {
      if (string.IsNullOrWhiteSpace(name))
      {
        throw new ForagerApiException(ForagerApiExceptionCode.InvalidNameProvided);
      }

      var existingFamily = context.Families.Include(f => f.CreatedBy).SingleOrDefault(f => f.Id == id);
      if (existingFamily == null)
      {
        throw new ForagerApiException(ForagerApiExceptionCode.FamilyNotFound);
      }

      existingFamily.Name = name.Trim();
      context.SaveChanges();
      var family = ApiFamily.FromFamily(existingFamily);
      return family;
    }

    [HttpPut]
    [Route("{id}/members")]
    public bool InviteNewMember(int id, [FromBody]string email)
    {
      if (!email.IsValidEmail())
      {
        throw new ForagerApiException(ForagerApiExceptionCode.InvalidEmailProvided);
      }

      var currentUserEmail = userInformation.GetUserEmail();
      var currentUser = context.GetUserByEmail(currentUserEmail);
      var existingFamily = context.Families.SingleOrDefault(f => f.Id == id);
      if (existingFamily == null)
      {
        throw new ForagerApiException(ForagerApiExceptionCode.FamilyNotFound);
      }

      var invitation = new Invitation()
      {
        Source = currentUser,
        Family = existingFamily,
        Email = email.Trim(),
        InvitedOn = DateTime.Now
      };
      context.Invitations.Add(invitation);
      context.SaveChanges();
      return true;
    }
  }
}
