﻿using forager.Data;
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
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }

    public ICollection<int> Families { get; set; } = new List<int>();

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

    public static ApiUser FromUser(User dataUser){
      var user =  new ApiUser() { Id = dataUser.Id, Name = dataUser.Name, Email = dataUser.Email };
      foreach(var family in dataUser.Families){
        user.Families.Add(family.Id);
      }
      return user;
    }

  }
}
