using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Forager.Authentication
{
  public interface IUserInformationService
  {
    public string GetUserEmail();

    public string GetUserName();

    public string GetPicture();
  }
}
