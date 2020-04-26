using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Forager.Migrations
{
    public partial class Product3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_Families_FamilyId",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Products_FamilyId",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "FamilyId",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "CreatorId",
                table: "Families");

            migrationBuilder.AddColumn<int>(
                name: "CreatedById",
                table: "Families",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedOn",
                table: "Families",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateTable(
                name: "FamilyProducts",
                columns: table => new
                {
                    FamilyId = table.Column<int>(nullable: false),
                    ProductId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FamilyProducts", x => new { x.ProductId, x.FamilyId });
                    table.ForeignKey(
                        name: "FK_FamilyProducts_Families_FamilyId",
                        column: x => x.FamilyId,
                        principalTable: "Families",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FamilyProducts_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Families_CreatedById",
                table: "Families",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_FamilyProducts_FamilyId",
                table: "FamilyProducts",
                column: "FamilyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Families_Users_CreatedById",
                table: "Families",
                column: "CreatedById",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Families_Users_CreatedById",
                table: "Families");

            migrationBuilder.DropTable(
                name: "FamilyProducts");

            migrationBuilder.DropIndex(
                name: "IX_Families_CreatedById",
                table: "Families");

            migrationBuilder.DropColumn(
                name: "CreatedById",
                table: "Families");

            migrationBuilder.DropColumn(
                name: "CreatedOn",
                table: "Families");

            migrationBuilder.AddColumn<int>(
                name: "FamilyId",
                table: "Products",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CreatorId",
                table: "Families",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Products_FamilyId",
                table: "Products",
                column: "FamilyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Families_FamilyId",
                table: "Products",
                column: "FamilyId",
                principalTable: "Families",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
