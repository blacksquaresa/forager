using Microsoft.EntityFrameworkCore.Migrations;

namespace Forager.Migrations
{
    public partial class Lists3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "ListItem");

            migrationBuilder.DropColumn(
                name: "Units",
                table: "ListItem");

            migrationBuilder.AddColumn<int>(
                name: "ProductId",
                table: "ListItem",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_ListItem_ProductId",
                table: "ListItem",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_ListItem_Products_ProductId",
                table: "ListItem",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ListItem_Products_ProductId",
                table: "ListItem");

            migrationBuilder.DropIndex(
                name: "IX_ListItem_ProductId",
                table: "ListItem");

            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "ListItem");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "ListItem",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Units",
                table: "ListItem",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
