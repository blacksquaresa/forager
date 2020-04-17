using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace forager.Data
{
  public enum InvitationStatus {
    Invited,
    Accepted,
    Rejected
  }

  public class Invitation
  {
    public int Id { get; set; }
    public User Source { get; set; }
    public string Email { get; set; }
    public Family Family { get; set; }
    public InvitationStatus Status { get; set; } = InvitationStatus.Invited;
    public DateTime InvitedOn { get; set; }
    public DateTime? ResolvedOn { get; set; }
  }
}
