using Microsoft.EntityFrameworkCore.Migrations;

namespace Forager.Migrations
{
    public partial class Product4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Units",
                table: "Variant");

            migrationBuilder.AddColumn<string>(
                name: "Units",
                table: "Products",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Units",
                table: "Products");

            migrationBuilder.AddColumn<string>(
                name: "Units",
                table: "Variant",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
