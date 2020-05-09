using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Forager.Data
{
  public class ForagerContext : DbContext
  {
    public const int UniversalFamilyId = 1;

    public ForagerContext() : base() { }

    public ForagerContext(DbContextOptions<ForagerContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }

    public DbSet<Family> Families { get; set; }

    public DbSet<Invitation> Invitations { get; set; }

    public DbSet<UserFamily> UserFamilies { get; set; }

    public DbSet<ShoppingList> Lists { get; set; }

    public DbSet<Product> Products { get; set; }

    public DbSet<Source> Sources { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.Entity<Family>().HasData(new Family { Id = UniversalFamilyId, Name = "Universal Family" });

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

      modelBuilder.Entity<FamilyProducts>()
          .HasKey(bc => new { bc.ProductId, bc.FamilyId });
      modelBuilder.Entity<FamilyProducts>()
          .HasOne(bc => bc.Product)
          .WithMany(u => u.FamilyProducts)
          .HasForeignKey(bc => bc.ProductId);
      modelBuilder.Entity<FamilyProducts>()
          .HasOne(bc => bc.Family)
          .WithMany(f => f.FamilyProducts)
          .HasForeignKey(bc => bc.FamilyId);

      modelBuilder.Entity<ListItem>()
          .HasOne(li => li.Product);

    }
  }
}
