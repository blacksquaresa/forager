using Microsoft.EntityFrameworkCore;
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
  }
}
