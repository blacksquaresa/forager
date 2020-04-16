﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace forager.Data
{
  public class ForagerContext : DbContext
  {
    public ForagerContext(): base() { }

    public ForagerContext(DbContextOptions<ForagerContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }

    public DbSet<Family> Families { get; set; }

    public DbSet<UserFamily> UserFamilies { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.Entity<UserFamily>()
          .HasKey(bc => new { bc.UserId, bc.FamilyId });
      modelBuilder.Entity<UserFamily>()
          .HasOne(bc => bc.User)
          .WithMany(u => u.UserFamilies)
          .HasForeignKey(bc => bc.UserId);
      modelBuilder.Entity<UserFamily>()
          .HasOne(bc => bc.Family)
          .WithMany(f => f.UserFamilies)
          .HasForeignKey(bc => bc.FamilyId);
    }
  }
}
