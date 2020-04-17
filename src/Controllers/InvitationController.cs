using forager.Data;
using forager.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Security.Claims;

namespace forager.Controllers
{
  [Authorize]
  [ApiController]
  [Route("api/[controller]")]
  public class InvitationController : ControllerBase
  {
    private readonly IHttpContextAccessor httpContextAccessor;
    private readonly ForagerContext context;

    public InvitationController(IHttpContextAccessor httpContextAccessor, ForagerContext context)
    {
      this.httpContextAccessor = httpContextAccessor;
      this.context = context;
    }

    [HttpPost]
    [Route("{id}/accept")]
    public ApiFamily Accept(int id)
    {
      var dataFamily = context.AcceptInvitation(id);
      context.SaveChanges();
      var family = ApiFamily.FromFamily(dataFamily);
      return family;
    }

    [HttpPost]
    [Route("{id}/reject")]
    public bool Reject(int id)
    {
      context.RejectInvitation(id);
      context.SaveChanges();
      return true;
    }
  }
}
