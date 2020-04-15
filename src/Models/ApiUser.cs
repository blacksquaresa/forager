using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace forager.Models
{
  public class ApiUser
  {
    public string Name { get; set; }
    public string Email { get; set; }

    private MD5 md5 = MD5.Create();

    public string Avatar
    {
      get
      {
        var source = this.Email.Trim().ToLowerInvariant();
        var data = md5.ComputeHash(Encoding.UTF8.GetBytes(source));

        var sBuilder = new StringBuilder();

        for (int i = 0; i < data.Length; i++)
        {
          sBuilder.Append(data[i].ToString("x2"));
        }

        var result = sBuilder.ToString();
        return $"https://s.gravatar.com/avatar/{result}?d=identicon";
      }
    }

  }
}
