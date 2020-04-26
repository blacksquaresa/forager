using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Forager.Migrations
{
    public partial class Audit1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CreatedById",
                table: "Variant",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedOn",
                table: "Variant",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "CreatedById",
                table: "Sources",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedOn",
                table: "Sources",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "CreatedById",
                table: "Products",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedOn",
                table: "Products",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "FamilyId",
                table: "Products",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CreatedById",
                table: "Lists",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedOn",
                table: "Lists",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "CreatedById",
                table: "ListItem",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedOn",
                table: "ListItem",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateIndex(
                name: "IX_Variant_CreatedById",
                table: "Variant",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Sources_CreatedById",
                table: "Sources",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Products_CreatedById",
                table: "Products",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Products_FamilyId",
                table: "Products",
                column: "FamilyId");

            migrationBuilder.CreateIndex(
                name: "IX_Lists_CreatedById",
                table: "Lists",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_ListItem_CreatedById",
                table: "ListItem",
                column: "CreatedById");

            migrationBuilder.AddForeignKey(
                name: "FK_ListItem_Users_CreatedById",
                table: "ListItem",
                column: "CreatedById",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Lists_Users_CreatedById",
                table: "Lists",
                column: "CreatedById",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Users_CreatedById",
                table: "Products",
                column: "CreatedById",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Families_FamilyId",
                table: "Products",
                column: "FamilyId",
                principalTable: "Families",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Sources_Users_CreatedById",
                table: "Sources",
                column: "CreatedById",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Variant_Users_CreatedById",
                table: "Variant",
                column: "CreatedById",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ListItem_Users_CreatedById",
                table: "ListItem");

            migrationBuilder.DropForeignKey(
                name: "FK_Lists_Users_CreatedById",
                table: "Lists");

            migrationBuilder.DropForeignKey(
                name: "FK_Products_Users_CreatedById",
                table: "Products");

            migrationBuilder.DropForeignKey(
                name: "FK_Products_Families_FamilyId",
                table: "Products");

            migrationBuilder.DropForeignKey(
                name: "FK_Sources_Users_CreatedById",
                table: "Sources");

            migrationBuilder.DropForeignKey(
                name: "FK_Variant_Users_CreatedById",
                table: "Variant");

            migrationBuilder.DropIndex(
                name: "IX_Variant_CreatedById",
                table: "Variant");

            migrationBuilder.DropIndex(
                name: "IX_Sources_CreatedById",
                table: "Sources");

            migrationBuilder.DropIndex(
                name: "IX_Products_CreatedById",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Products_FamilyId",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Lists_CreatedById",
                table: "Lists");

            migrationBuilder.DropIndex(
                name: "IX_ListItem_CreatedById",
                table: "ListItem");

            migrationBuilder.DropColumn(
                name: "CreatedById",
                table: "Variant");

            migrationBuilder.DropColumn(
                name: "CreatedOn",
                table: "Variant");

            migrationBuilder.DropColumn(
                name: "CreatedById",
                table: "Sources");

            migrationBuilder.DropColumn(
                name: "CreatedOn",
                table: "Sources");

            migrationBuilder.DropColumn(
                name: "CreatedById",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "CreatedOn",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "FamilyId",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "CreatedById",
                table: "Lists");

            migrationBuilder.DropColumn(
                name: "CreatedOn",
                table: "Lists");

            migrationBuilder.DropColumn(
                name: "CreatedById",
                table: "ListItem");

            migrationBuilder.DropColumn(
                name: "CreatedOn",
                table: "ListItem");
        }
    }
}
