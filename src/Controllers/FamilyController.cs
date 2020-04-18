﻿using Forager.Data;
using Forager.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Security.Claims;

namespace Forager.Controllers
{
  [Authorize]
  [ApiController]
  [Route("api/[controller]")]
  public class FamilyController : ControllerBase
  {
    private readonly IHttpContextAccessor httpContextAccessor;
    private readonly ForagerContext context;

    public FamilyController(IHttpContextAccessor httpContextAccessor, ForagerContext context)
    {
      this.httpContextAccessor = httpContextAccessor;
      this.context = context;
    }

    [HttpGet]
    [Route("{id}")]
    public ApiFamily Get(int id)
    {
      var existingFamily = context.Families.SingleOrDefault(f => f.Id == id);
      var family = ApiFamily.FromFamily(existingFamily);
      return family;
    }

    [HttpPut]
    public ApiFamily Put([FromBody]string name)
    {
      var currentUser = context.GetCurrentUser(this.httpContextAccessor);
      var dataFamily = new Family() { Name = name, CreatorId = currentUser.Id };
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
      var existingFamily = context.Families.SingleOrDefault(f => f.Id == id);
      existingFamily.Name = name;
      context.SaveChanges();
      var family = ApiFamily.FromFamily(existingFamily);
      return family;
    }

    [HttpPut]
    [Route("{id}/members")]
    public bool InviteNewMember(int id, [FromBody]string email)
    {
      var currentUser = context.GetCurrentUser(this.httpContextAccessor);
      var existingFamily = context.Families.SingleOrDefault(f => f.Id == id);
      var invitation = new Invitation()
      {
        Source = currentUser,
        Family = existingFamily,
        Email = email,
        InvitedOn = DateTime.Now
      };
      context.Invitations.Add(invitation);
      context.SaveChanges();
      return true;
    }
  }
}
