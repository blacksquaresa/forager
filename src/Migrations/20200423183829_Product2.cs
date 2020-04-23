using Microsoft.EntityFrameworkCore.Migrations;

namespace Forager.Migrations
{
    public partial class Product2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ListItemId",
                table: "Variant",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ListItem",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    ListId = table.Column<int>(nullable: true),
                    Quantity = table.Column<int>(nullable: false),
                    Units = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ListItem", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ListItem_Lists_ListId",
                        column: x => x.ListId,
                        principalTable: "Lists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Variant_ListItemId",
                table: "Variant",
                column: "ListItemId");

            migrationBuilder.CreateIndex(
                name: "IX_ListItem_ListId",
                table: "ListItem",
                column: "ListId");

            migrationBuilder.AddForeignKey(
                name: "FK_Variant_ListItem_ListItemId",
                table: "Variant",
                column: "ListItemId",
                principalTable: "ListItem",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Variant_ListItem_ListItemId",
                table: "Variant");

            migrationBuilder.DropTable(
                name: "ListItem");

            migrationBuilder.DropIndex(
                name: "IX_Variant_ListItemId",
                table: "Variant");

            migrationBuilder.DropColumn(
                name: "ListItemId",
                table: "Variant");
        }
    }
}
