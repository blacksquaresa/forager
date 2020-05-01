using Microsoft.EntityFrameworkCore.Migrations;

namespace Forager.Migrations
{
  public partial class Variant2 : Migration
  {
    protected override void Up(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.RenameColumn(
          name: "Name",
          table: "Variant",
          newName: "Brand");
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.RenameColumn(
          name: "Brand",
          table: "Variant",
          newName: "Name");
    }
  }
}
