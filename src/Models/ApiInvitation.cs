using forager.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace forager.Models
{
  public class ApiInvitation
  {
    public int Id { get; set; }
    public string Source { get; set; }
    public string Family { get; set; }
    public DateTime InvitedOn { get; set; }

    public static ApiInvitation FromInvitation(Invitation dataInvitation)
    {
      var invitation = new ApiInvitation()
      {
        Id = dataInvitation.Id,
        Source = dataInvitation.Source.Name,
        Family = dataInvitation.Family.Name,
        InvitedOn = dataInvitation.InvitedOn
      };
      return invitation;
    }
  }
}
