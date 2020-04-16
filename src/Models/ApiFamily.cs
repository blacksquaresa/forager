﻿using forager.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace forager.Models
{
  public class ApiFamily
  {
    public int Id { get; set; }
    public string Name { get; set; }

    public int Creator { get; set; }

    public ICollection<int> Members { get; set; } = new List<int>();

    public static ApiFamily FromFamily(Family dataFamily)
    {
      var family = new ApiFamily()
      {
        Id = dataFamily.Id,
        Name = dataFamily.Name,
        Creator = dataFamily.Members.Single(u => u.Id == dataFamily.CreatorId).Id,
        Members = dataFamily.Members.Select(u => u.Id).ToList()
      };
      return family;
    }
  }
}