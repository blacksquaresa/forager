using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace forager.Migrations
{
    public partial class Invitation1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "ResolvedOn",
                table: "Invitations",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Invitations",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ResolvedOn",
                table: "Invitations");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Invitations");
        }
    }
}
