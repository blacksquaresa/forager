using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace forager.Data
{
  public class Invitation
  {
    public int Id { get; set; }
    public User Source { get; set; }
    public string Email { get; set; }
    public Family Family { get; set; }
    public DateTime InvitedOn { get; set; }
  }
}
